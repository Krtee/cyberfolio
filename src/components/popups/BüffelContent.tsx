const BüffelContent = () => {
  return (
    <div
      className=" overscroll-contain relative w-full bg-black"
      data-lenis-prevent
    >
      <p className="relative text-cement evangelion text-8xl md:text-[300px] text-center pt-40 md:pt-10 ">
        BÜFFEL & KOI
      </p>
      <div className="relative translate-y-[-4%] md:translate-y-[-15%] xl:translate-y-[-9%] mx-auto">
        <div className="relative w-3/4  max-w-[1100px] md:w-2/3 mx-auto">
          <video src="/videos/cutted.mp4" autoPlay loop muted />
        </div>
        <div className="relative w-full  h-fit flex flex-col md:flex-row md:px-40 gap-10 pt-10">
          <div className="flex-auto">
            <p className="relative text-cement evangelion text-5xl md:text-[100px] pl-20 md:leading-[90px] text-right align-middle">
              BÜFFEL & KOI
            </p>
            <div className=" w-full">
              <div className="max-w-[80vw] md:max-w-[30vw] ml-auto mr-0">
                <p className="relative akira text-cement  text-justify hyphens-auto break-normal text-wrap leading-[20px] ">
                  In this pro&shy;ject I created a Lan&shy;ding Page and a
                  simp&shy;le re&shy;ser&shy;vation Sys&shy;tem for a small
                  res&shy;tau&shy;rant in Stutt&shy;gart, Vai&shy;hingen.
                </p>
                <div className="akira text-black mt-10 md:mt-20 bg-cement akira-link">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.bueffelundkoi.de"
                  >
                    www . bueffelundkoi . de
                  </a>
                </div>

                <p className=" akira text-cement  text-2xl pb-10 md:pb-20 text-justify break-keep">
                  NEXTJS TYPESCRIPT GOOGLE CLOUD FIREBASE JAVA SPRINGBOOT DOCKER
                </p>
              </div>
            </div>

            <img
              src="/images/BkReservationSystem.png"
              alt="BÜFFEL & KOI reservation system admin dashboard"
              className="relative mx-auto w-[80%]  pl-10 md:w-full "
            />
          </div>
          <video
            className="flex-1 translate-y-[-50%] max-h-[80vh] ml-5 md:ml-0 md:translate-y-0 max-w-[30vw]"
            src="/videos/cuttedMobile.mp4"
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    </div>
  );
};

export default BüffelContent;
