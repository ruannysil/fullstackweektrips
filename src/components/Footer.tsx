import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center p-5 bg-walterWhile'>
      <Image src="/logo.png" width={133} height={133} alt="full stack week" />
      <p className='mt-1 text-sm font-medium text-primaryDarker'>Todos os direitos reservados.</p>
    </div>
  )
}

export default Footer
