import Image from 'next/image';
import React from 'react';

interface TripHighlightsProps {
  highlights: string[];
}

const TripHighlights = ({ highlights }: TripHighlightsProps) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-primaryDarker">Destaques</h2>
      
      <div className="flex flex-wrap mt-3 gap-y-3">
        {highlights.map((highlight, index) => (
          <div className="flex items-center w-1/2 gap-2" key={highlight}>
            <Image
              src="/check-icon.png"
              width={15}
              height={15}
              alt={highlight}
            />
            <p className="text-xs text-grayPrimary">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHighlights;
