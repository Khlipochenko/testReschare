import React from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

// Hilfsfunktion, um angezeigte Range zu bestimmen
const getPaginationRange = (totalPages, currentPage) => {
  const range = [];

  // Wenn es nur max 5 Seiten gibt, werden alle angezeigt
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
  } else {
    // wenn es über 5 Seiten sind, wird Seite 1 immer angezeigt
    range.push(1);

    // Wenn es mehr als 3 Seiten vor der aktuellen Seite gibt, wird Platzhalter "..." hinzugefügt (Ellipse)
    if (currentPage > 3) {
      range.push('...');
    }

    // Range, die in der Nähe der aktuellen Seite angezeigt wird
    const start = Math.max(2, currentPage - 1); // Start der angezeigten Range bei currentPage-1, mindestend aber bei seite 2
    const end = Math.min(totalPages - 1, currentPage + 1); // Ende der Range bei currentPage+1, geht nicht über letzte Seite hinaus
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Wenn es mehr als 2 Seiten nach der aktuellen Seite gibt, wird Platzhalter "..." hinzugefügt (Ellipse)
    if (currentPage < totalPages - 2) {
      range.push('...');
    }

    // Die letzte Seite wird wie die Seite 1 immer angezeigt
    range.push(totalPages);
  }

  return range;
};

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  // Array für Seitenzahlen mit for-Schleife erstellen
  const paginationNumbers = getPaginationRange(totalPages, currentPage);

  // Funktion, um auf bestimmte Seite zu gehen
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="flex justify-end gap-2 mt-6">
      {/* Pfeil, um auf erste Seite zu springen (disabled, wenn man auf Seite 1 ist) */}
      <button
        onClick={() => {
          goToPage(1);
        }}
        disabled={currentPage === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-md  ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-custom-text-green hover:text-white'
        }`}
      >
        <FiChevronsLeft />
      </button>

      {/* Pfeil, um auf vorherige Seite zu gehen (disabled, wenn man auf Seite 1 ist) */}
      <button
        onClick={() => {
          goToPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-md  ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-custom-text-green hover:text-white'
        }`}
      >
        <FiChevronLeft />
      </button>

      {/* Angezeigte Seitenzahlen mit Platzhaltern */}
      {paginationNumbers.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => goToPage(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-md hover:bg-custom-text-green hover:text-white ${
              currentPage === page ? 'bg-custom-text-green text-white' : 'text-custom-text-green'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="w-10 h-10 flex items-center justify-center text-custom-text-green">
            …
          </span>
        )
      )}

      {/* Pfeil, um auf nächste Seite zugehen (disabled auf letzter Seite) */}
      <button
        onClick={() => {
          goToPage(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 flex items-center justify-center rounded-md   ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-custom-text-green hover:text-white'
        }`}
      >
        <FiChevronRight className="text-lg" />
      </button>

      {/* Pfeil, um auf letzte Seite zu springen (disabled auf letzter Seite) */}
      <button
        onClick={() => {
          goToPage(totalPages);
        }}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 flex items-center justify-center rounded-md  ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-custom-text-green hover:text-white'
        }`}
      >
        <FiChevronsRight className="text-lg" />
      </button>
    </div>
  );
};

export default Pagination;
