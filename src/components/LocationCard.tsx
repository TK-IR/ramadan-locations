
import React from 'react';
import { MapPin, Clock, Users, Droplets, Car, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export interface Location {
  id: string;
  name: string;
  address: string;
  suburb: string;
  state: string;
  time: string;
  rakaat: number;
  hasWomensArea: boolean;
  hasWuduFacilities: boolean;
  hasParking: boolean;
  parkingType?: 'Street' | 'Dedicated';
  distance?: number;
}

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <div className="glass-card h-full flex flex-col p-5 group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-lg text-foreground group-hover:text-islamic-700 transition-colors">
          {location.name}
        </h3>
        <Badge className="bg-islamic-100 text-islamic-700 hover:bg-islamic-200">
          {location.rakaat} Rakaat
        </Badge>
      </div>
      
      <div className="space-y-2 text-sm mb-4 flex-grow">
        <div className="flex items-start">
          <MapPin className="h-4 w-4 text-islamic-500 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground">{location.address}</p>
            <p className="text-muted-foreground">
              {location.suburb}, {location.state}
            </p>
            {location.distance && (
              <p className="text-xs text-islamic-600 font-medium mt-1">
                {location.distance.toFixed(1)} km away
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-islamic-500 mr-2 flex-shrink-0" />
          <p className="text-foreground">{location.time}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 pt-3 border-t border-islamic-100">
        {location.hasWomensArea && (
          <Badge variant="outline" className="bg-white/80 text-xs font-normal">
            <Users className="h-3 w-3 mr-1 text-islamic-500" />
            Women's Area
          </Badge>
        )}
        
        {location.hasWuduFacilities && (
          <Badge variant="outline" className="bg-white/80 text-xs font-normal">
            <Droplets className="h-3 w-3 mr-1 text-islamic-500" />
            Wudu Facilities
          </Badge>
        )}
        
        {location.hasParking && (
          <Badge variant="outline" className="bg-white/80 text-xs font-normal">
            <Car className="h-3 w-3 mr-1 text-islamic-500" />
            {location.parkingType || "Parking"}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
