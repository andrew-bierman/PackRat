import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@packrat/ui/src/shadcn/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@packrat/ui/src/shadcn/carousel';
import screenshot1 from 'app/assets/packrat.png';
import screenshot2 from 'app/assets/packscreen.png';
import Image from 'next/image';

export function Showcase() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  return (
    <div className="flex items-center justify-center flex-col mt-12 max-w-screen-md mx-auto">
      <p className="text-4xl font-bold  mb-2">
        See{' '}
        <span className=" bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-400">
          Packrat{' '}
        </span>
        in action
      </p>
      <Carousel
        plugins={[plugin.current]}
        className="border-0 max-w-screen-md"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="border-0">
          {screenshots.map((screenshot, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex  items-center justify-center p-2">
                    <Image src={screenshot} alt="" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

const screenshots = [screenshot1, screenshot2];
