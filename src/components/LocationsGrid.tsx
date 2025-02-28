
import React from 'react';
import LocationCard, { Location } from './LocationCard';

interface LocationsGridProps {
  locations: Location[];
  isLoading?: boolean;
}

const LocationsGrid: React.FC<LocationsGridProps> = ({ 
  locations, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="glass-card h-64 p-5 shimmer opacity-70"
          />
        ))}
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-islamic-50 inline-flex items-center justify-center p-4 rounded-full mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-islamic-500"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">No locations found</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          We couldn't find any Taraweeh locations matching your search. Try adjusting your filters or submit a new location.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
};

export default LocationsGrid;
