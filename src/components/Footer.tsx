
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Heart, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-islamic-100 py-12 backdrop-blur-md bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="h-8 w-8 bg-islamic-500 text-white flex items-center justify-center rounded-full">
                <MapPin className="h-5 w-5" />
              </span>
              <span className="font-medium text-lg tracking-tight">
                Taraweeh<span className="text-islamic-500">Finder</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Connecting the Australian Muslim community with Taraweeh prayer locations during the blessed month of Ramadan.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for the Ummah</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-islamic-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-muted-foreground hover:text-islamic-600 transition-colors">
                  Find Locations
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-muted-foreground hover:text-islamic-600 transition-colors">
                  Submit a Location
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-islamic-600 transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-islamic-600 transition-colors"
                >
                  Ramadan Calendar
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-islamic-600 transition-colors"
                >
                  Prayer Times
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-islamic-600 transition-colors"
                >
                  About Taraweeh
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-islamic-600 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-islamic-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {currentYear} TaraweehFinder. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <a 
              href="#" 
              className="hover:text-islamic-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="hover:text-islamic-600 transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="https://github.com" 
              className="hover:text-islamic-600 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
