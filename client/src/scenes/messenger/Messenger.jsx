import "./messenger.css";
import { Box, Button, InputBase, Typography, useTheme } from "@mui/material";
import Navbar from "scenes/navbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FriendChat from "components/FriendChat";
import WidgetWrapperFriendsChat from "components/WidgetWrapperFriendsChat";

export default function Messenger() {
  const dispatch = useDispatch();
  const [conversations, setConversations] = useState([]);
  
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state);
  const scrollRef = useRef();
  const token = useSelector((state) => state.token);
  const [newMessage, setNewMessage] = useState("");
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
//console.log(friends)
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
    });
  }, [user]);



  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${user._id}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get('http://localhost:3001/conversations/' + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:3001/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:3001/messages/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <WidgetWrapperFriendsChat>
              <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
              >
                Chats
              </Typography>
              <Box display="flex" flexDirection="column" gap="1.5rem">
                {conversations.map((c) => (
                  <Box onClick={() => setCurrentChat(c)} >
                    <Conversation conversation={c} currentUser={user} />
                  </Box>
                ))}
              </Box>
            </WidgetWrapperFriendsChat>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} user={user} conversation={currentChat} />
                    </div>
                  ))
                  }
                </div>
                <div className="chatBoxBottom">
                  <InputBase
                    placeholder="Write Something...."
                    sx={{
                      width: "100%",
                      backgroundColor: palette.neutral.light,
                      borderRadius: "2rem",
                      padding: "1rem 2rem",
                    }}
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <Button
                    onClick={handleSubmit}
                    sx={{
                      color: "white",
                      backgroundColor: palette.primary.main,
                      borderRadius: "3rem",
                    }}
                  >
                    <Typography color={"white"}>Send</Typography>
                  </Button>

                </div>
              </>
            ) : (
              <span className="noConversationText">
                Press start to start a new conversation.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <WidgetWrapperFriendsChat >
            <Typography
              color={palette.neutral.dark}
              variant="h5"
              fontWeight="500"
              sx={{ mb: "1.5rem" }}
            >
              Start a Conversation
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem" >
              {friends.map((friend) => (
                <FriendChat
                  key={friend._id}
                  friendId={friend._id}
                  name={`${friend.firstName} ${friend.lastName}`}
                  subtitle={friend.occupation}
                  userPicturePath={friend.picturePath}
                  currentId={user._id}
                  setCurrentChat={setCurrentChat}
                  conversations={conversations}
                />
              ))}
            </Box>
          </WidgetWrapperFriendsChat>
        </div>
      </div>
    </>
  );
}