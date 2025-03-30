import React from 'react';
export const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-red-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="text-xl text-gray-700">Seite nicht gefunden</p>
                <a href="/" className="mt-4 inline-block bg-custom-text-green text-white px-4 py-2 rounded-md">
                    Zurück zur Startseite
                </a>
            </div>
        </div>
    );
};


export default ErrorPage;


