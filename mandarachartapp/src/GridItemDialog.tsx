import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Goal, GridItemDialogProps } from "./types/Types";
import React, { useEffect, useState } from "react";
import "./css/GridItemDialog.css";
import { useMediaQuery } from "@mui/material";

const GridItemDialog: React.FC<GridItemDialogProps> = ({
  goal,
  open,
  onClose,
  onSubmit,
}) => {
  const [inputGoal, setInputGoal] = useState<Goal>({
    id: 0,
    text: "",
    children: [],
  });

  useEffect(() => {
    setInputGoal(goal);
  }, [goal]);

  const setInputValue = (text: string) => {
    setInputGoal({ ...inputGoal, text: text });
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onAbort={onClose}
        PaperProps={{
          style: {
            width: isMobile ? "90vw" : "80vw",
            height: isMobile ? "60vh" : "40vh",
          },
        }}
      >
        <DialogTitle>編集</DialogTitle>
        <DialogContent>
          <DialogContentText variant="body2" style={{ marginBottom: "1rem" }}>
            目標を入力してください（1～50文字）
          </DialogContentText>
          <TextField
            className="DialogText"
            multiline
            rows={4}
            autoFocus
            id="goal"
            margin="dense"
            variant="standard"
            fullWidth
            inputProps={{
              maxLength: 50,
            }}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputGoal.text}
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              border: "1px solid",
              borderRadius: "8px",
            }}
            color="warning"
            onClick={onClose}
          >
            キャンセル
          </Button>
          <Button
            style={{
              border: "1px solid",
              borderRadius: "8px",
            }}
            type="submit"
            color="primary"
            onClick={() => {
              onSubmit(inputGoal);
              onClose();
            }}
          >
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default GridItemDialog;
