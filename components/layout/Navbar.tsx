import Link from "next/link";
import { CartButton } from "./CartButton";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-800 bg-black/90 text-white backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Burger App home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 shadow-lg shadow-lime-400/10 transition-transform duration-300 group-hover:scale-105">
            <span className="relative h-5 w-6">
              <span className="absolute left-1/2 top-0 h-2 w-6 -translate-x-1/2 rounded-t-full bg-black" />
              <span className="absolute left-1/2 top-2.25 h-1 w-5 -translate-x-1/2 rounded-full bg-black" />
              <span className="absolute bottom-0 left-1/2 h-2 w-6 -translate-x-1/2 rounded-b-full bg-black" />
            </span>
          </span>

          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-white">
              Burger
            </span>
            <span className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-lime-400">
              Menu
            </span>
          </div>
        </Link>

        <CartButton />
      </div>
    </nav>
  );
};
