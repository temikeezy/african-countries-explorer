import { useState, useEffect } from "react";
import { CountryCard } from "@/components/CountryCard";
import { CountryDetailModal } from "@/components/CountryDetailModal";
import { AdviceCard } from "@/components/AdviceCard";
import { SearchBar } from "@/components/SearchBar";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MapPin } from "lucide-react";

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

interface AdviceResponse {
  slip: {
    id: number;
    advice: string;
  };
}

const Index = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [advice, setAdvice] = useState("");
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(true);
  const { toast } = useToast();

  // Fetch African countries
  const fetchCountries = async () => {
    try {
      setIsLoadingCountries(true);
      const response = await fetch(
        "https://restcountries.com/v3.1/region/Africa?fields=name,capital,population,flags,languages,maps"
      );
      if (!response.ok) throw new Error("Failed to fetch countries");
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      toast({
        title: "Error fetching countries",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingCountries(false);
    }
  };

  // Fetch random advice
  const fetchAdvice = async () => {
    try {
      setIsLoadingAdvice(true);
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) throw new Error("Failed to fetch advice");
      const data: AdviceResponse = await response.json();
      setAdvice(data.slip.advice);
    } catch (error) {
      setAdvice("Explore, learn, and discover the beauty of Africa!");
      toast({
        title: "Could not fetch advice",
        description: "Using default motivational message.",
        variant: "default",
      });
    } finally {
      setIsLoadingAdvice(false);
    }
  };

  // Filter countries based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCountries(countries);
      return;
    }

    const filtered = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      const capital = country.capital?.[0]?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();
      
      return countryName.includes(query) || capital.includes(query);
    });
    
    setFilteredCountries(filtered);
  }, [searchQuery, countries]);

  // Initial data fetch
  useEffect(() => {
    fetchCountries();
    fetchAdvice();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-primary flex items-center justify-center gap-2">
              <MapPin className="w-6 h-6 md:w-8 md:h-8" />
              African Countries Explorer
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Powered by REST Countries API & Advice API
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Advice Section */}
        <AdviceCard 
          advice={advice}
          isLoading={isLoadingAdvice}
          onRefresh={fetchAdvice}
        />

        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search countries or capitals..."
          />
        </div>

        {/* Countries Grid */}
        {isLoadingCountries ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground">Loading African countries...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center text-sm text-muted-foreground">
              Showing {filteredCountries.length} of {countries.length} countries
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCountries.map((country) => (
                <CountryCard
                  key={country.name.common}
                  country={country}
                  onClick={() => setSelectedCountry(country)}
                />
              ))}
            </div>

            {filteredCountries.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No countries found matching "{searchQuery}"
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try searching for a different country name or capital
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground leading-relaxed">
            Designed during <span className="font-semibold text-primary">Ilorin DevBox: Building APIs & Microservices</span><br />
            <span className="text-xs">(Introduction & Fundamentals), September 18, 2025 at Ilorin Innovation Hub</span>
          </p>
        </div>
      </footer>

      {/* Country Detail Modal */}
      <CountryDetailModal
        country={selectedCountry}
        isOpen={!!selectedCountry}
        onClose={() => setSelectedCountry(null)}
      />
    </div>
  );
};

export default Index;
