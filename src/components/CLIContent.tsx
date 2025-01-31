const CLIContent = () => {
  return (
    <div
      className=" overscroll-contain relative w-full bg-black"
      data-lenis-prevent
    >
      <p className="relative text-cement evangelion text-7xl md:text-[250px] text-center pt-40 md:pt-10 ">
        DEVDUCK CLI
      </p>
      <div className=" relative translate-y-[-3%] md:translate-y-[-10%] mx-auto ">
        <div className="relative  w-2/3 mx-auto flex flex-row gap-10">
          <img
            className="flex-auto"
            src="/images/DevDuckCLIThumbnail.png"
            alt="DevDuck CLI Thumbnail"
          />
        </div>
        <div className="relative w-full  h-fit flex flex-col md:flex-row md:px-40 gap-10 pt-10">
          <div className="flex-auto">
            <div className="  flex flex-col md:flex-row gap-10 w-full">
              <div className="flex-auto w-2/3  md:w-full">
                <img
                  src="/images/DevDuckConfirmInput.png"
                  alt="DevDuck CLI confirm Input Screen"
                />
              </div>

              <div className="max-w-[80vw] md:max-w-[30vw] ml-auto mr-0">
                <p className="relative text-cement evangelion text-5xl md:text-[100px] pl-20 md:leading-[90px] text-right">
                  DEVDUCK CLI
                </p>
                <p className="relative akira text-cement  text-justify hyphens-auto break-normal text-wrap leading-[20px] ">
                  For my bachelor thesis I created a command line tool that can
                  automatically set up all the necessary services for a
                  progressive web app.
                </p>
                <p className=" akira text-cement  text-2xl py-10 md:py-20 text-justify break-keep">
                  INK TYPESCRIPT REACT GITLAB FIREBASE GOOGLE CLOUD
                </p>
              </div>
            </div>

            <img
              src="/images/DevDuckGenerateProject.png"
              alt="DevDuck CLI generating project"
              className="w-2/3 md:w-full ml-auto md:ml-0 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CLIContent;
