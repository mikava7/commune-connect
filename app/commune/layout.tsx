import Sidenav from "../ui/commune/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en">
      <nav>
        <Sidenav />

        {children}
      </nav>
    </div>
  );
}
