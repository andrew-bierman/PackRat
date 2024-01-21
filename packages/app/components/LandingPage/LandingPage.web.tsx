import GetStarted from './components/cta';
import ExtendedFeatures from './components/extended-features';
import { FAQ } from './components/faq';
import Features from './components/features';
import Footer from './components/footer';
import HeroSection from './components/hero';
import { NavBar } from './components/navbar';
import OSS from './components/oss';
import { Showcase } from './components/showcase';
import Testimonial from './components/testimonials';

export function LandingPage() {
  return (
    <div className="bg-gradient p-2">
      <NavBar />
      <HeroSection />
      <Showcase />
      <Features />
      <ExtendedFeatures />
      <Testimonial />
      <OSS />
      <FAQ />
      <GetStarted />
      <Footer />
    </div>
  );
}
