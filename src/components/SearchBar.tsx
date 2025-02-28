
import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };
  
  const clearSearch = () => {
    setQuery('');
    setLocation('');
    onSearch('', '');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form 
        onSubmit={handleSubmit}
        className={`glass-card transition-all duration-300 ${
          isExpanded ? 'p-6' : 'p-4'
        }`}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search mosque name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 bg-white/60 backdrop-blur-sm border-islamic-100 focus:border-islamic-200 focus:ring-islamic-200"
                onFocus={() => setIsExpanded(true)}
              />
            </div>
            
            <div className="relative w-full">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Location (e.g., Melbourne, VIC)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 bg-white/60 backdrop-blur-sm border-islamic-100 focus:border-islamic-200 focus:ring-islamic-200"
                onFocus={() => setIsExpanded(true)}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full sm:w-auto bg-islamic-600 hover:bg-islamic-700 text-white font-medium flex-shrink-0"
            >
              Search
            </Button>
          </div>
          
          {isExpanded && (
            <div className="flex flex-wrap gap-2 animate-fade-in">
              <div className="text-sm font-medium text-muted-foreground mb-1 w-full">
                Filter by:
              </div>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                className="bg-white/60 border-islamic-100 text-islamic-700 hover:bg-islamic-50 rounded-full text-xs"
              >
                Women's Area
              </Button>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                className="bg-white/60 border-islamic-100 text-islamic-700 hover:bg-islamic-50 rounded-full text-xs"
              >
                20 Rakaat
              </Button>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                className="bg-white/60 border-islamic-100 text-islamic-700 hover:bg-islamic-50 rounded-full text-xs"
              >
                8 Rakaat
              </Button>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                className="bg-white/60 border-islamic-100 text-islamic-700 hover:bg-islamic-50 rounded-full text-xs"
              >
                Parking Available
              </Button>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                className="bg-white/60 border-islamic-100 text-islamic-700 hover:bg-islamic-50 rounded-full text-xs"
              >
                Wudu Facilities
              </Button>
              
              {(query || location) && (
                <div className="ml-auto">
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm"
                    onClick={clearSearch}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
