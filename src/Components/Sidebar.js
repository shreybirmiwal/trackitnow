import React from "react";
import Locker from "../Pages/Locker";
import QR from "../Pages/QR";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

export default function Sidebar({ setTab, tab, school }) {
  const setTab0 = () => {
    setTab(0);
  };
  const setTab1 = () => {
    setTab(1);
  };

  var linkToSchool =""
  if(school === "Westwood"){
    linkToSchool="/whs/admin"
  }  
  if(school === "Georgetown"){
    linkToSchool="/ghs/admin"
  }  

  return (
    <div className="h-screen">
      <div className="flex h-max w-screen">
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
                    <p className="text-2xl text-center">The Locker</p>
                  </div>
                </li>



                <li className="rounded-sm">
                  <div
                    className="flex items-center justify-center p-2 space-x-3 rounded-md hover:font-bold"
                    onClick={setTab1}
                  >
                    <p className="text-2xl">QR</p>
                  </div>
                </li>

                <li className="rounded-sm absolute bottom-0" style={{ backgroundColor: '#ff6961' }} >
                <Link to={linkToSchool}
                                  className="flex items-center justify-center p-2 space-x-3 rounded-md hover:font-bold"
                >
                  <p className="text-2xl">Admin</p>
                  </Link>
              </li>


              </ul>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1">
          {tab === 0 && <Locker school={school}/>}
          {tab === 1 && <QR school={school}/>}
        </div>
      </div>
    </div>
  );
}
