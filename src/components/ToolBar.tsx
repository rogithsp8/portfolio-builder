
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Type, 
  Image, 
  Square, 
  Circle, 
  Grid, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Bold, 
  Italic, 
  Underline 
} from 'lucide-react';
import { useEditor } from '@/context/EditorContext';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ToolBar: React.FC = () => {
  const { addElement, selectedElement, elements, updateElement } = useEditor();

  const selectedElementData = elements.find(el => el.id === selectedElement);
  
  const addText = () => addElement('text');
  const addImage = () => addElement('image');
  const addRectangle = () => addElement('shape', { content: 'rectangle' });
  const addCircle = () => addElement('shape', { content: 'circle', style: { borderRadius: '50%' } });

  const handleTextAlign = (align: string) => {
    if (!selectedElement || !selectedElementData || selectedElementData.type !== 'text') return;
    
    updateElement(selectedElement, {
      style: { ...selectedElementData.style, textAlign: align }
    });
  };

  const toggleFontStyle = (style: 'bold' | 'italic' | 'underline') => {
    if (!selectedElement || !selectedElementData || selectedElementData.type !== 'text') return;
    
    let updatedStyle = { ...selectedElementData.style };
    
    if (style === 'bold') {
      updatedStyle.fontWeight = updatedStyle.fontWeight === 'bold' ? 'normal' : 'bold';
    } else if (style === 'italic') {
      updatedStyle.fontStyle = updatedStyle.fontStyle === 'italic' ? 'normal' : 'italic';
    } else if (style === 'underline') {
      updatedStyle.textDecoration = updatedStyle.textDecoration === 'underline' ? 'none' : 'underline';
    }
    
    updateElement(selectedElement, { style: updatedStyle });
  };

  return (
    <div className="w-full h-12 border-b border-gray-200 flex items-center px-4 bg-white shadow-sm z-10">
      <Tabs defaultValue="insert" className="w-full">
        <TabsList className="h-9">
          <TabsTrigger value="insert" className="text-xs">Insert</TabsTrigger>
          <TabsTrigger value="format" className="text-xs">Format</TabsTrigger>
          <TabsTrigger value="arrange" className="text-xs">Arrange</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex items-center gap-1 ml-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={addText}
          className="h-8 w-8"
          title="Add Text"
        >
          <Type size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={addImage}
          className="h-8 w-8"
          title="Add Image"
        >
          <Image size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={addRectangle}
          className="h-8 w-8"
          title="Add Rectangle"
        >
          <Square size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={addCircle}
          className="h-8 w-8"
          title="Add Circle"
        >
          <Circle size={16} />
        </Button>
      </div>
      
      <Separator orientation="vertical" className="mx-2 h-8" />
      
      {selectedElementData?.type === 'text' && (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleTextAlign('left')}
            className="h-8 w-8"
            title="Align Left"
          >
            <AlignLeft size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleTextAlign('center')}
            className="h-8 w-8"
            title="Align Center"
          >
            <AlignCenter size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleTextAlign('right')}
            className="h-8 w-8"
            title="Align Right"
          >
            <AlignRight size={16} />
          </Button>
          
          <Separator orientation="vertical" className="mx-2 h-8" />
          
          <Button
            variant={selectedElementData.style.fontWeight === 'bold' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => toggleFontStyle('bold')}
            className="h-8 w-8"
            title="Bold"
          >
            <Bold size={16} />
          </Button>
          <Button
            variant={selectedElementData.style.fontStyle === 'italic' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => toggleFontStyle('italic')}
            className="h-8 w-8"
            title="Italic"
          >
            <Italic size={16} />
          </Button>
          <Button
            variant={selectedElementData.style.textDecoration === 'underline' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => toggleFontStyle('underline')}
            className="h-8 w-8"
            title="Underline"
          >
            <Underline size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ToolBar;
