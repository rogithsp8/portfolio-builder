
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the types for our canvas elements
export type ElementType = 'text' | 'image' | 'shape';

export interface CanvasElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  style: {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    backgroundColor?: string;
    borderRadius?: string;
    opacity?: number;
    [key: string]: string | number | undefined;
  };
}

interface EditorContextType {
  elements: CanvasElement[];
  selectedElement: string | null;
  canvasWidth: number;
  canvasHeight: number;
  addElement: (type: ElementType, defaultProps?: Partial<CanvasElement>) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  setCanvasSize: (width: number, height: number) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};

interface EditorProviderProps {
  children: ReactNode;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(1200);
  const [canvasHeight, setCanvasHeight] = useState(800);
  
  const addElement = (type: ElementType, defaultProps: Partial<CanvasElement> = {}) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type,
      x: 100,
      y: 100,
      width: 200,
      height: type === 'text' ? 50 : 200,
      content: type === 'text' ? 'Edit this text' : '',
      style: { 
        color: '#000000',
        fontSize: '16px',
        ...(defaultProps.style || {})
      },
      ...defaultProps
    };
    
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  };
  
  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(prev => 
      prev.map(el => el.id === id ? { ...el, ...updates } : el)
    );
  };
  
  const removeElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };
  
  const selectElement = (id: string | null) => {
    setSelectedElement(id);
  };
  
  const setCanvasSize = (width: number, height: number) => {
    setCanvasWidth(width);
    setCanvasHeight(height);
  };
  
  return (
    <EditorContext.Provider value={{
      elements,
      selectedElement,
      canvasWidth,
      canvasHeight,
      addElement,
      updateElement,
      removeElement,
      selectElement,
      setCanvasSize
    }}>
      {children}
    </EditorContext.Provider>
  );
};
