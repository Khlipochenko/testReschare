import React from 'react';

const Impressum = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-sm leading-relaxed text-gray-800 mt-28">
      <h1 className="text-2xl font-bold mb-4">Impressum</h1>

      <p>
        <strong>Angaben gemäß § 5 TMG</strong>
      </p>

      <p className="mt-2">
        Sono Dennis Willbrand
        <br />
        Romualdstr. 48
        <br />
        88416 Ochsenhausen
        <br />
        Deutschland
      </p>

      <h2 className="mt-6 text-xl font-semibold">Kontakt</h2>
      <p>
        E-Mail:{' '}
        <a href="mailto:so.willbrand@gmail.com" className="text-blue-600">
          so.willbrand@gmail.com
        </a>
      </p>

      <h2 className="mt-6 text-xl font-semibold">
        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
      </h2>
      <p>
        Sono Dennis Willbrand
        <br />
        Romualdstr. 48
        <br />
        88416 Ochsenhausen
      </p>

      <h2 className="mt-6 text-xl font-semibold">Hinweis zum Projekt</h2>
      <p className="italic text-gray-600">
        Bei dieser Website handelt es sich um ein rein pädagogisches
        Testprojekt, das im Rahmen eines Lernprozesses von Studierenden erstellt
        wurde. Es besteht keine kommerzielle Absicht. Die inhaltliche
        Verantwortung liegt bei der betreuenden Lehrkraft.
      </p>

      <h2 className="mt-6 text-xl font-semibold">Haftungsausschluss</h2>
      <p>
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
        für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
        sind ausschließlich deren Betreiber verantwortlich.
      </p>
      <p>
        Die externen Links auf dieser Website wurden zum Zeitpunkt der
        Verlinkung auf mögliche Rechtsverstöße überprüft. Eine kontinuierliche
        Kontrolle dieser Links ist jedoch nicht möglich. Für den Inhalt der
        verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
      </p>

      <h2 className="mt-6 text-xl font-semibold">Urheberrecht</h2>
      <p>
        Die durch die Ersteller:innen entwickelten Inhalte auf dieser Website
        unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche
        gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede
        Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
        schriftlichen Zustimmung.
      </p>
    </div>
  );
};

export default Impressum;
