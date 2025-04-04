import { useState, useEffect } from 'react';
import { createFontGroup, getData,  } from '../utils/axiosInstance';



function CreateGroup() {
    const [groupTitle, setGroupTitle] = useState('');
    const [fonts, setFonts] = useState([]);
    const [fontRows, setFontRows] = useState([{ id: 1, fontId: '' }]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const loadFonts = async () => {
            try {
                const data = await getData('/fonts');
                setFonts(data);
                setError(null);
            } catch (err) {
                setError('Failed to load fonts.');
            } finally {
                setIsLoading(false);
            }
        };
        loadFonts();
    }, []);

    const handleAddRow = () => {
        if (fontRows.length >= fonts.length) return;
        const newId = fontRows.length > 0 ? Math.max(...fontRows.map(row => row.id)) + 1 : 1;
        setFontRows([...fontRows, { id: newId, fontId: '' }]);
    };

    const handleRemoveRow = (id) => {
        setFontRows(fontRows.filter(row => row.id !== id));
    };

    const handleRowChange = (id, field, value) => {
        setFontRows(fontRows.map(row => (row.id === id ? { ...row, [field]: value } : row)));
    };

    const handleCreateGroup = async (e) => {
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

        const payload = {
            name: groupTitle.trim(),
            fonts: selectedFonts.map(row => parseInt(row.fontId, 10)), 
        };

        try {
            setValidationError('');
            console.log("Sending payload:", payload);
            const response = await createFontGroup('/create-group', payload);
            console.log("Response received:", response);

            if (response?.success) {
                alert('Font group created successfully!');
                setGroupTitle('');
                setFontRows([{ id: 1, fontId: '' }]); // Reset to one row
            } else {
                setValidationError(response?.error || 'Failed to create group.');
            }
        } catch (error) {
            setValidationError('Something went wrong. Please try again.');
            console.error('Group creation error:', error);
        }
    };

    if (isLoading) return <div className="text-center py-10">Loading fonts...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-xl font-bold mb-2">Create Font Group</h1>
            <p className="text-sm text-gray-600 mb-4">You have to select at least two fonts</p>

            {validationError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{validationError}</div>}
            {successMsg && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMsg}</div>}

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

                {fontRows.map((row, index) => (
                    <div key={row.id} className="flex items-center mb-2 border border-gray-200 rounded p-2 bg-gray-50">
                        <div className="w-8 text-center mr-2">{index + 1}</div>
                        <div className="flex-1 mr-2">
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={
                                    row.fontId
                                        ? fonts.find(f => f.id === parseInt(row.fontId))?.name.replace('.ttf', '')
                                        : ''
                                }
                                placeholder="Font Name"
                                disabled
                            />
                        </div>
                        <div className="flex-1 mr-2">
                            <select
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                                value={row.fontId}
                                onChange={(e) => handleRowChange(row.id, 'fontId', e.target.value)}
                            >
                                <option value="">Select a Font</option>
                                {fonts
                                    .filter(font => {
                                        const selectedFontIds = fontRows
                                            .filter(r => r.id !== row.id) // Exclude current row
                                            .map(r => r.fontId);
                                        return !selectedFontIds.includes(font.id.toString());
                                    })
                                    .map(font => (
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
                ))}

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
