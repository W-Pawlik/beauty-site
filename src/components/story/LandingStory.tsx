"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

const TRANSITION_DISTANCE_MULTIPLIER = 1.55;
const AUTO_SCROLL_DURATION_MS = 2100;
const WHEEL_TRIGGER_DELTA = 100;
const WHEEL_TRIGGER_GAP_MS = 420;
const TOUCH_TRIGGER_DELTA_PX = 44;

const clampProgress = (value: number) => Math.max(0, Math.min(2, value));
const clampUnit = (value: number) => Math.max(0, Math.min(1, value));

export function LandingStory() {
  const storyRef = useRef<HTMLElement | null>(null);

  const progressRafRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const cinematicViewportRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const lastScrollTopRef = useRef(0);
  const stickyVisibleRef = useRef(true);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  const isAutoScrollingRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  const lastWheelDirectionRef = useRef<0 | 1 | -1>(0);
  const touchStartYRef = useRef(0);
  const touchCurrentYRef = useRef(0);
  const touchDominantDeltaRef = useRef(0);
  const touchStartProgressRef = useRef(0);
  const touchActiveRef = useRef(false);

  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isStickyVisible, setIsStickyVisible] = useState(true);

  const updateStickyVisible = useCallback((visible: boolean) => {
    if (stickyVisibleRef.current === visible) {
      return;
    }

    stickyVisibleRef.current = visible;
    setIsStickyVisible(visible);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (scrollRafRef.current) {
      cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
    }
    isAutoScrollingRef.current = false;
  }, []);

  const animateTo = useCallback((targetScrollTop: number, duration = AUTO_SCROLL_DURATION_MS) => {
    const container = storyRef.current;
    if (!container) {
      return;
    }

    stopAutoScroll();

    const start = container.scrollTop;
    const distance = targetScrollTop - start;
    if (Math.abs(distance) < 1) {
      return;
    }

    const startTime = performance.now();
    isAutoScrollingRef.current = true;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(progress);

      container.scrollTop = start + distance * eased;

      if (progress < 1) {
        scrollRafRef.current = requestAnimationFrame(step);
      } else {
        isAutoScrollingRef.current = false;
        scrollRafRef.current = null;
      }
    };

    scrollRafRef.current = requestAnimationFrame(step);
  }, [stopAutoScroll]);

  const getStableViewportHeight = useCallback((container: HTMLElement) => {
    const measuredHeight = container.clientHeight || window.innerHeight || 1;
    const measuredWidth = window.innerWidth || 0;
    const previous = cinematicViewportRef.current;

    if (!previous.height) {
      cinematicViewportRef.current = {
        width: measuredWidth,
        height: measuredHeight,
      };
      return measuredHeight;
    }

    const heightDiff = Math.abs(measuredHeight - previous.height);
    const widthDiff = Math.abs(measuredWidth - previous.width);

    // Ignore tiny mobile viewport shifts (browser bars) to prevent false jump triggers.
    if (heightDiff > 160 || widthDiff > 120) {
      cinematicViewportRef.current = {
        width: measuredWidth,
        height: measuredHeight,
      };
      return measuredHeight;
    }

    return previous.height;
  }, []);

  const getCinematicMetrics = useCallback((container: HTMLElement) => {
    const viewport = getStableViewportHeight(container);
    const transitionDistance = viewport * TRANSITION_DISTANCE_MULTIPLIER;
    const cinematicMaxScrollTop = transitionDistance * 2;
    const progress = clampProgress(container.scrollTop / transitionDistance);

    return {
      transitionDistance,
      cinematicMaxScrollTop,
      progress,
    };
  }, [getStableViewportHeight]);

  useEffect(() => {
    const container = storyRef.current;
    if (!container) {
      return;
    }

    const updateTargetProgress = () => {
      const viewport = getStableViewportHeight(container);
      const transitionDistance = viewport * TRANSITION_DISTANCE_MULTIPLIER;
      const scrollTop = container.scrollTop;
      const nextProgress = clampProgress(scrollTop / transitionDistance);
      targetProgressRef.current = nextProgress;

      const delta = scrollTop - lastScrollTopRef.current;
      if (nextProgress >= 1) {
        if (delta > 1.2) {
          updateStickyVisible(false);
        } else if (delta < -1.2) {
          updateStickyVisible(true);
        }
      } else {
        updateStickyVisible(true);
      }

      lastScrollTopRef.current = scrollTop;
    };

    const animateProgress = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const next = current + (target - current) * 0.24;
      const snapped = Math.abs(target - next) < 0.0008 ? target : next;

      currentProgressRef.current = snapped;
      setTransitionProgress(snapped);
      progressRafRef.current = requestAnimationFrame(animateProgress);
    };

    lastScrollTopRef.current = container.scrollTop;
    updateTargetProgress();
    container.addEventListener("scroll", updateTargetProgress, { passive: true });
    window.addEventListener("resize", updateTargetProgress);
    progressRafRef.current = requestAnimationFrame(animateProgress);

    return () => {
      container.removeEventListener("scroll", updateTargetProgress);
      window.removeEventListener("resize", updateTargetProgress);

      if (progressRafRef.current) {
        cancelAnimationFrame(progressRafRef.current);
      }
    };
  }, [getStableViewportHeight, updateStickyVisible]);

  useEffect(() => {
    const container = storyRef.current;
    if (!container) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      if (isAutoScrollingRef.current) {
        stopAutoScroll();
      }

      const delta = event.deltaY;
      if (Math.abs(delta) < 2) {
        return;
      }

      const direction: 1 | -1 = delta > 0 ? 1 : -1;
      const now = performance.now();

      if (
        lastWheelDirectionRef.current !== direction ||
        now - lastWheelTimeRef.current > WHEEL_TRIGGER_GAP_MS
      ) {
        wheelAccumulatorRef.current = 0;
      }

      lastWheelDirectionRef.current = direction;
      lastWheelTimeRef.current = now;
      wheelAccumulatorRef.current += Math.abs(delta);

      const { transitionDistance, cinematicMaxScrollTop, progress } =
        getCinematicMetrics(container);
      if (container.scrollTop > cinematicMaxScrollTop + 2) {
        return;
      }

      if (wheelAccumulatorRef.current < WHEEL_TRIGGER_DELTA) {
        return;
      }

      wheelAccumulatorRef.current = 0;

      if (direction > 0 && progress < 2) {
        const targetStep = Math.min(2, Math.floor(progress + 0.0001) + 1);
        animateTo(targetStep * transitionDistance, AUTO_SCROLL_DURATION_MS);
      }

      if (direction < 0 && progress > 0) {
        const targetStep = Math.max(0, Math.ceil(progress - 0.0001) - 1);
        animateTo(targetStep * transitionDistance, AUTO_SCROLL_DURATION_MS);
      }
    };

    container.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [animateTo, getCinematicMetrics, stopAutoScroll]);

  useEffect(() => {
    const container = storyRef.current;
    if (!container) {
      return;
    }

    const triggerTouchStep = (direction: 1 | -1, baseProgress?: number) => {
      const { transitionDistance, progress: currentProgress } =
        getCinematicMetrics(container);
      const progress = baseProgress ?? currentProgress;

      if (direction > 0 && progress < 2) {
        const targetStep = Math.min(2, Math.floor(progress + 0.0001) + 1);
        animateTo(targetStep * transitionDistance, AUTO_SCROLL_DURATION_MS);
        return true;
      }

      if (direction < 0 && progress > 0) {
        const targetStep = Math.max(0, Math.ceil(progress - 0.0001) - 1);
        animateTo(targetStep * transitionDistance, AUTO_SCROLL_DURATION_MS);
        return true;
      }

      return false;
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        touchActiveRef.current = false;
        return;
      }

      // Keep cinematic auto-scroll deterministic on mobile; don't interrupt mid-flight.
      if (isAutoScrollingRef.current) {
        touchActiveRef.current = false;
        return;
      }

      const { cinematicMaxScrollTop, progress } = getCinematicMetrics(container);
      if (container.scrollTop >= cinematicMaxScrollTop - 2 || progress >= 1.99) {
        touchActiveRef.current = false;
        return;
      }

      const touchY = event.touches[0]?.clientY ?? 0;
      touchStartYRef.current = touchY;
      touchCurrentYRef.current = touchY;
      touchDominantDeltaRef.current = 0;
      touchStartProgressRef.current = progress;
      touchActiveRef.current = true;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!touchActiveRef.current || event.touches.length !== 1) {
        if (isAutoScrollingRef.current) {
          event.preventDefault();
        }
        return;
      }

      const touchY = event.touches[0]?.clientY ?? touchCurrentYRef.current;
      touchCurrentYRef.current = touchY;
      const delta = touchStartYRef.current - touchY;
      if (Math.abs(delta) > Math.abs(touchDominantDeltaRef.current)) {
        touchDominantDeltaRef.current = delta;
      }

      // Blocks native momentum scroll in cinematic part; we drive transitions manually.
      event.preventDefault();
    };

    const onTouchEnd = () => {
      if (touchActiveRef.current) {
        const endDelta = touchStartYRef.current - touchCurrentYRef.current;
        const dominantDelta =
          Math.abs(touchDominantDeltaRef.current) >= Math.abs(endDelta)
            ? touchDominantDeltaRef.current
            : endDelta;

        if (Math.abs(dominantDelta) >= TOUCH_TRIGGER_DELTA_PX) {
          const direction: 1 | -1 = dominantDelta > 0 ? 1 : -1;
          triggerTouchStep(direction, touchStartProgressRef.current);
        }
      }

      touchActiveRef.current = false;
      touchDominantDeltaRef.current = 0;
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    container.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [animateTo, getCinematicMetrics]);

  useEffect(() => {
    return () => {
      stopAutoScroll();
    };
  }, [stopAutoScroll]);

  const handleScrollNext = useCallback(() => {
    const container = storyRef.current;
    if (!container) {
      return;
    }

    const viewport = getStableViewportHeight(container);
    const transitionDistance = viewport * TRANSITION_DISTANCE_MULTIPLIER;

    animateTo(transitionDistance, 2400);
  }, [animateTo, getStableViewportHeight]);

  const handleNavigate = useCallback(
    (href: string) => {
      const container = storyRef.current;
      if (!container) {
        return false;
      }

      if (scrollRafRef.current) {
        stopAutoScroll();
      }

      const viewport = getStableViewportHeight(container);
      const transitionDistance = viewport * TRANSITION_DISTANCE_MULTIPLIER;

      if (href === "#home") {
        animateTo(0, 1700);
        return true;
      }

      if (href === "#aboutMe") {
        animateTo(transitionDistance * 2, 1700);
        return true;
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

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    },
    [animateTo, getStableViewportHeight, stopAutoScroll],
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
          top: `${(1 - stickyHeaderVisibility) * -18}px`,
        }}
      >
        <div className={styles.stickyHeaderInner}>
          <HeroHeader onNavigate={handleNavigate} />
        </div>
      </div>

      <div className={styles.storyTrack}>
        <div className={styles.storyViewport}>
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
