
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Edit3, Layers, Layout } from 'lucide-react';

const WelcomePage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-24 px-6 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
            Create Stunning Portfolios <span className="text-primary">Effortlessly</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
            Our intuitive drag-and-drop builder makes it simple to design 
            beautiful, professional portfolios that showcase your work.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link to="/editor">
              <Button size="lg" className="gap-2 px-6">
                Start Creating <ArrowRight size={16} />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Powerful Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Edit3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Intuitive Editor</h3>
              <p className="text-muted-foreground">
                Our drag-and-drop interface makes it easy to create beautiful portfolios without any design experience.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Component Library</h3>
              <p className="text-muted-foreground">
                Choose from a variety of pre-designed components to quickly build your perfect portfolio.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Layout className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Responsive Design</h3>
              <p className="text-muted-foreground">
                Your portfolio will look great on any device, from smartphones to desktop computers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to showcase your work?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who trust Portfolio Canvas for their online presence.
          </p>
          <Link to="/editor">
            <Button size="lg" variant="secondary" className="gap-2 px-8">
              Start Creating <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
