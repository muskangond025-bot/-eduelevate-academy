import React from 'react';
import { LocationHero } from '../components/locations/LocationHero';
import { LocalCourses } from '../components/locations/LocalCourses';
import { BranchDetails } from '../components/locations/BranchDetails';
import { LocalResults } from '../components/locations/LocalResults';
import { LocationOutreachCTA } from '../components/locations/LocationOutreachCTA';

export const LocationPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <LocationHero city="Pune" area="Kothrud" />
      <LocalCourses />
      <BranchDetails />
      <LocalResults />
      <LocationOutreachCTA city="Pune" area="Kothrud" />
    </div>
  );
};
