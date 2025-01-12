export interface Goal {
  id: number;
  text: string;
  children: Goal[];
}

export interface GridContentProps {
  goal: Goal;
  onTextClick: (goal: Goal) => void;
}

export interface GridItemDialogProps {
  goal: Goal;
  open: boolean;
  onClose: () => void;
  onSubmit: (goal: Goal) => void;
}
