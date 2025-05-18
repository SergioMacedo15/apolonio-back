import Image from "next/image";

export default function HeaderChat() {
  return (
    <div className="flex items-center px-4 pt-2 pb-3 bg-gray-800 text-white">
      <Image
        src="/profile-senhora.jpg"
        alt="Perfil"
        width={40}
        height={40}
        className="rounded-full mr-3"
      />
      <div>
        <p className="text-sm font-medium">Dona Dirce</p>
        <p className="text-xs text-green-500">Online</p>
      </div>
    </div>
  );
}
