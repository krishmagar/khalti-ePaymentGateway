import express, { urlencoded } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import { SECRET_KEYS } from '../config/default.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get('/', (_, res) => {
  res.status(200).json({
    status: 200,
    message: 'OK',
  });
});

app.get('/khalti/pay', async (req, res) => {
  const {
    name,
    email,
    phone,
    purchase_order_id,
    purchase_order_name,
    product_name,
    quantity,
    unit_price,
    total_price,
    total_amount,
  } = req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !purchase_order_id ||
    !purchase_order_name ||
    !product_name ||
    !quantity ||
    !unit_price ||
    !total_price ||
    !total_amount
  ) {
    res.status(204).json({
      error: 'Fill The Required Fields',
    });
  }

  const data = {
    return_url: 'http://127.0.0.1:8080/khalti/pay/verify',
    website_url: 'https://example.com/',
    amount: 10500,
    purchase_order_id: 'test12',
    purchase_order_name: 'test',
    customer_info: {
      name: 'Test Test',
      email: 'test@test.com',
      phone: '9800000001',
    },
    amount_breakdown: [
      {
        label: 'Mark Price',
        amount: 10000,
      },
      {
        label: 'VAT',
        amount: 500,
      },
    ],
    product_details: [
      {
        identity: '1234567890',
        name: 'Khalti logo',
        total_price: 10500,
        quantity: 1,
        unit_price: 10500,
      },
    ],
  };

  // Khalti Payment Initiation
  const { payment_url } = await axios
    .post('https://a.khalti.com/api/v2/epayment/initiate/', data, {
      headers: {
        Authorization: `Key ${SECRET_KEYS.khalti}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
  //   Sample Output of res.data
  //   {
  //     "pidx": "HT6o6PEZRWFJ5ygavzHWd5",
  //     "total_amount": 1000,
  //     "status": "Completed",
  //     "transaction_id": "GFq9PFS7b2iYvL8Lir9oXe",
  //     "fee": 0,
  //     "refunded": false
  //  }

  res.status(200).json({
    url: payment_url,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Listening On PORT: ${PORT}`);
});
