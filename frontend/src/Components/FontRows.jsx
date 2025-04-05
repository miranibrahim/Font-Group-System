function FontRow({ font, onDelete }) {

  const fontName = font.name.replace(/\.ttf$/i, '').trim();
  const url = font.path;
  console.log(fontName);
  console.log(url);

  // Define the @font-face CSS rule
  const fontFaceStyle = `
    @font-face {
      font-family: "${fontName}";
      src: url("${url}") format("truetype");
      font-weight: normal;
      font-style: normal;
    }
  `;

  return (
    <>
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
