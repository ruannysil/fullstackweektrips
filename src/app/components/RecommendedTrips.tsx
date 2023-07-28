import TripItem from '@/components/TripItem';
import { Trip } from '@prisma/client';
import React from 'react';

const RecommendedTrips = async () => {
  const data = await fetch('http://localhost:3000/hello').then((res) =>
    res.json(),
  );
  return (
    <div className="container p-5 mx-auto">
      <div className="flex items-center">
        <div className="w-full h-[1px]  bg-grayLighter"></div>
        <h1 className="px-5 font-medium text-grayPrimary whitespace-nowrap">
          Destinos Recomendados
        </h1>
        <div className="w-full h-[1px]  bg-grayLighter"></div>
      </div>
      <div className="flex flex-col items-center gap-3 mt-5">
        {data.map((trip: Trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedTrips;
