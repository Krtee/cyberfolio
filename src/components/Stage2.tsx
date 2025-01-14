import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import DistortionShader from "./DistortionShader";

type Props = {};
gsap.registerPlugin(ScrollTrigger);

const Stage2 = (props: Props) => {
  const textRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const containerRef = useRef(null);
  let direction = -1;
  const projectsScrollOuterRef = useRef<HTMLDivElement>(null);
  const projectsScrollInnerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  useGSAP(
    () => {
      textRefs.forEach((textRef, i) => {
        gsap.to(textRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: 0.2,
            start: "20% bottom",
            end: "bottom top",
            onUpdate: (e) => (direction = e.direction * (i % 2 === 0 ? -1 : 1)),
          },
          x: `${direction < 0 ? "-40" : "-10"}%`,
        });
      });
    },
    { scope: textContainerRef }
  );

  useGSAP(
    () => {
      if (projectsScrollOuterRef.current && projectsScrollInnerRef.current) {
        gsap.to(projectsScrollInnerRef.current, {
          scrollTrigger: {
            trigger: projectsScrollOuterRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + projectsScrollOuterRef.current?.offsetWidth,
          },
          x: () =>
            -1 *
            (projectsScrollOuterRef.current!.scrollWidth - window.innerWidth),
        });
      }
    },
    { scope: projectsScrollOuterRef }
  );

  return (
    <div ref={containerRef}>
      <div className="pt-[20%] pb-[20%] px-[10%] max-w-fit">
        <p className="chicago-lined text-[30em] tracking-[-0.1em] leading-[0.8] text-center pr-5">
          02
        </p>
      </div>
      <div className="overflow-hidden" ref={textContainerRef}>
        {textRefs.map((ref, i) => (
          <div
            className={`display flex evangelion-lined w-max ${
              i % 2 === 0 ? "translate-x-[10%]" : "translate-x-[-60%]"
            }`}
            ref={ref}
            key={i}
          >
            <p>FRONTEND</p>
            <p>BACKEND</p>
            <p>CLOUD</p>
            <p>FRONTEND</p>
            <p>BACKEND</p>
            <p>CLOUD</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <p className="akira text-cement text-[70px] pt-96 pb-96 leading-[0.9] text-balance">
          Hi ! My name is Minh Vu. I'm a full stack developer based in
          Stuttgart, Germany. Feel free to contact me !
        </p>
      </div>
      <div className="w-full overflow-hidden" ref={projectsScrollOuterRef}>
        <div
          className="flex flex-row  w-max h-screen relative"
          ref={projectsScrollInnerRef}
        >
          <div className="h-full relative w-[800px]">
            <img
              src={"/cables.jpg"}
              className=" w-full h-full -z-10"
              ref={imageRef}
              onMouseOver={() => setIsHovered(true)}
              onMouseOut={() => setIsHovered(false)}
            ></img>
            <Canvas
              camera={{
                fov: 80,
                aspect:
                  imageRef.current?.width ||
                  1 / (imageRef.current?.height || 1),
                near: 0.1,
                far: 10,
                type: "perspective",
                position: [0, 0, 1],
              }}
              className="w-full h-full "
            >
              <DistortionShader
                image={imageRef.current}
                isHovered={isHovered}
              />
            </Canvas>
            <p className="panel evangelion text-cement text-[150px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none	">
              Project
            </p>
          </div>
          <div className="h-full relative w-[800px]">
            <p className="panel evangelion text-cement text-[150px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
              Project
            </p>
          </div>
          <div className="h-full relative w-[800px]">
            <p className="panel evangelion text-cement text-[150px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
              Project
            </p>
          </div>
          <div className="h-full relative w-[800px]">
            <p className="panel evangelion text-cement text-[150px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
              Project
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage2;
