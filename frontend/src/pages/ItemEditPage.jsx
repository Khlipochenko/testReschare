import { useContext, useEffect, useState } from "react";

import { Size } from "../components/Item/Size";
import { Category } from "../components/Item/Category";
import { Fotos } from "../components/Item/Fotos";
import { Ort } from "../components/Item/Ort";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { Color } from "../components/Item/Color";
import { Shipping } from "../components/Item/Shipping";
import { Vorschau } from "../components/Item/Vorschau";
import { ItemsContext } from "../context/ItemsContext";

export const ItemEditPage = ({userId}) => {
  const { id } = useParams();


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryActiv, setCategoryActiv] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [size, setSize] = useState("");
  const [fotos, setFotos] = useState([]);
  const [fotosUrl, setFotosUrl]=useState([])
  const [ort, setOrt] = useState("");
  const [colors, setColors] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [shipping, setShipping] = useState("Versand möglich");
  const [status, setStatus]=useState('')
  const [showVorshau, setShowVorshau] = useState(false);
  const [errors, setErrors] = useState({
    title: false,
    categoryActiv: false,
    size: false,
    description: false,
    fotos: false,
    colors: false,
    fotosUrl:false
  });


  const navigate = useNavigate();
const location=useLocation()
  const { url, fetchUserItems } = useContext(ItemsContext);

  //Prüfen ob es alle Felder ausfüllen
  function benötigteFelderPrüfen() {
    let newErrors = {
      title: !title,
      categoryActiv: !categoryActiv,
      size: !size,
      description: !description,
      fotos: fotos.length=== 0,
      colors: colors.length === 0,
      fotosUrl:fotosUrl.length===0

      
    };
    setErrors(newErrors);
    if (
      !title ||
      !categoryActiv ||
      !size ||
      (fotos.length === 0&&fotosUrl.length===0)
       ||
      !description ||
      colors.length === 0
    ) {
      toast.dismiss()
      toast.error("Alle Felder mit * sollen ausgefüllt werden");
      return false;
    }
    return true;
  }

  //Vorschau Function
  const handleOnClickShowVorschau = () => {
    if (!benötigteFelderPrüfen()) {
      return;
    }

    setShowVorshau(true);
  };
  // Get Product

  const fetchItem = async () => {
    try {
      const response = await fetch(`${url}/api/items/user/${id}`, {
        method: "GET",
        credentials: "include",
      });
      // if (!response.ok) {
      //   throw new Error(response.status);
      // }
      const result = await response.json();
      if (result.success) {
        setTitle(result.item.title);
        setDescription(result.item.description);
        setCategoryActiv(result.item.category);
        setSubCategory(result.item.subcategory);
        setFotosUrl(result.item.images)
        setSize(result.item.size);
        setOrt(result.item.ort);
        setColors(result.item.color);
        setShipping(result.item.shipping);
        setStatus(result.item.status)
      } else {
        if(result.message==='No token provided')
        toast.error('Bitte melden Sie sich an!')
        navigate('/login', {state:{from: location.pathname}})
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Product update
  async function handleOnSubmitForm(e) {
    e.preventDefault();
    if (!benötigteFelderPrüfen()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title.trim());

      formData.append("description", description.trim());

      formData.append("category", categoryActiv);
      formData.append("subcategory", subcategory);
      formData.append("size", size);
      colors.forEach((color) => {
        formData.append(
          "color",
          JSON.stringify({ colorcode: color.colorcode, name: color.name })
        );
      });
      formData.append("shipping", shipping);

      if (ort.city && ort.country) {
        formData.append(
          "ort",
          JSON.stringify({ city: ort.city, country: ort.country })
        );
      }
      if (fotos.length > 0) {
        fotos.forEach((img) => {
          formData.append("images", img);
        });
      }
      if (fotosUrl.length > 0) {
        fotosUrl.forEach((img) => {
          formData.append("imagesUrl", img);
        });
      }
      setIsloading(true);
      const response = await fetch(`${url}/api/items/edit/${id}`, {
        method: "PUT",
        credentials:'include',
        body: formData,
      });

      // if (!response.ok) {
      //   setIsloading(false);
      //   toast.error("Error");
      //   return
      // }
      const result = await response.json();
     
        if (!result.success) {
          setIsloading(false);
           if(result.message==='No token provided'){
          ;
          navigate('/login', {state:{from: location.pathname}})
         toast.dismiss()
         return toast.error('Um einen Artikel zu bearbeiten, melde dich bitte an!')
       }   
      } else {
        setIsloading(false);
        fetchUserItems(userId)
        toast.success(result.message);
     
        navigate(-1);
        window.scrollTo(0, 0)
      }
    } catch (e) {
      setIsloading(false);
      toast.error(e.message);
    }
  }

  //Props für  Voschau
  const item = {
    title,
    description,
    categoryActiv,
    size,
    fotos,
    fotosUrl,
    ort,
    colors,
    shipping,
    subcategory,
    status
    
  };
  useEffect(() => {
    fetchItem();
  }, []);
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 h-screen w-screen backdrop-blur-sm bg-black/30 flex flex-col justify-center items-center z-50 ">
          <CircularProgress />
        </div>
      )}
      {showVorshau && (
        <div className="fixed inset-0 h-screen w-screen backdrop-blur-sm bg-black/30 flex flex-col justify-center items-center z-50 ">
          <Vorschau item={item} setShowVorshau={setShowVorshau}></Vorschau>
        </div>
      )}
      <div className="w-screen bg-custom-bg-page flex justify-center items-center pt-36 ">
        <div className="flex  pt-10 justify-center items-center flex-col text-custom-text-green bg-white max-lg:w-4/5 w-2/4 rounded shadow">
          <h1 className="text-3xl font-medium max-sm:text-xl">
            {" "}
            Artikel schenken
          </h1>
          <form
            className="flex flex-col w-7/12 max-md:w-4/6 max-sm:w-5/6 mt-4"
            onSubmit={(e) => handleOnSubmitForm(e)}
          >
            <label className="mb-2 mt-6" htmlFor="titel">
              Titel: <span className="text-custom-highlight-cherryred">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors((prev) => ({ ...prev, title: false }));
              }}
              placeholder="z.B. Hose"
              className={`p-2 rounded shadow outline-custom-text-lightgreen mb-3 border ${
                errors.title ? "border-custom-highlight-cherryred" : ""
              }`}
            />
            <label className="mb-2 mt-3 " htmlFor="beschreibung">
              Beschreibung:{" "}
              <span className="text-custom-highlight-cherryred">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors((prev) => ({ ...prev, description: false }));
              }}
              name="beschreibung"
              id="beschreibung"
              className={`rounded shadow outline-custom-text-lightgreen min-h-32 p-2 border ${
                errors.description ? "border-custom-highlight-cherryred" : ""
              }`}
            ></textarea>
            <Category
              errors={errors}
              setErrors={setErrors}
              categoryActiv={categoryActiv}
              setCategoryActiv={setCategoryActiv}
              subcategory={subcategory}
              setSubCategory={setSubCategory}
            />

            {categoryActiv && (
              <>
                <Size
                  category={categoryActiv}
                  setSize={setSize}
                  size={size}
                  errors={errors}
                  setErrors={setErrors}
                  new={false}
                />
                <Color
                  colors={colors}
                  setColors={setColors}
                  errors={errors}
                  setErrors={setErrors}
                ></Color>
              </>
            )}

            <Ort ort={ort}
             setOrt={setOrt}
             new={false}
             ></Ort>
            <Shipping shipping={shipping} setShipping={setShipping}></Shipping>
            <h1 className="mt-6">
              Bilder (max 6): <span className="text-custom-highlight-cherryred">*</span>
            </h1>

            <Fotos
            fotosUrl={fotosUrl}
            setFotosUrl={setFotosUrl}
              fotos={fotos}
              setFotos={setFotos}
              errors={errors}
              setErrors={setErrors}
            />
            <p className="text-custom-highlight-cherryred">* Pflichtfelder</p>
            <div className="flex gap-4 w-full justify-end mb-4 mt-6 flex-wrap flex-col sm:flex-row">
              <button
                onClick={() => handleOnClickShowVorschau()}
                type="button"
                className=" tracking-wider shadow p-2 rounded-lg bg-custom-text-brown text-white font-medium sm:hover:bg-custom-text-grey "
              >
                Vorschau
              </button>
              <button className="tracking-wider shadow p-2 rounded-lg bg-custom-text-brown text-white font-medium  sm:hover:bg-custom-text-grey">
              Aktualisieren
              </button>
             
              <NavLink to={'/user/items/userId'} className="tracking-wider shadow p-2 rounded-lg bg-custom-highlight-cherryred text-center text-white font-medium  sm:hover:bg-custom-text-grey">Zurück</NavLink> 
            </div>
          </form>
        </div>
      </div>
    </>
  );
};