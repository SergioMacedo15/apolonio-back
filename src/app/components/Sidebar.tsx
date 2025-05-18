"use client";

import {ArrowPathIcon} from "@heroicons/react/24/solid";
import {UserCircleIcon} from "@heroicons/react/24/solid";

export default function Sidebar() {
    const handleRestart = () => {
        sessionStorage.clear();
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-end h-full pb-4 gap-3">
            <button
                onClick={handleRestart}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full cursor-pointer"
            >
                <ArrowPathIcon className="w-6 h-6 text-white" />
            </button>

            <UserCircleIcon className="w-14 h-14 text-white" />
        </div>
    );
}
