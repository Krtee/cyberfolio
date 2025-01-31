import ReactPlayer from "react-player";

const BabyContent = () => {
  return (
    <div
      className=" overscroll-contain h-screen relative w-screen bg-black overflow-hidden py-36 md:py-20 md:px-40 flex flex-col"
      data-lenis-prevent
    >
      <p className="relative text-cement akira text-5xl ">
        3D Animation Project made in Blender
      </p>
      <div className="relative w-full flex-1 ">
        <ReactPlayer
          url="https://youtu.be/MBbDxQz5N9E"
          controls
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
  );
};

export default BabyContent;
