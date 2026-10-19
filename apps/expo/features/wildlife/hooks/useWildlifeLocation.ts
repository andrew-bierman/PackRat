import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { regionForCoordinate } from '../utils/region';

export interface WildlifeLocation {
  latitude: number;
  longitude: number;
  /** The device's coarse region in the species vocabulary, or null outside every region. */
  region: string | null;
}

/**
 * Supplies the coarse location used as a ranking prior and stamped onto a
 * saved sighting.
 *
 * Started when the screen opens, so the fix is usually ready by the time a
 * photo is identified. It never blocks identification: a user who declines
 * location, or whose fix has not arrived, gets an unpriored ranking. Low
 * accuracy is plenty to tell continents apart.
 */
export function useWildlifeLocation(enabled: boolean): WildlifeLocation | null {
  const [location, setLocation] = useState<WildlifeLocation | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    const update = (position: Location.LocationObject | null) => {
      if (cancelled || !position) return;
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude, region: regionForCoordinate({ latitude, longitude }) });
    };

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      // Declined is a supported way to use the feature, not an error.
      if (status !== Location.PermissionStatus.GRANTED) return;
      update(await Location.getLastKnownPositionAsync());
      update(await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low }));
    })().catch(() => {
      // A failed fix means an unpriored ranking, which is a normal outcome.
    });

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return location;
}
