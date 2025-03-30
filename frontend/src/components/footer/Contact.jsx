import { useState } from "react";
import { InputField } from "./Input";
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';


export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true)
            const response = await fetch("http://localhost:3210/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message)
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Fetch failed:", error);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
            <div>
                <h4 className="
                  text-4xl
                  md:text-3xl
                  mb-6
                  hidden
                  md:block 
                ">
                    Kontakt
                </h4>
                <div className="
                  
                ">
                    <p className="
                        pl-2                  
                    ">
                        Du hast eine Frage? Kontaktiere uns:
                    </p>
                    <br />
                    <form className="
                      flex
                      flex-col
                      pr-4
                      pl-2
                      border-2
                      border-custom-text-lightgreen

                      "
                        onSubmit={handleSubmit}
                    >
                        <InputField
                            label="Dein Name:"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Deine Email-Adresse"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Dein Anliegen:"
                            type="textarea"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={4}
                        />
                        <button className="
                        w-min
                        border-2
                        border-custom-text-green
                        bg-custom-text-green
                        text-custom-bg-page
                        rounded
                        p-1
                        self-end
                        mt-2
                        mb-2
                        hover:bg-custom-text-brown
                        "
                        // hover:bg-text-lightgreen
                        // hover:bg-custom-text-green
                        // hover:border-custom-text-green
                        // hover:text-custom-bg-footer
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <p>
                                    Wird gesendet...
                                    <FaSpinner className="animate-spin text-custom-text-green" />
                                </p>
                            ) : "Abschicken"}
                        </button>
                    </form>
                </div>

            </div>
        </>
    )
}