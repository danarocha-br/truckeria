import express from 'express';

import routes from './routes';

const app = express();
const port = 3333;

app.get('/', (req, res) => {
  return res.json({ message: 'Hellow' });
});

app.listen(port, () => {
  console.log(`🚚Server started on port ${port}.`);
});
