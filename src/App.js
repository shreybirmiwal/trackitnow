import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom" 

import LandingPage from './Pages/LandingPage';
import Home from './Pages/Home';
import Inventory from './Pages/Inventory'
import Analytics from './Pages/Analytics'
import QR from './Pages/QR';
import Log from './Pages/Log';
import Updates from './Pages/Updates';

function App() {

    return (

        <Router>
        <Routes>
          
          <Route exact path="/" element={<LandingPage school={"Georgetown"} short_school={"ghs"}/>}/>

          <Route path="/whs" element={<Home school={"Westwood"} short_school={"whs"}/>}/>
          <Route path="/whs/inventory" element={<Inventory school={"Westwood"} short_school = {"whs"}/>}/>
          <Route path="/whs/analytics" element={<Analytics school={"Westwood"} short_school = {"whs"}/>}/>
          <Route path="/whs/log" element={<Log school={"Westwood"} short_school = {"whs"}/>}/>
          <Route path="/whs/updates" element={<Updates school={"Westwood"} short_school = {"whs"}/>}/>
          <Route path="/whs/qr" element={<QR school={"Westwood"} short_school = {"whs"}/>}/>


          <Route path="/ghs" element={<Home school={"Georgetown"} short_school={"ghs"}/>}/>
          <Route path="/ghs/inventory" element={<Inventory school={"Georgetown"} short_school = {"ghs"}/>}/>
          <Route path="/ghs/analytics" element={<Analytics school={"Georgetown"} short_school = {"ghs"}/>}/>
          <Route path="/ghs/log" element={<Log school={"Georgetown"} short_school = {"ghs"}/>}/>
          <Route path="/ghs/updates" element={<Updates school={"Georgetown"} short_school = {"ghs"}/>}/>
          <Route path="/ghs/qr" element={<QR school={"Georgetown"} short_school = {"ghs"}/>}/>


        </Routes>
      </Router>

    )
}

export default App;
