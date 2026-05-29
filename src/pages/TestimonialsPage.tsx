import React from 'react';
import { StudentHero } from '../components/testimonials/StudentHero';
import { StudentVideoTestimonials } from '../components/testimonials/StudentVideoTestimonials';
import { StudentWrittenReviews } from '../components/testimonials/StudentWrittenReviews';
import { StudentGrowthStories } from '../components/testimonials/StudentGrowthStories';
import { StudentResultsDisplay } from '../components/testimonials/StudentResultsDisplay';
import { ParentHero } from '../components/testimonials/ParentHero';
import { ParentVideoReviews } from '../components/testimonials/ParentVideoReviews';
import { ParentWrittenFeedback } from '../components/testimonials/ParentWrittenFeedback';
import { ParentTrustSafety } from '../components/testimonials/ParentTrustSafety';
import { ParentSatisfactionStats } from '../components/testimonials/ParentSatisfactionStats';
import { WhyHero } from '../components/why-choose-us/WhyHero';
import { OurAdvantages } from '../components/why-choose-us/OurAdvantages';
import { StudySystem } from '../components/why-choose-us/StudySystem';
import { InfrastructureShowcase } from '../components/why-choose-us/InfrastructureShowcase';
import { ResultsBenchmark } from '../components/why-choose-us/ResultsBenchmark';

const TestimonialsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Student Perspective Division */}
      <div id="student-perspective">
        <StudentHero />
        <StudentVideoTestimonials />
        <StudentWrittenReviews />
        <StudentGrowthStories />
        <StudentResultsDisplay />
      </div>

      {/* Why Choose Us Section */}
      <div id="why-choose-us">
        <WhyHero />
        <OurAdvantages />
        <StudySystem />
        <InfrastructureShowcase />
        <ResultsBenchmark />
      </div>

      {/* Parent Perspective Division */}
      <div id="parent-perspective">
        <ParentHero />
        <ParentVideoReviews />
        <ParentWrittenFeedback />
        <ParentTrustSafety />
        <ParentSatisfactionStats />
      </div>
    </div>
  );
};

export default TestimonialsPage;
