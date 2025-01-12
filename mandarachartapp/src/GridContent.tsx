import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { GridContentProps } from "./types/Types";
import "./css/GridContent.css";
import React from "react";

const GridContent: React.FC<GridContentProps> = ({ goal, onTextClick }) => {
  if (goal === undefined) {
    return null;
  }

  return (
    <div className="GridContent">
      {Array.from({ length: 9 }).map((_, index) => {
        // indexが4の場合(真ん中)は親のgoalを、それ以外は子供のgoalを取得
        const currentGoal =
          index === 4 ? goal : goal.children[index > 4 ? index - 1 : index];
        return (
          <Grid size={{ xs: 4 }} key={currentGoal?.id} className="GridItem">
            <TextField
              className="GridText"
              multiline
              fullWidth
              value={currentGoal?.text}
              onClick={() => onTextClick(currentGoal)}
            ></TextField>
          </Grid>
        );
      })}
    </div>
  );
};

export default GridContent;
