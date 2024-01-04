import React from "react";
import Inventory from "../Pages/Inventory";
import Analytics from "../Pages/Analytics";

export default function AdminSidebar({ setTab, tab }) {
  const setTab0 = () => {
    setTab(0);
  };
  const setTab1 = () => {
    setTab(1);
  };


  return (
    <div className="h-screen">
      <div className="flex h-screen w-screen">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col p-5 bg-white shadow w-60">
          <div className="space-y-3">
            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="rounded-sm">
                  <div
                    className="flex p-2 justify-center space-x-3 rounded-md hover:font-bold"
                    onClick={setTab0}
                  >
                    <p className="text-2xl text-center">Inventory</p>
                  </div>
                </li>



                <li className="rounded-sm">
                  <div
                    className="flex items-center justify-center p-2 space-x-3 rounded-md hover:font-bold"
                    onClick={setTab1}
                  >
                    <p className="text-2xl">Analytics</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1">
          {tab === 0 && <Inventory />}
          {tab === 1 && <Analytics />}
        </div>
      </div>
    </div>
  );
}
