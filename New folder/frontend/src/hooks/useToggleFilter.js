import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

export const useToggleFilter = () => {
  const { setPendingFilters } = useContext(FilterContext);

  //filterValue: z.B. Damen, filterType: z.B. Kategorie
  //filterValue: z.B. Blau, filterType: z.B. Farbe
  const togglePendingFilter = (filterValue, filterType) => {
    setPendingFilters((prevFilters) => {
      const newFilterValues = prevFilters[filterType].includes(filterValue)
        ? prevFilters[filterType].filter((item) => item !== filterValue)
        : [...prevFilters[filterType], filterValue];

      return { ...prevFilters, [filterType]: newFilterValues };
    });
  };

  return { togglePendingFilter };
};
