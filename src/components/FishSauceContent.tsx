const FishSauceContent = () => {
  return (
    <div
      className=" overscroll-contain relative w-full bg-black"
      data-lenis-prevent
    >
      <p className="relative text-cement evangelion text-7xl md:text-[250px] text-center pt-40 md:pt-10 ">
        THE FISH SAUCE
      </p>
      <div className=" relative translate-y-[-4%] md:translate-y-[-15%] mx-auto ">
        <div className="relative  w-2/3 mx-auto">
          <video
            src="/videos/banner_animation_desktop_cutted.mp4"
            autoPlay
            loop
            muted
          />
        </div>
        <div className="relative w-full  h-fit flex flex-col md:flex-row md:px-40 gap-10 pt-10">
          <div className="flex-auto">
            <p className="relative text-cement evangelion text-5xl md:text-[100px] pl-20 md:leading-[90px] text-right">
              THE FISH SAUCE
            </p>
            <div className=" w-full">
              <div className="max-w-[80vw] md:max-w-[30vw] ml-auto mr-0">
                <p className="relative akira text-cement  text-justify hyphens-auto break-normal text-wrap leading-[20px] ">
                  A simp&shy;le Lan&shy;ding page for a small
                  viet&shy;na&shy;mese res&shy;tau&shy;rant in Stutt&shy;gart.
                  (WIP)
                </p>
                <p className=" akira text-cement  text-2xl py-10 md:py-20 text-justify break-keep">
                  NEXTJS TYPESCRIPT
                </p>
              </div>
            </div>

            <video
              src="/videos/trimmedFish.mp4"
              autoPlay
              loop
              muted
              className="relative mx-auto w-[80%]  pl-10 md:w-full "
            />
          </div>
          <img
            className="flex-1 max-h-[80vh] max-w-[30vw] translate-y-[-50%] ml-5 md:ml-0 md:translate-y-0"
            src="/images/FishScreenshot.png"
            alt="Fish Sauce Mobile Screenshot"
          />
        </div>
      </div>
    </div>
  );
};

export default FishSauceContent;
