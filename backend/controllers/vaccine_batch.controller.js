import vaccineBatch from "../models/vaccine_batch.js";

export const createNewVaccineBatch = async (req, res, next) => {
    try {
        // Step 1: Check Request Body
        console.log("Request body:", req.body); // Log request body

        // Step 2: Extract Data
        const { batchNumber, vaccineName, manufacturingDate, expiryDate, dosingInformation } = req.body;

        // Step 3: Validate Data
        if (!batchNumber || !vaccineName || !manufacturingDate || !expiryDate || !dosingInformation) {
            // Log and return error if any field is missing
            console.error("Missing required fields");
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Step 4: Create New Vaccine Batch
        const newVaccineBatch = new vaccineBatch({
            batchNumber,
            vaccineName,
            manufacturingDate,
            expiryDate,
            dosingInformation // Corrected field name
        });

        // Step 5: Save to Database
        const savedVaccineBatch = await newVaccineBatch.save();

        // Step 6: Return Response
        res.status(201).json(savedVaccineBatch);

    } catch (error) {
        // Step 7: Handle Errors
        console.error('Error creating vaccine batch:', error);
        res.status(500).json({ error: 'Failed to create new vaccination batch' });
    }
};


export const getAllVaccineBatch = async (req, res, next) => {
    try {
        // Query the vaccineApplicant model to get all vaccine applicants
        const allVaccineBatches = await vaccineBatch.find();
  
        // Return the array of vaccine applicants
        res.status(200).json(allVaccineBatches);
    } catch (error) {
        // Handle errors
        console.error('Error fetching all vaccine batches:', error);
        res.status(500).json({ error: 'Failed to fetch all vaccine batches' });
    }
  };
  
export const getVaccineBatchById = async (req, res, next) => {
    try {
        const { id } = req.params; // Extract the Object ID from the request parameters
        
        // Query the database to find the vaccine applicant by Object ID
        const batch = await vaccineBatch.findById(id);
  
        // Check if the applicant exists
        if (!batch) {
            return res.status(404).json({ error: 'Vaccine batch not found' });
        }
  
        // Return the vaccine applicant
        res.status(200).json(batch);
    } catch (error) {
        // Handle errors
        console.error('Error fetching vaccine batch by ID:', error);
        res.status(500).json({ error: 'Failed to fetch vaccine batch' });
    }
}

export const getLatestRecordedBatch = async (req, res, next) => {
    try {
        // Query the database to find the latest added vaccine applicant based on the creation timestamp
        const latestRecordedBatch = await vaccineBatch.findOne().sort({ createdAt: -1 });

        if (!latestRecordedBatch) {
            return res.status(404).json({ error: 'No vaccine batch found' });
        }

        res.status(200).json(latestRecordedBatch);
    } catch (error) {
        console.error('Error fetching latest recorded vaccine batch:', error);
        res.status(500).json({ error: 'Failed to fetch latest recorded vaccine batch' });
    }
};

   