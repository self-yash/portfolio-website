/* eslint-disable react/no-unknown-property */
'use client';
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { generateYMCardTextures, generateYMLanyardTexture } from '../utils/generateYMTextures';

import cardGLB from '../assets/lanyard/card.glb';
import lanyard from '../assets/lanyard/lanyard.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

const MeshLineGeometryEl = 'meshLineGeometry' as any;
const MeshLineMaterialEl = 'meshLineMaterial' as any;

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb). Each
// custom image is composited into its own half so the two faces render
// independently, aspect-preserving (no stretching).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  className?: string;
  style?: React.CSSProperties;
  isHeroActive?: boolean;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  className = '',
  style = {},
  isHeroActive = true
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  const defaultTextures = useMemo(() => {
    if (typeof window === 'undefined') return { front: '', back: '', lanyard: '' };
    return {
      ...generateYMCardTextures(),
      lanyard: generateYMLanyardTexture(),
    };
  }, []);

  const activeFrontImage = frontImage ?? defaultTextures.front;
  const activeBackImage = backImage ?? defaultTextures.back;
  const activeLanyardImage = lanyardImage ?? defaultTextures.lanyard;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`lanyard-wrapper ${className}`.trim()} style={style}>
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={Math.PI} />
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60} paused={!isHeroActive}>
            <Band
              isMobile={isMobile}
              frontImage={activeFrontImage}
              backImage={activeBackImage}
              imageFit={imageFit}
              lanyardImage={activeLanyardImage}
              lanyardWidth={lanyardWidth}
              isHeroActive={isHeroActive}
            />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  isHeroActive?: boolean;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  isHeroActive = true
}: BandProps) {
  const { viewport, size } = useThree();
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  const floorRef = useRef<any>(null);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  // Compute anchor in the top-right quadrant so it hangs gracefully on the right side of hero
  const anchorX = useMemo(() => {
    return Math.min(viewport.width * 0.28, viewport.width / 2 - 2.2);
  }, [viewport.width]);

  const anchorY = useMemo(() => {
    return viewport.height / 2 + 0.4;
  }, [viewport.height]);

  // Height of Marquee tech loop at bottom is ~60px
  const marqueeTopY = useMemo(() => {
    const marqueeHeightPx = 62;
    const unitsPerPx = viewport.height / Math.max(size.height, 1);
    return -(viewport.height / 2) + marqueeHeightPx * unitsPerPx;
  }, [viewport.height, size.height]);

  const segmentProps: any = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 5, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyardImage || lanyard) as any;
  
  // useTexture must be called unconditionally; use a blank pixel when an image
  // isn't supplied for a given face, then skip compositing it below.
  const frontTex = useTexture(frontImage || BLANK_PIXEL) as any;
  const backTex = useTexture(backImage || BLANK_PIXEL) as any;

  // Composite the front/back images into the card's texture atlas (front = left
  // half, back = right half). Each image is drawn aspect-preserving (no stretch).
  const cardMap = useMemo(() => {
    const baseMap = materials?.base?.map;
    if (!baseMap) return null;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    if (!baseImg) return baseMap;

    const W = baseImg.width || 1024;
    const H = baseImg.height || 1024;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    // Keep the original baked atlas for the card edges and any untouched face.
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img: any, rect: { x: number; y: number; w: number; h: number }) => {
      if (!img || !img.width || !img.height) return;
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex?.image) drawFitted(frontTex.image, FRONT_UV_RECT);
    if (backImage && backTex?.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, frontTex?.image, backTex?.image, materials?.base?.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<any>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  // Adjust floor and anchor translations only when dimensions or anchors actually update (e.g. resize)
  useEffect(() => {
    if (floorRef.current) {
      floorRef.current.setTranslation({ x: 0, y: marqueeTopY - 1, z: 0 });
    }
    if (fixed.current) {
      fixed.current.setTranslation({ x: anchorX, y: anchorY, z: 0 });
    }
  }, [marqueeTopY, anchorX, anchorY]);

  // When re-entering viewport or unpausing, cleanly resync positions and lerped vectors
  useEffect(() => {
    if (isHeroActive) {
      [j1, j2].forEach(ref => {
        if (ref.current?.translation) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }
      });
      [card, j1, j2, j3].forEach(ref => ref.current?.wakeUp?.());
    }
  }, [isHeroActive]);

  useFrame((state, delta) => {
    if (!isHeroActive) return;

    // Strict delta capping to 33ms so frame drops or background tab resumption never explode physics/lerp
    const safeDelta = Math.min(delta, 0.033);

    const cardBottomOffset = 1.125;
    const minCardY = marqueeTopY + cardBottomOffset;

    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());

      // Clamp X: Cannot be dragged further left than the horizontal half of the page (x = 0)
      const halfW = state.viewport.width / 2;
      const cardHalfW = 0.81;
      const minX = 0; // Exactly at the horizontal center line of the page
      const maxX = halfW - cardHalfW;
      const targetX = Math.max(minX, Math.min(maxX, vec.x - dragged.x));

      // Clamp Y so it cannot be dragged below the tech stack marquee at the bottom
      const maxY = state.viewport.height / 2 + 1;
      const targetY = Math.max(minCardY, Math.min(maxY, vec.y - dragged.y));

      card.current?.setNextKinematicTranslation({
        x: targetX,
        y: targetY,
        z: vec.z - dragged.z
      });
    }

    // When card swings freely, gently bound it so it never swings past the horizontal half of the page
    if (!dragged && card.current) {
      const trans = card.current.translation();
      if (trans && trans.x < 0) {
        card.current.setTranslation({ x: 0, y: trans.y, z: trans.z }, true);
        const lin = card.current.linvel?.();
        if (lin && lin.x < 0) {
          card.current.setLinvel({ x: -lin.x * 0.2, y: lin.y, z: lin.z }, true);
        }
      }
    }

    if (fixed.current && card.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current) return;
        const trans = ref.current.translation();
        if (!ref.current.lerped || isNaN(ref.current.lerped.x)) {
          ref.current.lerped = new THREE.Vector3().copy(trans);
          return;
        }
        const dist = ref.current.lerped.distanceTo(trans);
        // If distance exceeds tolerance, instantly snap to prevent detachment
        if (dist > 1.2) {
          ref.current.lerped.copy(trans);
          return;
        }
        const clampedDistance = Math.max(0.1, Math.min(1, dist));
        const rawAlpha = safeDelta * (minSpeed + clampedDistance * (maxSpeed - minSpeed));
        const lerpFactor = THREE.MathUtils.clamp(rawAlpha, 0, 0.45);
        ref.current.lerped.lerp(trans, lerpFactor);
      });

      if (j3.current && j2.current?.lerped && j1.current?.lerped && fixed.current) {
        curve.points[0].copy(j3.current.translation());
        curve.points[1].copy(j2.current.lerped);
        curve.points[2].copy(j1.current.lerped);
        curve.points[3].copy(fixed.current.translation());
        if (band.current?.geometry) {
          band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
        }
      }

      if (card.current.angvel && card.current.rotation) {
        ang.copy(card.current.angvel());
        rot.copy(card.current.rotation());
        // Dampen spinning and smoothly keep facing forward
        card.current.setAngvel({
          x: ang.x * 0.92,
          y: (ang.y - rot.y * 0.35) * 0.92,
          z: ang.z * 0.92
        });
      }
    }
  });

  curve.curveType = 'chordal';
  if (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }

  return (
    <>
      {/* Invisible floor collider right at marquee top so card cannot swing or fall below */}
      <RigidBody ref={floorRef} type="fixed" position={[0, marqueeTopY - 1, 0]} colliders={false}>
        <CuboidCollider args={[100, 1, 100]} />
      </RigidBody>

      {/* Invisible vertical barrier wall at center line so card cannot swing into left half of page */}
      <RigidBody type="fixed" position={[-0.2, 0, 0]} colliders={false}>
        <CuboidCollider args={[0.2, 50, 50]} />
      </RigidBody>

      <group position={[anchorX, anchorY, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          {/* Card collider reduced by 10% */}
          <CuboidCollider args={[0.72, 1.0125, 0.01]} />
          <group
            scale={2.025}
            position={[0, -1.08, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => ((e.target as HTMLElement).releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => {
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            {nodes?.card?.geometry && (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  map={cardMap}
                  map-anisotropy={16}
                  clearcoat={isMobile ? 0 : 1}
                  clearcoatRoughness={0.15}
                  roughness={0.9}
                  metalness={0.8}
                />
              </mesh>
            )}
            {nodes?.clip?.geometry && (
              <mesh geometry={nodes.clip.geometry} material={materials?.metal} material-roughness={0.3} />
            )}
            {nodes?.clamp?.geometry && (
              <mesh geometry={nodes.clamp.geometry} material={materials?.metal} />
            )}
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <MeshLineGeometryEl />
        <MeshLineMaterialEl
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
