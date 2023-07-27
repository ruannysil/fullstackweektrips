import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

function Button({ className, ...props }: ComponentPropsWithoutRef<'button'>) {
  const _className = twMerge(
    'appearance-none rounded-lg p-2 text-sm font-medium shadow transition-all bg-primary hover:bg-primaryDarker text-white',
    className,
  );

  return (
    <button className={_className} {...props}>
      {props.children}
    </button>
  );
}

export default Button;
