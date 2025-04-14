import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import GroupRows from '../Components/GroupRows';
import { getData, deleteData } from '../utils/axiosInstance';

function GroupList() {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            setIsLoading(true);
            const data = await getData('/groups');
            setGroups(data);
            setError(null);
        } catch (err) {
            setError('Failed to load font groups.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!confirm(`Delete group "${name}"?`)) return;

        try {
            await deleteData(`/delete-group/${id}`);
            setGroups(prev => prev.filter(g => g.id !== id));
            setSuccessMsg(`Group "${name}" deleted.`);

            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            setError('Failed to delete group.');
            console.error(err);
        }
    };

    if (isLoading) return <div className="text-center py-10">Loading font groups...</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Font Groups</h1>
            </div>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
            {successMsg && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMsg}</div>}

            {groups.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-md">
                    <p className="text-gray-600">No font groups available.</p>
                    <Link to="/create-group" className="text-blue-600 mt-2 inline-block hover:underline">
                        Create your first font group
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fonts</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {groups.map(group => (
                                <GroupRows key={group.id} group={group} onDelete={handleDelete} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default GroupList;
