import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Globe } from "lucide-react";

interface Country {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  population: number;
  flags: {
    svg: string;
    alt?: string;
  };
  languages?: { [key: string]: string };
  maps: {
    googleMaps: string;
  };
}

interface CountryDetailModalProps {
  country: Country | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CountryDetailModal = ({ country, isOpen, onClose }: CountryDetailModalProps) => {
  if (!country) return null;

  const formatPopulation = (pop: number) => {
    return new Intl.NumberFormat().format(pop);
  };

  const getLanguages = () => {
    if (!country.languages) return 'N/A';
    return Object.values(country.languages).join(', ');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {country.name.common}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Flag */}
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={country.flags.svg}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Country Details */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-1">Official Name</h4>
              <p className="text-muted-foreground">{country.name.official}</p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Capital
              </h4>
              <p className="text-muted-foreground">
                {country.capital ? country.capital.join(', ') : 'N/A'}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Population
              </h4>
              <p className="text-muted-foreground">{formatPopulation(country.population)}</p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-1">Languages</h4>
              <p className="text-muted-foreground">{getLanguages()}</p>
            </div>
          </div>

          {/* Google Maps Link */}
          <Button 
            variant="default" 
            className="w-full" 
            onClick={() => window.open(country.maps.googleMaps, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Google Maps
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};