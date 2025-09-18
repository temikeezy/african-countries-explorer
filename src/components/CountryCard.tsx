import { Card } from "@/components/ui/card";

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

interface CountryCardProps {
  country: Country;
  onClick: () => void;
}

export const CountryCard = ({ country, onClick }: CountryCardProps) => {
  return (
    <Card 
      className="country-card cursor-pointer group"
      onClick={onClick}
    >
      <div className="aspect-video w-full mb-3 overflow-hidden rounded-lg">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-card-foreground line-clamp-1">
          {country.name.common}
        </h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Capital:</span>{' '}
          {country.capital ? country.capital[0] : 'N/A'}
        </p>
      </div>
    </Card>
  );
};