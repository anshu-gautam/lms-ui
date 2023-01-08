import SideNav from "./sidenav"

function Layout({ children }) {
  return (
    <div className="flex w-full relative">
      <SideNav />
      <main className="w-11/12 bg-cyan-100 min-h-screen h-full">
        {children}
      </main>
    </div>
  );
}

export { Layout };
