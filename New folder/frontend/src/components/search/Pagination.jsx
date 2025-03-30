import React from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  // Array für Seitenzahlen mit for-Schleife erstellen
  const paginationNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }

  // Funktion, um auf bestimmte Seite zu gehen
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      // page muss zwischen 1 und totalPages liegen
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex justify-end gap-2 mt-6">
      {/* Pfeil, um auf erste Seite zu springen (disabled, wenn man auf Seite 1 ist) */}
      <button
        onClick={() => {
          goToPage(1);
          window.scrollTo(0, 0);
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
          window.scrollTo(0, 0);
        }}
        disabled={currentPage === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-md  ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-custom-text-green hover:text-white'
        }`}
      >
        <FiChevronLeft />
      </button>

      {/* Alle Seitenzahlen */}
      {paginationNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => {
            goToPage(pageNumber);
            window.scrollTo(0, 0);
          }}
          className={`w-10 h-10 flex items-center justify-center rounded-md hover:bg-custom-text-green hover:text-white ${
            currentPage === pageNumber ? ' bg-custom-text-green text-white' : ' text-custom-text-green'
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {/* Pfeil, um auf nächste Seite zugehen (disabled auf letzter Seite) */}
      <button
        onClick={() => {
          goToPage(currentPage + 1);
          window.scrollTo(0, 0);
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
          window.scrollTo(0, 0);
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
