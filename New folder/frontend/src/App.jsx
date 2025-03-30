import { RouterProvider } from "react-router-dom"
import { router } from "./utils/router"
import { ToastContainer } from "react-toastify";
import { ChatProvider } from "./context/ChatContext";
import { AuthProvider } from "./context/AuthContext";
// import { AppProviders } from "./context/AppContext";
import { SearchProvider } from "./context/SearchContext";
import { ItemsProvider } from "./context/ItemsContext";
import { FilterProvider } from "./context/FilterContext";
function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <SearchProvider>
          <ItemsProvider>
            <FilterProvider>

              <RouterProvider router={router} />
              <ToastContainer />


            </FilterProvider>
          </ItemsProvider>
        </SearchProvider>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
