import { useState } from "react";
import { UseScrambleProps } from "use-scramble";
import ScrambleText from "./ScrambleText";

type Props = {
  text?: string;
  className?: string;
  scrambleOptions?: UseScrambleProps;
  href?: string;
};

const ScrambleLink = ({ text, className, scrambleOptions, href }: Props) => {
  const [isHovered, setisHovered] = useState(false);
  return (
    <div
      className={` w-fit h-fit cursor-pointer px-4  ${
        isHovered ? "bg-black text-cement" : "bg-cement text-black"
      }`}
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
      <ScrambleText
        className={className}
        scrambleOptions={{
          speed: 0.6,
          ...(isHovered
            ? {
                speed: 0.1,
                tick: 1,
                step: 1,
                scramble: 4,
                seed: 5,
                ignore: text?.split("").slice(0, -1),
              }
            : {}),
          ...scrambleOptions,
        }}
        onClick={() => {
          window?.open(href, "_blank")?.focus();
        }}
        replayOnHover
        text={text}
      ></ScrambleText>
    </div>
  );
};

export default ScrambleLink;
