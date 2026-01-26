import { Link, NavLink } from 'react-router-dom'

export const Information = () => {
  return (
    <>
      <div>
        <h4
          className="
                hidden
                md:text-3xl
                mb-6
                md:block
                xl:text-4xl
                "
        >
          Information
        </h4>
        <div
          className="
                pl-2
                flex
                flex-col
                gap-2
                "
        >
          <NavLink to="/about">
            <p
              className="
                    hover:text-custom-text-lightgreen
                    hover:underline
                    "
            >
              Über uns
            </p>
          </NavLink>
          <p
            className="
                    hover:text-custom-text-lightgreen
                    hover:underline
                    "
          >
            Abwicklung
          </p>
          {/* <p
            className="
                    hover:text-custom-text-lightgreen
                    hover:underline
                    "
          >
            AGBs
          </p> */}
          <Link
            to="/privacy"
            className="
                    hover:text-custom-text-lightgreen
                    hover:underline
                    "
          >
            Datenschutz
          </Link>
          <Link
            to="/imprint"
            className="
                    hover:text-custom-text-lightgreen
                    hover:underline
                    "
          >
            Impressum
          </Link>
        </div>
      </div>
    </>
  )
}
