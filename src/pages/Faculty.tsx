import React from 'react';
import { FacultyHero } from '../components/faculty/FacultyHero';
import { FacultyIntroduction } from '../components/faculty/FacultyIntroduction';
import { FacultyCards } from '../components/faculty/FacultyCards';
import { FacultyAchievements } from '../components/faculty/FacultyAchievements';
import { TeachingPhilosophy } from '../components/faculty/TeachingPhilosophy';

export const Faculty = () => {
  return (
    <div className="bg-white min-h-screen">
      <FacultyHero />
      <FacultyIntroduction />
      <FacultyCards />
      <FacultyAchievements />
      <TeachingPhilosophy />
    </div>
  );
};
