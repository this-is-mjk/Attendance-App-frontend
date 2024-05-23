import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingScreen() {
    return (
        <div
          style={{
            margin: "auto",
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ fontStyle: "italic", color: "green" }}>
              Please wait, while we fetch your details!
            </p>
            <CircularProgress />
          </Box>
        </div>
      );
}