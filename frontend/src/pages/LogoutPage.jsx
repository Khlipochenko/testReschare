import React from 'react';
export const LogoutPage = () => {
  return (
    <div className="min-h-screen pt-36 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-3xl font-bold text-custom-text-green">Sie haben sich abgemeldet</h1>
        <p className="text-custom-text-grey">Vielen Dank, dass Sie reshare genutzt haben.</p>
        <a
          href="/login"
          className="w-full py-2 px-4 bg-custom-text-green text-white rounded-md sm:hover:bg-custom-text-brown inline-block text-center"
        >
          Erneut anmelden
        </a>
      </div>
    </div>
  );
};

export default LogoutPage;
