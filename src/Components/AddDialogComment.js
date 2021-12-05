/**
 * @file AddDialogComment.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Jakub Rozek
 * @brief Dialog for adding a comment.
 */

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

function AddDialogComment({ postId, open, handleClose, fetchData }) {
  const [body, setBody] = useState("");
  //Submit the comment, fetch the data, close the dialog
  const handleSubmit = () => {
    fetch("http://localhost:3000/comment", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        text: body,
        post_id: postId,
        token: localStorage.getItem("token"),
      }),
    })
      .then(fetchData())
      .then(handleClose());
  };
  return (
    <div>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Nový komentář</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => setBody(e.target.value)}
            size="large"
            rows={6}
            id="title"
            multiline
            label="Text komentáře"
            type="text"
            fullWidth
            minWidth="400px"
            variant="outlined"
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button size="large" onClick={handleClose}>
            Zrušit
          </Button>
          <Button size="large" onClick={handleSubmit}>
            Přidat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddDialogComment;
