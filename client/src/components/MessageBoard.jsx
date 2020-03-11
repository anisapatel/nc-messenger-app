import React from "react";

const MessageBoard = (onMessageSubmit, onTextChange, msg) => {
  return (
    <div>
      <input onChange={e => onTextChange(e)} value={msg} />
      <button onClick={onMessageSubmit}>Send</button>
    </div>
  );
};

export default MessageBoard;
