import React from 'react';
import { PathHero } from '../components/path/PathHero';
import { StudentCategory } from '../components/path/StudentCategory';
import { RecommendedCourses } from '../components/path/RecommendedCourses';
import { CareerPathGuidance } from '../components/path/CareerPathGuidance';

export const ChooseYourPath = () => {
  return (
    <div className="bg-white min-h-screen">
      <PathHero />
      <StudentCategory />
      <RecommendedCourses />
      <CareerPathGuidance />
    </div>
  );
};
