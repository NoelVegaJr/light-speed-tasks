import { useState } from "react";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";


export default function Layout({ children }: { children: JSX.Element }) {
  const [sideNavOpen, setSideNavOpen] = useState(true);
  return (
    <div className="h-screen flex flex-col">
        <TopNavbar onClick={() => setSideNavOpen(!sideNavOpen)} />
        <div className="flex-1 flex overflow-hidden" style={{ backgroundColor: "#1e1f21" }}>
          <SideNavbar isOpen={sideNavOpen} />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
      </div>
    </div>
  )
}
