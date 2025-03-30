import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
export const Ort = ({ ort, setOrt, new: isNew }) => {
  const [searchOrt, setSearchOrt] = useState('');
  const [advices, setAdvices] = useState([]);
  function handleOnSelectStadt(stadt) {
    setSearchOrt(`${stadt.name}, ${stadt.country}`);
    
    setOrt({ city: stadt.name, country: stadt.country });
    setAdvices([]);
  }
  const searchFunktion = async () => {
    if (searchOrt.trim().length < 2) {
      setAdvices([]);
      return;
    }
    try {
      const response = await fetch(
        `https://photon.komoot.io/api/?q=${searchOrt}&lat=52.3879&lon=13.0582&lang=de&limit=50`
      );
      const data = await response.json();
      console.log(data.features);
      const searchData = data.features.filter((element) => {
        // console.log(element.properties)
        return (
          element.properties.country === "Deutschland" && // Nur deutsche Städte
         (  element.properties.osm_value === "city" ||
           element.properties.osm_value === "town" ||
           element.properties.osm_value === "village")
        );
      });
  //    console.log("search data", searchData);
      setAdvices(searchData || []);
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
    }
  };
  useEffect(() => {
    if (!isNew && ort !== "") {
      setSearchOrt(`${ort.city ? ort.city + ', ' : ''}${ort.country}`);
     
    }
  }, [ort]);
  
  return (
    <div className=" flex flex-col">
      <label htmlFor="ort" className="mt-6 mb-3">
        Ort:
      </label>
      <div className="w-100 p-2 shadow rounded focus-within:border-custom-text-lightgreen bg-white border relative">
        <input
          autoComplete="off"
          type="text"
          id="ort"
          name="ort"
          className=" outline-none"
          onChange={(e) => {
            setSearchOrt(e.target.value);
            searchFunktion();
          }}
          value={searchOrt}
          placeholder="Stadt eingeben..."
        />{" "}
        <span
          className="p-1 cursor-pointer absolute top-2 right-2"
          onClick={() => {
            setOrt("");
            setSearchOrt("");
            setAdvices("");
          }}
        >
          <IoMdClose className="sm:hover:scale-110" />
        </span>
      </div>
      {advices.length > 0 && (
        <ul
          className={`border rounded bg-white  shadow  max-h-32      ${
            advices.length > 3 ? "overflow-y-scroll" : ""
          }`}
        >
          {advices.map((advice, i) => (
            <li
              key={i}
              className="p-2 cursor-pointer sm:hover:bg-custom-text-lightgreen border-b"
              onClick={() => handleOnSelectStadt(advice.properties)}
            >
              {advice.properties.name}, {advice.properties.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
