import {
  MegaphoneOff,
  MonitorSmartphone,
  ShieldCheck,
} from '@tamagui/lucide-icons';
import { BannerSection } from './BannerSection';
import { ExtendedFeatureCard } from './ExtendedFeatureCard';

function ExtendedFeatures() {
  return (
    <div>
      <div>
        <div className="flex flex-col p-8 mt-14 mx-auto max-w-screen-lg">
          <div className="text-center">
            <h2 className="text-4xl font-bold">
              <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Complete Overview
              </span>{' '}
              of Every Adventure
            </h2>
            <p className="text-xl mb-2 text-center mx-auto mt-6 text-muted-foreground">
              Visualize every detail of your trip itinerary, ensuring you're
              fully informed and prepared for your outdoor excursions.
            </p>
          </div>
          <BannerSection />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ExtendedFeatureCard
              title="Cross Platform"
              description="Get the best experience on all devices.Includes web app, ios and android"
              Icon={MonitorSmartphone}
            />
            <ExtendedFeatureCard
              title="No Telemetry"
              description="No more telemetry. We don't collect any personal data. We only collect what you need."
              Icon={ShieldCheck}
            />
            <ExtendedFeatureCard
              title="No Ads"
              description="Freedom from interruption, the open-source way: Experience clarity, embrace simplicity. Open source, forever ad-free."
              Icon={MegaphoneOff}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExtendedFeatures;
