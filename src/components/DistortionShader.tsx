import { Plane, shaderMaterial, useTexture } from "@react-three/drei";
import { extend, Object3DNode, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { ShaderMaterial, Texture } from "three";
import { MaterialNode } from "three/webgpu";

type Props = { imagePath: string; isHovered?: boolean };

const DistortionShaderMaterial: typeof ShaderMaterial & {
  key: string;
} = shaderMaterial(
  {
    tDiffuse: new Texture(),
    glitchIntensity: 0.0,
    uBrightness: 1.0,
    uContrast: 0.7,
  },
  `
    varying vec2 vUv;
    void main() {
       vUv = uv;
       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
  `
    uniform float uBrightness;
    uniform float uContrast;
    uniform sampler2D tDiffuse;
    uniform float glitchIntensity;
    varying vec2 vUv;
    
    void main() {
    vec2 uv = vUv;
    vec4 baseState = texture2D(tDiffuse, uv) * uContrast ;
    
    if (glitchIntensity > 0.0) {
        float segment = floor(uv.y * 12.0); 
        float randomValue = fract(sin(segment * 12345.6789 + glitchIntensity) * 43758.5453); 
        vec2 offset = vec2(randomValue * 0.03, 0.0) * glitchIntensity;
    
        vec4 redGlitch = texture2D(tDiffuse, uv + offset) * uContrast ;
        vec4 greenGlitch = texture2D(tDiffuse, uv - offset) * uContrast ;
        vec4 blueGlitch = texture2D(tDiffuse, uv) * uContrast ;
    
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
    
    `
);
extend({ DistortionShaderMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    distortionShaderMaterial: Object3DNode<
      MaterialNode,
      typeof DistortionShaderMaterial
    >;
  }
}

const DistortionShader = ({ imagePath, isHovered = true }: Props) => {
  const texture = useTexture(imagePath);
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
    glitchIntensityMod: 0.1,
  };

  useFrame(() => {
    if (isHovered) {
      setHoverDuration(hoverDuration + ANIMATION_CONFIG.updateFrequency);

      if (hoverDuration >= 0.1) {
        setHoverDuration(0);

        if (planeMeshRef.current.material.uniforms.glitchIntensity.value < 1) {
          planeMeshRef.current.material.uniforms.glitchIntensity.value +=
            Math.random() * ANIMATION_CONFIG.glitchIntensityMod;
        } else {
          planeMeshRef.current.material.uniforms.glitchIntensity.value =
            1 + Math.random() * ANIMATION_CONFIG.glitchIntensityMod;
        }
      }
    } else {
      planeMeshRef.current.material.uniforms.glitchIntensity.value = 0;
    }
  });
  return (
    <Plane args={[3, 3, 15, 15]} ref={planeMeshRef}>
      <distortionShaderMaterial
        /* @ts-ignore */
        tDiffuse={texture}
        glitchIntensity={shaderUniforms.glitchIntensity}
      />
    </Plane>
  );
};

export default DistortionShader;
