import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/ui/Layout';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { Results } from './pages/Results';
import { Faculty } from './pages/Faculty';
import { ChooseYourPath } from './pages/ChooseYourPath';
import ScholarshipPage from './pages/ScholarshipPage';
import { BookDemoPage } from './pages/BookDemoPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { PerformancePage } from './pages/PerformancePage';
import { BlogPage } from './pages/BlogPage';
import { LocationPage } from './pages/LocationPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import TestimonialsPage from './pages/TestimonialsPage';
import { Contact } from './pages/Contact';
import { StudentPortal } from './pages/StudentPortal';
import { ParentPortal } from './pages/ParentPortal';

import { AboutPage } from './pages/AboutPage';

import { CourseDetailPage } from './pages/CourseDetailPage';
import { PathDetailPage } from './pages/PathDetailPage';
import { CounselorCallPage } from './pages/CounselorCallPage';
import { CampusWalkthroughPage } from './pages/CampusWalkthroughPage';


export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/results" element={<Results />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/path" element={<ChooseYourPath />} />
          <Route path="/path/:category" element={<PathDetailPage />} />
          <Route path="/counseling/call" element={<CounselorCallPage />} />
          <Route path="/counseling/walkthrough" element={<CampusWalkthroughPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/scholarship" element={<ScholarshipPage />} />
          <Route path="/book-demo" element={<BookDemoPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:id" element={<ResourceDetailPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/portal/student" element={<StudentPortal />} />
          <Route path="/portal/parent" element={<ParentPortal />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}


