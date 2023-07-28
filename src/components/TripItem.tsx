import { Trip } from '@prisma/client';
import React from 'react';
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';

interface TripItemProp {
  trip: Trip;
}

const TripItem = ({ trip }: TripItemProp) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[280px] w-[280px]">
        <Image
          src={trip.coverImage}
          alt={trip.name}
          className="rounded-lg shadow-md"
          style={{ objectFit: 'cover' }}
          fill
        />
      </div>
      <h3 className="mt-2 text-sm font-medium text-primaryDarker">
        {trip.name}
      </h3>
      <div className="flex items-center gap-1 my-1">
        <ReactCountryFlag countryCode={trip.countryCode} svg />
        <p className="text-xs text-grayPrimary">{trip.location}</p>
      </div>
      <p className="text-xs text-grayPrimary">
        <span className="font-medium text-primary">
          R${trip.pricePerDay.toString()}
        </span>
      </p>
    </div>
  );
};

export default TripItem;
