import dateFormatter from "@/utils/dateFormatter";
import { Profile, TaskComment } from "@prisma/client";
import { Serialize } from "@trpc/server/dist/shared/internal/serialize";
import { Serializable } from "child_process";
import Link from "next/link";
import { useState } from "react"
import Avatar from "../Avatar";

interface ITaskCommentSectionProps {
  taskId: string;
  profile: Profile;
  comments: SerializeObject<UndefinedToOptional<TaskComment & {profile: Profile}>>[];
  createdAt: string;
}


function Comment({ text, name, profile, date }: { text: string, name: string, profile: any, date: string }) {
  return (
    <div className="flex gap-2">
      <Link href={`/profile/${profile.id}`}>

        <Avatar />
      </Link>
      <div className="self-start whitespace-nowrap">
        <div className="flex items-center gap-2">
        <Link href={`/profile/${profile.id}`} className="font-semibold text-gray-100 -mt-1 hover:text-blue-400/80 hover:underline">
          {name}
        </Link>  
          <p className="text-xs text-gray-100">{dateFormatter(new Date(date).getTime(), new Date().getTime())}</p>
        </div>
        <p className="text-gray-200 text-sm">{text}</p>
      </div>
    </div>
  )
}

export default function TaskCommentSection({ taskId, createdAt, profile, comments }: ITaskCommentSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const commentsToDisplay = () => {
    if (showAll) return comments
    return comments.slice(-3);
  }

  return (
    <div className="pb-4 whitespace-nowrap" style={{ backgroundColor: "#252628" }}>
      <div className="flex gap-2 items-center px-6 py-4" >
        <Link href={`/profile/${profile.id}`}>
          <Avatar />
        </Link>
        <p className="text-sm text-gray-200 font-semibold"><Link href={`/profile/${profile.id}`} className="hover:text-blue-400/80 hover:underline">{profile.name}</Link> created this task. <span className="text-gray-200/50 ml-2 text-xs">{dateFormatter(new Date(createdAt).getTime(), new Date().getTime())}</span></p>
      </div>

      <div className="pl-6 flex flex-col gap-4 ">
        {comments.length > 3 && (
          <button
            onClick={() => showAll ? setShowAll(false) : setShowAll(true)}
            className="text-blue-400/80 text-left hover:underline">
            {`${showAll ? 'Hide Earlier Comments' : `Show prev ${comments.length - 3} comments`}`}
          </button>

        )}
        {commentsToDisplay().map(comment => (
          <Comment key={comment.id} profile={comment.profile} name={comment.profile.name} text={comment.text} date={comment.createdAt} />
        ))}
      </div>

    </div>
  )
}
