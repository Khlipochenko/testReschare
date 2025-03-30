import { createContext } from "react";

export const InboxContext = createContext();

export const InboxProvider = ({ children }) => {



    return <InboxContext.Provider value={{}}>
        {children}
    </InboxContext.Provider>
}

