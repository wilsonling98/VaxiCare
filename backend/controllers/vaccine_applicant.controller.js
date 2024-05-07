import vaccineApplicant from "../models/vaccine_applicant.js";

export const createVaccineApplicant = async (req, res, next) => {
    try {
        console.log("Request body:", req.body); // Log request body

        // Extract data from the request body
        const { firstName, lastName, ICNumber, countryCode, contactNumber, gender, appointmentDate, medicalConditions } = req.body;

        // Check if all required fields are present
        if (!firstName || !lastName || !ICNumber || !countryCode || !contactNumber || !gender || !appointmentDate) {
            console.error("Missing required fields"); // Log error
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new vaccination applicant record
        const newVaccinationApplicant = new vaccineApplicant({
            firstName,
            lastName,
            ICNumber,
            countryCode,
            contactNumber,
            gender,
            appointmentDate,
            medicalConditions: medicalConditions || [], // Ensure medicalConditions is an array
            vaccine_appointment_confirmed: false, // Set to false by default
            vaccine_appointment_administered: false // Set to false by default
        });

        // Save the new vaccination applicant record to the database
        const savedVaccinationApplicant = await newVaccinationApplicant.save();

        // Return a success response
        res.status(201).json(savedVaccinationApplicant);
    } catch (error) {
        // Handle errors
        console.error('Error creating vaccination applicant:', error);
        res.status(500).json({ error: 'Failed to create vaccination applicant' });
    }
};


export const getAllVaccineApplicants = async (req, res, next) => {
  try {
      // Query the vaccineApplicant model to get all vaccine applicants
      const allVaccineApplicants = await vaccineApplicant.find();

      // Return the array of vaccine applicants
      res.status(200).json(allVaccineApplicants);
  } catch (error) {
      // Handle errors
      console.error('Error fetching all vaccine applicants:', error);
      res.status(500).json({ error: 'Failed to fetch all vaccine applicants' });
  }
};

export const getVaccineApplicantById = async (req, res, next) => {
  try {
      const { id } = req.params; // Extract the Object ID from the request parameters
      
      // Query the database to find the vaccine applicant by Object ID
      const applicant = await vaccineApplicant.findById(id);

      // Check if the applicant exists
      if (!applicant) {
          return res.status(404).json({ error: 'Vaccine applicant not found' });
      }

      // Return the vaccine applicant
      res.status(200).json(applicant);
  } catch (error) {
      // Handle errors
      console.error('Error fetching vaccine applicant by ID:', error);
      res.status(500).json({ error: 'Failed to fetch vaccine applicant' });
  }
};
export const confirmed_vaccine_appointment = async (req, res) => {
  const { id } = req.params; // Extract the applicant ID from the request URL
  try {
      const applicant = await vaccineApplicant.findById(id);
      if (!applicant) {
          return res.status(404).json({ error: 'Applicant not found' });
      }
      
      // Update the vaccine_appointment_confirmed status to true
      applicant.vaccine_appointment_confirmed = true;
      await applicant.save();

      res.status(200).json(applicant);
  } catch (error) {
      console.error('Error updating vaccine appointment confirmation status:', error);
      res.status(500).json({ error: 'Failed to update vaccine appointment confirmation status' });
  }
};
export const confirmed_vaccination_administered = async (req, res) => {
  const { id } = req.params; // Extract the applicant ID from the request URL
  try {
      const applicant = await vaccineApplicant.findById(id);
      if (!applicant) {
          return res.status(404).json({ error: 'Applicant not found' });
      }
      
      // Update the vaccine_appointment_administered status to true
      applicant.vaccine_appointment_administered = true;
      await applicant.save();

      res.status(200).json(applicant);
  } catch (error) {
      console.error('Error updating vaccine appointment administered status:', error);
      res.status(500).json({ error: 'Failed to update vaccine appointment administered status' });
  }
};
export const getLatestAddedApplicant = async (req, res, next) => {
    try {
        // Query the database to find the latest added vaccine applicant based on the creation timestamp
        const latestApplicant = await vaccineApplicant.findOne().sort({ createdAt: -1 });

        if (!latestApplicant) {
            return res.status(404).json({ error: 'No vaccine applicant found' });
        }

        res.status(200).json(latestApplicant);
    } catch (error) {
        console.error('Error fetching latest added vaccine applicant:', error);
        res.status(500).json({ error: 'Failed to fetch latest added vaccine applicant' });
    }
};




