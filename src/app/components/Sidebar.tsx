import Image from "next/image";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  return (
      <div className="flex flex-col items-center justify-end h-full pb-4 gap-3">
        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full">
        <Cog6ToothIcon className="w-6 h-6 text-white" />
      </button>

      <Image
        src="/profile.png"
        alt="Perfil"
        width={48}
        height={48}
        className="rounded-full"
      />
    </div>
  );
}
