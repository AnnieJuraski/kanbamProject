import { useState } from "react";
import { CircleFlag } from "react-circle-flags";
import Button from "../Button/Button";
import "./LanguageDropdown.css";

function LanguageDropdown({  
  currentLanguage,  
  setCurrentLanguage,  
  languages,  
}) {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="language-selector">
            <Button variant="control"
            onClick={() => setIsOpen((prev) => !prev)}>
                <CircleFlag countryCode={languages[currentLanguage].code}
                />                
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

