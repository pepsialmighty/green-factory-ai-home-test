import { useState, useCallback } from "react";

interface SearchDurationState {
  totalDuration: number;
  searchCount: number;
  averageDuration: number;
}

export const useAverageSearchDuration = () => {
  const [searchDuration, setSearchDuration] = useState<SearchDurationState>({
    totalDuration: 0,
    searchCount: 0,
    averageDuration: 0,
  });

  const updateAverageSearchDuration = useCallback((duration: number) => {
    setSearchDuration((prevState) => {
      const newTotalDuration = prevState.totalDuration + duration;
      const newSearchCount = prevState.searchCount + 1;
      const newAverageDuration = newTotalDuration / newSearchCount;

      return {
        totalDuration: newTotalDuration,
        searchCount: newSearchCount,
        averageDuration: Number(newAverageDuration.toFixed(2)),
      };
    });
  }, []);

  return { searchDuration, updateAverageSearchDuration };
};
