import { Contact } from './Contact';
import { Information } from './Information';
import { SocialMedia } from './SocialMedia';
import { useState } from 'react';

import { FaRegCopyright } from 'react-icons/fa';

export const Footer = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };
  return (
    <>
      <div
        className="
                static
                bottom-0
                w-full 
                bg-custom-bg-footer
                p-10
                divide-y-2 * > 
                divide-custom-text-lightgreen
                divide-opacity-30 > *
                "
      >
        <div
          className="
                    flex
                    justify-around
                    items-center
                    gap-8
                    flex-col
                    md:flex-row
                    md:items-start
                    "
        >
          {/* Contact */}
          <div
            className="
                        flex 
                        flex-col 
                        gap-4
                        "
          >
            <button
              onClick={() => toggleDropdown('contact')}
              className="
                            text-3xl 
                            md:hidden
                            w-full
                            text-center
                            "
            >
              Kontakt
            </button>
            <div
              className={`
                          mt-2 
                          ${openDropdown === 'contact' ? 'block' : 'hidden'} 
                          md:block
                        `}
            >
              <Contact />
            </div>
          </div>

          {/* SocialMedia */}
          <div
            className="
                        flex 
                        flex-col 
                        gap-4
                        "
          >
            <button
              onClick={() => toggleDropdown('social')}
              className="
                            text-3xl
                            md:hidden
                            "
            >
              Social Media
            </button>
            <div
              className={`
                          mt-2 
                          ${openDropdown === 'social' ? 'block' : 'hidden'} 
                          md:block
                        `}
            >
              <SocialMedia />
            </div>
          </div>

          {/* Information */}
          <div
            className="
                        flex 
                        flex-col 
                        gap-4
                        "
          >
            <button
              onClick={() => toggleDropdown('info')}
              className="
                            text-3xl
                            md:hidden
                            "
            >
              Information
            </button>
            <div
              className={`
                          mt-2 
                          ${openDropdown === 'info' ? 'block' : 'hidden'} 
                          md:block
                        `}
            >
              <Information />
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 flex justify-center items-center gap-2">
          <FaRegCopyright />
          <p className="text-custom-text-brown">2025</p>
          <p className="text-xl">reshare</p>
        </div>
        <p className="italic text-sm text-gray-500 text-center">
          Diese Website ist ein nicht-kommerzielles Lernprojekt im Rahmen eines
          Bildungszwecks. Alle Inhalte dienen ausschließlich zu Übungszwecken.
        </p>
      </div>
    </>
  );
};
