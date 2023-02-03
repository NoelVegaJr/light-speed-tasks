import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";


interface ITaskCommentInputProps {
  taskId: string;
  profileId: string
}

export default function TaskCommentInput({ taskId, profileId }: ITaskCommentInputProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const utils = trpc.useContext();
  const newComment = trpc.task.newComment.useMutation({
    onSuccess: () => {
      utils.task.getTask.invalidate();
    }
  });

  const handleNewComment = () => {
    const comment = value.trim();
    if (!comment) return;
    console.log('submitting comment')
    newComment.mutate({ id: taskId, profileId, text: comment })

    setValue('')
  }

  useEffect(() => {
    return () => setValue('');
  }, [])

  return (

    <div className="flex gap-2 border-t px-6 py-2 border-gray-200/20">
      <Avatar />
      <div className="w-full">

        <textarea value={value} onFocus={() => setIsFocused(true)} onChange={(e) => setValue(e.target.value)} placeholder="Ask a question or post an update..." className="w-full mb-2 peer h-fit text-sm p-2 text-gray-300 placeholder-gray-200/60 outline-none bg-transparent peer" />
        <div className={` ${(value.length > 0) ? 'h-10' : 'h-0'} flex justify-end overflow-hidden transition-all duration-300`}>

          <button onClick={handleNewComment} className="rounded py-2 px-3 hover:bg-blue-400/80 bg-blue-400/70 text-sm text-gray-200 h-fit transition-colors duration-200">Comment</button>
        </div>
      </div>

    </div>
  )
}
