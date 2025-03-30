import { useEffect } from 'react';

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrollt nach oben
  }, []);
  const reshare = ['r', 'e', 's', 'h', 'a', 'r', 'e'];
  return (
    <>
      <div
        className="
          relative
          overscroll-contain
          h-screen
          w-100
          "
      >
        <div
          className="
              bg-[url(./assets/top.jpg)] 
              bg-center
              md:bg-top
              bg-clip-content
              bg-cover 
              absolute 
              inset-0 
              bg-transparent
              opacity-80
              
              "
        ></div>
        <div
          className="
              absolute
              flex
              items-center
              justify-items-center
              transition
              text-5xl
              gap-8
              inset-0
              bottom-48
              left-4
              md:left-20
              md:text-7xl
              md:gap-16
              md:bottom-40
              xl:left-40
              xl:text-9xl
              xl:gap-24 
              "
        >
          {reshare.map((letter, index) => (
            <p
              key={index}
              className={`
                [text-shadow:_0_4px_6px_rgba(51_51_51_/_0.5)]  
                md:[text-shadow:_0_6px_6px_rgba(51_51_51_/_0.5)]  
                xl:[text-shadow:_0_10px_6px_rgba(51_51_51_/_0.5)]  
                text-custom-text-brown
                opacity-0
                animate-flyIn
                [animation-delay:${index * 0.15}s]
                `}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {letter}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};
