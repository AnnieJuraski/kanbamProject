import { useState, useEffect, useRef } from "react";
import { CircleFlag } from "react-circle-flags";
import Button from "../Button/Button";
import "./LanguageDropdown.css";

function LanguageDropdown({ currentLanguage, setCurrentLanguage, languages }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    return (
        <div className="language-selector" ref={dropdownRef}>
            <Button variant="controls" onClick={() => setIsOpen((prev) => !prev)}>
                <CircleFlag countryCode={languages[currentLanguage].code} />
            </Button>

            {isOpen && (
                <div className="language-selector__dropdown">
                    {Object.entries(languages).map(([key, lang]) => (
                        <div
                            key={key}
                            className="language-selector__option"
                            onClick={() => {
                                setCurrentLanguage(key);
                                setIsOpen(false);
                            }}
                        >
                            <CircleFlag countryCode={lang.code} height="20" />
                            <span>{lang.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguageDropdown;
