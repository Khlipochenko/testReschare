
import { useGetItemForChat } from "../../hooks/useGetItemForChat"

export const ProductCardChat = ({ itemId }) => {

    const { item } = useGetItemForChat(itemId)

    return (<>


        <div>ProductCardChat
            {
                item ? (
                    <div className="flex justify-around h-10 ">
                        <h2>{item.title}</h2>
                        {item.images && item.images.length > 0 ? (<img src={item.images[0]} alt="item first picture" />) : (<p>no image</p>)}

                    </div>



                ) : (

                    <div className='flex justify-center items-center h-20 w-96'>



                    </div>

                )
            }


        </div >

    </>

    )
}