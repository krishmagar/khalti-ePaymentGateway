import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [paymentUrl, setPaymentUrl] = useState('');

  const handlePay = async () => {
    const response = await axios
      .post('http://127.0.0.1:8080/khalti/pay')
      .then((res) => setPaymentUrl(res.data.payment_url))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div>Hello</div>
      <button onClick={handlePay}>Confirm Order</button>
      <a href={paymentUrl} target="_blank">
        Pay
      </a>
    </>
  );
}

export default App;
