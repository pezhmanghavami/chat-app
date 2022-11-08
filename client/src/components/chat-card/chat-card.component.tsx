import { Link } from "react-router-dom";

import ProfilePicture from "../profile-picture/profile-picture.component";

export interface IChat {
  id: string;
  profilePicure: string | null;
  displayName: string;
  lastMessage: string;
  unreadCount: number;
  lastMessageDate: Date;
}

const dateFormatter = (date: Date) => {
  const today = new Date(Date.now());

  if (
    today.getDay() === date.getDay() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  ) {
    return date.toLocaleTimeString("default", {
      hour: "numeric",
      minute: "numeric",
    });
  } else {
    return date.toLocaleDateString();
  }
};

const ChatCard = ({ chat }: { chat: IChat }) => {
  const lastMessageDate = new Date(chat.lastMessageDate);

  return (
    <Link
      className="block border-b border-b-neutral-700 last-of-type:border-0"
      to={"/chat/" + chat.id}
    >
      <div className="flex py-2 px-3 select-none hover:bg-neutral-700">
        {/* Profile picture */}
        <div className="flex-none w-12 h-12">
          <ProfilePicture
            user={{
              displayName: chat.displayName,
              profilePicure: chat.profilePicure,
            }}
          />
        </div>
        {/* Chat details */}
        <div className="pl-3 w-full">
          {/* Title and last message time */}
          <div className="flex justify-between">
            <h3>{chat.displayName}</h3>
            <span className="text-xs text-neutral-400">
              {dateFormatter(lastMessageDate)}
            </span>
          </div>
          {/* Last message summary and unread messages */}
          <div className="flex justify-between">
            <div className="relative w-full mr-2">
              <p className="absolute inset-0 truncate text-neutral-400 min-h-fit">
                {chat.lastMessage}
              </p>
            </div>
            {chat.unreadCount > 0 && (
              <span className="flex-none bg-neutral-600 rounded-full text-sm text-white tracking-tighter w-5 h-5 flex justify-center items-center">
                {chat.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChatCard;
