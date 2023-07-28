import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import Image from 'next/image';
import { Trip } from '@prisma/client';

interface TripHeaderProps {
  trip: Trip
}

const TripHeader = ({trip}: TripHeaderProps) => {
  return (
    <div className="flex flex-col">
    <div className="relative h-[280px] w-full">
      <Image
        src={trip.coverImage}
        fill
        style={{ objectFit: 'cover' }}
        alt={trip.name}
      />
    </div>
    <div className="flex flex-col p-5">
      <h1 className="text-xl font-semibold text-primaryDarker">
        {trip.name}
      </h1>

      <div className="flex items-center gap-1 my-1">
        <ReactCountryFlag countryCode={trip.countryCode} svg />
        <p className="text-xs underline text-grayPrimary">{trip.location}</p>
      </div>

      <p className="text-xs text-grayPrimary">
        <span className="text-primary">R${trip.pricePerDay.toString()}</span> por dia
      </p>

     
    </div>
  </div>
  )
}

export default TripHeader
