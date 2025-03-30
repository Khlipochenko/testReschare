import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const SocialMedia = () => {
    const icons = [FaFacebookF, FaInstagram, FaTiktok, FaXTwitter]
    return (
        <>
            <div>
                <h4 className="
                    hidden
                    md:text-3xl 
                    mb-6
                    md:block
                    xl:text-4xl
                    "
                >
                    Social Media
                </h4>
                <div className="
                    pl-2 
                    grid 
                    grid-cols-2 
                    gap-7
                    "
                >
                    {icons.map((Icon, index) => (
                        <div key={index} className="
                        border-2
                        border-custom-text-green
                        text-custom-bg-page
                        bg-custom-text-green
                        rounded-lg
                        p-1
                        h-16
                        w-16
                        flex
                        justify-center
                        items-center
                        text-3xl
                        hover:bg-custom-text-brown
                        ">
                        {/* hover:bg-custom-text-green
                        hover:border-none
                        hover:text-custom-bg-footer */}
                            <Icon />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

