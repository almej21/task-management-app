import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState, forwardRef } from "react";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";

// elevation is the alert popup shadow.
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar() {
  const userInfo = useSelector((state) => state.userInfo.value);

  useEffect(() => {
    if (userInfo.is_logged_in) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [userInfo.is_logged_in]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Welcome back!
        </Alert>
      </Snackbar>
    </>
  );
}
