import express from 'express';
import { createVaccineApplicant,getAllVaccineApplicants, getVaccineApplicantById, confirmed_vaccination_administered, confirmed_vaccine_appointment,getLatestAddedApplicant } from '../controllers/vaccine_applicant.controller.js';

const router = express.Router();

// Add middleware to parse JSON data
router.use(express.json());

// register
router.post('/registerVaccine',createVaccineApplicant);
// Define the route for getting all vaccine applicants
router.get('/getAllVaccineApplicants', getAllVaccineApplicants);

// Get the desired vaccine applicant
router.get('/getVaccineApplicantInfo/:id',getVaccineApplicantById);
router.put('/confirm/:id',confirmed_vaccine_appointment);
router.put('/administer/:id',confirmed_vaccination_administered);
// Route to get the latest added vaccine applicant
router.get('/latest-applicant', getLatestAddedApplicant);


export default router;