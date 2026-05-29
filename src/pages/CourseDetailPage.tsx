import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { coursesData } from '../data/coursesData';
import { CourseHero } from '../components/course-details/CourseHero';
import { CourseOverviewSection } from '../components/course-details/CourseOverviewSection';
import { SyllabusBreakdown } from '../components/course-details/SyllabusBreakdown';
import { MethodologyGrid } from '../components/course-details/MethodologyGrid';
import { CourseFaculty } from '../components/course-details/CourseFaculty';
import { CourseResults } from '../components/course-details/CourseResults';
import { BatchFeesSection } from '../components/course-details/BatchFeesSection';
import { CourseFAQ } from '../components/courses/CourseFAQ'; // Reusing the FAQ component as it's modular
import { FinalCourseCTA } from '../components/course-details/FinalCourseCTA';

export const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const course = id ? coursesData[id] : null;

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <div className="bg-white">
      <CourseHero 
        name={course.name} 
        duration={course.duration} 
        eligibility={course.eligibility} 
      />
      <CourseOverviewSection 
        description={course.description} 
        whoIsItFor={course.whoIsItFor} 
      />
      <SyllabusBreakdown 
        syllabus={course.syllabus} 
      />
      <MethodologyGrid />
      <CourseFaculty />
      <CourseResults results={course.results} />
      <BatchFeesSection />
      <CourseFAQ />
      <FinalCourseCTA />
    </div>
  );
};
