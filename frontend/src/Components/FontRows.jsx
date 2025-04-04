import { useEffect } from 'react';

function FontRow ({ font, onDelete }) {
  useEffect(() => {
    // Create a style element for this font
    const fontId = `font-face-${font.id}`;
    
    // Check if this font style already exists
    if (!document.getElementById(fontId)) {
      const fontStyle = document.createElement('style');
      fontStyle.id = fontId;
      fontStyle.innerHTML = `
        @font-face {
          font-family: "${font.name.replace(/\.[^/.]+$/, '')}";
          src: url("${font.url}") format("truetype");
        }
      `;
      document.head.appendChild(fontStyle);
    }
    
    // Cleanup function to remove the style when component unmounts
    return () => {
      const existingStyle = document.getElementById(fontId);
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, [font.id, font.name, font.url]);

  // Extract font name without extension for use as font-family
  const fontFamily = font.name.replace(/\.[^/.]+$/, '');

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4">{font.name}</td>
      <td className="py-3 px-4">
        <p style={{ fontFamily: fontFamily }}>
          The quick brown fox jumps over the lazy dog
        </p>
      </td>
      <td className="py-3 px-4">
        <button 
          onClick={() => onDelete(font.id)}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default FontRow;