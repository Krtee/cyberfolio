import { Environment, Lightformer } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { CableTV } from "./CableTV";
import ScrambleText from "./ScrambleText";

const Stage1 = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const [pausePhysics, setPausePhysics] = useState<boolean>(true);

  useEffect(() => {
    timeRef.current = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    setTimeout(() => {
      setPausePhysics(false);
    }, 1000);
  }, []);

  return (
    <div className="relative mx-auto w-full h-screen bg-cement flex flex-col justify-between overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-20 ">
        <Canvas
          camera={{ position: [0, 0, 13], fov: 25 }}
          className="w-screen h-screen overscroll-contain overflow-hidden"
        >
          <Physics
            interpolate
            gravity={[0, -40, 0]}
            timeStep={1 / 60}
            paused={pausePhysics}
          >
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
        <div className=" flex overflow-hidden evangelion flex-col text-2xl pt-1 md:text-8xl md:pt-3 !leading-[0.73]">
          <ScrambleText text="SHOESIZE 42" />
          <ScrambleText text="170 CM" />
          <ScrambleText text="75 KG" />
        </div>
        <div className="akira  text-xs  md:text-2xl pt-1 !leading-[0.73]">
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
        <div className="flex flex-row gap-2 h-[50px] md:h-[140px] ">
          <div className="overflow-hidden max-h-full">
            <ScrambleText
              className="  akira uppercase text-[0.55em] leading-[1em]  md:text-xs text-clip  text-justify md:leading-[0.9] akira-text-block"
              scrambleOptions={{
                speed: 0.3,
                tick: 1,
                step: 200,
                scramble: 10,
              }}
            >
              {" Wel&shy;come to my port&shy;folio! I'm Minh, a pas&shy;sio&shy;nate and de&shy;dicated web de&shy;ve&shy;loper with a strong fo&shy;cus on crea&shy;ting in&shy;tui&shy;ti&shy;ve and dy&shy;na&shy;mic di&shy;gi&shy;tal ex&shy;pe&shy;rien&shy;ces. I spe&shy;cia&shy;lize in front-&shy;end de&shy;ve&shy;lop&shy;ment.".repeat(
                20
              )}
            </ScrambleText>
          </div>
          <p className=" desolation lined-black text-[5em] leading-[0.7em] md:text-[12em] md:leading-[0.8] text-center whitespace-nowrap">
            MINH VU NGUYEN
          </p>
        </div>
        {window.innerWidth > 768 ? (
          <ScrambleText
            className=" evangelion header__jobname--desktop"
            scrambleOptions={{ speed: 0.4, step: 10, scramble: 10 }}
          >
            FRONTEND DEVELOPER
          </ScrambleText>
        ) : (
          <>
            <ScrambleText
              className=" evangelion header__jobname__first--mobile"
              scrambleOptions={{ speed: 0.4, step: 10, scramble: 10 }}
            >
              FRONTEND
            </ScrambleText>
            <ScrambleText
              className=" evangelion header__jobname__second--mobile"
              scrambleOptions={{ speed: 0.4, step: 10, scramble: 10 }}
            >
              DEVELOPER
            </ScrambleText>
          </>
        )}
      </div>
      <div className="absolute top-[20%] left-[20%] xl:left-[40%] z-0">
        <p className="chicago-lined text-[20em] xl:text-[30em] tracking-[-0.2em] leading-[0.8] text-center pr-5 ">
          01
        </p>
        <p className="akira lined-red text-[3em]  xl:text-[5em] text-center leading-[0.8]">
          SOUND
        </p>
        <p className="akira lined-red text-[2em] xl:text-[5em] text-center leading-[0.8]">
          ONLY
        </p>
      </div>
    </div>
  );
};

export default Stage1;
