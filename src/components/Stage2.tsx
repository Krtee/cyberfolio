import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { useRef, useState } from "react";
import { useGlitch } from "react-powerglitch";
import { useScramble } from "use-scramble";
import { createClipPathRectangle, createClipPathSquare } from "../utils/helper";
import AboutMePopUpContent from "./AboutMePopUpContent";
import BabyContent from "./BabyContent";
import BüffelContent from "./BüffelContent";
import CLIContent from "./CLIContent";
import FishSauceContent from "./FishSauceContent";
import GlitchPopUp from "./GlitchPopUp";
import ProjectSection from "./ProjectSection";

type Props = {};

enum Project {
  BÜFFEL = "BÜFFEL",
  MONSTER_BABY = "MONSTER BABY",
  THE_FISH_SAUCE = "THE FISH SAUCE",
  DEVDUCK_CLI = "DEVDUCK CLI",
}

const Stage2 = (props: Props) => {
  const textRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const containerRef = useRef(null);
  let direction = -1;
  const projectsScrollOuterRef = useRef<HTMLDivElement>(null);
  const projectsScrollInnerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const aboutMePopUpOuterRef = useRef<HTMLDivElement>(null);
  const [aboutMePopUpIsOpen, setAboutMePopUpIsOpen] = useState<boolean>(false);
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const aboutMeMaskRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const [projectPopUpOpen, setProjectPopUpOpen] = useState<Project | false>(
    false
  );
  const glitch = useGlitch({
    playMode: "always",
    timing: { duration: 250, iterations: Infinity },
    glitchTimeSpan: { start: 0, end: 0.4 },
    slice: {
      hueRotate: true,
      count: 10,
      velocity: 0.5,
      maxHeight: 0.01,
      minHeight: 0.01,
    },
    shake: {
      velocity: 5,
      amplitudeX: 0.02,
      amplitudeY: 0.02,
    },
  });

  const { ref: centerTextRef, replay: centerTextReplay } = useScramble({
    text: aboutMePopUpIsOpen ? "" : "Click here to find out more about me",
    speed: 0.6,
    tick: 1,
    step: 10,
    scramble: 4,
    seed: 0,
    overdrive: 60,
    playOnMount: false,
  });

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

  const onOpenAboutMePopUp = () => {
    if (!aboutMeMaskRef.current || !aboutMeRef.current) return;
    if (!lenis) return;
    lenis.scrollTo(aboutMeRef.current.offsetTop + window.innerHeight, {
      force: true,
      lock: true,
    });

    gsap
      .timeline()
      .to(aboutMeMaskRef.current, {
        clipPath: createClipPathRectangle(25),
        duration: 0.5,
        ease: "power2.out",
      })
      .to(aboutMeMaskRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.5,
        ease: "power2.out",
      })
      .then(() => {
        // centerTextReplay();
        setAboutMePopUpIsOpen(true);
      });
  };

  const onCloseAboutMePopUp = () => {
    if (!aboutMeMaskRef.current) return;
    if (!lenis) return;
    gsap
      .timeline()
      .to(aboutMeMaskRef.current, {
        clipPath: createClipPathSquare(25),
        duration: 0.5,
        ease: "power2.out",
      })
      .then(() => {
        setAboutMePopUpIsOpen(false);
        lenis.start();
      });
  };

  useGSAP(
    () => {
      if (aboutMePopUpOuterRef.current && aboutMeMaskRef.current) {
        gsap.to(aboutMePopUpOuterRef.current, {
          scrollTrigger: {
            trigger: aboutMeMaskRef.current,
            start: `center +${window.innerHeight / 2} center `,
            end: "center -500  top ",
            pin: true,
            pinType: "fixed",
            pinSpacing: false,
          },
        });
      }
    },
    { scope: aboutMePopUpOuterRef }
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
    <div ref={containerRef} className="relative">
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

      <div className="flex justify-center relative h-screen" ref={aboutMeRef}>
        <p
          className={` akira text-cement text-[70px] pt-96 pb-96 leading-[0.9] text-balance h-fit`}
        >
          Hi ! My name is Minh Vu. I'm a full stack developer based in
          Stuttgart, Germany. Feel free to contact me !
        </p>

        <div
          className="absolute top-[-50%] left-0 right-0 bottom-0"
          ref={aboutMePopUpOuterRef}
        >
          <div
            ref={aboutMeMaskRef}
            className={`relative top-0 left-0 bg-red w-screen h-screen overflow-auto  overscroll-contain }`}
            style={{
              clipPath: createClipPathSquare(25),
            }}
            onClick={() => {
              !aboutMePopUpIsOpen && onOpenAboutMePopUp();
            }}
            data-lenis-prevent
          >
            <AboutMePopUpContent
              isOpen={aboutMePopUpIsOpen}
              onClose={onCloseAboutMePopUp}
            />
            <div
              className={` absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-10 w-[25vw] flex justify-center items-center  `}
            >
              <p className="akira text-3xl text-center" ref={centerTextRef}>
                Click here to find out more about me
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full overflow-hidden relative mt-20"
        ref={projectsScrollOuterRef}
      >
        <div
          className="flex flex-row h-screen w-max relative"
          ref={projectsScrollInnerRef}
        >
          <ProjectSection
            imagePath={"/images/BKScreenshot.jpg"}
            title={"Project"}
            onClick={() => setProjectPopUpOpen(Project.BÜFFEL)}
          />

          <ProjectSection
            imagePath={"/images/FishThumbnail.png"}
            title={"Project"}
            onClick={() => setProjectPopUpOpen(Project.THE_FISH_SAUCE)}
          />
          <ProjectSection
            imagePath={"/images/baby.jpg"}
            title={"Project"}
            onClick={() => setProjectPopUpOpen(Project.MONSTER_BABY)}
          />
          <ProjectSection
            imagePath={"/images/DevDuckCLIThumbnail.png"}
            title={"Project"}
            onClick={() => setProjectPopUpOpen(Project.DEVDUCK_CLI)}
          />
        </div>
      </div>
      {projectPopUpOpen && (
        <GlitchPopUp
          onClose={() => {
            setProjectPopUpOpen(false);
          }}
        >
          {projectPopUpOpen === Project.BÜFFEL && <BüffelContent />}
          {projectPopUpOpen === Project.MONSTER_BABY && <BabyContent />}
          {projectPopUpOpen === Project.THE_FISH_SAUCE && <FishSauceContent />}
          {projectPopUpOpen === Project.DEVDUCK_CLI && <CLIContent />}
        </GlitchPopUp>
      )}
    </div>
  );
};

export default Stage2;
