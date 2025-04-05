import { useState, useRef, useEffect } from 'react';
import { postData } from '../utils/axiosInstance';

function UploadFont({ onSuccess }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 3000);
            return () => clearTimeout(timer); 
        }
    }, [message]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            validateAndSetFile(file);
        }
    };

    const validateAndSetFile = (file) => {
        if (!file.name.toLowerCase().endsWith('.ttf')) {
            setMessage({ type: 'error', text: 'Only TTF files are allowed' });
            return;
        }
        setSelectedFile(file);
        setMessage(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            validateAndSetFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('font', selectedFile);

            const response = await postData('/upload-font', formData);

            if (response.success) {
                setMessage({ type: 'success', text: 'Font uploaded successfully!' });
                setSelectedFile(null);
                
                // Call the onSuccess callback to refresh the font list
                if (onSuccess) {
                    onSuccess();
                }
            } else {
                setMessage({ type: 'error', text: response.error || 'Upload failed on server' });
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: error?.response?.data?.error || 'Failed to upload font. Please try again.'
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="my-16 w-[40%] mx-auto">
            <div
                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer bg-gray-50 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Icon + Text */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>

                <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">Only TTF File Allowed</p>

                {selectedFile && (
                    <div className="mt-4 flex items-center">
                        <span className="text-sm font-medium text-blue-600 mr-2">{selectedFile.name}</span>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleUpload();
                            }}
                            className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                            disabled={isUploading}
                        >
                            {isUploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept=".ttf"
                onChange={handleFileChange}
                className="hidden"
            />

            {message && (
                <div className={`mt-3 p-3 rounded text-sm transition-all duration-300 ease-in-out 
                    ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
}

export default UploadFont;