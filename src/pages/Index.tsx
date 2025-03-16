
import React from 'react';
import Header from '@/components/Header';
import WelcomePage from '@/components/WelcomePage';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <WelcomePage />
    </div>
  );
};

export default Index;
