import UserCategory from "../models/userCategory.js";

export const createUserID = async (isHA) => {
    // Determine the category based on the isHA parameter
    const category = isHA ? "HA" : "PT";

    // Find the corresponding UserCategory document
    let userCategory = await UserCategory.findOne({ category });

    // If no document exists for this category, create one
    if (!userCategory) {
        userCategory = new UserCategory({
            category,
            IDNumber: 1, // Starting ID number
            categoryCounter: 0 // Starting category counter
        });
    }

    // Increment the category counter
    userCategory.categoryCounter++;

    // Save the updated UserCategory document
    await userCategory.save();

    // Generate the user ID by concatenating category and IDNumber
    const userID = `${category}${userCategory.IDNumber.toString().padStart(3, '0')}`;

    // Increment the IDNumber for the next user
    userCategory.IDNumber++;

    // Save the updated UserCategory document again
    await userCategory.save();

    return userID;
};












