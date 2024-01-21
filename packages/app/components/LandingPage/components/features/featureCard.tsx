import packratScreenshot from 'app/assets/packrat.png';
import Image from 'next/image';
import { CheckIconFilled } from './checkIconFilled';

export function FeatureCard() {
  return (
    <div className="overflow-hidden rounded-lg border p-4 items-center justify-center md:flex mb-4">
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold self-start">Trip Planner</h3>
        <p className="mt-1 mb-4 text-muted-foreground self-start max-w-screen-xs">
          With PackRat, you can create and manage trips, discover new
          destinations, and stay informed with up-to-date weather forecasts. Our
          app integrates with Mapbox to provide you with accurate maps and
          directions to your destinations, as well as suggestions for popular
          outdoor activities based on the location and season of your trip.
        </p>
        <ul className="list-none space-y-2 self-start">
          <li className="flex gap-2 text-muted-foreground">
            <CheckIconFilled />
            Create and manage trips.
          </li>
          <li className="flex gap-2 text-muted-foreground">
            <CheckIconFilled />
            Discover new destinations
          </li>
          <li className="flex gap-2 text-muted-foreground">
            <CheckIconFilled />
            Stay informed with up-to-date weather forecasts.
          </li>
        </ul>
      </div>
      <Image
        src={packratScreenshot}
        alt=""
        className="w-1/2 h-1/2 rounded-md ml-2"
      />
    </div>
  );
}
