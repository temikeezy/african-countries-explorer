import { Card } from "@/components/ui/card";
import { Lightbulb, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdviceCardProps {
  advice: string;
  isLoading: boolean;
  onRefresh: () => void;
}

export const AdviceCard = ({ advice, isLoading, onRefresh }: AdviceCardProps) => {
  return (
    <Card className="advice-card">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-6 h-6 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="font-semibold mb-2">Daily Motivation</h3>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-1/2"></div>
            </div>
          ) : (
            <p className="text-sm opacity-90 leading-relaxed">{advice}</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="text-primary-foreground hover:bg-white/10 flex-shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </Card>
  );
};