// components/Navbar.tsx
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-white w-screen flex flex-row justify-between items-center p-4">
      <div>
        <Image src="/assets/logo.png" alt="Logo" width={100} height={25} />
      </div>
    </nav>
  );
}
