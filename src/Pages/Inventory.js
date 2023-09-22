import React, { useState } from 'react'

function Inventory() {

  const [admin, setAdmin] = useState(false)

  if(admin == false){
    return(
      <div>
        Please verify that you are a Locker admin
      </div>
    );
  } else {
    return(
      <div>
        YIPEE
      </div>
    );
  }

 

}

export default Inventory