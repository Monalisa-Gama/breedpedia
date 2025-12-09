// src/components/highlight-text.tsx
import React from 'react';

/**
 * Componente que destaca (grita) todas as ocorrências de uma substring (query)
 * dentro de um texto (text), ignorando maiúsculas/minúsculas.
 */
export function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query) {
    return <span>{text}</span>;
  }

  // Cria uma expressão regular global e sem distinção de maiúsculas/minúsculas
  const regex = new RegExp(`(${query})`, 'gi');
  
  // Divide o texto em partes: a parte que corresponde à query e a parte que não
  const parts = text.split(regex).filter(part => part.length > 0);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          // Se a parte corresponde à regex (ou seja, é a query), a destaca
          <strong key={index} className="text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 px-0.5 rounded">
            {part}
          </strong>
        ) : (
          // Caso contrário, é apenas texto normal
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}