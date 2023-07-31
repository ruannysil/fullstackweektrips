import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {MdCottage} from "react-icons/md"

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
          <Link href={`/trips/search?text=hotel`} className='flex flex-col items-center transition-all hover:text-primary '>
            <Image width={35} height={35} src="/hotel-icon.png" alt="Hotel" />
          <p className='text-sm text-grayPrimary hover:text-primary'>Hotel</p>
          </Link>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <Link href={`/trips/search?text=Chalé`} className='flex flex-col items-center transition-all'>
  
          <Image width={35} height={35} src="/Chale.png" alt="Chalé" />
          <p className='text-sm text-grayPrimary hover:text-primary'>Chalé</p>
          </Link>
        </div>
        
        <div className='flex flex-col items-center gap-1'>
        <Link href={`/trips/search?text=fazenda`} className='flex flex-col items-center transition-all hover:text-primary '>
          <Image width={35} height={35} src="/Cabin.png" alt="Fazenda" />
          <p className='text-sm text-grayPrimary hover:text-primary'>Fazenda</p>
        </Link>
        </div>
        
        <div className='flex flex-col items-center gap-1'>
        <Link href={`/trips/search?text=pousada`}className='flex flex-col items-center transition-all hover:text-primary'>
          <Image width={35} height={35} src="/Tent.png" alt="Pousada" />
          <p className='text-sm text-grayPrimary hover:text-primary'>Pousada</p>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
