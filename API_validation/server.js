// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});
app.get('/success', (req, res) => {
  res.send('Order created Successfully!');
});
app.get('/failure', (req, res) => {
  res.send('Could not create Order, check logs!');
});
// Route to handle POST requests
app.post('/create-order', (req, res) => {
  const {
    customer_mobile,
    user_token,
    amount,
    order_id,
    redirect_url,
    remark1,
    remark2
  } = req.body;

  // Log the received data
  console.log('Received data:', req.body);
   console.log(req.body.customer_mobile);
    if (!customer_mobile || !order_id ) {
    console.error('Validation failed: Missing required fields.');
    return res.status(400).json({
      status: false,
      message: 'Your Plan Expired Please Renew'
    });
  }

  // Respond with success
  res.status(200).json({
    status: true,
    message: 'Order Created Successfully',
    result: {
      orderId: order_id,
      payment_url: redirect_url,
    }
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
