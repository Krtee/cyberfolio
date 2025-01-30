import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { useGlitch } from "react-powerglitch";
import ArrowBack from "../assets/arrow_back.svg";
import ScrambleText from "./ScrambleText";
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AboutMePopUpContent = ({ isOpen, onClose }: Props) => {
  const lenis = useLenis();
  const glitch = useGlitch({
    playMode: "always",
    timing: { duration: 2000, iterations: 1 },
    glitchTimeSpan: { start: 0, end: 0.4 },
    slice: {
      hueRotate: true,
    },
  });
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!lenis) return;
    if (isOpen) {
      lenis.stop();

      const body = document.querySelector("body");
    } else {
      lenis.start();
      const body = document.querySelector("body");
    }

    return () => {
      if (lenis) {
        lenis.start();
      }
    };
  }, [isOpen, lenis]);

  const scrambleOptions = {
    speed: 0.6,
    tick: 1,
    step: 10,
    scramble: 4,
    seed: 0,
    overdrive: 60,
    playOnMount: true,
  };

  return (
    <div className=" relative w-screen h-fit  bg-red" data-lenis-prevent>
      <div
        className="absolute top-10 left-10 cursor-pointer "
        onClick={onClose}
      >
        {isOpen && <ArrowBack />}
      </div>
      <div className="akira-text-block inline-block text-5xl text-black akira text-justify leading-[50px] flex flex-col gap-6 xl:px-40 pt-40  hyphens-auto break-normal text-wrap px-20">
        <ScrambleText
          text={
            isOpen
              ? "I studied comp&shy;uter scien&shy;ce at the Uni&shy;ver&shy;sity of App&shy;lied Scien&shy;ces in Stutt&shy;gart."
              : ""
          }
          scrambleOptions={scrambleOptions}
        />
        <ScrambleText
          text={
            isOpen
              ? "At DevDuck I work&shy;ed as a soft&shy;ware deve&shy;loper for 2 years and have had the oppor&shy;tunity to work on a wide var&shy;iety of pro&shy;jects, from small to large-scale appli&shy;cations."
              : ""
          }
          scrambleOptions={scrambleOptions}
        />

        <ScrambleText
          text={
            isOpen
              ? "I am always look&shy;ing for new chal&shy;lenges and oppor&shy;tu&shy;nities to learn some&shy;thing new."
              : ""
          }
          scrambleOptions={scrambleOptions}
        />
      </div>
      <div className=" xl:pl-40 w-full flex xl:flex-row flex-col px-20 pt-20">
        <div className="h-fit">
          <div className="evangelion text-[210px] text-black leading-[205px] pr-10">
            <ScrambleText text={isOpen ? "SKILLSET" : ""} />
          </div>
        </div>
        <div
          className="flex-1 grid grid-cols-1 grid-rows-10  akira
         text-5xl text-cement w-fit pb-40 
        m-auto"
        >
          <div
            ref={textRef}
            onMouseEnter={() => {
              if (!textRef.current) return;
              textRef.current!.classList.add("text-cement");
              textRef.current!.classList.add("block-shadow");
            }}
            onMouseLeave={() => {
              if (!textRef.current) return;
              textRef.current!.classList.remove("text-cement");
              textRef.current!.classList.remove("block-shadow");
            }}
          >
            <ScrambleText text={isOpen ? "React" : ""} />
          </div>
          <ScrambleText text={isOpen ? "Angular" : ""} />
          <ScrambleText text={isOpen ? "TypeScript" : ""} />
          <ScrambleText text={isOpen ? "NextJS" : ""} />
          <ScrambleText text={isOpen ? "SpringBoot" : ""} />
          <ScrambleText text={isOpen ? "Java" : ""} />
          <ScrambleText text={isOpen ? "Google Cloud" : ""} />
          <ScrambleText text={isOpen ? "Blender" : ""} />
          <ScrambleText text={isOpen ? "NodeJS" : ""} />
          <ScrambleText text={isOpen ? "Docker" : ""} />
        </div>
      </div>
    </div>
  );
};

export default AboutMePopUpContent;
