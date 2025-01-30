type Props = {};

const FishSauceContent = (props: Props) => {
  return (
    <div
      className=" overscroll-contain relative w-full bg-black"
      data-lenis-prevent
    >
      <p className="relative text-cement evangelion text-[250px] text-center pt-10 ">
        THE FISH SAUCE
      </p>
      <div className=" relative translate-y-[-15%] mx-auto ">
        <div className="relative  w-2/3 mx-auto">
          <video
            src="/videos/banner_animation_desktop_cutted.mp4"
            autoPlay
            loop
            muted
          />
        </div>
        <div className="relative w-full  h-fit flex flex-row px-40 gap-10 pt-10">
          <div className="flex-auto">
            <p className="relative text-cement evangelion text-[100px] pl-20 leading-[90px] text-right">
              THE FISH SAUCE
            </p>
            <div className=" w-full">
              <div className="max-w-[30vw] ml-auto mr-0">
                <p className="relative akira text-cement  text-justify hyphens-auto break-normal text-wrap leading-[20px] ">
                  A simple Landing page for a small vietnamese restaurant in
                  Stuttgart. (WIP)
                </p>
                <p className=" akira text-cement  text-2xl py-20 text-justify break-keep">
                  NEXTJS TYPESCRIPT
                </p>
              </div>
            </div>

            <video
              src="/videos/trimmedFish.mp4"
              autoPlay
              loop
              muted
              className="relative mx-auto pb-20"
            />
          </div>
          <img
            className="flex-1 max-h-[80vh] max-w-[30vw]"
            src="/images/FishScreenshot.png"
            alt="Fish Sauce Mobile Screenshot"
          />
        </div>
      </div>
    </div>
  );
};

export default FishSauceContent;
