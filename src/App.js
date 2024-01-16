import React from 'react'
import { useState } from 'react'
import Sidebar from './Components/Sidebar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom" 
import AdminSidebar from './Components/AdminSidebar';
import LandingPage from './Pages/LandingPage';

function App() {
    const [tab, setTab] = useState(0);
    const [Admintab, AdminsetTab] = useState(0);

    return (

        <Router>
        <Routes>
          
          <Route exact path="/" element={<LandingPage/>}/>

          <Route path="/whs" element={<Sidebar setTab={setTab} tab={tab} school={"Westwood"}/>}/>
          <Route path="/whs/admin" element={<AdminSidebar setTab={AdminsetTab} tab={Admintab} school={"Westwood"} short_school = {"whs"}/>}/>

          <Route path="/ghs" element={<Sidebar setTab={setTab} tab={tab} school={"Georgetown"}/>}/>
          <Route path="/ghs/admin" element={<AdminSidebar setTab={AdminsetTab} tab={Admintab} school={"Georgetown"} short_school = {"ghs"}/>}/>


        </Routes>
      </Router>

    )
}

export default App;
