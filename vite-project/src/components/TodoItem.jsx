import React from "react";

export default function TodoItem({ todo, onDelete, dDayText }) {
    return (
        <li className="bg-pink-300 p-4 rounded shadow flex justify-between items-start">
            <div>
                <h3 className="font-bold">{todo.title}</h3>
                <p className="text-sm">{todo.detail}</p>
                <p className="text-xs mt-1">{dDayText}</p>
            </div>
            <button
                className="text-xs bg-red-400 text-white px-2 py-1 rounded"
                onClick={onDelete}
            >
                삭제
            </button>
        </li>
    );
}
