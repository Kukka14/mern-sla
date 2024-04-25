import { Router } from 'express';
const router = Router();
import {getAddresses,createAddress,updateAddress,deleteAddress,getAddressById} from '../controllers/address.controller.js';

router.post('/get', getAddresses);
router.post('/add',createAddress);
router.put('/update/:addressId', updateAddress);
router.delete('/:addressId', deleteAddress);
router.post('/getdetails', getAddressById);

export default router;