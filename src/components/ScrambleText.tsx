import { useEffect } from "react";
import { useScramble, UseScrambleProps } from "use-scramble";

type Props = {
  className?: string;
  shouldReplay?: boolean;
  text?: string;
  scrambleOptions?: UseScrambleProps;
  children?: React.ReactNode;
  replayOnHover?: boolean;
  onClick?: () => void;
};

const ScrambleText = ({
  text,
  className,
  shouldReplay,
  scrambleOptions,
  children,
  replayOnHover,
  onClick,
}: Props) => {
  const defaultScrambleOptions: UseScrambleProps = {
    speed: 0.3,
    tick: 1,
    step: 1,
    scramble: 10,
    seed: 100,
    overdrive: 60,
    playOnMount: true,
    ...scrambleOptions,
  };
  const { ref: textRef, replay: textReplay } = useScramble({
    text: text || (children as string),
    ...defaultScrambleOptions,
  });

  useEffect(() => {
    if (shouldReplay) textReplay();
  }, [shouldReplay]);

  return (
    <p
      className={className}
      ref={textRef}
      onMouseEnter={() => replayOnHover && textReplay()}
      onClick={onClick}
    >
      {text || children}
    </p>
  );
};

export default ScrambleText;
