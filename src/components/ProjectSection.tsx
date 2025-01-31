import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import DistortionShader from "./DistortionShader";

type Props = {
  imagePath: string;
  title: string;
  onClick?: () => void;
};

const ProjectSection = ({ title, imagePath, onClick }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className=" relative w-[150vw] md:w-[75vw] overflow-hidden "
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 m-10 overflow-hidden">
        <Canvas
          camera={{
            fov: 80,
            near: 0.1,
            far: 10,
            type: "perspective",
            position: [0, 0, 1],
          }}
          className=" relative w-full h-full hover:cursor-pointer transition-all duration-[0.2s] ease-linear hover:scale-110 hover:transition-all hover:duration-[5s] "
        >
          <DistortionShader imagePath={imagePath} isHovered={isHovered} />
        </Canvas>
        <p className="panel evangelion text-cement text-[100px] md:text-[150px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none	">
          {title}
        </p>
      </div>
    </div>
  );
};

export default ProjectSection;
