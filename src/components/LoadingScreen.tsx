import { useLenis } from "lenis/react";
import { useEffect } from "react";

type Props = {
  loadingStatus: number;
  loaded: boolean;
};

function LoadingScreen({ loadingStatus, loaded }: Props) {
  const lenis = useLenis();
  const loadingBarWidth =
    window.innerWidth <= 768 ? window.innerWidth / 2 : window.innerWidth / 5;
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
        <div className="w-[50vw] md:w-[20vw] h-[50px]">
          <div
            className={`h-full bg-black relative`}
            style={{
              width: `${
                (loadingBarWidth * (loaded ? 100 : loadingStatus)) / 100
              }px`,
            }}
          >
            <p className="akira absolute bottom-[-20px] right-0">
              {loadingStatus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
