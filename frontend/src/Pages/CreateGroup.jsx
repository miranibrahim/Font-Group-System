import { useState, useEffect } from 'react';
import { getFonts } from '../utils/axiosInstance';

function CreateGroup() {
  const [groupTitle, setGroupTitle] = useState('');
  const [fonts, setFonts] = useState([]);
  const [fontRows, setFontRows] = useState([
    { id: 1, fontId: '' }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState('');

  // Fetch all available fonts
  useEffect(() => {
    async function loadFonts() {
      try {
        setIsLoading(true);
        const data = await getFonts('/fonts');
        setFonts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load fonts. Please try again later.');
        console.error('Error loading fonts:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadFonts();
  }, []);

  // Add a new row
  function handleAddRow() {
    const selectedFontIds = fontRows.map(row => row.fontId);
    const availableFonts = fonts.filter(font => !selectedFontIds.includes(String(font.id)));

    if (availableFonts.length === 0) return; // prevent adding more than available fonts

    const newId = fontRows.length > 0 ? Math.max(...fontRows.map(row => row.id)) + 1 : 1;
    setFontRows([...fontRows, { id: newId, fontId: '' }]);
  }

  // Remove a row
  function handleRemoveRow(id) {
    setFontRows(fontRows.filter(row => row.id !== id));
  }

  // Update row data
  function handleRowChange(id, value) {
    setFontRows(fontRows.map(row =>
      row.id === id ? { ...row, fontId: value } : row
    ));
  }

  // Handle form submission
  function handleCreateGroup(e) {
    e.preventDefault();

    const selectedFonts = fontRows.filter(row => row.fontId !== '');
    if (selectedFonts.length < 2) {
      setValidationError('You have to select at least two fonts');
      return;
    }

    if (!groupTitle.trim()) {
      setValidationError('Group title is required');
      return;
    }

    console.log('Creating font group:', {
      title: groupTitle,
      fonts: selectedFonts
    });

    setValidationError('');
    alert('Font group created successfully!');
    // reset form
    setGroupTitle('');
    setFontRows([{ id: 1, fontId: '' }]);
  }

  // Get available fonts for each dropdown (removing already selected)
  function getAvailableFonts(currentRowId) {
    const selectedIds = fontRows
      .filter(row => row.id !== currentRowId)
      .map(row => row.fontId);
    return fonts.filter(font => !selectedIds.includes(String(font.id)));
  }

  if (isLoading) {
    return <div className="text-center py-10">Loading fonts...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-xl font-bold mb-2">Create Font Group</h1>
      <p className="text-sm text-gray-600 mb-4">You have to select at least two fonts</p>

      {validationError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {validationError}
        </div>
      )}

      <form onSubmit={handleCreateGroup}>
        <div className="mb-4">
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Group Title"
            value={groupTitle}
            onChange={(e) => setGroupTitle(e.target.value)}
          />
        </div>

        {fontRows.map((row, index) => {
          const selectedFont = fonts.find(font => String(font.id) === row.fontId);
          const fontNameDisplay = selectedFont ? selectedFont.name.replace('.ttf', '') : 'Font Name';

          return (
            <div key={row.id} className="flex items-center mb-2 border border-gray-200 rounded p-2 bg-gray-50">
              <div className="w-8 text-center mr-2">{index + 1}</div>

              <div className="flex-1 mr-2">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-500"
                  value={fontNameDisplay}
                  disabled
                />
              </div>

              <div className="flex-1 mr-2">
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                  value={row.fontId}
                  onChange={(e) => handleRowChange(row.id, e.target.value)}
                >
                  <option value="">Select a Font</option>
                  {getAvailableFonts(row.id).map(font => (
                    <option key={font.id} value={font.id}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="text-red-500 ml-2"
                onClick={() => handleRemoveRow(row.id)}
              >
                ×
              </button>
            </div>
          );
        })}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-50 disabled:opacity-50"
            onClick={handleAddRow}
            disabled={fontRows.length >= fonts.length}
          >
            + Add Row
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateGroup;
