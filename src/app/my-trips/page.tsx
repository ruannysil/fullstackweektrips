'use client';

import { Prisma, TripReservation } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserReservationItem from './components/UserReservationItem';
import Link from 'next/link';
import Button from '@/components/Button';

const MyTrips = () => {
  const [reservations, setReservations] = useState<Prisma.TripReservationGetPayload<{ include: { trip: true } }>[]>([]);
  const { status, data } = useSession();

  const router = useRouter();
  
  const fetchReservations = async () => {
    const response = await fetch(
      `http://localhost:3000/api/user/${(data?.user as any)?.id}/reservaitons`,
    );
    const json = await response.json();

    setReservations(json);
  };
  useEffect(() => {
    if (status === 'unauthenticated') {
      return router.push('/');
    }


    fetchReservations();
  }, [status]);

  const handleDeleteReservation = (reservationId: any) => {
    setReservations((prevReservations) =>
      prevReservations.filter((reservation) => reservation.id !== reservationId)
    );
  
  };

  return (
    <div className="container p-5 mx-auto">
      <h1 className="text-xl font-semibold text-primaryDarker">
        Minhas Viagens
      </h1>
      {reservations.length > 0 ? (reservations?.map((reservation) => (
        <UserReservationItem key={reservation.id} reservation={reservation} onDelete={handleDeleteReservation}/>
      ))): (
        <div className='flex flex-col'>
          <p className='mt-2 font-medium text-primaryDarker'>Você não tem nenhuma reserva!😢😢</p>

          <Link href="/">
            <Button className="w-full mt-2">Fazer Reservar</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
