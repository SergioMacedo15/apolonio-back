import Image from "next/image";

export default function HeaderChat() {
  return (
    <div className="flex items-center p-4 border-b border-gray-600 bg-gray-800 text-white">
      <Image
        src="/profile-old-woman.jpg"
        alt="Perfil"
        width={40}
        height={40}
        className="rounded-full mr-3"
      />
      <div>
        <p className="text-sm font-medium">Vó</p>
        <p className="text-xs text-green-500">Online</p>
      </div>
    </div>
  );
}
