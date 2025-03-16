
import React, { useState, useRef, useEffect } from 'react';
import { useEditor, CanvasElement } from '@/context/EditorContext';
import { X, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkElementBounds, formatPosition } from '@/utils/editorUtils';

const Canvas: React.FC = () => {
  const { elements, selectedElement, updateElement, removeElement, selectElement, canvasWidth, canvasHeight } = useEditor();
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const handleElementClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    selectElement(id);
  };
  
  const handleCanvasClick = () => {
    selectElement(null);
  };
  
  const handleDragStart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const element = elements.find(el => el.id === id);
    if (!element) return;
    
    // Calculate click offset from element's top-left corner
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDragOffset({ x: offsetX, y: offsetY });
    setDragging(id);
    selectElement(id);
  };
  
  const handleDrag = (e: MouseEvent) => {
    if (!dragging || !canvasRef.current) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const element = elements.find(el => el.id === dragging);
    if (!element) return;
    
    // Calculate new position based on mouse position and initial offset
    const x = e.clientX - canvasRect.left - dragOffset.x;
    const y = e.clientY - canvasRect.top - dragOffset.y;
    
    // Update element position with boundary checks
    const updatedElement = checkElementBounds(
      { ...element, x, y },
      canvasWidth,
      canvasHeight
    );
    
    updateElement(dragging, { x: updatedElement.x, y: updatedElement.y });
  };
  
  const handleDragEnd = () => {
    setDragging(null);
  };
  
  const handleTextEdit = (id: string, content: string) => {
    updateElement(id, { content });
  };
  
  useEffect(() => {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [dragging, elements]);

  const renderElement = (element: CanvasElement) => {
    const isSelected = selectedElement === element.id;
    const style: React.CSSProperties = {
      ...formatPosition(element.x, element.y),
      width: `${element.width}px`,
      height: `${element.height}px`,
      border: isSelected ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid transparent',
      borderRadius: element.style.borderRadius || '0',
      ...element.style
    };
    
    const handleDblClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      
      if (element.type === 'text') {
        const input = document.createElement('textarea');
        input.value = element.content;
        input.style.position = 'absolute';
        input.style.left = '-9999px';
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        
        const newContent = prompt('Edit text:', element.content);
        if (newContent !== null) {
          handleTextEdit(element.id, newContent);
        }
      }
    };
    
    return (
      <div
        key={element.id}
        style={style}
        className={`canvas-element transition-shadow ${isSelected ? 'selected' : ''}`}
        onClick={(e) => handleElementClick(e, element.id)}
        onDoubleClick={handleDblClick}
      >
        {isSelected && (
          <div className="absolute -top-4 -right-4 flex">
            <Button
              variant="destructive"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <X size={12} />
            </Button>
          </div>
        )}
        
        {isSelected && (
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drag-handle h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center cursor-move"
            onMouseDown={(e) => handleDragStart(e, element.id)}
          >
            <Move size={14} />
          </div>
        )}
        
        {element.type === 'text' && (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            {element.content}
          </div>
        )}
        
        {element.type === 'image' && (
          <img
            src={element.content}
            alt="Canvas element"
            className="w-full h-full object-cover"
            style={{ 
              borderRadius: element.style.borderRadius || '0',
              opacity: element.style.opacity !== undefined ? element.style.opacity : 1 
            }}
          />
        )}
        
        {element.type === 'shape' && element.content === 'rectangle' && (
          <div className="w-full h-full" 
            style={{ 
              backgroundColor: element.style.backgroundColor || '#3b82f6',
              borderRadius: element.style.borderRadius || '0', 
              opacity: element.style.opacity !== undefined ? element.style.opacity : 1
            }}
          ></div>
        )}
        
        {element.type === 'shape' && element.content === 'circle' && (
          <div className="w-full h-full rounded-full" 
            style={{ 
              backgroundColor: element.style.backgroundColor || '#3b82f6',
              opacity: element.style.opacity !== undefined ? element.style.opacity : 1
            }}
          ></div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-8">
      <div 
        ref={canvasRef}
        className="bg-white shadow-sm mx-auto relative animate-fade-in"
        style={{ width: `${canvasWidth}px`, height: `${canvasHeight}px`, minHeight: '500px' }}
        onClick={handleCanvasClick}
      >
        {elements.map(renderElement)}
      </div>
    </div>
  );
};

export default Canvas;
