import { IconButton, Panel } from '@maxhub/max-ui';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function NavigationBar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Актуальное", path: "/", icon: "fa-solid fa-forward" },
        { name: "Запланированные", path: "/scheduled", icon: "fa-solid fa-calendar-days" },
        { name: "Когда-нибудь", path: "/someday", icon: "fa-solid fa-mug-hot" },
    ];

    return (
        <>
            <IconButton
                className="absolute top-4 left-4 z-2"
                mode={isOpen ? "tertiary" : "primary"}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
            </IconButton>

            <Panel
                className={`fixed top-0 h-full z-[1]
        ${isOpen ? "w-60 p-4" : "w-0 py-0"}
        overflow-hidden flex flex-col transition-width ease-in-out duration-300`}
            >
                <nav className="pt-16 flex flex-col space-y-3">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-3 py-2 rounded-md text-nowrap whitespace-nowrap ${location.pathname === link.path
                                ? "bg-gray-300 dark:bg-gray-700"
                                : "hover:bg-gray-300 dark:hover:bg-gray-700"
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            <i className={`${link.icon} mr-3`} />
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </Panel>
        </>
    );
};

export default NavigationBar
