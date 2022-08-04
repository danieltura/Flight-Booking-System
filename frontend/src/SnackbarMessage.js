import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function SnackbarMessage({ color, message, open, handleClose }) {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color={color}
        onClick={() => handleClose(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => handleClose(false)}
        message={message}
        action={action}
      />
    </div>
  );
}
