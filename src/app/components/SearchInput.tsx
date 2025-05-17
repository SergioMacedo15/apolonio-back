import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex items-center px-4 py-2 bg-gray-700 border-b border-gray-600">
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Pesquisar..."
        value={value}
        onChange={onChange}
        className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
}
