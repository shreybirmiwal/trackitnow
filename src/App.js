import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom" 

import LandingPage from './Pages/LandingPage';
import Home from './Pages/Home';
import Inventory from './Pages/Inventory'
import Analytics from './Pages/Analytics'
import QR from './Pages/QR';
import Log from './Pages/Log_Setup/Log';
import Updates from './Pages/Updates';

function App() {

    return (

        <Router>
        <Routes>
          
          <Route exact path="/" element={<LandingPage />}/>

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



          <Route path="/t" element={<Home school={"Test"} short_school={"t"}/>}/>
          <Route path="/t/inventory" element={<Inventory school={"Test"} short_school = {"t"}/>}/>
          <Route path="/t/analytics" element={<Analytics school={"Test"} short_school = {"t"}/>}/>
          <Route path="/t/log" element={<Log school={"Test"} short_school = {"t"}/>}/>
          <Route path="/t/updates" element={<Updates school={"Test"} short_school = {"t"}/>}/>
          <Route path="/t/qr" element={<QR school={"Test"} short_school = {"t"}/>}/>


        </Routes>
      </Router>

    )
}

export default App;
