import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full px-1 flex items-center transition-colors duration-300 ${theme === 'dark' ? 'bg-orange' : 'bg-gray-300'
                }`}
            aria-label="Toggle Theme"
        >
            <motion.div
                className="w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-xs"
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                style={{
                    marginLeft: theme === 'dark' ? 'auto' : '0',
                    marginRight: theme === 'dark' ? '0' : 'auto',
                }}
            >
                {theme === 'dark' ? <FiMoon className="text-orange" /> : <FiSun className="text-yellow-500" />}
            </motion.div>
        </button>
    );
};

export default ThemeToggle;
