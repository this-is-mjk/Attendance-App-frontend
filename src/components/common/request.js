import axios from "axios";

export const sendRequest = async (
  method,
  formData,
  url,
  type,
  {
    setLoading,
    setAlertContent,
    setAlert,
    setAlertType,
    setIsAdmin,
    setLogin,
    isLogin,
    attendenceData,
    setAttendenceData
  }
) => {
  if (!formData) {
    return;
  }
  setLoading(true);
  axios({
    method: method,
    url: url,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        setAlertContent(response.data.status);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
        setAlertType("success");
        if (type === "L") {
          setIsAdmin(response.data.isAdmin);
          setLogin(true)
          if (!response.data.isAdmin) {
            setAttendenceData(response.data.attendence)
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
      setAlertContent(error.response.data.status);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      setAlertType("error");
    })
    .finally(() => {
      setLoading(false);
    });
};
