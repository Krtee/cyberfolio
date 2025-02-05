import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import ScrambleText from "./ScrambleText";

const HitMeUpComponent = () => {
  const [showText, setShowText] = useState(false);
  const scrambleWrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setisHovered] = useState(false);
  useGSAP(() => {
    gsap.to(scrambleWrapperRef.current, {
      scrollTrigger: {
        trigger: scrambleWrapperRef.current,
        start: "top center",
        onEnter: () => setShowText(true),
        onLeaveBack: () => setShowText(false),
      },
    });
  });

  return (
    <div
      className="w-screen h-screen bg-cement flex flex-center"
      ref={scrambleWrapperRef}
    >
      <div
        className={` m-auto w-fit h-fit cursor-pointer px-4  ${
          isHovered ? "bg-black text-cement" : "bg-cement text-black"
        }`}
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
      >
        <ScrambleText
          className="akira text-5xl md:text-9xl "
          text={showText ? "HIT ME UP" : ""}
          scrambleOptions={{
            playOnMount: false,
            speed: 0.6,
            ...(isHovered
              ? {
                  speed: 0.1,
                  tick: 1,
                  step: 1,
                  scramble: 4,
                  seed: 5,
                  ignore: ["H", "I", "T", "M", "E", " ", "U"],
                }
              : {}),
          }}
          onClick={() => {
            window?.open("mailto:minh.vu.nguyenhotmail.de", "_blank")?.focus();
          }}
          replayOnHover
        />
      </div>
    </div>
  );
};

export default HitMeUpComponent;
