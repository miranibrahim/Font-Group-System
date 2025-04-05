import React from 'react';
import { Link } from 'react-router-dom';

function GroupRows({ group, onDelete }) {
    return (
        <tr>

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {group.name}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
                <div className="flex flex-wrap gap-1">
                    {group.font_names && group.font_names.map((font, index) => (
                        <span
                            key={index}
                            className=" text-gray-700 px-1 text-xs"
                        >
                            {font.replace('.ttf', '')}{index < group.font_names.length - 1 ? ',' : ''}
                        </span>
                    ))}
                </div>

            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {group.font_names.length}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-center space-x-2">
                    <Link
                        to={`/edit-group/${group.id}`}
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => onDelete(group.id, group.name)}
                        className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default GroupRows;