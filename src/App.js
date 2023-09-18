import React from 'react'
import { useState } from 'react'
import Sidebar from './Components/Sidebar';

function App() {
    const [tab, setTab] = useState(0);

    return (
        <div>
            <Sidebar setTab={setTab} tab={tab}/>
        </div>
    )
}

export default App;
