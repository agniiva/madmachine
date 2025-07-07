'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-green-500 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-green-500 hover:text-green-400 transition-colors">
            <div className="ascii-art glow hidden sm:block">
{`
███╗   ███╗ █████╗ ██████╗ ███╗   ███╗ █████╗  ██████╗██╗  ██╗██╗███╗   ██╗███████╗███████╗
████╗ ████║██╔══██╗██╔══██╗████╗ ████║██╔══██╗██╔════╝██║  ██║██║████╗  ██║██╔════╝██╔════╝
██╔████╔██║███████║██║  ██║██╔████╔██║███████║██║     ███████║██║██╔██╗ ██║█████╗  ███████╗
██║╚██╔╝██║██╔══██║██║  ██║██║╚██╔╝██║██╔══██║██║     ██╔══██║██║██║╚██╗██║██╔══╝  ╚════██║
██║ ╚═╝ ██║██║  ██║██████╔╝██║ ╚═╝ ██║██║  ██║╚██████╗██║  ██║██║██║ ╚████║███████╗███████║
╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝
`}
            </div>
            <div className="text-xl font-mono glow sm:hidden">
              madmachines
            </div>
          </Link>
          
          <nav className="flex items-center space-x-4 sm:space-x-8">
            <Link 
              href="/" 
              className="text-green-500 hover:text-green-400 transition-colors font-mono text-sm sm:text-base"
            >
              [HOME]
            </Link>
            <Link 
              href="/admin" 
              className="text-green-500 hover:text-green-400 transition-colors font-mono text-sm sm:text-base"
            >
              [ADMIN]
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}