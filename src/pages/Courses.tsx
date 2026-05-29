import React from 'react';
import { CoursesHero } from '../components/courses/CoursesHero';
import { CoursesOverview } from '../components/courses/CoursesOverview';
import { StreamSelectionGuidance } from '../components/courses/StreamSelection';
import { CourseCards } from '../components/courses/CourseCards';
import { CourseComparison } from '../components/courses/CourseComparison';
import { StudyMethodology } from '../components/courses/StudyMethodology';
import { ResultsByCourse } from '../components/courses/ResultsByCourse';
import { CourseFAQ } from '../components/courses/CourseFAQ';
import { CourseCTA } from '../components/courses/CourseCTA';

export const Courses = () => {
  return (
    <div className="bg-white">
      <CoursesHero />
      <CoursesOverview />
      <StreamSelectionGuidance />
      <CourseCards />
      <CourseComparison />
      <StudyMethodology />
      <ResultsByCourse />
      <CourseFAQ />
      <CourseCTA />
    </div>
  );
};

