import React, { useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';

const QR = () => {
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const url = 'https://www.cnn.com';

    const qrCodeData = new QRCode(qrCodeRef.current, {
      text: url,
      width: 128,
      height: 128,
    });

    qrCodeData.make();
  }, []);

  return (
    <div>
      <h1>QR Code</h1>
      <p>Print this QR code and leave it by the locker to link to this website!</p>
      <div ref={qrCodeRef}></div>
    </div>
  );
};

export default QR;
