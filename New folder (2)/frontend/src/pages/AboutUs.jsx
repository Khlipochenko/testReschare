import React, { useEffect, useRef } from 'react';
import img from '/bild.jpg';
import panova from '/Panova.jpg';
import chrissi from '/Chrissi.jpg';
import { AboutUsCardTeam } from '../components/aboutUs/AboutUsCardTeam';
import { ToolCard } from '../components/aboutUs/ToolCard';
import '../components/aboutUs/AboutUs.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrollt nach oben
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 480, // Für kleine Smartphones
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 768, // Für größere Smartphones
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1024, // Für Tablets
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1280, // Für kleine Desktops
        settings: {
          slidesToShow: 4
        }
      }
    ]
  };
  const team = [
    {
      name: 'Ann-Kristin Eisele',
      image: chrissi,
      github: 'https://github.com/AKE48',
      linkedin: '#',
      title: 'Full Stack Developer'
    },
    {
      name: 'Ines Messelmani',
      image: img,
      github: 'https://github.com/dci1234ines',
      linkedin: 'https://www.linkedin.com/in/ines-messelmani-47a113348/',
      title: 'Full Stack Developer'
    },
    {
      name: 'Mi-Young Wessels',
      image: img,
      github: 'https://github.com/MingWessels',
      linkedin: '#',
      title: 'Full Stack Developer'
    },
    {
      name: 'Ioana-Larisa Kempf',
      image: img,
      github: 'https://github.com/LaraKempf',
      linkedin: '#',
      title: 'Full Stack Developer'
    },
    {
      name: 'Natalia Panova',
      image: panova,
      github: 'https://github.com/Khlipochenko',
      linkedin: 'https://www.linkedin.com/in/natalia-panova-5aa8a0346/',
      title: 'Full Stack Developer'
    }
  ];

  const tools = [
    {
      name: 'HTML',
      img: 'https://cdn.iconscout.com/icon/free/png-256/free-html-5-logo-icon-download-in-svg-png-gif-file-formats--programming-langugae-language-pack-logos-icons-1175208.png?f=webp'
    },
    {
      name: 'JavaScript',
      img: 'https://miro.medium.com/v2/resize:fit:344/1*tZHcs0d7MAG-BBcjBekZYA.png'
    },
    {
      name: 'React',
      img: 'https://github.com/facebook/react/wiki/react-logo-1000-transparent.png'
    },
    {
      name: 'CSS',
      img: 'https://cdn.iconscout.com/icon/free/png-512/free-css-logo-icon-download-in-svg-png-gif-file-formats--logos-pack-icons-722685.png?f=webp&w=256'
    },
    {
      name: 'Tailwind',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/640px-Tailwind_CSS_Logo.svg.png'
    },
    {
      name: 'MongoDB',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ZYtHv2OLXmthRPbkmENZRXuqBVDwlsrZ1A&s'
    },
    {
      name: 'Node.js',
      img: 'https://pluralsight2.imgix.net/paths/images/nodejs-45adbe594d.png'
    },
    {
      name: 'Socket.IO',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/1200px-Socket-io.svg.png?20200308235956'
    }
  ];
  return (
    <div className="w-9/12 2xl:w-8/12  mx-auto py-36">
      <div className="mt-10">
        <h1 className="text-xl my-4 text-center text-custom-text-brown font-medium">Über uns</h1>
        <div>
          <p className="mb-6 text-justify">
            Diese Tauschbörse ist das Ergebnis unseres Abschlussprojekts im Webentwicklungs-Kurs. Mit viel Leidenschaft
            und Teamarbeit haben wir eine Plattform geschaffen, die nicht nur den Austausch von Artikeln ermöglicht,
            sondern auch unsere erworbenen Fähigkeiten in modernen Webtechnologien widerspiegelt. Sie steht für unseren
            Lernprozess, unser Engagement und unsere Zukunft als Entwickler!
          </p>
        </div>
      </div>

      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-[100px]   sm:h-[150px] md:h-[200px] lg:h-[300px] object-cover rounded-lg shadow-lg "
      >
        <source src="/video2.mp4" type="video/mp4" />
        Dein Browser unterstützt kein Video.
      </video>

      <div className="mx-auto">
        <hr className="w-full bg-custom-text-lightgreen h-1 my-16 "></hr>
        <div className="">
          <div className="w-full">
            <h1 className="text-xl my-4 text-center text-custom-text-brown font-medium">Unser Team</h1>

            <div className="flex flex-wrap gap-12 justify-center">
              {team.map((person, i) => (
                <div
                  key={i}
                  className={i === 3 || i === 4 ? 'sm:col-span-1 sm:col-start-2 sm:col-end-3' : 'sm:col-span-1'}
                >
                  <AboutUsCardTeam person={person}></AboutUsCardTeam>
                </div>
              ))}
            </div>
          </div>
          <hr className="w-full bg-custom-text-lightgreen h-1 my-16 "></hr>
          <div className="mb-6">
            <h1 className="text-xl my-4 text-center text-custom-text-brown font-medium">Was haben wir benutzt</h1>
            <Slider {...settings}>
              {tools.map((tool, index) => (
                <div key={index} className=" h-40">
                  <div className="text-center text-custom-text-grey">{tool.name}</div>
                  <div className=" flex justify-center items-center  h-full">
                    <img className=" w-28" src={tool.img} alt="" />
                  </div>
                </div>
              ))}
            </Slider>{' '}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8  justify-center">
              {tools.map((tool, i) => (
                <ToolCard tool={tool} key={i}></ToolCard>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
