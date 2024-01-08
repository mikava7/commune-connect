import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/commune", label: "Commune" },
  { href: "/about", label: "About" },
  { href: "/mypage", label: "My Page" },
  { href: "/posts", label: "posts" },
];

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
