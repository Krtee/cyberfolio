import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisRef, ReactLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";
import "./App.scss";
import HitMeUpComponent from "./components/HitMeUpComponent";
import LoadingScreen from "./components/LoadingScreen";
import Stage1 from "./components/Stage1";
import Stage2 from "./components/Stage2";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const lenisRef = useRef<LenisRef>(null);
  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useEffect(() => {
    if (loadingProgress < 100) {
      setTimeout(() => {
        let toAdd = Math.ceil(Math.random() * 20);
        if (loadingProgress + toAdd > 100) {
          setLoadingProgress(100);
        } else {
          setLoadingProgress(loadingProgress + toAdd);
        }
      }, 100);
    } else {
      setShowLoading(false);
    }
  }, [loadingProgress]);

  return (
    <>
      <Transition
        timeout={1000}
        mountOnEnter
        unmountOnExit
        in={showLoading}
        addEndListener={(node, done) => {
          gsap.to(node, {
            y: showLoading ? 0 : "-100vh",
            onComplete: done,
          });
        }}
      >
        <LoadingScreen loadingStatus={loadingProgress} />
      </Transition>
      <ReactLenis
        root
        ref={lenisRef}
        options={{
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          syncTouch: false,
          prevent: (node) => {
            return node.getAttribute("data-scroll-ignore") === "true";
          },
          overscroll: false,
        }}
        className="relative"
      >
        {!showLoading && (
          <>
            <Stage1 />
            <Stage2 />
            <HitMeUpComponent />
          </>
        )}
      </ReactLenis>
    </>
  );
}

export default App;
