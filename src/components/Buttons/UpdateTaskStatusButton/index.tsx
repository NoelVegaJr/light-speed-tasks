import { trpc } from "@/utils/trpc";
import React from "react";
import Button from "../Button";


interface IUpdateTaskStatusButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  taskId: string;
  status: 'Complete' | 'Incomplete';
  children: JSX.Element
  onClick?: () => void;
}

export default function UpdateTaskStatusButton({taskId, onClick, children, status, ...props}: IUpdateTaskStatusButtonProps) {
  const utils = trpc.useContext();
  const updateTaskStatus = trpc.task.updateStatus.useMutation({
    onSuccess: () => {
      utils.user.tasks.invalidate();
      utils.task.getTask.invalidate();
      utils.projects.getProject.invalidate();
    }
  });

  const completeTask = () => updateTaskStatus.mutate({ id: taskId, status: status === "Complete" ? "Incomplete" : "Complete" })
  return (
    <Button  
      {...props} 
      btnClick={() => {
        if(typeof onClick !== 'undefined'){
          onClick();
        }
        completeTask();
      }}>
      {children}
    </Button>
  )
}
