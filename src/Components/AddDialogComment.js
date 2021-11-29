import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

function AddDialogComment({ open, handleClose }) {
  const [body, setBody] = useState("");
  return (
    <div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Nový příspěvek</DialogTitle>
          <DialogContent>
            <TextField
              onChange={(e) => setBody(e.target.value)}
              size="large"
              rows={6}
              id="title"
              multiline
              label="Text příspěvku"
              type="text"
              fullWidth
              variant="outlined"
            ></TextField>
          </DialogContent>
          <DialogActions>
            <Button size="large" onClick={handleClose}>
              Zrušit
            </Button>
            <Button size="large">Přidat</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default AddDialogComment;
