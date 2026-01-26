import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrollt nach oben
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 text-sm leading-relaxed text-gray-800 mt-28">
      <h1 className="text-2xl font-bold mb-4">Datenschutzerklärung</h1>
      <p>
        <strong>Stand:</strong> 09.04.2025
      </p>

      <h2 className="mt-6 text-xl font-semibold">1. Verantwortlicher</h2>
      <p>
        Sono Dennis Willbrand
        <br />
        Romualdstr. 48
        <br />
        88416 Ochsenhausen
        <br />
        E-Mail:{' '}
        <a href="mailto:so.willbrand@gmail.com" className="text-blue-600">
          so.willbrand@gmail.com
        </a>
      </p>

      <h2 className="mt-6 text-xl font-semibold">2. Hosting</h2>
      <p>
        Diese Website wird über <strong>Render.com</strong> gehostet. Der
        Serverstandort ist in Frankfurt am Main, Deutschland. Ein Vertrag zur
        Auftragsverarbeitung (AVV) mit Render.com wird derzeit geprüft. Wenn Sie
        in der <b>EU</b> oder dem <b>UK</b> ansässig sind, haben Sie zusätzliche
        Rechte gemäß der <b>Datenschutz-Grundverordnung (DSGVO)</b> bzw. der
        <b>UK DSGVO</b>. Weitere Informationen über diese Rechte und wie Render
        Ihre personenbezogenen Daten verarbeitet, finden Sie in deren{' '}
        <a
          href="https://render.com/privacy#european-union-and-united-kingdom-data-subject-rights"
          className="text-blue-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          Datenschutzerklärung.
        </a>
        .
      </p>

      <h2 className="mt-6 text-xl font-semibold">3. Zugriffsdaten</h2>
      <p>
        Beim Besuch der Website werden automatisch folgende Daten durch den
        Hostinganbieter gespeichert: IP-Adresse (anonymisiert), Datum & Uhrzeit,
        Browsertyp, Betriebssystem, Referrer-URL. Diese Daten dienen
        ausschließlich der technischen Sicherheit.
      </p>

      <h2 className="mt-6 text-xl font-semibold">4. Keine Tracking-Tools</h2>
      <p>Es werden keine Tracking- oder Analyse-Tools verwendet.</p>

      <h2 className="mt-6 text-xl font-semibold">
        5. Externe Dienste: Cloudinary
      </h2>
      <p>
        Cloudinary nutzt Standardvertragsklauseln (SCCs), um sicherzustellen,
        dass die Datenübertragung in die USA gemäß den Anforderungen der DSGVO
        erfolgt.
      </p>
      <p>
        Zur Bereitstellung von Bildern wird <strong>Cloudinary</strong> genutzt:
        <br />
        Anbieter: Cloudinary Ltd., Santa Clara, CA, USA
        <br />
        Es kann zur Übertragung personenbezogener Daten (z. B. IP-Adresse) in
        die USA kommen.
      </p>

      <h2 className="mt-6 text-xl font-semibold">6. Kontaktformular</h2>
      <p>
        Bei Nutzung des Kontaktformulars werden Name und E-Mail-Adresse erhoben.
        Die Daten werden per E-Mail an den Verantwortlichen weitergeleitet und
        nicht dauerhaft gespeichert.
      </p>

      <h2 className="mt-6 text-xl font-semibold">7. Cookies</h2>
      <p>
        Es wird ein technisch notwendiger <strong>JWT-Cookie</strong> gesetzt,
        der der Authentifizierung dient. Es werden keine Tracking-Cookies
        verwendet.
      </p>

      <h2 className="mt-6 text-xl font-semibold">
        8. Speicherung und Löschung von Chat-Daten
      </h2>
      <p>
        Falls Sie den Chat-Dienst auf unserer Website nutzen, werden Ihre
        Chat-Nachrichten und -Verläufe zur technischen Bereitstellung des
        Services gespeichert. Diese Daten sind ausschließlich für den
        Kommunikation zwischen Ihnen und uns (den Entwicklern) zugänglich. Die
        Daten werden nicht dauerhaft gespeichert, sondern nur für die Dauer der
        Nutzung des Chats aufbewahrt. Nach Abschluss des Chats oder nach
        Beendigung der Kommunikationssitzung werden die Daten entweder gelöscht
        oder anonymisiert.
      </p>
      <p>
        Sie haben das Recht, die Löschung Ihrer Chat-Daten zu verlangen. Wenn
        Sie Ihre Daten löschen möchten, kontaktieren Sie uns bitte per E-Mail
        an:{' '}
        <a href="mailto:so.willbrand@gmail.com" className="text-blue-600">
          so.willbrand@gmail.com
        </a>
        .
      </p>

      <h2 className="mt-6 text-xl font-semibold">9. Speicherdauer</h2>
      <p>
        Kontaktformulardaten werden gelöscht, sobald sie nicht mehr benötigt
        werden. Eine automatische Löschfrist besteht derzeit nicht.
      </p>

      <h2 className="mt-6 text-xl font-semibold">10. Betroffenenrechte</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung,
        Widerspruch und Datenübertragbarkeit. Kontaktieren Sie uns dazu per
        E-Mail an:{' '}
        <a href="mailto:so.willbrand@gmail.com" className="text-blue-600">
          so.willbrand@gmail.com
        </a>
        .
      </p>

      <h2 className="mt-6 text-xl font-semibold">11. SSL-Verschlüsselung</h2>
      <p>
        Diese Website nutzt SSL/TLS zur sicheren Übertragung. Erkennbar am
        „https://“ in der Adresszeile.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
