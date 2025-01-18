import "./css/Grid.css";
import GridContent from "./GridContent";
import GridItemDialog from "./GridItemDialog";
import { v4 as uuidv4 } from "uuid";
import useGoalState from "./useGridState";

function Grid() {
  const {
    goal,
    open,
    currentGoal,
    handleTextClick,
    handleTextClose,
    handleTextSubmit,
  } = useGoalState();

  return (
    <div className="GridContainer" key={uuidv4()}>
      {Array.from({ length: 9 }).map((_, index) => {
        const currentGoal =
          index === 4 ? goal : goal.children[index > 4 ? index - 1 : index];
        return (
          <GridContent
            key={currentGoal?.id}
            goal={currentGoal}
            onTextClick={handleTextClick}
          />
        );
      })}
      <GridItemDialog
        goal={currentGoal}
        open={open}
        onClose={handleTextClose}
        onSubmit={handleTextSubmit}
      />
    </div>
  );
}

export default Grid;
