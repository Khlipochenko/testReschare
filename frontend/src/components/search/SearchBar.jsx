import React, { useContext, useEffect, useState } from 'react';
// import { SearchContext } from '../../context/SearchContext';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';

export const SearchBar = ({ isHomePage, isScrolled }) => {
  const { searchTerm, setSearchTerm, showSearch, setShowSearch, localSearchTerm, setLocalSearchTerm } =
    useContext(SearchContext);

  const { category } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    //setSearchTerm(e.target.value) // searchTerm wird auf Eingabewert gesetzt
    setLocalSearchTerm(e.target.value); // Lokale searchTerm wird auf den Eingabewert gesetzt
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLocalSearchTerm('');
    console.log('Search Term:', localSearchTerm);
    //setSearchTerm(e.target.value); // hier wird direkt gesucht, während die Eingabe erfolgt
    setSearchTerm(localSearchTerm); // hier wird erst gesucht, nachdem form submitted wird (button click oder enter)

    if (!category) {
      navigate(`/search?q=${localSearchTerm}`);
    }

    setShowSearch(false);
  };

  return showSearch ? (
    <div
      className={`flex w-full items-center justify-center text-center text-custom-darkgreen  z-40 ${
        isHomePage && !isScrolled ? 'absolute top-24 left-0 bg-transparent' : 'bg-custom-bg-footer border-y'
      }`}
    >
      <form
        onSubmit={handleSearch}
        className="inline-flex items-center justify-center bg-white border px-5 py-2 my-4  mx-3 rounded-md w-3/4 sm:w-1/2"
      >
        <input
          className="flex-1 outline-none bg-inherit text-lg"
          type="text"
          placeholder={`Suche ${category ? `in "${category}"` : 'in allen Artikeln'}`}
          value={localSearchTerm}
          onChange={handleChange}
        />
        <button
          type="submit"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="text-xl cursor-pointer"
        >
          <FaSearch />
        </button>
      </form>
      {/* <FaTimes
        onClick={() => {
          setShowSearch(false);
          setLocalSearchTerm('');
          setSearchTerm('');
        }}
        className="text-xl cursor-pointer"
      /> */}
    </div>
  ) : null;
};
