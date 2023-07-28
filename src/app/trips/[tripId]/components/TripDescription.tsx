import React from 'react';

interface TripDescriptionProps {
  description: string;
}

const TripDescription = ({ description }: TripDescriptionProps) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-primaryDarker">Sobre a viagem</h2>
      <p className="mt-1 text-xs leading-5 text-primaryDarker">{description}</p>
    </div>
  );
};

export default TripDescription;
