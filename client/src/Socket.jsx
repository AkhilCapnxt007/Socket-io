import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

import * as io from "socket.io-client";

// connecting with the server ..
const socket = io.connect("http://localhost:3001");

function Socket() {
  // room setup is done just uncommet the code lines

  const [message, setMessage] = useState();
  const [messageReceived, setMessageReceived] = useState([]);
  const [messageDataArr, setMessageDataArr] = useState([]);
  // const [room, setRoom] = useState("");

  // const joinRoom = () => {
  //   if (room !== "") {
  //     socket.emit("join_room", room);
  //   }
  // };

  const SendMessage = () => {
    console.log(socket.id);

    socket.emit("send_message", message);

    // socket.emit("send_message", { message, room });
  };

  // const sendMessageToRoom = () => {
  //   socket.emit("send_message_to_room", { message, room });
  // };

  const ClearConversation = () => {
    console.log(messageDataArr, messageDataArr.length);
    messageDataArr.length = 0;
    console.log(messageDataArr);
    setMessageDataArr([]);
  };

  useEffect(() => {
    socket.on("received_message_from_brand", (data) => {
      //   window.alert(data);
      console.log(data);
      setMessageReceived(data);
      messageDataArr.push(data);
      setMessageDataArr(messageDataArr);
    });

    // socket.on("received_From_room", (data) => {
    //   console.log(data)
    //   messageDataArr.push(data.message);
    //   setMessageDataArr(data)
    // });
  }, [socket]);

  return (
    <>
      <h1>Retailer Page</h1>
      <input
        type="text"
        placeholder="Message.."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={SendMessage}>Send Message</button>

      <p>
        Received message from brand : <br />
        {/* <h1>{messageReceived}</h1> */}
      </p>
      {messageDataArr.length > 0 ? (
        messageDataArr.map((data) => {
          return (
            <>
              <h1>{data}</h1>
            </>
          );
        })
      ) : (
        <>
          <h1> No Message to show up </h1>
        </>
      )}

      <button onClick={ClearConversation}>Clear Conversation</button>

      {/* <h1>Join room from here..</h1>
      <input
        type="text"
        placeholder="Join Room.."
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room Now.</button>
      <button onClick={sendMessageToRoom}>sendMessageToRoom</button> */}
    </>
  );
}

export default Socket;
