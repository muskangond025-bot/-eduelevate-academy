import React from 'react';
import { DemoHero } from '../components/demo/DemoHero';
import { DemoBenefits } from '../components/demo/DemoBenefits';
import { DemoExperience } from '../components/demo/DemoExperience';
import { DemoBooking } from '../components/demo/DemoBooking';

export const BookDemoPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <DemoHero />
      <DemoBenefits />
      <DemoExperience />
      <DemoBooking />
    </div>
  );
};
