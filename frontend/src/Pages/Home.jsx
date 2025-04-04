import { useState, useEffect } from 'react';
import FontRows from '../Components/FontRows';
import { deleteFont, getFonts } from '../utils/axiosInstance';
import UploadFont from './UploadFont';


function Home() {
    const [fonts, setFonts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadFonts = async () => {
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
    };

    useEffect(() => {
        loadFonts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this font?')) {
            try {
                await deleteFont(`/delete-font/${id}`);
                // Update the fonts list immediately after deletion
                setFonts(fonts.filter(font => font.id !== id));
            } catch (err) {
                alert('Failed to delete the font. Please try again.');
                console.error('Error deleting font:', err);
            }
        }
    };

    if (isLoading) {
        return <div className="text-center py-10">Loading fonts...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="w-[95%] mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Font Management System</h1>

            {fonts.length === 0 ? (
                <div>
                    <div className="text-center py-10 bg-gray-50 rounded">
                        No fonts available. Please upload some fonts.
                    </div>
                    <UploadFont/>
                </div>
            ) : (
                <div className="overflow-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="text-left py-3 px-4 font-semibold">Font Name</th>
                                <th className="text-left py-3 px-4 font-semibold">Example Style</th>
                                <th className="text-left py-3 px-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fonts.map(font => (
                                <FontRows
                                    key={font.id}
                                    font={font}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Home;