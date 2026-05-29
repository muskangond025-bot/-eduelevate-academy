import React from 'react';
import { ScholarshipHero } from '../components/scholarship/ScholarshipHero';
import { TestBenefits } from '../components/scholarship/TestBenefits';
import { Eligibility } from '../components/scholarship/Eligibility';
import { ScholarshipDetails } from '../components/scholarship/ScholarshipDetails';
import { TestSyllabus } from '../components/scholarship/TestSyllabus';
import { RegistrationForm } from '../components/scholarship/RegistrationForm';
import { TestSchedule } from '../components/scholarship/TestSchedule';
import { ScholarshipFAQ } from '../components/scholarship/ScholarshipFAQ';

const ScholarshipPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <ScholarshipHero />
      <TestBenefits />
      <Eligibility />
      <ScholarshipDetails />
      <TestSyllabus />
      <RegistrationForm />
      <TestSchedule />
      <ScholarshipFAQ />
    </div>
  );
};

export default ScholarshipPage;
