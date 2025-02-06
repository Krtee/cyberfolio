import { useGLTF } from "@react-three/drei";
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
import { useLoadedState } from "./utils/state/LoadedState";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

function App() {
  const { GLTFloaded, setGLTFLoaded } = useLoadedState();
  const [showLoading, setShowLoading] = useState(true);
  const lenisRef = useRef<LenisRef>(null);

  useGLTF.preload("/tv10-transformed.glb", true, true, (loader) => {
    loader.manager.onLoad = () => setGLTFLoaded(true);
  });

  useEffect(() => {
    if (GLTFloaded) {
      setShowLoading(false);
    }
  }, [GLTFloaded]);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

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
        <LoadingScreen />
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
        <Stage1 />
        <Stage2 />
        <HitMeUpComponent />
      </ReactLenis>
    </>
  );
}

export default App;
