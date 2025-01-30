type Props = {};

const CLIContent = (props: Props) => {
  return (
    <div
      className=" overscroll-contain relative w-full bg-black"
      data-lenis-prevent
    >
      <p className="relative text-cement evangelion text-[250px] text-center pt-10 ">
        DEVDUCK CLI
      </p>
      <div className=" relative translate-y-[-15%] mx-auto ">
        <div className="relative  w-2/3 mx-auto flex flex-row gap-10">
          <img
            className="flex-auto"
            src="/images/DevDuckCLIThumbnail.png"
            alt="DevDuck CLI Thumbnail"
          />
        </div>
        <div className="relative w-full  h-fit flex flex-row px-40 gap-10 pt-10">
          <div className="flex-auto">
            <div className=" w-full flex flex-row gap-10">
              <div className="flex-auto">
                <img
                  src="/images/DevDuckConfirmInput.png"
                  alt="DevDuck CLI confirm Input Screen"
                />
              </div>

              <div className="max-w-[30vw] ml-auto mr-0">
                <p className="relative text-cement evangelion text-[100px] eading-[90px] text-right">
                  DEVDUCK CLI
                </p>
                <p className="relative akira text-cement  text-justify hyphens-auto break-normal text-wrap leading-[20px] ">
                  For my bachelor thesis I created a command line tool that can
                  automatically set up all the necessary services for a
                  progressive web app.
                </p>
                <p className=" akira text-cement  text-2xl py-20 text-justify break-keep">
                  INK TYPESCRIPT REACT GITLAB FIREBASE GOOGLE CLOUD
                </p>
              </div>
            </div>

            <img
              src="/images/DevDuckGenerateProject.png"
              alt="DevDuck CLI generating project"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CLIContent;
