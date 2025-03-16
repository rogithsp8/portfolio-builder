
import React from 'react';
import { 
  Type, 
  Image, 
  Square, 
  Layout, 
  Circle, 
  FileText, 
  Columns,
  Grid3X3,
  ListOrdered
} from 'lucide-react';
import { useEditor } from '@/context/EditorContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const ComponentLibrary: React.FC = () => {
  const { addElement } = useEditor();
  
  const addText = () => addElement('text');
  const addHeading = () => addElement('text', { 
    content: 'Heading Text', 
    style: { fontSize: '28px', fontWeight: 'bold' } 
  });
  const addSubheading = () => addElement('text', { 
    content: 'Subheading Text', 
    style: { fontSize: '20px', fontWeight: '500' } 
  });
  const addParagraph = () => addElement('text', { 
    content: 'This is a paragraph of text. Click to edit and enter your own content.', 
    width: 400,
    height: 100,
    style: { fontSize: '16px', lineHeight: '1.5' } 
  });
  
  const addImage = () => addElement('image');
  const addRectangle = () => addElement('shape', { content: 'rectangle' });
  const addCircle = () => addElement('shape', { 
    content: 'circle', 
    style: { borderRadius: '50%' } 
  });

  return (
    <div className="w-72 h-full border-r border-gray-200 bg-white shadow-sm">
      <Tabs defaultValue="elements" className="h-full">
        <TabsList className="grid w-full grid-cols-2 h-10">
          <TabsTrigger value="elements">Elements</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="h-[calc(100%-2.5rem)] px-4 py-6">
          <TabsContent value="elements" className="mt-0">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Text</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col justify-center items-center gap-1 text-xs hover:border-primary/50" 
                    onClick={addHeading}
                  >
                    <Type size={20} />
                    <span>Heading</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col justify-center items-center gap-1 text-xs hover:border-primary/50" 
                    onClick={addSubheading}
                  >
                    <Type size={16} />
                    <span>Subheading</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col justify-center items-center gap-1 text-xs hover:border-primary/50" 
                    onClick={addParagraph}
                  >
                    <FileText size={20} />
                    <span>Paragraph</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col justify-center items-center gap-1 text-xs hover:border-primary/50" 
                    onClick={addText}
                  >
                    <ListOrdered size={20} />
                    <span>List</span>
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Media</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col justify-center items-center gap-1 text-xs hover:border-primary/50" 
                    onClick={addImage}
                  >
                    <Image size={20} />
                    <span>Image</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col justify-center items-center gap-1 text-xs hover:border-primary/50"
                  >
                    <Columns size={20} />
                    <span>Gallery</span>
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Shapes</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col justify-center items-center gap-1 text-xs hover:border-primary/50" 
                    onClick={addRectangle}
                  >
                    <Square size={20} />
                    <span>Rectangle</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col justify-center items-center gap-1 text-xs hover:border-primary/50" 
                    onClick={addCircle}
                  >
                    <Circle size={20} />
                    <span>Circle</span>
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Layout</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col justify-center items-center gap-1 text-xs hover:border-primary/50"
                  >
                    <Layout size={20} />
                    <span>Section</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col justify-center items-center gap-1 text-xs hover:border-primary/50"
                  >
                    <Grid3X3 size={20} />
                    <span>Grid</span>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-medium mb-3">Portfolio Templates</h3>
              <div className="space-y-3">
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Minimal</span>
                  </div>
                </div>
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Creative</span>
                  </div>
                </div>
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="h-32 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Professional</span>
                  </div>
                </div>
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="h-32 bg-gradient-to-r from-green-50 to-emerald-100 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Modern</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default ComponentLibrary;
