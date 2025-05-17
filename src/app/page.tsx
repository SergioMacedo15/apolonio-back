"use client"; // se estiver usando App Router

import React, { type JSX } from "react";

export default function Home(): JSX.Element {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    alert("Botão Enviar clicado!");
  };

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </main>
  );
}
