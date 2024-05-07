export const createSuccess = (statusCode,successMessage,data) => {
    const successObj = {
        status: statusCode,
        success: successMessage,
        data: data
    }
    return successObj;
}