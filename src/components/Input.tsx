import { ComponentPropsWithRef, LegacyRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends ComponentPropsWithRef<'input'> {
  error?: boolean;
  errorMessage?: string;
}

function Input(
  { className, error, errorMessage, ...props }: InputProps,
  ref: LegacyRef<HTMLInputElement> | undefined,
) {
  const inputClassName = twMerge(
    'rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-primaryDarker placeholder-black placeholder-opacity-20 outline-none transition-all',
    error ? 'border-red-500' : 'focus:ring-1 focus:ring-primary',
    className,
  );

  return (
    <div className="flex flex-col w-full">
      <input ref={ref} className={inputClassName} {...props} />
      {error && errorMessage && (
        <span className="mt-1 text-xs text-red-400">{errorMessage}</span>
      )}
    </div>
  );
}

export default forwardRef(Input);
