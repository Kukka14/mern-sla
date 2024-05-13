import express from 'express';
import { add } from '../controllers/contact.controller.js';

const router = express.Router();        //creates a new router

router.post('/addContact', add);       //get post requests from adcontact endpoint
                                            //and handle them
export default router;



// route in the Express application to handle POST requests 
    //sent to the /addContact endpoint. When a POST request is 
    //received at this endpoint, the add function is called to process the request