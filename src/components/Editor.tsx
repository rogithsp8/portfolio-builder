
import React from 'react';
import Header from './Header';
import Canvas from './Canvas';
import ComponentLibrary from './ComponentLibrary';
import ToolBar from './ToolBar';
import { EditorProvider } from '@/context/EditorContext';

const Editor: React.FC = () => {
  return (
    <EditorProvider>
      <div className="flex flex-col min-h-screen">
        <Header isEditor={true} />
        <ToolBar />
        <div className="flex flex-1 overflow-hidden">
          <ComponentLibrary />
          <Canvas />
        </div>
      </div>
    </EditorProvider>
  );
};

export default Editor;
