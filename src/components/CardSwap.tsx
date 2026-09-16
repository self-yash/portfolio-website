import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
  children?: React.ReactNode;
  borderColor?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, className = '', style, borderColor, ...rest }, ref) => {
  const combinedStyle: React.CSSProperties = {
    ...(borderColor ? { borderColor } : {}),
    ...style
  };
  return (
    <div ref={ref} {...rest} style={combinedStyle} className={`card ${customClass ?? ''} ${className}`.trim()} />
  );
});
Card.displayName = 'Card';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  isHovered?: boolean;
  swapOnHoverOnly?: boolean;
}

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement | null, slot: { x: number; y: number; z: number; zIndex: number }, skew: number) => {
  if (!el) return;
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });
};

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  className = '',
  style = {},
  isHovered,
  swapOnHoverOnly = false,
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);
  const swapRef = useRef<() => void>(() => {});

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;
      if (tlRef.current && tlRef.current.isActive()) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          if (elFront) {
            gsap.set(elFront, { zIndex: backSlot.zIndex });
          }
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swapRef.current = swap;

    if (!swapOnHoverOnly) {
      intervalRef.current = window.setInterval(swap, delay);

      if (pauseOnHover) {
        const node = container.current;
        if (!node) return;
        const pause = () => {
          tlRef.current?.pause();
          clearInterval(intervalRef.current);
        };
        const resume = () => {
          tlRef.current?.play();
          intervalRef.current = window.setInterval(swap, delay);
        };
        node.addEventListener('mouseenter', pause);
        node.addEventListener('mouseleave', resume);
        return () => {
          node.removeEventListener('mouseenter', pause);
          node.removeEventListener('mouseleave', resume);
          clearInterval(intervalRef.current);
        };
      }
      return () => clearInterval(intervalRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, swapOnHoverOnly]);

  // Handle swapOnHoverOnly when isHovered changes from prop
  useEffect(() => {
    if (!swapOnHoverOnly) return;

    if (isHovered) {
      swapRef.current();
      intervalRef.current = window.setInterval(() => {
        swapRef.current();
      }, delay);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, [isHovered, swapOnHoverOnly, delay]);

  // Fallback hover listener if isHovered is not passed
  useEffect(() => {
    if (!swapOnHoverOnly || isHovered !== undefined) return;
    const node = container.current;
    if (!node) return;

    const startSwap = () => {
      swapRef.current();
      intervalRef.current = window.setInterval(() => {
        swapRef.current();
      }, delay);
    };

    const stopSwap = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };

    node.addEventListener('mouseenter', startSwap);
    node.addEventListener('mouseleave', stopSwap);
    return () => {
      node.removeEventListener('mouseenter', startSwap);
      node.removeEventListener('mouseleave', stopSwap);
      stopSwap();
    };
  }, [swapOnHoverOnly, isHovered, delay]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child as React.ReactElement<any>, {
          key: i,
          ref: refs[i],
          style: { width, height, ...((child.props as { style?: React.CSSProperties })?.style ?? {}) },
          onClick: (e: React.MouseEvent) => {
            (child.props as { onClick?: (e: React.MouseEvent) => void })?.onClick?.(e);
            onCardClick?.(i);
          }
        } as any)
      : child
  );

  return (
    <div 
      ref={container} 
      className={`card-swap-container ${className}`.trim()} 
      style={{ width, height, ...style }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
