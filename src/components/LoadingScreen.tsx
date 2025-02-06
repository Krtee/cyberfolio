import { useLenis } from "lenis/react";
import { useEffect } from "react";
import ScrambleText from "./ScrambleText";

type Props = {
  loaded: boolean;
};

function LoadingScreen({ loaded }: Props) {
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
        {/* {<div className="w-[50vw] md:w-[20vw] h-[50px]">
          <div
            className={`h-full bg-black relative`}
            style={{
              width: `${(loadingBarWidth * loadingProgress) / 100}px`,
            }}
          >
            <p className="akira absolute bottom-[-20px] right-0">
              {loadingProgress}
            </p>
          </div>
        </div>} */}
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
