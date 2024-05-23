export const dataURItoBlob = (dataURI) => {
  // Split the data URI into parts
  const parts = dataURI.split(",");
  const byteString = atob(parts[1]);
  const mimeString = parts[0].split(":")[1].split(";")[0];

  // Create a new ArrayBuffer for the binary data
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  // Write the binary data to the ArrayBuffer
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  // Create and return a new Blob object
  return new Blob([arrayBuffer], { type: mimeString });
};

export const capture = async (webcamRef) => {
  return new Promise((resolve) => {
    const screenshot = webcamRef.current.getScreenshot();
    resolve(screenshot);
  });
};


