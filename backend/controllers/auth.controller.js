import UserCategory from "../models/userCategory.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { CreateError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";

export const registerUser = async (req, res, next) => {
    try {
        // Ensure all required fields are provided
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || req.body.isHA === undefined) {
            return res.status(400).json(CreateError(400, "All fields are required"));
        }

        // Determine the user category based on the isHA parameter
        const userCategory = req.body.isHA ? "HA" : "PT";

        // Find or create the corresponding UserCategory counter document
        let userCategoryCounter = await UserCategory.findOne({ category: userCategory });
        if (!userCategoryCounter) {
            // If the counter document doesn't exist, create one with count set to 1
            userCategoryCounter = new UserCategory({ category: userCategory, count: 1 });
        } else {
            // If the counter document exists, increment the count
            userCategoryCounter.count++;
        }
        // Save the updated or new UserCategory counter document
        await userCategoryCounter.save();

        // Generate the user ID by concatenating category and count
        const userID = `${userCategory}${userCategoryCounter.count.toString().padStart(3, '0')}`;

        //Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user document
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword,
            isHA: req.body.isHA,
            userID: userID, // Assign the generated userID
            userCategory: userCategory, // Store the generated userCategory
            userCategoryRef: userCategoryCounter._id // Store the _id of the UserCategory document
        });

        // Save user document to the database
        await newUser.save();

        // Respond with success message and user details
        return res.status(200).json(createSuccess(200, "User registered successfully"));
    } catch (error) {
        // Handle errors
        console.error("Error:", error.message); // Log the error message
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
};


export const loginUser = async (req, res, next) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });

        // If user not found, return error
        if (!user) {
            return res.status(404).json(CreateError(404, "User not found"));
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json(CreateError(400, "Invalid email or password"));
        }

        // Ensure provided userID matches the stored userID
        if (req.body.userID !== user.userID) {
            return res.status(401).json(CreateError(401, "Login failed: UserID does not match"));
        }

        // If everything is correct, return success
        res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
}

export const checkEmailAvailability = async (req, res) => {
    const { email } = req.params;
    try {
        const existingUser = await User.findOne({ email });
        res.json({ available: !existingUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const fetchUserCategory = async (req, res, next) => {
    try {
        const { userID } = req.query; // Extract userID from query parameters
        console.log('Fetching user...');
        // Find the user by userID and populate the userCategoryRef field
        const user = await User.findOne({ userID }).populate('userCategoryRef');

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('Fetching user category...');
        // Access the populated userCategoryRef field, which now contains the associated UserCategory
        const userCategory = user.userCategoryRef;

        if (!userCategory) {
            console.log('User category not found');
            return res.status(404).json({ error: 'User category not found' });
        }

        console.log('User category found:', userCategory.category);
        // Send the user category back as a response
        res.json({ category: userCategory.category }); // Return only the category
    } catch (error) {
        // Handle errors
        console.error('Error fetching user category:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}



















