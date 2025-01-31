import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import ScrambleText from "./ScrambleText";

const HitMeUpComponent = () => {
  const [showText, setShowText] = useState(false);
  const scrambleWrapperRef = useRef<HTMLDivElement>(null);

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
      <ScrambleText
        className="akira text-5xl md:text-9xl m-auto"
        text={showText ? "HIT ME UP" : ""}
        scrambleOptions={{ playOnMount: false, speed: 0.6 }}
      />
    </div>
  );
};

export default HitMeUpComponent;
