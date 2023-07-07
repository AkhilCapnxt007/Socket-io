import React, { useEffect, useState } from "react";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function Socket2() {
  const [message, setMessage] = useState();
  const [messageReceived, setMessageReceived] = useState();
  const [messageDataArr, setMessageDataArr] = useState([]);
  const SendMessage = () => {
    console.log(message);
    //  when sending multiple message from retailer send through there ID of the retailer
    socket.emit("send_message_from_brand", message);
  };

  const ClearConversation = () => {
    console.log(messageDataArr , messageDataArr.length);
    messageDataArr.length = 0;
    console.log(messageDataArr);
    setMessageDataArr([]);
  };

  useEffect(() => {

    // fetch retailer id from backend
    socket.on("receive_message", (data) => {
      setMessageReceived(data);
      messageDataArr.push(data);
      setMessageDataArr(messageDataArr);
    });
  }, [socket]);

  return (
    <>
      <div>
        <h1>Middle Men Or Brand Page.</h1>
        <input
          type="text"
          placeholder="message...."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={SendMessage}>Send Message</button>
        <p>
          Received message from retailer : <br />
          {/* <h1>{messageReceived}</h1> */}
        </p>

        {messageDataArr.length > 0 ? messageDataArr.map((data) => {
          return (
            <>
              <h1>{data}</h1>
            </>
          );
        }) : <><h1> No Message to show up </h1></>}
      </div>

      <button onClick={ClearConversation}>Clear Conversation</button>
    </>
  );
}

export default Socket2;
