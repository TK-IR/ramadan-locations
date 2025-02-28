
import React from 'react';
import Hero from '@/components/Hero';
import LocationsGrid from '@/components/LocationsGrid';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ClipboardEdit } from 'lucide-react';
import { useFeaturedLocations } from '@/hooks/use-data';

const Index = () => {
  const { data: featuredLocations = [], isLoading } = useFeaturedLocations();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Featured Taraweeh Locations
              </h2>
              <p className="mt-3 text-muted-foreground">
                Discover popular mosques and prayer spaces offering Taraweeh prayers near you.
              </p>
            </div>
            
            <LocationsGrid locations={featuredLocations} isLoading={isLoading} />
            
            <div className="mt-10 text-center">
              <Link to="/locations">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-islamic-200 text-islamic-700 hover:bg-islamic-50"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  View All Locations
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-16 sm:py-20 bg-islamic-50/50 geometric-pattern">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="glass-card h-full p-8 flex flex-col justify-center">
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                    Ramadan Calendar
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Stay updated with accurate prayer times, Suhoor and Iftar timings for the month of Ramadan in Melbourne.
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-islamic-500 mr-2"></div>
                      <span>Daily prayer times</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-islamic-500 mr-2"></div>
                      <span>Suhoor and Iftar timings</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-islamic-500 mr-2"></div>
                      <span>Downloadable PDF calendar</span>
                    </li>
                  </ul>
                  
                  <div className="mt-auto">
                    <Button 
                      variant="outline" 
                      className="border-islamic-200 text-islamic-700 hover:bg-islamic-50"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Coming Soon
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                  Submit a Taraweeh Location
                </h2>
                <p className="text-muted-foreground mb-6">
                  Know of a mosque or prayer space offering Taraweeh prayers that's not on our list? Help the community by adding it to our database.
                </p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex">
                    <div className="bg-islamic-100 rounded-full h-8 w-8 flex items-center justify-center text-islamic-700 font-medium mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Share Details</h3>
                      <p className="text-sm text-muted-foreground">
                        Provide information about the mosque, prayer times, and facilities.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="bg-islamic-100 rounded-full h-8 w-8 flex items-center justify-center text-islamic-700 font-medium mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Quick Review</h3>
                      <p className="text-sm text-muted-foreground">
                        Our team will verify the information to ensure accuracy.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="bg-islamic-100 rounded-full h-8 w-8 flex items-center justify-center text-islamic-700 font-medium mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Help the Community</h3>
                      <p className="text-sm text-muted-foreground">
                        Your submission helps Muslims in your area find places to pray.
                      </p>
                    </div>
                  </li>
                </ul>
                
                <Link to="/submit">
                  <Button className="bg-islamic-600 hover:bg-islamic-700 text-white">
                    <ClipboardEdit className="mr-2 h-4 w-4" />
                    Submit a Location
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
