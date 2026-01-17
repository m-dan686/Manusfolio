import { useTheme } from "../../context/ThemeContext";
import "./themeToggle.css";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    // Ensure "light" class is present/absent for CSS animations
    const toggleClass = theme === "light" ? "light" : "";

    return (
        <button
            className={`theme-toggle ${toggleClass}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <span className="toggle-thumb" />
            <span className="toggle-icon">
                {theme === "dark" ? "🌙" : "☀️"}
            </span>
        </button>
    );
}
