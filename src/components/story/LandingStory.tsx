"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "@/components/hero/HeroSection";
import { HeroHeader } from "@/components/hero/HeroHeader";
import { AboutMeIntro } from "./AboutMeIntro";
import { AboutMeSection } from "./AboutMeSection";
import { AgnieszkaTimelineSection } from "./AgnieszkaTimelineSection";
import { StatsHorizontalSection } from "./StatsHorizontalSection";
import { OfferShowcaseSection } from "./OfferShowcaseSection";
import { GalleryShowcaseSection } from "./GalleryShowcaseSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { ContactParallaxTeaser } from "./ContactParallaxTeaser";
import { ContactSection } from "./ContactSection";
import { FooterSection } from "./FooterSection";
import styles from "./LandingStory.module.css";

const CINEMATIC_STEPS = 2;
const STEP_TRANSITION_DURATION_SEC = 1.42;
const TOUCH_STEP_DELTA = 36;
const TOUCH_DIRECTION_EPSILON = 3;

const clampUnit = (value: number) => Math.max(0, Math.min(1, value));
const clampStep = (value: number) =>
  Math.max(0, Math.min(CINEMATIC_STEPS, Math.round(value)));

export function LandingStory() {
  const storyRef = useRef<HTMLElement | null>(null);
  const storyTrackRef = useRef<HTMLDivElement | null>(null);
  const storyViewportRef = useRef<HTMLDivElement | null>(null);
  const cinematicTriggerRef = useRef<ScrollTrigger | null>(null);
  const stepTweenRef = useRef<gsap.core.Tween | null>(null);
  const isStepAnimatingRef = useRef(false);
  const currentCinematicStepRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchActiveRef = useRef(false);
  const touchGestureConsumedRef = useRef(false);

  const lastScrollTopRef = useRef(0);
  const headerDirectionDeltaRef = useRef(0);
  const stickyVisibleRef = useRef(true);
  const cinematicProgressRef = useRef(0);

  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isStickyVisible, setIsStickyVisible] = useState(true);

  const updateStickyVisible = useCallback((visible: boolean) => {
    if (stickyVisibleRef.current === visible) {
      return;
    }

    stickyVisibleRef.current = visible;
    setIsStickyVisible(visible);
  }, []);

  const getCinematicBounds = useCallback(() => {
    const trigger = cinematicTriggerRef.current;
    if (!trigger) {
      return null;
    }

    const start = Number(trigger.start);
    const end = Number(trigger.end);
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
      return null;
    }

    return { start, end };
  }, []);

  const animateToCinematicStep = useCallback((step: number) => {
    const container = storyRef.current;
    const bounds = getCinematicBounds();
    if (!container || !bounds) {
      return false;
    }

    const clampedStep = clampStep(step);
    const normalizedStep = clampUnit(clampedStep / CINEMATIC_STEPS);
    const targetScrollTop =
      bounds.start + (bounds.end - bounds.start) * normalizedStep;

    stepTweenRef.current?.kill();
    isStepAnimatingRef.current = true;

    stepTweenRef.current = gsap.to(container, {
      scrollTop: targetScrollTop,
      duration: STEP_TRANSITION_DURATION_SEC,
      ease: "power3.inOut",
      overwrite: "auto",
      onComplete: () => {
        currentCinematicStepRef.current = clampedStep;
        isStepAnimatingRef.current = false;
        stepTweenRef.current = null;
      },
      onInterrupt: () => {
        isStepAnimatingRef.current = false;
        stepTweenRef.current = null;
      },
    });

    return true;
  }, [getCinematicBounds]);

  useLayoutEffect(() => {
    const container = storyRef.current;
    const track = storyTrackRef.current;
    const viewport = storyViewportRef.current;
    if (!container || !track || !viewport) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: track,
      scroller: container,
      start: "top top",
      end: "bottom bottom",
      scrub: false,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress * CINEMATIC_STEPS;
        cinematicProgressRef.current = progress;
        setTransitionProgress(progress);
        if (!isStepAnimatingRef.current) {
          const nearest = clampStep(progress);
          if (Math.abs(progress - nearest) <= 0.18) {
            currentCinematicStepRef.current = nearest;
          }
        }
      },
    });

    cinematicTriggerRef.current = trigger;
    cinematicProgressRef.current = trigger.progress * CINEMATIC_STEPS;
    currentCinematicStepRef.current = clampStep(cinematicProgressRef.current);
    setTransitionProgress(cinematicProgressRef.current);

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      stepTweenRef.current?.kill();
      stepTweenRef.current = null;
      isStepAnimatingRef.current = false;
      trigger.kill();
      if (cinematicTriggerRef.current === trigger) {
        cinematicTriggerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const container = storyRef.current;
    if (!container) {
      return;
    }

  const onWheel = (event: WheelEvent) => {
      const delta = event.deltaY;
      if (Math.abs(delta) < 0.5) {
        return;
      }

      const bounds = getCinematicBounds();
      if (!bounds) {
        return;
      }

      const scrollTop = container.scrollTop;
      const inCinematicRange =
        scrollTop >= bounds.start - 1 && scrollTop <= bounds.end + 1;
      if (!inCinematicRange) {
        return;
      }

      const direction: 1 | -1 = delta > 0 ? 1 : -1;
      const currentStep = currentCinematicStepRef.current;
      const atTop = currentStep <= 0;
      const atBottom = currentStep >= CINEMATIC_STEPS;

      if (isStepAnimatingRef.current) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }

      if ((direction < 0 && atTop) || (direction > 0 && atBottom)) {
        return;
      }

      if (event.cancelable) {
        event.preventDefault();
      }

      const targetStep = direction > 0 ? currentStep + 1 : currentStep - 1;

      animateToCinematicStep(targetStep);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        touchActiveRef.current = false;
        touchGestureConsumedRef.current = false;
        return;
      }

      touchStartYRef.current = event.touches[0]?.clientY ?? 0;
      touchActiveRef.current = true;
      touchGestureConsumedRef.current = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!touchActiveRef.current || event.touches.length !== 1) {
        return;
      }

      const bounds = getCinematicBounds();
      if (!bounds) {
        return;
      }

      const scrollTop = container.scrollTop;
      const inCinematicRange =
        scrollTop >= bounds.start - 1 && scrollTop <= bounds.end + 1;
      if (!inCinematicRange) {
        return;
      }

      if (touchGestureConsumedRef.current) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }

      const currentY = event.touches[0]?.clientY ?? touchStartYRef.current;
      const delta = touchStartYRef.current - currentY;
      const hasDirection = Math.abs(delta) >= TOUCH_DIRECTION_EPSILON;
      const direction: 1 | -1 | 0 = hasDirection ? (delta > 0 ? 1 : -1) : 0;
      const currentStep = currentCinematicStepRef.current;
      const atTop = currentStep <= 0;
      const atBottom = currentStep >= CINEMATIC_STEPS;

      if (isStepAnimatingRef.current) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }

      const leavingCinematicRange =
        direction !== 0 &&
        ((direction < 0 && atTop) || (direction > 0 && atBottom));
      if (leavingCinematicRange) {
        touchActiveRef.current = false;
        return;
      }

      // Prevent native touch momentum inside cinematic range.
      if (event.cancelable) {
        event.preventDefault();
      }

      if (Math.abs(delta) < TOUCH_STEP_DELTA || direction === 0) {
        return;
      }

      const targetStep =
        direction > 0
          ? currentStep + 1
          : currentStep - 1;

      animateToCinematicStep(targetStep);
      touchGestureConsumedRef.current = true;
    };

    const onTouchEnd = () => {
      touchActiveRef.current = false;
      touchGestureConsumedRef.current = false;
    };

    const onTouchCancel = () => {
      touchActiveRef.current = false;
      touchGestureConsumedRef.current = false;
    };

    container.addEventListener("wheel", onWheel, { passive: false, capture: true });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    container.addEventListener("touchcancel", onTouchCancel, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel, true);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [animateToCinematicStep, getCinematicBounds]);

  useEffect(() => {
    const container = storyRef.current;
    if (!container) {
      return;
    }

    const onScroll = () => {
      const scrollTop = container.scrollTop;
      const delta = scrollTop - lastScrollTopRef.current;
      const isMobileViewport = (window.innerWidth || container.clientWidth) <= 980;
      const cinematicProgress = cinematicProgressRef.current;

      if (cinematicProgress >= 1) {
        const limitedDelta = Math.max(-44, Math.min(44, delta));
        const accumulator = headerDirectionDeltaRef.current;
        const isDirectionChanged =
          accumulator !== 0 &&
          ((limitedDelta > 0 && accumulator < 0) ||
            (limitedDelta < 0 && accumulator > 0));

        if (isDirectionChanged) {
          headerDirectionDeltaRef.current = 0;
        }

        headerDirectionDeltaRef.current += limitedDelta;
        const hideThreshold = isMobileViewport ? 72 : 54;
        const showThreshold = isMobileViewport ? -34 : -24;

        if (
          stickyVisibleRef.current &&
          headerDirectionDeltaRef.current > hideThreshold
        ) {
          updateStickyVisible(false);
          headerDirectionDeltaRef.current = 0;
        } else if (
          !stickyVisibleRef.current &&
          headerDirectionDeltaRef.current < showThreshold
        ) {
          updateStickyVisible(true);
          headerDirectionDeltaRef.current = 0;
        }
      } else {
        headerDirectionDeltaRef.current = 0;
        updateStickyVisible(true);
      }

      lastScrollTopRef.current = scrollTop;
    };

    lastScrollTopRef.current = container.scrollTop;
    onScroll();
    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, [updateStickyVisible]);

  const handleScrollNext = useCallback(() => {
    animateToCinematicStep(1);
  }, [animateToCinematicStep]);

  const handleNavigate = useCallback(
    (href: string) => {
      const container = storyRef.current;
      if (!container) {
        return false;
      }

      if (href === "#home") {
        return animateToCinematicStep(0);
      }

      if (href === "#aboutMe") {
        return animateToCinematicStep(2);
      }

      if (!href.startsWith("#")) {
        return false;
      }

      const target =
        container.querySelector<HTMLElement>(href) ??
        document.querySelector<HTMLElement>(href);
      if (!target) {
        return false;
      }

      const containerTop = container.getBoundingClientRect().top;
      const targetTop = target.getBoundingClientRect().top;
      const nextScrollTop = targetTop - containerTop + container.scrollTop;
      container.scrollTo({ top: nextScrollTop, behavior: "smooth" });
      return true;
    },
    [animateToCinematicStep],
  );

  const heroLayerOpacity = transitionProgress <= 1 ? 1 : 0;
  const aboutLayerInteractive =
    transitionProgress >= 0.54 && transitionProgress < 1.02;
  const stickyHeaderReveal = clampUnit((transitionProgress - 1.12) / 0.12);
  const stickyHeaderVisibility = stickyHeaderReveal * (isStickyVisible ? 1 : 0);

  return (
    <main ref={storyRef} className={styles.storyScroll}>
      <div
        className={styles.stickyHeaderLayer}
        style={{
          opacity: stickyHeaderVisibility,
          pointerEvents: stickyHeaderVisibility > 0.02 ? "auto" : "none",
        }}
      >
        <div className={styles.stickyHeaderInner}>
          <HeroHeader onNavigate={handleNavigate} />
        </div>
      </div>

      <div className={styles.storyTrack} ref={storyTrackRef}>
        <div className={styles.storyViewport} ref={storyViewportRef}>
          <div className={styles.heroLayer} style={{ opacity: heroLayerOpacity }}>
            <HeroSection
              onScrollNext={handleScrollNext}
              onNavigate={handleNavigate}
              transitionProgress={transitionProgress}
            />
          </div>

          <div
            className={styles.aboutLayer}
            style={{
              pointerEvents: aboutLayerInteractive ? "auto" : "none",
            }}
          >
            <AboutMeIntro
              transitionProgress={transitionProgress}
              onNavigate={handleNavigate}
            />
          </div>

          <div className={styles.aboutMeLayer}>
            <AboutMeSection transitionProgress={transitionProgress} />
          </div>
        </div>
      </div>

      <AgnieszkaTimelineSection />
      <StatsHorizontalSection scrollContainerRef={storyRef} />
      <OfferShowcaseSection />
      <GalleryShowcaseSection />
      <TestimonialsSection />
      <ContactParallaxTeaser />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
