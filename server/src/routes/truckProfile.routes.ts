import { Router, response } from 'express';
import { uuid } from 'uuidv4';

const truckProfileRouter = Router();

const truckProfile = [];

truckProfileRouter.post('/', (req, res) => {
  const {
    name,
    description,
    cuisine,
    paymentMethod,
    email,
    phone,
    city,
    state,
  } = req.body;

  const newProfile = {
    id: uuid(),
    name,
    description,
    cuisine,
    paymentMethod,
    email,
    phone,
    city,
    state,
  };

  truckProfile.push(newProfile);

  return response.json(newProfile);
});

export default truckProfileRouter;
