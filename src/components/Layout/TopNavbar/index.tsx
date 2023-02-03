import { Bars3Icon } from '@heroicons/react/24/solid';
import Image from 'next/image';

export default function TopNavbar({ onClick }: { onClick: () => void }) {
  return (
    <div className="h-14 flex items-center pl-6" style={{ backgroundColor: '#363639' }}>
      <div className="flex h-full gap-6 items-center">
        <button onClick={onClick} className="p-1 rounded-lg hover:bg-gray-200/10 transition-colors duration-200">
          <Bars3Icon className="w-7 h-7 text-gray-200" />
        </button>
        <button className="relative h-6 w-32">
          <Image src="/logo.png" alt="Light Speed Voice Logo" fill />
        </button>
      </div>
    </div>
  )
}
