import React from 'react';
import { ResultsHero } from '../components/results/ResultsHero';
import { RankHolders } from '../components/results/RankHolders';
import { ExamWiseResults } from '../components/results/ExamWiseResults';
import { Scorecards } from '../components/results/Scorecards';
import { StudentStories } from '../components/results/StudentStories';
import { InstituteStats } from '../components/results/InstituteStats';

export const Results = () => {
  return (
    <div className="bg-white min-h-screen">
      <ResultsHero />
      <RankHolders />
      <ExamWiseResults />
      <Scorecards />
      <StudentStories />
      <InstituteStats />
    </div>
  );
};
