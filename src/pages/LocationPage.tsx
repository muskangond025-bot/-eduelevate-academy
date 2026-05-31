import React from 'react';
import { motion } from 'motion/react';
import { LocationHero } from '../components/locations/LocationHero';
import { LocalCourses } from '../components/locations/LocalCourses';
import { BranchDetails } from '../components/locations/BranchDetails';
import { LocalResults } from '../components/locations/LocalResults';
import { LocationOutreachCTA } from '../components/locations/LocationOutreachCTA';

export const LocationPage = () => {
  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Cinematic Glowing Curtain Page Transition */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 bg-[#060813] z-[9999] pointer-events-none flex flex-col justify-end"
      >
        {/* Glowing laser border edge of the curtain */}
        <div className="h-[3px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 shadow-[0_0_20px_rgba(99,102,241,0.8)]" />
      </motion.div>

      <LocationHero city="Pune" area="Kothrud" />
      <LocalCourses />
      <BranchDetails />
      <LocalResults />
      <LocationOutreachCTA city="Pune" area="Kothrud" />
    </div>
  );
};
