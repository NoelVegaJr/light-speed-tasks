import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useState } from "react"
import Avatar from "../Avatar";

interface ITaskCommentSectionProps {
  taskId: string;
  profile: any;
  comments: any[];
}


function Comment({ text, name, profile }: { text: string, name: string, profile: any }) {
  return (
    <div className="flex gap-2">
      <Link href={`/profile/${profile.id}`}>

        <Avatar />
      </Link>
      <div className="self-start whitespace-nowrap">
        <Link href={`/profile/${profile.id}`} className="font-semibold text-gray-100 -mt-1 hover:text-blue-400/80 hover:underline">
          {name}
        </Link>
        <p className="text-gray-200 text-sm">{text}</p>
      </div>
    </div>
  )
}

export default function TaskCommentSection({ taskId, profile, comments }: ITaskCommentSectionProps) {
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
        <p className="text-sm text-gray-200 font-semibold"><Link href={`/profile/${profile.id}`} className="hover:text-blue-400/80 hover:underline">{profile.name}</Link> created this task. <span className="text-gray-200/50 ml-2 text-xs">6 hours ago</span></p>
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
          <Comment profile={profile} name={comment.profile.name} text={comment.text} />
        ))}
      </div>

    </div>
  )
}
