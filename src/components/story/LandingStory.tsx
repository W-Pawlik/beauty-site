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

const clampProgress = (value: number) => Math.max(0, Math.min(2, value));
const clampUnit = (value: number) => Math.max(0, Math.min(1, value));

export function LandingStory() {
  const storyRef = useRef<HTMLElement | null>(null);

  const progressRafRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const lastScrollTopRef = useRef(0);
  const stickyVisibleRef = useRef(true);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  const isAutoScrollingRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  const lastWheelDirectionRef = useRef<0 | 1 | -1>(0);

  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isStickyVisible, setIsStickyVisible] = useState(true);

  const updateStickyVisible = useCallback((visible: boolean) => {
    if (stickyVisibleRef.current === visible) {
      return;
    }

    stickyVisibleRef.current = visible;
    setIsStickyVisible(visible);
  }, []);

  const animateTo = useCallback((targetScrollTop: number, duration = AUTO_SCROLL_DURATION_MS) => {
    const container = storyRef.current;
    if (!container) {
      return;
    }

    if (scrollRafRef.current) {
      cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
    }

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
  }, []);

  useEffect(() => {
    const container = storyRef.current;
    if (!container) {
      return;
    }

    const updateTargetProgress = () => {
      const viewport = container.clientHeight || window.innerHeight || 1;
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
  }, [updateStickyVisible]);

  useEffect(() => {
    const container = storyRef.current;
    if (!container) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      if (isAutoScrollingRef.current) {
        return;
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

      const viewport = container.clientHeight || window.innerHeight || 1;
      const transitionDistance = viewport * TRANSITION_DISTANCE_MULTIPLIER;
      const cinematicMaxScrollTop = transitionDistance * 2;
      if (container.scrollTop > cinematicMaxScrollTop + 2) {
        return;
      }
      const progress = clampProgress(container.scrollTop / transitionDistance);

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
  }, [animateTo]);

  useEffect(() => {
    return () => {
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  const handleScrollNext = useCallback(() => {
    const container = storyRef.current;
    if (!container) {
      return;
    }

    const viewport = container.clientHeight || window.innerHeight || 1;
    const transitionDistance = viewport * TRANSITION_DISTANCE_MULTIPLIER;

    animateTo(transitionDistance, 2400);
  }, [animateTo]);

  const handleNavigate = useCallback(
    (href: string) => {
      const container = storyRef.current;
      if (!container) {
        return false;
      }

      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
        isAutoScrollingRef.current = false;
      }

      const viewport = container.clientHeight || window.innerHeight || 1;
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
    [animateTo],
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
          transform: `translateY(${(1 - stickyHeaderVisibility) * -18}px)`,
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
