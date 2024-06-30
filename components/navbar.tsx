"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      label: "Dashboard",
      active: pathname === "/",
    },
    {
      href: "/issues",
      label: "Issues",
      active: pathname === "/issues",
    },
    {
      href: "/issues/new",
      label: "New Issue",
      active: pathname === "/issues/new",
    },
  ];

  return (
    <div className="bg-white p-4 border-b">
      <nav className="max-w-7xl container mx-auto space-x-5">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.label}
            className={classNames({
              "text-gray-600": true,
              "text-black font-semibold": link.active,
            })}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
