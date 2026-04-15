import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";

type TitleContentAnimationOptions = {
  root: HTMLElement | null;
  aboutStage: HTMLElement | null;
  aboutPanel: HTMLDivElement | null;
  isIntroComplete: boolean;
  isMobileLayout?: boolean;
};

type FlipbookSequence = {
  frames: HTMLElement[];
  startAt: number;
  staggerDelay: number;
};

type AboutFrameGroups = {
  img1: HTMLElement[];
  img2: HTMLElement[];
  img3: HTMLElement[];
  img4: HTMLElement[];
  img5: HTMLElement[];
  sinzin: HTMLElement[];
  fune: HTMLElement[];
  pichi: HTMLElement[];
};

type AboutRowPlayer = (() => void) | null;
type SnsBlockElements = {
  section: HTMLElement;
  frames: HTMLElement[];
  title: HTMLElement | null;
  icons: HTMLElement[];
};

const aboutFrameSelectors = {
  img1: ".js-about-img1-frame",
  img2: ".js-about-img2-frame",
  img3: ".js-about-img3-frame",
  img4: ".js-about-img4-frame",
  img5: ".js-about-img5-frame",
  sinzin: ".js-about-img-sinzin-frame",
  fune: ".js-about-img-fune-frame",
  pichi: ".js-about-img-pichi-frame",
} as const;

const TITLE_MOBILE_MEDIA_QUERY = "(max-width: 900px)";

function refreshScrollTriggers() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

function getCssPixelValue(element: HTMLElement, propertyName: string) {
  const value = window.getComputedStyle(element).getPropertyValue(propertyName).trim();

  if (!value) {
    return 0;
  }

  const parsedValue = Number.parseFloat(value);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function isTitleMobileLayout() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(TITLE_MOBILE_MEDIA_QUERY).matches;
}

function collectFrames(scope: ParentNode, selector: string) {
  return gsap.utils.toArray<HTMLElement>(selector, scope);
}

function collectAboutFrameGroups(scope: ParentNode): AboutFrameGroups {
  return {
    img1: collectFrames(scope, aboutFrameSelectors.img1),
    img2: collectFrames(scope, aboutFrameSelectors.img2),
    img3: collectFrames(scope, aboutFrameSelectors.img3),
    img4: collectFrames(scope, aboutFrameSelectors.img4),
    img5: collectFrames(scope, aboutFrameSelectors.img5),
    sinzin: collectFrames(scope, aboutFrameSelectors.sinzin),
    fune: collectFrames(scope, aboutFrameSelectors.fune),
    pichi: collectFrames(scope, aboutFrameSelectors.pichi),
  };
}

function hideFrameGroups(frameGroups: HTMLElement[][]) {
  frameGroups.forEach((frames) => hideFlipbookFrames(frames));
}

function showLastFrameGroups(frameGroups: HTMLElement[][]) {
  frameGroups.forEach((frames) => showLastFlipbookFrame(frames));
}

function collectSnsBlocks(root: HTMLElement): SnsBlockElements[] {
  return gsap.utils.toArray<HTMLElement>(".js-title-sns-block", root).map((section) => ({
    section,
    frames: gsap.utils.toArray<HTMLElement>(".js-sns-frame", section),
    title: section.querySelector<HTMLElement>(".js-sns-title"),
    icons: gsap.utils.toArray<HTMLElement>(".js-sns-icon", section),
  }));
}

function applyReducedMotionState(
  snsBlocks: SnsBlockElements[],
  revealBlocks: HTMLElement[],
  aboutPanel: HTMLDivElement | null,
) {
  snsBlocks.forEach(({ frames, title, icons }) => {
    if (frames.length > 0) {
      gsap.set(frames, { autoAlpha: 0 });
      gsap.set(frames[frames.length - 1], { autoAlpha: 1 });
    }

    if (title) {
      const finalSnsTitleY = getCssPixelValue(title, "--wf-sns-title-offset-y");
      gsap.set(title, { autoAlpha: 1, y: finalSnsTitleY });
    }

    if (icons.length > 0) {
      gsap.set(icons, { autoAlpha: 1, rotationX: 0, y: 0 });
    }
  });

  revealBlocks.forEach((block) => {
    gsap.set(block, { clearProps: "all", autoAlpha: 1, y: 0 });
  });

  if (!aboutPanel) {
    return;
  }

  const aboutFrameGroups = collectAboutFrameGroups(aboutPanel);

  gsap.set(aboutPanel, { clearProps: "all", autoAlpha: 1, y: 0 });
  gsap.set(".js-about-title", { autoAlpha: 1, y: 0 });
  gsap.set(".js-about-text", { autoAlpha: 1, y: 0 });
  gsap.set(".js-about-image", { autoAlpha: 1, y: 0 });
  showLastFrameGroups(Object.values(aboutFrameGroups));
}

function setupSnsAnimation({ section, frames, title, icons }: SnsBlockElements) {
  if (frames.length === 0) {
    return;
  }

  const finalSnsTitleY = title ? getCssPixelValue(title, "--wf-sns-title-offset-y") : 0;

  hideFlipbookFrames(frames);
  if (title) {
    gsap.set(title, { autoAlpha: 0, y: finalSnsTitleY + 10 });
  }
  gsap.set(icons, {
    autoAlpha: 0,
    rotationX: -70,
    y: -10,
    transformOrigin: "top center",
  });

  const snsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
      invalidateOnRefresh: true,
      toggleActions: "play none none none",
    },
  });

  appendFlipbookFrames(snsTimeline, frames);

  if (title) {
    snsTimeline.to(
      title,
      {
        autoAlpha: 1,
        y: finalSnsTitleY,
        duration: 0.4,
        ease: "power2.out",
      },
      "+=0.04",
    );
  }

  snsTimeline.to(
    icons,
    {
      autoAlpha: 1,
      rotationX: 0,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    },
    "<+=0.02",
  );
}

function setupHpPin(
  hpSection: HTMLElement | null,
  aboutStage: HTMLElement | null,
  aboutPanel: HTMLDivElement | null,
  isMobile: boolean,
) {
  const hpButton = hpSection?.querySelector<HTMLElement>(".js-title-hp-button") ?? null;

  if (!hpSection || !hpButton || !aboutPanel || isMobile) {
    return;
  }

  ScrollTrigger.create({
    trigger: hpButton,
    start: "center center",
    endTrigger: aboutStage ?? aboutPanel,
    end: "top top",
    pin: true,
    pinSpacing: false,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  });
}

function setupRevealBlocks(revealBlocks: HTMLElement[], isMobile: boolean) {
  const revealY = isMobile ? 40 : 100;
  const revealStart = isMobile ? "top 92%" : "top 86%";

  revealBlocks.forEach((block) => {
    gsap.fromTo(
      block,
      {
        y: revealY,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: block,
          start: revealStart,
          invalidateOnRefresh: true,
          toggleActions: "play none none none",
          once: true,
        },
      },
    );
  });
}

function createFrameSequencePlayer(sequences: FlipbookSequence[]) {
  let hasPlayed = false;

  return () => {
    if (hasPlayed || sequences.every(({ frames }) => frames.length === 0)) {
      return;
    }

    hasPlayed = true;

    const timeline = gsap.timeline({ defaults: { ease: "none" } });

    sequences.forEach(({ frames, startAt, staggerDelay }) => {
      appendFlipbookFrames(timeline, frames, { startAt, staggerDelay });
    });
  };
}

function createDesktopAboutRowPlayers(aboutFrames: AboutFrameGroups) {
  return [
    createFrameSequencePlayer([{ frames: aboutFrames.img1, startAt: 0, staggerDelay: 0.2 }]),
    createFrameSequencePlayer([
      { frames: aboutFrames.img2, startAt: 0, staggerDelay: 0.2 },
      { frames: aboutFrames.img3, startAt: 0.7, staggerDelay: 0.2 },
    ]),
    createFrameSequencePlayer([
      { frames: aboutFrames.sinzin, startAt: 0, staggerDelay: 0.15 },
      { frames: aboutFrames.fune, startAt: 0.7, staggerDelay: 0.15 },
      { frames: aboutFrames.pichi, startAt: 1.2, staggerDelay: 0.15 },
    ]),
    createFrameSequencePlayer([
      { frames: aboutFrames.img4, startAt: 0, staggerDelay: 0.2 },
      { frames: aboutFrames.img5, startAt: 0.7, staggerDelay: 0.2 },
    ]),
  ] as const;
}

function createMobileAboutRowPlayers(aboutFrames: AboutFrameGroups): readonly AboutRowPlayer[] {
  return [
    createFrameSequencePlayer([{ frames: aboutFrames.img1, startAt: 0, staggerDelay: 0.18 }]),
    null,
    createFrameSequencePlayer([
      { frames: aboutFrames.img2, startAt: 0, staggerDelay: 0.18 },
      { frames: aboutFrames.img3, startAt: 0.72, staggerDelay: 0.18 },
      { frames: aboutFrames.sinzin, startAt: 1.44, staggerDelay: 0.15 },
      { frames: aboutFrames.fune, startAt: 2.04, staggerDelay: 0.15 },
      { frames: aboutFrames.pichi, startAt: 2.6, staggerDelay: 0.15 },
    ]),
    createFrameSequencePlayer([
      { frames: aboutFrames.img4, startAt: 0, staggerDelay: 0.18 },
      { frames: aboutFrames.img5, startAt: 0.72, staggerDelay: 0.18 },
    ]),
  ] as const;
}

function setupAboutAnimation(
  aboutStage: HTMLElement | null,
  aboutPanel: HTMLDivElement | null,
  isMobile: boolean,
) {
  if (!aboutStage || !aboutPanel) {
    return;
  }

  const aboutTitle = aboutPanel.querySelector<HTMLElement>(".js-about-title");
  const aboutRows = gsap.utils.toArray<HTMLElement>(".js-about-row", aboutPanel);
  const aboutFrames = collectAboutFrameGroups(aboutPanel);

  if (aboutTitle) {
    gsap.set(aboutTitle, { autoAlpha: 0, y: 30 });
  }

  gsap.set(aboutRows, { autoAlpha: 0, y: 28 });
  hideFrameGroups(Object.values(aboutFrames));

  if (isMobile) {
    if (aboutTitle) {
      gsap.to(aboutTitle, {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutPanel,
          start: "top 82%",
          invalidateOnRefresh: true,
          toggleActions: "play none none none",
          once: true,
        },
      });
    }

    const aboutRowPlayers = createMobileAboutRowPlayers(aboutFrames);

    aboutRows.forEach((row, index) => {
      gsap.to(row, {
        autoAlpha: 1,
        y: 0,
        duration: 0.48,
        ease: "power2.out",
        scrollTrigger: {
          trigger: row,
          start: "top 88%",
          invalidateOnRefresh: true,
          toggleActions: "play none none none",
          once: true,
          onEnter: aboutRowPlayers[index] ?? undefined,
        },
      });
    });

    return;
  }

  const aboutTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: aboutStage,
      start: "top top",
      end: () => `+=${Math.max(window.innerHeight * 9, 4800)}`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
    },
  });

  if (aboutTitle) {
    aboutTimeline.to(
      aboutTitle,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      },
      "+=0.2",
    );
  }

  const aboutRowPlayers = createDesktopAboutRowPlayers(aboutFrames);

  aboutRows.forEach((row, index) => {
    aboutTimeline.to(
      row,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.34,
        ease: "power2.out",
        onStart: aboutRowPlayers[index],
      },
      "+=0.55",
    );

    aboutTimeline.to({}, { duration: 0.5 });

    if (index < aboutRows.length - 1) {
      aboutTimeline.to(
        row,
        {
          autoAlpha: 0,
          y: -20,
          duration: 0.28,
          ease: "power2.inOut",
        },
        "+=0.2",
      );
    }
  });
}

export function setupTitleContentAnimations({
  root,
  aboutStage,
  aboutPanel,
  isIntroComplete,
  isMobileLayout,
}: TitleContentAnimationOptions) {
  if (!isIntroComplete || !root) {
    return;
  }

  const reduceMotion = prefersReducedMotion();
  const isMobile = isMobileLayout ?? isTitleMobileLayout();
  const snsSection = root.querySelector<HTMLElement>("#sns");
  const hpSection = root.querySelector<HTMLElement>(".js-title-hp-stack");
  const snsBlocks = snsSection ? collectSnsBlocks(snsSection) : [];
  const revealBlocks = gsap.utils.toArray<HTMLElement>(".js-title-reveal", root);

  if (reduceMotion) {
    applyReducedMotionState(snsBlocks, revealBlocks, aboutPanel);
    refreshScrollTriggers();
    return;
  }

  snsBlocks.forEach((block) => setupSnsAnimation(block));
  setupHpPin(hpSection, aboutStage, aboutPanel, isMobile);
  setupRevealBlocks(revealBlocks, isMobile);
  setupAboutAnimation(aboutStage, aboutPanel, isMobile);
  refreshScrollTriggers();
}
