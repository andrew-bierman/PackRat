import React from 'react';
import LandingPage from 'app/components/landing_page';
import { ConnectionGate } from 'app/components/ConnectionGate';
import { Redirect } from 'expo-router';

export default function Entry() {
  return (
    <>
      <ConnectionGate mode="connected">
        <LandingPage />
      </ConnectionGate>
      <ConnectionGate mode="offline">
        <Redirect href="offline/maps" />
      </ConnectionGate>
    </>
  );
}
