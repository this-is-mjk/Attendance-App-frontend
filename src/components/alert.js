import Alert from "@mui/material/Alert";

export default function MakeAlert({alert, alertType, alertContent}) {
  return alert ? (
    <Alert variant="filled" severity={alertType}>
      {alertContent}
    </Alert>
  ) : (
    <></>
  );
}
