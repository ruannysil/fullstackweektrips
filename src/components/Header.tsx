'use client';

import React, { use, useState } from 'react';
import Image from 'next/image';
import { signIn, useSession, signOut } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';

const Header = () => {
  const [menuIsOpen, setMenuIsOpne] = useState(false);
  const { status, data } = useSession();

  const handleLoginClick = () => signIn();
  const handleLogoutClick = () => signOut();

  const handleMenuClick = () => setMenuIsOpne(!menuIsOpen);

  return (
    <div className="container flex items-center justify-between p-5 py-0 h-[93px] mx-auto">
      <Link href="/">
        <div className="relative h-[32px] w-[182px]">
          <Image src="/logo.png" alt="fws trip" fill />
        </div>
      </Link>

      {status === 'unauthenticated' && (
        <button
          className="p-2 text-sm font-semibold border border-solid rounded-full text-primary border-grayLighter"
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}

      {status === 'authenticated' && data.user && (
        <div className="relative z-50 flex items-center gap-3 p-2 px-3 border border-solid rounded-full border-grayLighter">
          <AiOutlineMenu
            size={16}
            onClick={handleMenuClick}
            className="cursor-pointer"
          />

          <Image
            height={32}
            width={32}
            alt={data.user.name!}
            src={data.user.image!}
            className="rounded-full shadow-md"
          />

          {menuIsOpen && (
            <div className="absolute left-0 z-50 flex flex-col items-center justify-center w-full h-[100px] bg-white rounded-lg shadow-md top-14">
             <Link href="/my-trips">
             <button className="pb-2 text-xs font-semibold border-b border-solid text-primary border-grayLighter">
                Minhas viagens
              </button>

             </Link>
              <button
                className="pt-2 text-xs font-semibold text-primary"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
