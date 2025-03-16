
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Menu, Save, Download, Play, Settings } from 'lucide-react';

interface HeaderProps {
  isEditor?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isEditor = false }) => {
  return (
    <header className="w-full h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white/90 backdrop-blur-sm z-10">
      <div className="flex items-center">
        <Link to="/" className="font-semibold text-xl tracking-tight mr-8 flex items-center gap-2">
          <span className="text-primary">Portfolio</span>
          <span className="text-primary/80 font-light">Canvas</span>
        </Link>
        
        {isEditor && (
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="text-sm font-normal">
              File
            </Button>
            <Button variant="ghost" size="sm" className="text-sm font-normal">
              Edit
            </Button>
            <Button variant="ghost" size="sm" className="text-sm font-normal">
              View
            </Button>
            <Button variant="ghost" size="sm" className="text-sm font-normal">
              Insert
            </Button>
          </nav>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {isEditor ? (
          <>
            <Button variant="ghost" size="icon">
              <Settings size={18} />
            </Button>
            <Button variant="ghost" size="icon">
              <Save size={18} />
            </Button>
            <Button variant="ghost" size="icon">
              <Download size={18} />
            </Button>
            <Button className="ml-2 bg-primary text-white hover:bg-primary/90">
              <Play size={16} className="mr-1" /> Preview
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button>Get Started</Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
