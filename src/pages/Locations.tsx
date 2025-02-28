
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import LocationsGrid from '@/components/LocationsGrid';
import { Location } from '@/components/LocationCard';
import { MapPin } from 'lucide-react';

// Mock data for demonstration
const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Melbourne Mosque',
    address: '765 Racecourse Rd',
    suburb: 'North Melbourne',
    state: 'VIC',
    time: '8:00 PM',
    rakaat: 20,
    hasWomensArea: true,
    hasWuduFacilities: true,
    hasParking: true,
    parkingType: 'Street',
  },
  {
    id: '2',
    name: 'Islamic Society of Victoria',
    address: '90 Cramer Street',
    suburb: 'Preston',
    state: 'VIC',
    time: '8:15 PM',
    rakaat: 20,
    hasWomensArea: true,
    hasWuduFacilities: true,
    hasParking: true,
    parkingType: 'Dedicated',
  },
  {
    id: '3',
    name: 'Broadmeadows Mosque',
    address: '45 King Street',
    suburb: 'Broadmeadows',
    state: 'VIC',
    time: '7:45 PM',
    rakaat: 8,
    hasWomensArea: true,
    hasWuduFacilities: true,
    hasParking: true,
    parkingType: 'Dedicated',
  },
  {
    id: '4',
    name: 'Meadow Heights Mosque',
    address: '20 Waterview Drive',
    suburb: 'Meadow Heights',
    state: 'VIC',
    time: '8:30 PM',
    rakaat: 20,
    hasWomensArea: true,
    hasWuduFacilities: true,
    hasParking: true,
    parkingType: 'Dedicated',
  },
  {
    id: '5',
    name: 'Werribee Islamic Centre',
    address: '19 Duncans Road',
    suburb: 'Werribee',
    state: 'VIC',
    time: '8:00 PM',
    rakaat: 20,
    hasWomensArea: true,
    hasWuduFacilities: true,
    hasParking: true,
    parkingType: 'Street',
  },
  {
    id: '6',
    name: 'Hoppers Crossing Mosque',
    address: '143 Hogans Road',
    suburb: 'Hoppers Crossing',
    state: 'VIC',
    time: '8:15 PM',
    rakaat: 8,
    hasWomensArea: false,
    hasWuduFacilities: true,
    hasParking: false,
  },
  {
    id: '7',
    name: 'Dandenong Mosque',
    address: '65 Logis Boulevard',
    suburb: 'Dandenong',
    state: 'VIC',
    time: '8:15 PM',
    rakaat: 20,
    hasWomensArea: true,
    hasWuduFacilities: true,
    hasParking: true,
    parkingType: 'Street',
  },
  {
    id: '8',
    name: 'Brunswick Mosque',
    address: '660 Sydney Road',
    suburb: 'Brunswick',
    state: 'VIC',
    time: '7:45 PM',
    rakaat: 20,
    hasWomensArea: true,
    hasWuduFacilities: true,
    hasParking: true,
    parkingType: 'Street',
  },
  {
    id: '9',
    name: 'Coburg Mosque',
    address: '31 Nicholson Street',
    suburb: 'Coburg',
    state: 'VIC',
    time: '8:00 PM',
    rakaat: 20,
    hasWomensArea: true,
    hasWuduFacilities: true,
    hasParking: false,
  }
];

const Locations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  
  useEffect(() => {
    // Simulate API fetch
    const fetchLocations = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLocations(mockLocations);
      setFilteredLocations(mockLocations);
      setIsLoading(false);
    };
    
    fetchLocations();
  }, []);
  
  const handleSearch = (query: string, location: string) => {
    if (!query && !location) {
      setFilteredLocations(locations);
      return;
    }
    
    const filtered = locations.filter(loc => {
      const matchesQuery = !query || 
        loc.name.toLowerCase().includes(query.toLowerCase());
      
      const matchesLocation = !location || 
        loc.suburb.toLowerCase().includes(location.toLowerCase()) || 
        loc.state.toLowerCase().includes(location.toLowerCase());
      
      return matchesQuery && matchesLocation;
    });
    
    setFilteredLocations(filtered);
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
                {isLoading ? 'Loading locations...' : `${filteredLocations.length} Locations Found`}
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
            locations={filteredLocations} 
            isLoading={isLoading} 
          />
        </div>
      </section>
    </div>
  );
};

export default Locations;
