function FontRow({ font, onDelete }) {
  // Extract font name (without extension) for font-family
  const fontName = font.name.replace(/\.ttf$/i, '').trim();

  // Extract file name from URL (e.g., "HappySelfie.ttf")
  const fontFileName = font.url.split('/').pop();
  console.log(fontName);
  console.log(fontFileName);

  // Define the @font-face CSS rule
  const fontFaceStyle = `
    @font-face {
      font-family: "${fontName}";
      src: url("/fonts/${fontFileName}") format("truetype");
      font-weight: normal;
      font-style: normal;
    }
  `;

  return (
    <>
      {/* Inject @font-face for this font */}
      <style>{fontFaceStyle}</style>

      <tr className="border-b hover:bg-gray-50">
        <td className="py-3 px-4">{fontName}</td>
        <td className="py-3 px-4 text-2xl">
          <p style={{ fontFamily: fontName }}>
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
    </>
  );
}

export default FontRow;
