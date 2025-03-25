import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { UseScrambleProps } from "use-scramble";
import ScrambleText, { ScrambleTextRef } from "./ScrambleText";

type Props = {
  text?: string;
  className?: string;
  scrambleOptions?: UseScrambleProps;
  onClick?: () => void;
};

const ScrambleLink = forwardRef(
  (
    { text, className, scrambleOptions, onClick }: Props,
    ref: React.Ref<ScrambleTextRef>
  ) => {
    const [isHovered, setisHovered] = useState(false);
    const scramblerRef = useRef<ScrambleTextRef>(null);

    /**
     * Expose replay function
     */
    useImperativeHandle(ref, () => ({
      replay: () => scramblerRef.current?.replay(),
    }));

    return (
      <div
        className={` w-fit h-fit cursor-pointer px-4  ${
          isHovered ? "bg-black text-cement" : "bg-cement text-black"
        }`}
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
      >
        <ScrambleText
          ref={scramblerRef}
          className={className}
          scrambleOptions={{
            speed: 0.6,
            ...(isHovered
              ? {
                  speed: 0.2,
                  tick: 1,
                  step: 1,
                  scramble: 2,
                  seed: 5,
                  ignore: text?.split("").slice(0, -1),
                }
              : {}),
            ...scrambleOptions,
          }}
          onClick={onClick}
          replayOnHover
          text={text}
        ></ScrambleText>
      </div>
    );
  }
);

export default ScrambleLink;
