import React from 'react';
import Image from 'next/image';

const QuickSearch = () => {
  return (
    <div className="container p-5 mx-auto">
      <div className="flex items-center">
        <div className="w-full h-[1px]  bg-grayLighter"></div>
        <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">
          Tente pesquisar por
        </h2>
        <div className='w-full h-[1px] bg-grayLighter'></div>
      </div>

      <div className='flex justify-between w-full mt-5'>
        <div className='flex flex-col items-center gap-1'>
          <Image width={35} height={35} src="/hotel-icon.png" alt="Hotel" />
          <p className='text-sm text-grayPrimary'>Hotel</p>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <Image width={35} height={35} src="/Castle.png" alt="Chalé" />
          <p className='text-sm text-grayPrimary'>Chalé</p>
        </div><div className='flex flex-col items-center gap-1'>
          <Image width={35} height={35} src="/Cabin.png" alt="Fazenda" />
          <p className='text-sm text-grayPrimary'>Fazenda</p>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <Image width={35} height={35} src="/Tent.png" alt="Pousada" />
          <p className='text-sm text-grayPrimary'>Pousada</p>
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
