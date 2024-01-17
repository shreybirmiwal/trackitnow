import React from "react";
import Inventory from "../Pages/Inventory";
import Analytics from "../Pages/Analytics";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

export default function AdminSidebar({ setTab, tab, school }) {
  const setTab0 = () => {
    setTab(0);
  };
  const setTab1 = () => {
    setTab(1);
  };

  var linkToSchool =""
  if(school === "Westwood"){
    linkToSchool="/whs"
  }  
  if(school === "Georgetown"){
    linkToSchool="/ghs"
  }  

  return (
    <div className="h-screen">
      <div className="flex min-h-screen max-h-max w-screen">
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

                <li className="rounded-sm absolute bottom-0" style={{ backgroundColor: '#ff6961' }}>
                <Link to={linkToSchool}
                                  className="flex items-center justify-center p-2 space-x-3 rounded-md hover:font-bold"
                >
                  <p className="text-2xl">Student View</p>
                  </Link>
              </li>


              </ul>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1">
          {tab === 0 && <Inventory school={school}/>}
          {tab === 1 && <Analytics school={school}/>}
        </div>
      </div>
    </div>
  );
}
