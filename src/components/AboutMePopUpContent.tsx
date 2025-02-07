import { useLenis } from "lenis/react";
import { useEffect } from "react";
import ArrowBack from "../assets/arrow_back.svg";
import ScrambleText from "./ScrambleText";
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AboutMePopUpContent = ({ isOpen, onClose }: Props) => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
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
    <div
      className=" relative w-screen h-fit  bg-red"
      data-lenis-prevent={isOpen}
    >
      <div
        className="absolute top-5 left-5 md:top-10 md:left-10 cursor-pointer "
        onClick={onClose}
      >
        {isOpen && <ArrowBack />}
      </div>
      <div className="akira-text-block inline-block text-2xl md:text-5xl text-black akira text-justify md:leading-[50px] flex flex-col gap-6 xl:px-40 pt-40  hyphens-auto break-normal text-wrap md:px-20 px-10">
        <ScrambleText
          text={
            isOpen
              ? "I studied com&shy;pu&shy;ter scien&shy;ce at the Uni&shy;ver&shy;si&shy;ty of App&shy;lied Scien&shy;ces in Stutt&shy;gart."
              : ""
          }
          scrambleOptions={scrambleOptions}
        />
        <ScrambleText
          text={
            isOpen
              ? "At Dev&shy;Duck I wor&shy;ked as a soft&shy;ware de&shy;ve&shy;loper for 2 years and have had the op&shy;por&shy;tu&shy;ni&shy;ty to work on a wide var&shy;ie&shy;ty of pro&shy;jects, from small to large-scale app&shy;li&shy;ca&shy;tions."
              : ""
          }
          scrambleOptions={scrambleOptions}
        />

        <ScrambleText
          text={
            isOpen
              ? "I am always loo&shy;king for new chal&shy;le&shy;nges and op&shy;por&shy;tu&shy;ni&shy;ties to learn some&shy;thing new."
              : ""
          }
          scrambleOptions={scrambleOptions}
        />
      </div>
      <div className=" xl:pl-40 w-full flex xl:flex-row flex-col px-10 md:px-20 pt-5 md:pt-20">
        <div className="h-fit">
          <div className="evangelion text-8xl text-black md:text-[210px] md:leading-[205px] md:pr-10">
            <ScrambleText text={isOpen ? "SKILLSET" : ""} />
          </div>
        </div>
        <div
          className="flex-1 grid grid-cols-1 grid-rows-10  akira
         text-2xl md:text-5xl text-cement w-fit pb-10 md:pb-40 
         ml-10 md:ml-0"
        >
          <ScrambleText text={isOpen ? "React" : ""} replayOnHover />
          <ScrambleText text={isOpen ? "Angular" : ""} replayOnHover />
          <ScrambleText text={isOpen ? "TypeScript" : ""} replayOnHover />
          <ScrambleText text={isOpen ? "NextJS" : ""} replayOnHover />
          <ScrambleText text={isOpen ? "SpringBoot" : ""} replayOnHover />
          <ScrambleText text={isOpen ? "Java" : ""} />
          <ScrambleText text={isOpen ? "Google Cloud" : ""} replayOnHover />
          <ScrambleText text={isOpen ? "Blender" : ""} replayOnHover />
          <ScrambleText text={isOpen ? "NodeJS" : ""} replayOnHover />
          <ScrambleText text={isOpen ? "Docker" : ""} replayOnHover />
        </div>
      </div>
    </div>
  );
};

export default AboutMePopUpContent;
