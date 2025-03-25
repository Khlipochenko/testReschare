import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const useGetItemForChat = (itemId) => {
    const [item, setItem] = useState(null)
    const [loadingItem, setLoadingItem] = useState(true);
    const url = import.meta.env.VITE_API_URL;
    useEffect(() => {
        if (!itemId) return
        const getItem = async () => {


            try {
                const res = await fetch(`${url}/api/items/${itemId}`)
                if (!res.ok) {
                    console.log(res)
                    throw new Error('Failed to fetch data for item-card')
                }
                const data = await res.json()
                console.log("Fetched item:", data);
                if (!data) {
                    toast.error('Kein Artikel gefunden.')
                    return
                }

                setItem(data.item)

            } catch (error) {
                toast.error(error.message)
            }
            finally {
                setLoadingItem(false);
            }


        }


        getItem()
    }, [itemId])
    return { item, loadingItem }
}