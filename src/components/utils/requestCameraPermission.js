const requestCameraPermission = async (setHasCameraAccess) => {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true });
    setHasCameraAccess(true);
  } catch (error) {
    console.error("Camera access denied", error);
    setHasCameraAccess(false);
  }
};

export default requestCameraPermission;
