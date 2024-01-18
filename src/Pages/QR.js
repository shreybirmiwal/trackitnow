import { useState } from 'react';
import QRCode from 'react-qr-code';
import { AdminNav } from '../Components/AdminNav';
function QR({school, short_school}) {
  const [back, setBack] = useState('#FFFFFF');
  const [fore, setFore] = useState('#000000');
  const [size, setSize] = useState(256);

  var QR_CODE = ""
  if(school === 'Westwood'){
    QR_CODE = process.env.REACT_APP_QR_CODE_WHS
  } else if(school == 'Georgetown'){
    QR_CODE = process.env.REACT_APP_QR_CODE_GHS
  } else {
    QR_CODE = ''
  }

  return (
    <div>
        <AdminNav school={school} short_school={short_school}/>

        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 w-full">
        <div className="w-full max-w-xl p-4">
        <div className="flex flex-col items-center justify-center h-scree">
            <h1 className='mb-10 text-xl font-bold'> {school} Locker </h1>
          <QRCode
            value={QR_CODE}
            bgColor={back}
            fgColor={fore}
            size={size === '' ? 0 : size}
            className="mb-4"
          />

          <p className="text-lg text-gray-800">
            Print this QR code and leave it by the locker to link to this website!
          </p>
        </div>
        </div>
        </div>
    </div>

  );
}

export default QR;
