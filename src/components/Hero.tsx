
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden geometric-pattern">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center staggered-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Find Taraweeh Prayer Locations in <span className="text-islamic-600">Australia</span>
          </h1>
          
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover mosques and prayer spaces offering Taraweeh prayers during Ramadan in your area.
          </p>
          
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/locations">
              <Button size="lg" className="w-full sm:w-auto bg-islamic-600 hover:bg-islamic-700 text-white font-medium rounded-full px-8">
                <Search className="mr-2 h-5 w-5" />
                Find Locations
              </Button>
            </Link>
            
            <Link to="/submit">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-islamic-200 text-islamic-700 hover:bg-islamic-50 font-medium rounded-full px-8">
                Submit a Location
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-islamic-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground geometric-pattern">
                Ramadan Mubarak
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 inset-x-0">
        <div className="arabesque-divider"></div>
      </div>
    </section>
  );
};

export default Hero;
