import { trpc } from "@/utils/trpc";
import { useState } from "react";

interface ITaskDescriptionInput {
  initialValue: string;
  taskId: string;
}

export default function TaskDescriptionInput({ initialValue, taskId }: ITaskDescriptionInput) {
  const [value, setValue] = useState(initialValue)
  const utils = trpc.useContext();
  const updateDescription = trpc.task.updateDescription.useMutation({
    onSuccess: () => {
      utils.task.getTask.invalidate();
    }
  });

  const handleUpdateDescription = () => {
    const cleanDescription = value.trim();
    if(!cleanDescription) return;

    updateDescription.mutate({id: taskId, description: value})
  }

  return (
    <div className="">
      <p className="pl-6 -mb-1 text-gray-200/60 text-sm">Description</p>
      <div className="p-4">
        <textarea value={value} onBlur={handleUpdateDescription} onChange={(e) => setValue(e.target.value)} placeholder="What is this task about?" className="w-full overflow-hidden  text-sm p-2 text-gray-300 placeholder-gray-200/60 border border-transparent focus:border-gray-200/70 hover:border-gray-200/30 rounded-lg outline-none bg-transparent transition-colors duration-200" rows={3} />
      </div>
    </div>
  )
}
