import React from 'react';
import { ContactInfo } from '../components/contact/ContactInfo';
import { ContactBranches } from '../components/contact/ContactBranches';
import { ContactMap } from '../components/contact/ContactMap';
import { ContactFormSection } from '../components/contact/ContactFormSection';
import { ContactWhatsApp } from '../components/contact/ContactWhatsApp';

export const Contact = () => {
  return (
    <div className="bg-white min-h-screen">
      <ContactInfo />
      <ContactBranches />
      <ContactMap />
      <ContactFormSection />
      <ContactWhatsApp />
    </div>
  );
};
