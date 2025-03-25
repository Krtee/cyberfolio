import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import ScrambleLink from "../components/ScrambleLink";
import { ScrambleTextRef } from "../components/ScrambleText";

const HitMeUpComponent = () => {
  const scrambleWrapperRef = useRef<HTMLDivElement>(null);
  const scramblerRef = useRef<ScrambleTextRef>(null);

  /**
   * Animate on scroll: restart scramble animation on enter viewport
   */
  useGSAP(() => {
    gsap.to(scrambleWrapperRef.current, {
      scrollTrigger: {
        trigger: scrambleWrapperRef.current,
        start: "top center",
        onEnter: () => scramblerRef.current?.replay(),
      },
    });
  });

  return (
    <div
      className="w-screen h-screen bg-cement flex flex-center relative"
      ref={scrambleWrapperRef}
    >
      <div className=" m-auto">
        <ScrambleLink
          ref={scramblerRef}
          text={"HIT ME UP"}
          className="akira text-5xl md:text-9xl"
          onClick={() => {
            window?.open("mailto:minh.vu.nguyenhotmail.de", "_blank")?.focus();
          }}
        />
      </div>

      <div className="ml-auto w-fit absolute bottom-1 left-1 ">
        <ScrambleLink
          text="github/krtee"
          className="akira text-xl"
          onClick={() => {
            window?.open("https://github.com/Krtee", "_blank")?.focus();
          }}
        />
        <ScrambleLink
          text="linkedin/minh-vu-nguyen"
          className="akira text-xl"
          onClick={() => {
            window
              ?.open("https://www.linkedin.com/in/minh-vu-nguyen/", "_blank")
              ?.focus();
          }}
        />
      </div>
    </div>
  );
};

export default HitMeUpComponent;
