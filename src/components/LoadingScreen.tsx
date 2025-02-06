import { useLenis } from "lenis/react";
import { useEffect } from "react";
import ScrambleText from "./ScrambleText";

function LoadingScreen() {
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
    <div
      className="fixed w-screen h-screen bg-cement flex flex-center z-50 p-10 overflow-hidden overscroll-contain top-0 left-0"
      data-scroll-ignore
    >
      <div className="corner-box w-full h-full  flex justify-center items-center ">
        <div className="akira text-5xl md:text-7xl">
          <ScrambleText
            scrambleOptions={{
              playOnMount: false,
            }}
          >
            LOADING
          </ScrambleText>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
