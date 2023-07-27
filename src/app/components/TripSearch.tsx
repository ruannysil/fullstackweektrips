import Button from '@/components/Button';
import CurrencyInput from '@/components/CurrencyInput';
import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import React from 'react';

const TripSearch = () => {
  return (
    <div className="container p-2 mx-auto bg-center bg-no-repeat bg-cover bg-search-background">
      <h1 className="text-xl font-semibold text-center text-primaryDarker">
        Encontre sua próxima <span className="text-primary">viagem!</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5">
        <Input placeholder="Onde você quer ir ?" />

        <div className="flex gap-4">
          <DatePicker placeholderText="Data da ida" onChange={() => {}} />
          <CurrencyInput placeholder="Orçamento" />
        </div>
        <Button>Buscar</Button>
      </div>
    </div>
  );
};

export default TripSearch;
