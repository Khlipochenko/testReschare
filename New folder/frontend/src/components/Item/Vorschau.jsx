import { OneItem } from "./OneItem/OneItem"
import { IoMdClose } from "react-icons/io";
export const Vorschau = ({item, setShowVorshau}) => {
  return (
    <div className="bg-white overflow-y-auto p-5 rounded-md relative  h-auto max-h-full w-full md:w-3/4  "> <h1 className="text-custom-highlight-cherryred my-6 text-xl md:text-3xl font-medium text-center">Vorschau</h1>
    <OneItem item={item}></OneItem>
    <IoMdClose className="absolute top-3 text-xl right-3 cursor-pointer sm:hover:text-custom-highlight-cherryred"  onClick={()=>setShowVorshau(false)}/>
    </div>

  )
}
