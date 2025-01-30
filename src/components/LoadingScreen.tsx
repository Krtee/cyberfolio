import { useLenis } from "lenis/react";
import { useEffect } from "react";

type Props = {
  loadingStatus: number;
};

function LoadingScreen({ loadingStatus }: Props) {
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
      className="fixed w-screen h-screen bg-cement flex flex-center z-50 p-10 overflow-hidden overscroll-contain"
      data-scroll-ignore
    >
      <div className="corner-box w-full h-full  flex justify-center items-center ">
        <div className="w-1/5 h-[50px]">
          <div
            className={`h-full bg-black`}
            style={{ width: `${(50 * window.innerWidth) / 100 / 5}px` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
