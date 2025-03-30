import { useEffect, useState } from "react"
import { toast } from "react-toastify";
export const useAuth = () => {
   const [user, setUser] = useState(null);
   const [loadingUser, setLoadingUser] = useState(true)
   const url = import.meta.env.VITE_API_URL;
   useEffect(() => {
       setLoadingUser(true)
       const fetchUser = async () => {
           try {
               const res = await fetch(`${url}/api/users/me`, {
                   method: "GET",
                   credentials: "include",
                   headers: { "Content-Type": "application/json" }
               });


               const data = await res.json();
              // console.log("USER DATA:", data);


               if (res.ok) {
                   setUser(data.user);


               } else {
                   // toast.error('login failed')
                   console.log("fehler beim laden des users:", data.message);
               }
           } catch (error) {
               console.log("fehler in useAuth", error.message);
           } finally {
               setLoadingUser(false);  // Stop loading after request completes
           }
        };


        fetchUser();
    }, []);
 
 
    return { user, loadingUser };
 };

