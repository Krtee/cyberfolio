import { Plane, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { ShaderMaterial } from "three";

type Props = { image: HTMLImageElement | null; isHovered: boolean };

const DistortionShader = ({ image, isHovered }: Props) => {
  const texture = useTexture("/cables.jpg");
  const shaderUniforms = useMemo(
    () => ({
      tDiffuse: { value: texture },
      glitchIntensity: { value: 0.0 },
    }),
    [texture]
  );

  const [hoverDuration, setHoverDuration] = useState(0);
  const planeMeshRef = useRef<any>(null);

  const ANIMATION_CONFIG = {
    updateFrequency: 0.1,
    glitchIntensityMod: 0.5,
  };
  // shaders
  const vertexShader = `
    varying vec2 vUv;
    void main() {
       vUv = uv;
       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `;

  const fragmentShader = `
    uniform sampler2D tDiffuse;
    uniform float glitchIntensity;
    varying vec2 vUv;
    
    void main() {
    vec2 uv = vUv;
    vec4 baseState = texture2D(tDiffuse, uv);
    
    if (glitchIntensity > 0.0) {
        float segment = floor(uv.y * 12.0); 
        float randomValue = fract(sin(segment * 12345.6789 + glitchIntensity) * 43758.5453); 
        vec2 offset = vec2(randomValue * 0.03, 0.0) * glitchIntensity;
    
        vec4 redGlitch = texture2D(tDiffuse, uv + offset);
        vec4 greenGlitch = texture2D(tDiffuse, uv - offset);
        vec4 blueGlitch = texture2D(tDiffuse, uv);
    
        if (mod(segment, 3.0) == 0.0) {
            gl_FragColor = vec4(redGlitch.r, greenGlitch.g, baseState.b, 1.0);
        } else if (mod(segment, 3.0) == 1.0) {
            gl_FragColor = vec4(baseState.r, greenGlitch.g, blueGlitch.b, 1.0);
        } else {
            gl_FragColor = vec4(redGlitch.r, baseState.g, blueGlitch.b, 1.0);
        }
    } else {
        gl_FragColor = baseState; 
    }
    }
    
    `;

  useFrame(() => {
    if (isHovered) {
      setHoverDuration(hoverDuration + ANIMATION_CONFIG.updateFrequency);

      if (hoverDuration >= 0.5) {
        setHoverDuration(0);

        const material: ShaderMaterial = planeMeshRef.current.material;

        material.setValues({
          uniforms: {
            tDiffuse: { value: texture },
            glitchIntensity: {
              value: Math.random() * ANIMATION_CONFIG.glitchIntensityMod,
            },
          },
        });
      }
    }
  });
  return (
    <Plane args={[2, 2]} ref={planeMeshRef}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={shaderUniforms}
        wireframe
      />
    </Plane>
  );
};

export default DistortionShader;
