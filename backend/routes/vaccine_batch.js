import express from 'express';
import {  createNewVaccineBatch, getAllVaccineBatch, getVaccineBatchById,getLatestRecordedBatch} from '../controllers/vaccine_batch.controller.js';

const router = express.Router();

// Add middleware to parse JSON data
router.use(express.json());

// Define the route for creating a new vaccine batch
router.post('/createNewVaccineBatch', createNewVaccineBatch);
router.get('/getAllVaccineBatch',getAllVaccineBatch);
router.get('/getVaccineBatch/:id',getVaccineBatchById);
router.get('/latestVaccineBatch',getLatestRecordedBatch);

export default router;