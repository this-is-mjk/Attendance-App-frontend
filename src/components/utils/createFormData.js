import { capture, dataURItoBlob } from "./imageUtils";

export const createFormData = async (rollNumber, webcamRef) => {
    const screenshot = await capture(webcamRef);
    const formData = new FormData();
    if (rollNumber === ""){
        alert("Please fill User ID")
        return
    }
    formData.set("user_id", rollNumber);
    formData.set("image", dataURItoBlob(screenshot));
    return formData;
};