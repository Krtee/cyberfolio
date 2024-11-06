import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lenis from "lenis";
import "./App.scss";
import NavButtonCenterFrame from "./assets/NavButtonCenter.svg";
import NavButtonLeftFrame from "./assets/NavButtonLeft.svg";
import NavButtonRightFrame from "./assets/NavButtonRight.svg";
import Polygons from "./assets/polygons.svg";
function App() {
  const lenis = new Lenis();

  // Listen for the scroll event and log the event data
  lenis.on("scroll", (e) => {
    console.log(e);
  });

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return (
    <>
      <div className="nav-wrapper">
        <button className="w-[40%]">
          <NavButtonLeftFrame />
        </button>
        <button className="translate-y-6 w-[35%]	">
          <NavButtonCenterFrame />
        </button>
        <button className="w-[40%]">
          <NavButtonRightFrame />
        </button>
      </div>
      <div className=" mx-auto w-full px-16 relative">
        <div className="text-8xl kelvinized absolute left-[10%] top-[20%] text-shadow leading-extra-tight	">
          <p>FRONTEND</p>
          <p className="translate-x-5">DEVELOPER</p>
        </div>

        <Polygons />
      </div>
      <div className={"h-5/6 p-0 "}>
        <Canvas
          camera={{
            position: [0, 0, 7],
            fov: 30,
          }}
        >
          <color attach="background" args={["#ececec"]} />
          // three-drei usage
          <OrbitControls />
          <mesh rotation={[Math.PI / 10, 10, 10]}>
            // three-fiber usage
            <torusGeometry />
            <meshNormalMaterial />
          </mesh>
        </Canvas>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
