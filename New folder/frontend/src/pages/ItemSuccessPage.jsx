import { NavLink } from "react-router-dom";


export const ItemSuccessPage = () => {


    return (
 <div className="flex justify-center w-screen mt-32 items-center min-h-screen">
        <div className="flex bg-white flex-col px-7 py-16 gap-5 shadow-sm border border-cu rounded-md shadow-custom-text-lightgreen">
          <h1 className="text-xl font-medium md:text-3xl text-center">Erfolg!</h1>
          <p className="text-center">Dein neues Produkt wurde erfolgreich veröffentlicht.</p>
          <div className="flex gap-4">
            <NavLink to={`/user/items/meine-artikel`} className="shadow p-2 text-center rounded-lg bg-custom-text-green text-white font-medium sm:hover:bg-custom-text-brown ">
              Zu meinen Artikel
            </NavLink>
            <NavLink to={'/items/new/create'} className="shadow p-2 text-center rounded-lg bg-custom-text-green text-white font-medium  sm:hover:bg-custom-text-brown ">
              Weiteren Artikel hinzufügen
            </NavLink>
          </div>
        </div>
      </div>
    );
  }