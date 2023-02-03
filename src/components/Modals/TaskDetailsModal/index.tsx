import React from "react";
import Modal from '@/components/Modals/Modal';
import TaskDetails from "@/components/TaskDetails";

interface ITaskDetailsModal {
  isOpen: boolean;
  close: () => void;
  taskId: string;
}

export default function TaskDetailsModal({ isOpen, close, taskId }: ITaskDetailsModal) {

  return (
    <Modal isOpen={isOpen} close={close} backdropStyles="bg-gray-200/20" >
      <div className="h-full py-10 max-w-4xl w-full" >
        <div onClick={(e) => e.stopPropagation()} className="h-full flex flex-col rounded-lg overflow-hidden" style={{ backgroundColor: '#1e1f21' }}>
           <TaskDetails taskId={taskId} close={close} /> 
        </div>
      </div>
    </Modal>
  )
}
