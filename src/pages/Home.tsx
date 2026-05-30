import React from 'react';
import { HomeHero } from '../components/home/HomeHero';
import { HomeStatTicker } from '../components/home/HomeStatTicker';
import { HomeAcademicPaths } from '../components/home/HomeAcademicPaths';
import { HomeLearningTech } from '../components/home/HomeLearningTech';
import { HomeEliteFaculty } from '../components/home/HomeEliteFaculty';
import { HomeSuccessWall } from '../components/home/HomeSuccessWall';
import { HomeCombinedTrust, HomeAdaptiveAssessment, HomeStudyEcosystem } from '../components/home/HomeTrustNTech';
import { HomeGlobalAlumni, HomeScholarshipDrive, HomeMobileApp } from '../components/home/HomeFinalSections';
import { HomePlatformPreview } from '../components/home/HomePlatformPreview';
import { FinalCTA } from '../components/home/FinalCTA';
import Lenis from 'lenis';

export const Home = () => {
  React.useEffect(() => {
    // Initialize Lenis buttery smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-white">
      {/* 1. Hero Entrance */}
      <HomeHero />
      
      {/* 2. Global Trust Bar */}
      <HomeCombinedTrust />

      {/* 3. Numerical Impact */}
      <HomeStatTicker />

      {/* 4. Choice Infrastructure */}
      <HomeAcademicPaths />

      {/* 5. Technological Edge */}
      <HomeLearningTech />

      {/* 6. Assessment Science */}
      <HomeAdaptiveAssessment />

      {/* 7. Faculty Prestige */}
      <HomeEliteFaculty />

      {/* 8. Success Evidence */}
      <HomeSuccessWall />

      {/* 9. The Phygital Ecosystem */}
      <HomeStudyEcosystem />

      {/* 10. Live Platform Preview */}
      <HomePlatformPreview />

      {/* 11. Alumni Network */}
      <HomeGlobalAlumni />

      {/* 12. Scholarship Drive */}
      <HomeScholarshipDrive />

      {/* 13. Digital Companion */}
      <HomeMobileApp />

      {/* 14. High-End CTA */}
      <FinalCTA />
    </div>
  );
};

