import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { useGlitch } from "react-powerglitch";
import ArrowBack from "../assets/arrow_back.svg";

type Props = {
  onClick?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
};

const GlitchPopUp = ({ onClick, onClose, children }: Props) => {
  const glitch = useGlitch({
    playMode: "always",
    timing: { duration: 2000, iterations: 1 },
    glitchTimeSpan: { start: 0, end: 0.4 },
    slice: {
      hueRotate: true,
    },
  });
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.stop();
    }
    return () => {
      if (lenis) {
        lenis.start();
      }
    };
  }, [lenis]);

  return (
    <div>
      <div
        ref={glitch.ref}
        className="w-screen h-screen fixed top-0 left-0 z-50 overflow-auto"
        onClick={onClick}
        data-lenis-prevent
      >
        <div
          className="absolute top-10 left-10 cursor-pointer text-cement z-10"
          onClick={onClose}
        >
          <ArrowBack />
        </div>
        {children}
      </div>
    </div>
  );
};

export default GlitchPopUp;
