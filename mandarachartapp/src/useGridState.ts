import { useState, useCallback, useEffect } from "react";
import InitGoalData from "./InitGoalData";
import { Goal } from "./types/Types";

function useGoalState() {
  const storageKey = "mandarachartapp-goal";

  const [goal, setGoal] = useState<Goal>({
    id: 0,
    text: "",
    children: [],
  });
  const [open, setOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<Goal>({
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
      const goal = InitGoalData();
      setGoal(goal);
    } else {
      const goal = JSON.parse(item);
      setGoal(goal);
    }
  }, []);

  const handleTextClick = useCallback((goal: Goal) => {
    setOpen(true);
    setCurrentGoal(goal);
  }, []);

  const handleTextClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleTextSubmit = useCallback(
    (g: Goal) => {
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
    },
    [goal]
  );

  return { goal, setGoal, open, setOpen, currentGoal, setCurrentGoal, handleTextClick, handleTextClose, handleTextSubmit };
}

export default useGoalState;