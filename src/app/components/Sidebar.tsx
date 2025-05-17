"use client";

import Image from "next/image";
import {Cog6ToothIcon} from "@heroicons/react/24/solid";
import {useState, useRef} from "react";
import {toast} from "react-toastify";

export default function Sidebar() {
    const [isRotating, setIsRotating] = useState(false);
    const isRotatingRef = useRef(false);

    const handleClick = () => {
        if (isRotatingRef.current) return;

        setIsRotating(true);
        isRotatingRef.current = true;

        toast.error(`Foco na missão, soldado!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });

        setTimeout(() => {
            setIsRotating(false);
            isRotatingRef.current = false;
        }, 650);
    };

    return (
        <div className="flex flex-col items-center justify-end h-full pb-4 gap-3">
            <button onClick={handleClick} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full cursor-pointer">
                <Cog6ToothIcon className={`w-6 h-6 text-white transition-transform ${isRotating ? "animate-spin" : ""}`} />
            </button>

            <Image src="/profile.png" alt="Perfil" width={48} height={48} className="rounded-full" />
        </div>
    );
}
