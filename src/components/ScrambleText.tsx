import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useScramble, UseScrambleProps } from "use-scramble";
import { useLoadedState } from "../utils/state/LoadedState";

type Props = {
  className?: string;
  text?: string;
  scrambleOptions?: UseScrambleProps;
  children?: React.ReactNode;
  replayOnHover?: boolean;
  onClick?: () => void;
  onReplay?: () => void;
};

export type ScrambleTextRef = {
  replay: () => void;
};

const ScrambleText = forwardRef(
  (
    {
      text,
      className,
      scrambleOptions,
      children,
      replayOnHover,
      onClick,
    }: Props,
    ref: React.Ref<ScrambleTextRef>
  ) => {
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
    const { GLTFloaded } = useLoadedState();

    const { ref: textRef, replay: textReplay } = useScramble({
      text: text || (children as string),
      ...defaultScrambleOptions,
    });

    /**
     * Expose replay function
     */
    useImperativeHandle(ref, () => ({
      replay: textReplay,
    }));

    /**
     * Replay text when GLTF is loaded
     */
    useEffect(() => {
      if (GLTFloaded) textReplay();
    }, [GLTFloaded]);

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
  }
);

export default ScrambleText;
