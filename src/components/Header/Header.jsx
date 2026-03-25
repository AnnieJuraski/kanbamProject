import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import Button from "../Button/Button";
import "./Header.css";
import { FaSun, FaMoon } from "react-icons/fa";

function Header({
    theme,
    toggleTheme,
    currentLanguage,
    setCurrentLanguage,
    languages,
}) {
    return(
        <header className="header">
            <h1 className="header__title">Kanban Board</h1>

            <div className="header__controls">
                <LanguageDropdown
                    currentLanguage={currentLanguage}
                    setCurrentLanguage={setCurrentLanguage}
                    languages={languages}
                />
                
                <Button onClick={toggleTheme} variant="control">
                    {theme === "dark" ? <FaSun /> : <FaMoon />}
                </Button>
            </div>
        </header>
    );
}

export default Header;