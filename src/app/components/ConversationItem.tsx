"use client";

import Image from "next/image";
import {useState, useRef} from "react";
import {toast} from "react-toastify";

interface ConversationItemProps {
    profileImage: string;
    name: string;
    lastMessage: string;
    time: string;
}

export default function ConversationItem({profileImage, name, lastMessage, time}: ConversationItemProps) {
    const [isShaking, setIsShaking] = useState(false);
    const isShakingRef = useRef(false);

    const handleClick = () => {
        if (name == "Vó") {
            return;
        }

        if (isShakingRef.current) return;

        setIsShaking(true);
        isShakingRef.current = true;

        toast.error(`Foco na missão, soldado!`, {
            position: "top-right",
            autoClose: 1700,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });

        setTimeout(() => {
            setIsShaking(false);
            isShakingRef.current = false;
        }, 650);
    };

    return (
        <>
            <div onClick={handleClick} className={`flex items-center p-3 gap-3 hover:bg-gray-700 cursor-pointer transition-colors ${isShaking ? "animate-shake" : ""}`}>
                <Image src={profileImage} alt={name} width={48} height={48} className="rounded-full object-cover" />
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{name}</span>
                        <span className="text-sm text-gray-400">{time}</span>
                    </div>
                    <p className="text-gray-400 text-sm truncate">{lastMessage}</p>
                </div>
            </div>
            <div className="w-[75%] mr-4 ml-auto border-t border-gray-600" />
        </>
    );
}
