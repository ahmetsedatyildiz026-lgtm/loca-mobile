// LOCA - Custom Hooks for Places Management
import { useState, useEffect, useCallback } from 'react';
import { LocaHybridService } from '../services/hybridService';
import { 
  EnrichedPlace, 
  IstanbulDistrict, 
  FilterState, 
  PlaceSearchParams,
  LocaApiResponse 
} from '../types';

// FEATURED PLACES HOOK
export function useFeaturedPlaces() {
  const [places, setPlaces] = useState<EnrichedPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeatured = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await LocaHybridService.getFeaturedEnrichedPlaces();
      
      if (response.success) {
        setPlaces(response.data);
      } else {
        setError(response.error || 'Failed to fetch featured places');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

  return {
    places,
    loading,
    error,
    refetch: fetchFeatured
  };
}

// DISTRICT PLACES HOOK
export function useDistrictPlaces(district?: IstanbulDistrict) {
  const [places, setPlaces] = useState<EnrichedPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaces = useCallback(async (targetDistrict: IstanbulDistrict) => {
    try {
      setLoading(true);
      setError(null);
      const response = await LocaHybridService.getEnrichedPlacesByDistrict(targetDistrict);
      
      if (response.success) {
        setPlaces(response.data);
      } else {
        setError(response.error || 'Failed to fetch district places');
        setPlaces([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (district) {
      fetchPlaces(district);
    }
  }, [district, fetchPlaces]);

  return {
    places,
    loading,
    error,
    fetchPlaces
  };
}

// SEARCH PLACES HOOK
export function useSearchPlaces() {
  const [places, setPlaces] = useState<EnrichedPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchParams, setLastSearchParams] = useState<PlaceSearchParams | null>(null);

  const searchPlaces = useCallback(async (params: PlaceSearchParams) => {
    try {
      setLoading(true);
      setError(null);
      setLastSearchParams(params);
      
      const response = await LocaHybridService.searchEnrichedPlaces(params);
      
      if (response.success) {
        setPlaces(response.data);
      } else {
        setError(response.error || 'Search failed');
        setPlaces([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    if (lastSearchParams) {
      searchPlaces(lastSearchParams);
    }
  }, [lastSearchParams, searchPlaces]);

  return {
    places,
    loading,
    error,
    searchPlaces,
    refetch,
    lastSearchParams
  };
}

// NEARBY PLACES HOOK
export function useNearbyPlaces(userLocation?: { lat: number; lng: number }, radius?: number) {
  const [places, setPlaces] = useState<EnrichedPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNearby = useCallback(async (coords: { lat: number; lng: number }, radiusKm: number = 5) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await LocaHybridService.getNearbyEnrichedPlaces(coords, radiusKm);
      
      if (response.success) {
        setPlaces(response.data);
      } else {
        setError(response.error || 'Failed to fetch nearby places');
        setPlaces([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchNearby(userLocation, radius);
    }
  }, [userLocation, radius, fetchNearby]);

  return {
    places,
    loading,
    error,
    fetchNearby
  };
}

// SINGLE PLACE DETAIL HOOK
export function usePlaceDetail(placeId?: string) {
  const [place, setPlace] = useState<EnrichedPlace | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlace = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await LocaHybridService.getEnrichedPlaceById(id);
      
      if (response.success && response.data) {
        setPlace(response.data);
      } else {
        setError(response.error || 'Place not found');
        setPlace(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setPlace(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (placeId) {
      fetchPlace(placeId);
    }
  }, [placeId, fetchPlace]);

  return {
    place,
    loading,
    error,
    refetch: () => placeId && fetchPlace(placeId)
  };
}

// FILTER STATE MANAGEMENT HOOK
export function useFilterState() {
  const [filterState, setFilterState] = useState<FilterState>({
    selectedDistricts: [],
    selectedModes: {},
    priceRange: [],
    sortBy: 'featured'
  });

  const updateDistricts = useCallback((districts: IstanbulDistrict[]) => {
    setFilterState(prev => ({
      ...prev,
      selectedDistricts: districts
    }));
  }, []);

  const updateModes = useCallback((modes: Partial<FilterState['selectedModes']>) => {
    setFilterState(prev => ({
      ...prev,
      selectedModes: { ...prev.selectedModes, ...modes }
    }));
  }, []);

  const toggleMode = useCallback((mode: keyof FilterState['selectedModes']) => {
    setFilterState(prev => ({
      ...prev,
      selectedModes: {
        ...prev.selectedModes,
        [mode]: !prev.selectedModes[mode]
      }
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilterState({
      selectedDistricts: [],
      selectedModes: {},
      priceRange: [],
      sortBy: 'featured'
    });
  }, []);

  const hasActiveFilters = filterState.selectedDistricts.length > 0 || 
                           Object.values(filterState.selectedModes).some(Boolean) ||
                           filterState.priceRange.length > 0;

  return {
    filterState,
    updateDistricts,
    updateModes,
    toggleMode,
    clearFilters,
    hasActiveFilters,
    setFilterState
  };
}