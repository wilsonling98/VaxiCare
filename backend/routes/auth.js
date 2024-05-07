import express from 'express';
import { registerUser, loginUser, checkEmailAvailability,fetchUserCategory } from '../controllers/auth.controller.js';


const router = express.Router();

// Add middleware to parse JSON data
router.use(express.json());

// register
router.post("/register",registerUser );  
router.post("/login",loginUser );
router.get("/check-email/:email",checkEmailAvailability);
router.get("/getUserCategory",fetchUserCategory);



export default router;
