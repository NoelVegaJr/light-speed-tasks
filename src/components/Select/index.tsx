import type {ISelectOption} from '@/types/types';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export interface ISelectProps {
  options: ISelectOption[];
  title: string;
  selected: ISelectOption;
  onChange: (option: ISelectOption) => void;
}
export default function Select({ options, onChange, selected, title }: ISelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p className="mb-1">{title}</p>
      <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className={`border cursor-pointer rounded w-52 `}>
        <div className="cursor-pointer py-1 px-2 rounded flex justify-between items-center">
          <div>
            {selected.label}
          </div>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
        {isOpen && (
          <>
            <div className="relative">
              <div className="absolute shadow-md bg-white w-full border rounded-b">
                {options.map(option => {
                  if (option.id === selected.id) return
                  return <div onClick={() => onChange(option)} className="py-1 px-2 hover:bg-blue-500 hover:text-white cursor-pointer" key={option.id}>{option.label}</div>
                })}
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  )
}
