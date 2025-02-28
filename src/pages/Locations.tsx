
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import LocationsGrid from '@/components/LocationsGrid';
import { MapPin } from 'lucide-react';
import { useLocations } from '@/hooks/use-data';

const Locations = () => {
  const [searchParams, setSearchParams] = useState<{
    search: string;
    location: string;
  }>({ search: '', location: '' });
  
  const { data: locations = [], isLoading } = useLocations({
    search: searchParams.search,
    suburb: searchParams.location,
    state: searchParams.location,
  });
  
  const handleSearch = (query: string, location: string) => {
    setSearchParams({ search: query, location });
  };

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-16 bg-islamic-50/50 geometric-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 staggered-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Find Taraweeh Locations
            </h1>
            <p className="mt-4 text-muted-foreground">
              Search through all Taraweeh prayer locations in Australia.
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                {isLoading ? 'Loading locations...' : `${locations.length} Locations Found`}
              </h2>
              {!isLoading && (
                <p className="text-sm text-muted-foreground">
                  Showing all available Taraweeh prayer locations
                </p>
              )}
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-islamic-500 mr-1" />
              <span className="text-sm">Melbourne, VIC</span>
            </div>
          </div>
          
          <LocationsGrid 
            locations={locations} 
            isLoading={isLoading} 
          />
        </div>
      </section>
    </div>
  );
};

export default Locations;
