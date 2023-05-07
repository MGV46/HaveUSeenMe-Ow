import "./message.css";
import UserImage from "components/UserImage";
import { format } from "timeago.js";
import { useSelector } from "react-redux";

export default function Message({ message, own, user, conversation}) {
  const friends = useSelector((state) => state.user.friends);
  const friendId = conversation?.members.find((m) => m !== user._id);
  const friendp = friends.find((friend) => friendId === friend._id);
  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        { own ? (<UserImage image={user?.picturePath} size="50px" />) : (
          <UserImage image={friendp?.picturePath} size="50px" />
        )}
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
