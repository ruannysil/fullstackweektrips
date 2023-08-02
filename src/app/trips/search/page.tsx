'use client'

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Trip } from '@prisma/client';
import TripItem from '@/components/TripItem';

const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(
        `/api/trips/search?text=${searchParams.get("text") ?? ""}&startDate=${searchParams.get("startDate")}&budget=${searchParams.get("budget")}`,
      );
      const data = await response.json();
      setTrips(data);
    };
    fetchTrips();
  }, [searchParams]);

  return (
    <div className='container flex flex-col items-center p-5 mx-auto'>
      <h1 className='text-xl font-semibold text-primaryDarker'>Viagens Encontradas</h1>
      <h2 className='mb-5 font-medium text-grayPrimary'>
        {trips.length > 0 ? "Listamos as melhores hóspedes para você!" : "Não encontramos nada com os dados fornecidos!"}
      </h2>
      <div className='flex flex-col gap-4'>
        {trips?.map(trip => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default Trips;
