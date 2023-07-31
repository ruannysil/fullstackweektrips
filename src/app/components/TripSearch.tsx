import Button from '@/components/Button';
import CurrencyInput from '@/components/CurrencyInput';
import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

interface TripSearchFrom {
  text: string;
  startDate: Date | null;
  budget: number;
}

const TripSearch = () => {
  const { control, register,formState: {errors}, handleSubmit } = useForm<TripSearchFrom>();

  const router = useRouter()

  const onSubmit = (data: TripSearchFrom) => {
    router.push(`/trips/search?text=${data.text}&startDate=${data.startDate}&budget=${data.budget}`)
  }

  return (
    <div className="container p-2 mx-auto bg-center bg-no-repeat bg-cover bg-search-background">
      <h1 className="text-xl font-semibold text-center text-primaryDarker">
        Encontre sua próxima <span className="text-primary">viagem!</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5">
        <Input
          placeholder="Onde você quer ir ?"
          error={!!errors.text}
          errorMessage={errors.text?.message}
          {...register('text', {
            required: {
              value: true,
              message: 'Texto é obrigatorio.',
            },
          })}
        />

        <div className="flex gap-4">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText="Data final"
                onChange={field.onChange}
                selected={field.value}
                className="w-full"
                minDate={new Date()}
              />
            )}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                placeholder="Orçamento"
                onValueChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
        <Button onClick={() => handleSubmit(onSubmit)()}>Buscar</Button>
      </div>
    </div>
  );
};

export default TripSearch;
