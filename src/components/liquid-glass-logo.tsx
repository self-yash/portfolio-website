/*!
ReactDrops Component License 1.0

Copyright (c) 2026 ReactDrops

1. Scope and definitions

This license applies to ReactDrops software and associated documentation that
expressly carry this license or are distributed under a LICENSE file containing
it (the "Software"). "Licensor" means the copyright holder granting rights in
the Software, and only to the extent that holder has authority to grant them.
"You" means the individual or entity exercising these rights.

An "End Product" is a website, application, service, or other finished project
whose primary purpose is something other than providing reusable components,
source code, templates, or development assets to others.

2. Permitted uses

Subject to this license, Licensor grants You a worldwide, non-exclusive,
royalty-free license to use, copy, modify, and incorporate the Software into
unlimited personal, internal, and commercial End Products. You may charge for
End Products, subscriptions, development services, and work for clients.

You may distribute the Software as an integrated part of an End Product,
including in browser-delivered JavaScript. You may provide End Product source
code to a client, and share the Software with employees and contractors who
need it to develop or maintain End Products. Those recipients may use the
Software for those purposes subject to this license. This permission does not
authorize them to redistribute the Software as a reusable development asset.

3. Restricted redistribution

Unless You obtain separate written permission from Licensor, You may not sell,
sublicense, publish, share, or otherwise redistribute the Software, or a
substantial portion of it, whether unchanged or modified:

(a) as a standalone component, component library, UI kit, source-code bundle,
    registry, or other collection of reusable development assets;
(b) as part of a theme, template, starter project, or similar product offered
    to multiple recipients for reuse in their own projects; or
(c) through a builder or generation service that offers the Software as
    reusable blocks or source-code exports for others' projects.

These restrictions apply to paid and free redistribution. Renaming, restyling,
repackaging, translating, or modifying the Software does not remove them.
Building separate finished websites or applications for multiple clients is
permitted; offering a reusable template or kit containing the Software is not.

Public source-code hosting by Licensor is not permission to republish the
Software under another license. This license does not override any separate
rights granted directly by Licensor or applicable code-hosting terms.

4. Notices and ownership

Retain this license and applicable copyright and third-party notices in source
copies of the Software and permitted source distributions. No visible credit
or ReactDrops logo is required in an End Product's user interface.

Licensor retains ownership of its Software. You retain rights in Your own
contributions, subject to the license for any incorporated Software. No rights
to trademarks, trade names, or logos are granted by this license.

5. Third-party materials and separate grants

Dependencies, fonts, images, videos, and other third-party materials remain
subject to their respective licenses. Separately identified third-party code
is licensed under its stated terms, and these restrictions do not limit rights
granted by its copyright holders. Retain all required third-party notices.
Demo media are not licensed by this document; obtain Your own permission or
replace them with media You are entitled to use.

This license does not revoke rights granted under other valid licenses. It does
not assert ownership of third-party work or grant rights Licensor lacks.

6. Termination

The permissions granted here continue unless terminated for a material breach.
If You fail to cure a material breach within 30 days after receiving written
notice from Licensor, Your permissions terminate. On termination, cease uses
and distributions requiring this license. Rights under independently granted
licenses and rights that applicable law does not allow to be restricted remain
unaffected. Sections 3 through 7 survive termination.

7. Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. TO THE MAXIMUM EXTENT
PERMITTED BY APPLICABLE LAW, LICENSOR AND CONTRIBUTORS SHALL NOT BE LIABLE FOR
ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT, OR OTHERWISE,
ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR ITS USE.

This license does not limit rights or exceptions that applicable law makes
non-waivable. No other permissions are granted by implication.
*/

'use client';

import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import {
  createLiquidGlassLogoRenderer,
  liquidGlassLogoDefaults,
  liquidGlassLogoPresets,
  liquidGlassLogoThemes,
  normalizeLiquidGlassLogo,
  type LiquidGlassLogoTuning,
} from './liquid-glass-logo-renderer';
import './liquid-glass-logo.css';

export type LiquidGlassLogoHandle = {
  replay: () => void;
  seek: (seconds: number) => void;
  pause: () => void;
  play: () => void;
};
export type LiquidGlassLogoProps = Partial<LiquidGlassLogoTuning> & {
  /** Optional visual preset, e.g. 'soft glow' */
  preset?: 'default' | 'soft glow' | 'soft-glow' | string;
  height?: number | string;
  /** Callback fired when the intro animation sequence completes */
  onComplete?: () => void;
  /** Image URL drawn behind the animation, covering the container. The plate turns see-through. */
  backgroundImage?: string;
  /** Horizontal and vertical offsets as percentages of the frame; 0 centers the image. */
  backgroundX?: number;
  backgroundY?: number;
  /** Scale of the cover image, from 1 to 3. */
  backgroundScale?: number;
  /** Color and opacity (0–1) of the overlay between the image and the logo. */
  backgroundTint?: string;
  backgroundTintOpacity?: number;
  className?: string;
  style?: CSSProperties;
  /** Accessible name; defaults to "Logo" or the visible wordmark text. */
  'aria-label'?: string;
};

export const LiquidGlassLogo = forwardRef<LiquidGlassLogoHandle, LiquidGlassLogoProps>(
  function LiquidGlassLogo(
    {
      preset,
      height,
      onComplete,
      backgroundImage,
      backgroundX = 0,
      backgroundY = 0,
      backgroundScale = 1,
      backgroundTint = '#000000',
      backgroundTintOpacity = 0,
      className = '',
      style,
      'aria-label': label,
      ...overrides
    },
    ref,
  ) {
    const canvas = useRef<HTMLCanvasElement>(null);
    const engine = useRef<ReturnType<typeof createLiquidGlassLogoRenderer>>(null);
    const [ready, setReady] = useState(false);
    const [fallback, setFallback] = useState(false);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    // Optional preset styling (e.g. 'soft glow')
    const presetConfig = preset && liquidGlassLogoPresets[preset]
      ? liquidGlassLogoPresets[preset]
      : {};

    // A theme supplies the colors; any color passed explicitly still wins.
    const theme = liquidGlassLogoThemes[overrides.theme === 'light' ? 'light' : 'dark'];
    // Over a background image the plate is see-through: the glass keeps its
    // optics, but its own color would hide the picture behind it.
    const tuning = normalizeLiquidGlassLogo({
      ...liquidGlassLogoDefaults,
      ...presetConfig,
      ...theme,
      ...overrides,
      ...(backgroundImage ? { tile: false } : {}),
    });
    const key = JSON.stringify(tuning);
    const latest = useRef(tuning);
    latest.current = tuning;
    useImperativeHandle(
      ref,
      () => ({
        replay: () => engine.current?.replay(),
        seek: (seconds) => engine.current?.seek(seconds),
        pause: () => engine.current?.pause(),
        play: () => engine.current?.play(),
      }),
      [],
    );
    useEffect(() => {
      if (!canvas.current) return;
      let renderer: ReturnType<typeof createLiquidGlassLogoRenderer> = null;
      try {
        renderer = createLiquidGlassLogoRenderer(
          canvas.current,
          latest.current,
          () => setReady(true),
          () => onCompleteRef.current?.(),
        );
      } catch {
        renderer = null;
      }
      if (!renderer) {
        setFallback(true);
        const timer = setTimeout(() => {
          onCompleteRef.current?.();
        }, 1800);
        return () => clearTimeout(timer);
      }
      engine.current = renderer;
      return () => {
        renderer?.dispose();
        engine.current = null;
      };
    }, []);
    // Apply size and DPR changes before the resized canvas can be painted.
    useLayoutEffect(() => engine.current?.update(latest.current), [key]);
    const markSource = tuning.mark === 'logo' ? tuning.logo : tuning.mark;
    return (
      <div
        className={`liquid-glass-logo ${className}`.trim()}
        style={{
          height,
          background: tuning.background,
          ...style,
        }}
        role="img"
        aria-label={label ?? (tuning.ending === 'logo' ? 'Logo' : tuning.text)}
        data-liquid-glass-ready={ready || undefined}
      >
        {backgroundImage && (
          <>
            <div
              className="liquid-glass-logo-background"
              aria-hidden="true"
              style={{
                background: `url(${JSON.stringify(backgroundImage)}) center / cover no-repeat`,
                transform: `translate(${Math.max(-100, Math.min(100, backgroundX))}%, ${Math.max(-100, Math.min(100, backgroundY))}%) scale(${Math.max(1, Math.min(3, backgroundScale))})`,
              }}
            />
            <div
              className="liquid-glass-logo-background"
              aria-hidden="true"
              style={{
                backgroundColor: backgroundTint,
                opacity: Math.max(0, Math.min(1, backgroundTintOpacity)),
              }}
            />
          </>
        )}
        <canvas ref={canvas} aria-hidden="true" />
        {fallback && (
          <span
            className="liquid-glass-logo-fallback"
            aria-hidden="true"
            style={{
              color: tuning.textColor,
              fontFamily: tuning.fontFamily,
              fontWeight: tuning.fontWeight,
              fontSize: tuning.fontSize,
              letterSpacing: `${tuning.letterSpacing}em`,
              gap: `${tuning.markGap}em`,
            }}
          >
            {tuning.ending === 'logo' ? (
              <img
                src={tuning.logo}
                alt=""
                style={{
                  width: tuning.logoSize * tuning.logoScale * tuning.finalLogoScale,
                  height: tuning.logoSize * tuning.logoScale * tuning.finalLogoScale,
                  maxWidth: '80%',
                  maxHeight: '80%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <>
                {markSource && <img src={markSource} alt="" />}
                {tuning.text}
              </>
            )}
          </span>
        )}
      </div>
    );
  },
);

export function Example() {
  return (
    <LiquidGlassLogo
      logo="/logo.svg"
      ending="logo"
      theme="light"
      style={{ height: 480 }}
    />
  );
}
