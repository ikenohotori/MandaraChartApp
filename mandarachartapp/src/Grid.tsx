import { Goal } from "./types/Types";
import "./css/Grid.css";
import GridContent from "./GridContent";
import React, { useEffect } from "react";
import InitGoalData from "./InitGoalData";
import GridItemDialog from "./GridItemDialog";
import { v4 as uuidv4 } from "uuid";

function Grid() {
  const storageKey = "mandarachartapp-goal";

  const [goal, setGoal] = React.useState<Goal>({
    id: 0,
    text: "",
    children: [],
  });
  const [open, setOpen] = React.useState(false);
  const [currentGoal, setCurrentGoal] = React.useState<Goal>({
    id: 0,
    text: "",
    children: [],
  });

  useEffect(() => {
    if (!window.localStorage) {
      alert("ローカルストレージにアクセスできないため、使用できません");
      return;
    }

    const item = localStorage.getItem(storageKey);
    if (item === null) {
      // ブラウザ初回アクセス時
      const goal = InitGoalData();
      setGoal(goal);
    } else {
      // ストレージからデータを取得
      const goal = JSON.parse(item);
      setGoal(goal);
    }
  }, []);

  const handleTextClick = (goal: Goal) => {
    setOpen(true);
    setCurrentGoal(goal);
  };

  const handleTextClose = () => {
    setOpen(false);
  };

  const handleTextSubmit = (g: Goal) => {
    const newGoal = { ...goal };
    const updateChangeText = (goal: Goal) => {
      if (goal.id === g.id) {
        goal.text = g.text;
        return;
      }
      goal.children.forEach((child) => updateChangeText(child));
    };
    updateChangeText(newGoal);

    setGoal(newGoal);
    localStorage.setItem(storageKey, JSON.stringify(newGoal));
  };

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
