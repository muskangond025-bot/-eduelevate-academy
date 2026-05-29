import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ResourceHero } from '../components/resources/ResourceHero';
import { ResourceDownloadBody } from '../components/resources/ResourceDownloadBody';
import { RelatedResources } from '../components/resources/RelatedResources';

const RESOURCE_DATA: Record<string, any> = {
  'physics-notes': {
    title: "Mechanics Vol. 1: Newton's Laws",
    category: "Physics Notes",
    description: "Deep dive into classical mechanics. This 45-page module covers everything from Free Body Diagrams to complex rotational dynamics with 150+ solved examples from past 20 years of JEE Advanced.",
    previewImg: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=1200"
  },
  'chemistry-notes': {
    title: "Organic Mechanisms & Electrophiles",
    category: "Chemistry Notes",
    description: "Master the art of reaction dynamics. Detailed colored flowcharts for SN1, SN2, E1, E2 mechanisms with specialized transition state visualizations for better conceptual grasp.",
    previewImg: "https://images.unsplash.com/photo-1603126731702-f0ba0175ff45?auto=format&fit=crop&q=80&w=1200"
  },
  'prev-papers': {
    title: "JEE Advanced 2024 Solved PDF",
    category: "Previous Papers",
    description: "The complete question paper with step-by-step video solution QR codes integrated. Includes subject-wise weightage analysis and expected cutoff trends.",
    previewImg: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200"
  },
  'study-planner': {
    title: "Master 90-Day Exam Strategy",
    category: "Study Planner",
    description: "A precision-built PDF calendar to balance your Grade 12 Boards and competitive prep. Includes micro-task lists, weekly mock test schedule, and revision cycles.",
    previewImg: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1200"
  }
};

export const ResourceDetailPage = () => {
  const { id } = useParams();
  const resource = id ? RESOURCE_DATA[id] : null;

  if (!resource) return <Navigate to="/resources" />;

  return (
    <div className="bg-white min-h-screen">
      <ResourceHero title={resource.title} category={resource.category} />
      <ResourceDownloadBody description={resource.description} previewImg={resource.previewImg} />
      <RelatedResources currentId={id!} />
    </div>
  );
};
