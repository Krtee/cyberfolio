import { Environment, Lightformer } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import gsap from "gsap";
import { LenisRef, ReactLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import "./App.scss";
import { CableTV } from "./components/CableTV";
import Stage2 from "./components/Stage2";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const lenisRef = useRef<LenisRef>(null);
  useEffect(() => {
    timeRef.current = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      <div className="relative mx-auto w-full h-screen bg-cement flex flex-col justify-between">
        <div className="absolute top-0 left-0 w-full h-full z-20">
          <Canvas
            camera={{ position: [0, 0, 13], fov: 25 }}
            className="w-screen h-screen"
          >
            <Physics debug interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
              <CableTV />
            </Physics>
            <ambientLight intensity={Math.PI} />

            <Environment blur={0.75}>
              <Lightformer
                intensity={2}
                color="red"
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
          </Canvas>
        </div>

        <div className="flex flex-row justify-between">
          <div className=" flex overflow-hidden evangelion flex-col  text-8xl leading-[0.73] pt-3">
            <p>SHOESIZE 42</p>
            <p>170 CM</p>
            <p>75 KG</p>
          </div>
          <div className="akira text-2xl leading-[0.73] pt-1">
            <p>STUTTGART, GERMANY</p>
            <p className="uppercase text-right w-full">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="uppercase text-right w-full">
              {currentTime.toLocaleTimeString("en-US", {
                hour12: false,
              })}
            </p>
          </div>
        </div>
        <div className="z-10">
          <div className="flex flex-row gap-2 h-[140px] ">
            <div className="overflow-hidden max-h-full">
              <p className="  akira uppercase text-xs text-clip  text-justify leading-[0.9] ">
                Welcome to my portfolio! I'm [Your Name], a passionate and
                dedicated web developer with a strong focus on creating
                intuitive and dynamic digital experiences. I specialize in
                front-end development. Welcome to my portfolio! I'm [Your Name],
                a passionate and dedicated web developer with a strong focus on
                creating intuitive and dynamic digital experiences. I specialize
                in front-end development. Welcome to my portfolio! I'm [Your
                Name], a passionate and dedicated web developer with a strong
                focus on creating intuitive and dynamic digital experiences. I
                specialize in front-end development. Welcome to my portfolio!
                I'm [Your Name], a passionate and dedicated web developer with a
                strong focus on creating intuitive and dynamic digital
                experiences. I specialize in front-end development. Welcome to
                my portfolio! I'm [Your Name], a passionate and dedicated web
                developer with a strong focus on creating intuitive and dynamic
                digital experiences. I specialize in front-end development.
                Welcome to my portfolio! I'm [Your Name], a passionate and
                dedicated web developer with a strong focus on creating
                intuitive and dynamic digital experiences. I specialize in
                front-end development.
              </p>
            </div>
            <p className=" desolation lined-black text-[12em] leading-[0.8] text-center whitespace-nowrap	">
              MINH VU NGUYEN
            </p>
          </div>
          <p className=" evangelion header__jobname">FRONTEND DEVELOPER</p>
        </div>
        <div className="absolute top-[20%] left-[40%] z-0">
          <p className="chicago-lined text-[30em] tracking-[-0.2em] leading-[0.8] text-center pr-5">
            01
          </p>
          <p className="akira lined-red text-[5em] text-center leading-[0.8]">
            SOUND
          </p>
          <p className="akira lined-red text-[5em] text-center leading-[0.8]">
            ONLY
          </p>
        </div>
      </div>

      <Stage2 />
      <div className="w-screen h-screen bg-cement flex flex-center">
        <p className="akira text-9xl m-auto">HIT ME UP</p>
      </div>
    </ReactLenis>
  );
}

export default App;
