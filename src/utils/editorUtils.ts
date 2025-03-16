
import { CanvasElement, ElementType } from "@/context/EditorContext";

// Generate a unique ID for new elements
export const generateId = (): string => {
  return `element-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Default element templates
export const getDefaultElement = (type: ElementType, x: number, y: number): Partial<CanvasElement> => {
  const baseElement = {
    x,
    y,
  };
  
  switch (type) {
    case 'text':
      return {
        ...baseElement,
        type: 'text',
        content: 'Edit this text',
        width: 200,
        height: 50,
        style: {
          color: '#000000',
          fontSize: '16px',
          fontWeight: 'normal',
        }
      };
    
    case 'image':
      return {
        ...baseElement,
        type: 'image',
        content: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
        width: 300,
        height: 200,
        style: {
          borderRadius: '0px',
          opacity: 1,
        }
      };
    
    case 'shape':
      return {
        ...baseElement,
        type: 'shape',
        width: 100,
        height: 100,
        content: 'rectangle',
        style: {
          backgroundColor: '#3b82f6',
          borderRadius: '0px',
          opacity: 1,
        }
      };
    
    default:
      return baseElement;
  }
};

// Helper to convert pixels to a number
export const pxToNumber = (px: string): number => {
  return parseInt(px.replace('px', ''), 10) || 0;
};

// Format style object to CSS string
export const formatStyleToCss = (style: Record<string, string | number | undefined>): string => {
  return Object.entries(style)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${kebabKey}: ${value};`;
    })
    .join(' ');
};

// Check if element is being dragged outside canvas boundaries
export const checkElementBounds = (
  element: CanvasElement, 
  canvasWidth: number, 
  canvasHeight: number
): CanvasElement => {
  let { x, y, width, height } = element;
  
  // Ensure element stays within canvas boundaries
  x = Math.max(0, Math.min(x, canvasWidth - width / 2));
  y = Math.max(0, Math.min(y, canvasHeight - height / 2));
  
  return { ...element, x, y };
};

// Format position for absolute positioning
export const formatPosition = (x: number, y: number): React.CSSProperties => {
  return {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
  };
};

// Debounce function for performance optimization
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
): (...args: Parameters<F>) => void => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};
