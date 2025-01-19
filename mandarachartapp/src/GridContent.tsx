import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { GridContentProps } from "./types/Types";
import "./css/GridContent.css";
import React from "react";

const GridContent: React.FC<GridContentProps> = ({ goal, onTextClick }) => {
  if (goal === undefined || goal.id === 0) {
    return null;
  }

  return (
    <div className="GridContent" key={goal.id}>
      {Array.from({ length: 9 }).map((_, index) => {
        // indexが4の場合(真ん中)は親のgoalを、それ以外は子供のgoalを取得
        const isParent = index === 4;
        const isFinalGoal = goal.id === 1 && isParent;
        const currentGoal = isParent
          ? goal
          : goal.children[index > 4 ? index - 1 : index];
        return (
          <Grid
            size={{ xs: 4 }}
            key={currentGoal.id}
            className={`
              GridItem ${isParent ? "GridItemParent" : "GridItemChildren"} ${
              isFinalGoal ? "GridItemFinal" : ""
            }
            `}
          >
            <TextField
              className="GridText"
              multiline
              fullWidth
              value={currentGoal.text}
              onClick={() => onTextClick(currentGoal)}
            ></TextField>
          </Grid>
        );
      })}
    </div>
  );
};

export default GridContent;
