import { Role } from "../../Global/Data/Enum";
import { IconButton } from "@mui/material";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { MessageManager } from "../../Global/Logic/MessageManager";
import { MessageProps } from "../../Global/Data/Interface";
import { useState } from "react";

/* Behavior of a single message */
function Message(msg: MessageProps) {
  /* Get the instance of the prompt manager */
  const pm = MessageManager.getInstance();

  const [liked, setLiked] = useState<boolean>(false);
  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div
      className={`flex felx-row w-full h-auto m-1 ${
        msg.role === Role.User ? "justify-end" : "justify-start"
      }`}
    >
      {/* The text will autometically starts a new line when reaches the 70% border.*/}
      {/*Modufy w-[] to adjust the portion of the border*/}
      <div
        className={`w-[70%] flex ${
          msg.role === Role.User ? "justify-end" : "justify-start"
        }`}
      >
        {/* Message bubble */}
        <div
          className={`h-auto inline-block rounded-lg py-2 px-3 my-2 ${
            msg.role === Role.User
              ? "bg-gradient-to-bl from-cyan-600 to-cyan-500 text-white"
              : "bg-gradient-to-br from-purple-500 to-purple-400 text-black"
          }`}
          style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
        >
          <div className="text-xl">{pm.prompt2message(msg.content)}</div>
        </div>
        {/* Thumb Button */}
        {msg.role === Role.Assistant ? (
          <div className="flex h-full w-auto items-center">
            <IconButton onClick={handleLike}>
              {liked ? <ThumbUpIcon /> : <ThumbUpOffAltOutlinedIcon />}
            </IconButton>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Message;
