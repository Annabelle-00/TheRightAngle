import React from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun, Phone, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export const Layout = ({ children, isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 sm:p-8 transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-blue-900 text-slate-200' : 'bg-gradient-to-br from-slate-50 to-sky-100 text-slate-800'}`}>
      <header className="w-full max-w-5xl mb-8 sm:mb-12 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "circOut" }}
          className="absolute top-0 right-0 m-2 sm:m-4 flex space-x-2"
        >
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/contact')} 
            className="bg-opacity-50 backdrop-blur-md hover:bg-blue-100 dark:hover:bg-blue-800"
            title="Contact Us"
          >
            <Phone className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/about')} 
            className="bg-opacity-50 backdrop-blur-md hover:bg-blue-100 dark:hover:bg-blue-800"
            title="About Us"
          >
            <Info className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <Button variant="outline" size="icon" onClick={toggleDarkMode} className="bg-opacity-50 backdrop-blur-md">
            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </motion.div>
        <Link to="/" className="text-decoration-none">
          <motion.h1 
            className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight hero-gradient text-white py-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "backOut" }}
            whileHover={{ scale: 1.03 }}
          >
            The Right Angle
          </motion.h1>
        </Link>
        <motion.p 
          className="mt-1 sm:mt-2 text-md sm:text-lg text-slate-600 dark:text-slate-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          Precision Measurement for Optimal Recovery
        </motion.p>
      </header>
      
      <main className="w-full flex-grow flex flex-col items-center">
        {children}
      </main>

      <motion.footer 
        className="w-full max-w-5xl mt-12 pt-8 border-t border-slate-300 dark:border-slate-700 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="flex justify-center space-x-6 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/about')}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          >
            About Us
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/contact')}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Contact Us
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/learn/arthritis')}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Learn More
          </Button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          &copy; {new Date().getFullYear()} The Right Angle. All rights reserved.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
          Empowering recovery through innovative technology.
        </p>
      </motion.footer>
    </div>
  );
};
