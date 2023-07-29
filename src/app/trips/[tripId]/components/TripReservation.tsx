'use client';

import Button from '@/components/Button';
import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { Decimal } from '@prisma/client/runtime/library';
import { differenceInDays, endOfDay } from 'date-fns';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';

interface TripReservationProps {
  tripId: string;
  tripStarDate: Date;
  tripEndDate: Date;
  maxGuests: number;
  pricePerDay: number;
}

interface TripReservationForm {
  guests: Number;
  startDate: Date | null;
  endDate: Date | null;
}

const TripReservation = ({
  tripId,
  maxGuests,
  tripEndDate,
  tripStarDate,
  pricePerDay,
}: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<TripReservationForm>();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch('http://localhost:3000/api/trips/check', {
      method: 'POST',
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId,
        }),
      ),
    });

    const res = await response.json();
    console.log({ res });

    if (res?.error?.code === 'TRIP_ALREADY_RESERVED') {
      setError('startDate', {
        type: 'manual',
        message: 'Esta data já está reservada.',
      });

      return setError('endDate', {
        type: 'manual',
        message: 'Esta data já está reservada.',
      });
    }

    if (res?.error?.code === 'INVALID_START_DATE') {
      setError('startDate', {
        type: 'manual',
        message: 'Data inválida.',
      });
    }

    if (res?.error?.code === 'INVALID_END_DATE') {
      setError('endDate', {
        type: 'manual',
        message: 'Data inválida.',
      });
    }
  };

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: 'Data inicial é obrigatória.',
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data de Início"
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              error={!!errors.startDate}
              errorMessage={errors?.startDate?.message}
              minDate={tripStarDate}
            />
          )}
        />

        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: 'Data final é obrigatória.',
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data final"
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              error={!!errors.endDate}
              errorMessage={errors?.endDate?.message}
              maxDate={tripEndDate}
              minDate={startDate ?? tripStarDate}
            />
          )}
        />
      </div>
      <Input
        {...register('guests', {
          required: {
            value: true,
            message: 'Número do hóspedes é obrigatório.',
          },
        })}
        placeholder={`Número de hóspedes (max: ${maxGuests})`}
        className="mt-4"
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
      />

      <div className="flex justify-between mt-2">
        <p className="text-sm font-medium text-primaryDarker">Total:</p>
        <p className="text-sm font-medium text-primaryDarker">
          {startDate && endDate
            ? `R$${differenceInDays(endDate, startDate) * pricePerDay}` ?? 1
            : 'R$ 0'}
        </p>
      </div>
      <div className="w-full pb-10 border-b border-grayLighter">
        <Button
          onClick={() => handleSubmit(onSubmit)()}
          className="w-full mt-3"
        >
          Reservar agora
        </Button>
      </div>
    </div>
  );
};

export default TripReservation;
