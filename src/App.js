import React from 'react'
import { useState } from 'react'
import Sidebar from './Components/Sidebar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom" 
import AdminSidebar from './Components/AdminSidebar';

function App() {
    const [tab, setTab] = useState(0);
    const [Admintab, AdminsetTab] = useState(0);

    return (

        <Router>
        <Routes>
          
          <Route exact path="/" element={<Sidebar setTab={setTab} tab={tab} />}/>
          <Route path="/Admin" element={<AdminSidebar setTab={AdminsetTab} tab={Admintab}/>}/>

          <Route path="/whs" element={<Sidebar setTab={setTab} tab={tab} school={"Westwood"}/>}/>
          <Route path="/whs/admin" element={<AdminSidebar setTab={AdminsetTab} tab={Admintab} school={"Westwood"}/>}/>



        </Routes>
      </Router>

    )
}

export default App;
