import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

const ShaderGradientComponent = ShaderGradient as any;

export default function Background() {
  return (
    <div className="absolute inset-0 z-0">
      <ShaderGradientCanvas
        pointerEvents="none"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <ShaderGradientComponent
          animate="on"
          axesHelper="off"
          brightness={1.2}
          cAzimuthAngle={180}
          cDistance={3.61}
          cPolarAngle={90}
          cameraZoom={1}
          color1="#003EBC"
          color2="#3081CF"
          color3="#9BC2E5"
          destination="onCanvas"
          embedMode="off"
          envPreset="city"
          format="gif"
          fov={45}
          frameRate={10}
          gizmoHelper="hide"
          grain="off"
          lightType="3d"
          pixelDensity={1}
          positionX={-1.4}
          positionY={0}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={10}
          rotationZ={50}
          shader="defaults"
          type="plane"
          uAmplitude={1}
          uDensity={1.3}
          uFrequency={5.5}
          uSpeed={0.1}
          uStrength={4}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
}

