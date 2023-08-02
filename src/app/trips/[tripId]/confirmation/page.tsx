'use client';

import { Trip } from '@prisma/client';
import ptBR from 'date-fns/locale/pt-BR';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import Button from '@/components/Button';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const router = useRouter();

  const { status, data } = useSession();

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch(`http://localhost:3000/api/trips/check`, {
        method: 'POST',
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get('startDate'),
          endDate: searchParams.get('endDate'),
        }),
      });

      const res = await response.json();

      if (res?.error) {
        router.push('/');
      }

      setTrip(res.trip);
      setTotalPrice(res.totalPrice);
    };

    if (status === 'unauthenticated') {
      router.push('/');
    }

    fetchTrip();
  }, [status, searchParams, params, router]);

  if (!trip) return null;

  const handleBuyClick = async () => {
    const res = await fetch('http://localhost:3000/api/payment', {
      method: 'POST',
      body: Buffer.from(
        JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get('startDate'),
          endDate: searchParams.get('endDate'),
          guests: Number(searchParams.get('guests')),
          userId: (data?.user as any)?.id,
          totalPrice,
          coverImage: trip.coverImage,
          name: trip.name,
          description: trip.description,
        }),
      ),
    });

    if (!res.ok) {
      return toast.error('Ocorreu um erro ao realizar a rezerva!', {
        position: 'bottom-center',
      });
    }

    const { sessionId } = await res.json();
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_KEY as string,
    );

    await stripe?.redirectToCheckout({ sessionId });

    toast.success('reserva realizada com sucess!', {
      position: 'bottom-center',
    });
  };

  const startDate = new Date(searchParams.get('startDate') as string);
  const endDate = new Date(searchParams.get('endDate') as string);
  const guests = searchParams.get('guests');

  return (
    <div className="container p-5 mx-auto">
      <h1 className="text-xl font-semibold text-primaryDarker">Sua viagem</h1>

      <div className="flex flex-col p-5 border border-solid rounded-lg shadow-lg border-grayLighter">
        <div className="flex items-center gap-3 pb-5 border-b border-solid border-grayLighter">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip.coverImage}
              alt={trip.name}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-l"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-primaryDarker">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs underline text-grayPrimary">
                {trip.location}
              </p>
            </div>
          </div>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-primaryDarker">
          Informaçôes sobre o preço
        </h3>
        <div className="flex justify-between">
          <p className="font-medium text-primaryDarker">Total:</p>
          <p className="font-medium">R${totalPrice}</p>
        </div>
      </div>

      <div className="flex flex-col m-5">
        <h3 className="font-semibold text-primaryDarker">Data</h3>
        <div className="flex items-center gap-1 mt-1">
          <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
          {' - '}
          <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
        </div>

        <h3 className="mt-5 font-semibold">Hóspedes</h3>
        <p>{guests} hóspedes</p>

        <Button className="mt-5" onClick={handleBuyClick}>
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};

export default TripConfirmation;
