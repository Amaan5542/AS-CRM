import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="py-6 text-white bg-gray-800">
            <div className="container px-8 mx-auto">
                <div className="flex flex-col items-center justify-between mt-5 md:flex-row md:space-x-8">
                    {/* Logo Section */}
                    <div className="flex justify-start flex-shrink-0 mb-6 md:w-1/4 md:mb-0">
                        <img
                            src="/Ayushmanlogo.png"
                            alt="Ayushman Logo"
                            className="w-40 h-auto rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Address and Contact Section */}
                    <div className="flex-1 px-4 mx-auto mb-6 text-center md:w-1/2 md:mb-0">
                        <h3 className="mb-2 text-lg font-bold">Our Address</h3>
                        <p className="mb-4 text-base leading-relaxed">
                            C-23, Second Floor, Ishaan Corporate Towers,<br />
                            Sector-13, Vasundhara, Ghaziabad-201012
                        </p>
                        <h3 className="mb-2 text-lg font-bold">Contact Us</h3>
                        <p className="mb-2 text-base">
                            Website:{" "}
                            <a
                                href="https://www.ayushmansolution.com/"
                                className="text-blue-400 hover:underline"
                            >
                                ayushmansolution.com
                            </a>
                        </p>
                        <p className="text-base">
                            Email:{" "}
                            <a
                                href="mailto:info@ayushmansolution.com"
                                className="text-blue-400 hover:underline"
                            >
                                info@ayushmansolution.com
                            </a>
                        </p>
                    </div>

                    {/* Social Media Section */}
                    <div className="flex justify-start space-x-6 md:w-1/4 md:justify-end">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-white"
                        >
                            <FaFacebook size={30} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-white"
                        >
                            <FaTwitter size={30} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ayushman-solutions-250508210/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-white"
                        >
                            <FaLinkedin size={30} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
