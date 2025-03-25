import { useState } from 'react'


export const useGetConversations = () => {
    const [conversations, setConversations] = useState([]);
    const url = import.meta.env.VITE_API_URL

    const getConversations = async () => {
        if (!userId) return
        try {
            const res = await fetch(`${url}/api/inbox/${userId}`, {
                method: 'GET',
                credentials: 'include',
            });
        } catch (error) {

        }

    }


}