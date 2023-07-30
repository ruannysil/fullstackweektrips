import { Prisma } from '@prisma/client';
import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import Image from 'next/image';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import Button from '@/components/Button';
import { toast } from 'react-toastify';

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{ include: { trip: true } }>;
  onDelete: (reservationId: string) => void;
}

const UserReservationItem = ({ reservation, onDelete }: UserReservationItemProps) => {
  const { trip } = reservation;

  const handleDeleteClick = async () => {
    const res = await fetch(`/api/trips/reservation/${reservation.id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      return toast.error('Ocorreu um erro ao canclear a reservar!');
    }

    onDelete(reservation.id)

    
    toast.success('Reserva cancelada com sucesso!', {position: "bottom-center"});
  };
  return (
    <>
      <div className="flex flex-col p-5 mt-5 border border-solid rounded-lg shadow-lg border-grayLighter">
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

        <div className="flex flex-col mt-5 text-primaryDarker">
          <h3 className="text-sm">Data</h3>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-sm">
              {format(new Date(reservation.startDate), "dd 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
            {' - '}
            <p className="text-sm">
              {format(new Date(reservation.endDate), "dd 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>

          <h3 className="mt-5 text-sm">Hóspedes</h3>
          <p className="pb-5 text-sm">{reservation.guests} hóspedes</p>

          <h3 className="pt-5 mt-3 font-semibold border-t border-solid text-primaryDarker border-grayLighter ">
            Informaçôes sobre o preço
          </h3>
          <div className="flex justify-between mt-1">
            <p className="mt-2 text-sm text-primaryDarke">Total:</p>
            <p className="text-sm font-medium">
              R${Number(reservation.totalPaid)}
            </p>
          </div>
          <Button variant="danger" className="mt-5" onClick={handleDeleteClick}>
            Cancelar
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserReservationItem;
