import { Environment, Lightformer } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { CableTV } from "./CableTV";
import ScrambleText from "./ScrambleText";

type Props = {};

const Stage1 = (props: Props) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeRef.current = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  }, []);

  return (
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
          <ScrambleText text="SHOESIZE 42" />
          <ScrambleText text="170 CM" />
          <ScrambleText text="75 KG" />
        </div>
        <div className="akira text-2xl leading-[0.73] pt-1">
          <ScrambleText text="STUTTGART, GERMANY" />
          <ScrambleText
            className="uppercase text-right w-full"
            text={new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
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
            <ScrambleText
              className="  akira uppercase text-xs text-clip  text-justify leading-[0.9] "
              scrambleOptions={{
                speed: 0.3,
                tick: 1,
                step: 200,
                scramble: 10,
              }}
            >
              Welcome to my portfolio! I'm [Your Name], a passionate and
              dedicated web developer with a strong focus on creating intuitive
              and dynamic digital experiences. I specialize in front-end
              development. Welcome to my portfolio! I'm [Your Name], a
              passionate and dedicated web developer with a strong focus on
              creating intuitive and dynamic digital experiences. I specialize
              in front-end development. Welcome to my portfolio! I'm [Your
              Name], a passionate and dedicated web developer with a strong
              focus on creating intuitive and dynamic digital experiences. I
              specialize in front-end development. Welcome to my portfolio! I'm
              [Your Name], a passionate and dedicated web developer with a
              strong focus on creating intuitive and dynamic digital
              experiences. I specialize in front-end development. Welcome to my
              portfolio! I'm [Your Name], a passionate and dedicated web
              developer with a strong focus on creating intuitive and dynamic
              digital experiences. I specialize in front-end development.
              Welcome to my portfolio! I'm [Your Name], a passionate and
              dedicated web developer with a strong focus on creating intuitive
              and dynamic digital experiences. I specialize in front-end
              development.
            </ScrambleText>
          </div>
          <p className=" desolation lined-black text-[12em] leading-[0.8] text-center whitespace-nowrap	">
            MINH VU NGUYEN
          </p>
        </div>
        <ScrambleText
          className=" evangelion header__jobname"
          scrambleOptions={{ speed: 0.4, step: 10, scramble: 10 }}
        >
          FRONTEND DEVELOPER
        </ScrambleText>
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
  );
};

export default Stage1;
