import React from "react";
import NavBar from "../postulantes/NavBar";
import ConversationPostulant from "./ConversationPostulant";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Messenger.css";
import { io } from "socket.io-client";

// Es la page donde se va a renderizar el Chat Online, el conjunto de conversaciones.

function MessengerPostulant() {
  const { user } = useAuth0();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  // To bring my data

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);
  const profile = useSelector((state) => state.rootReducerPostulante.profile); //es el que tengo guardado
  const id = profile[0]?.id;
  console.log("postuid", id);
  //socket io////////////////////////////////////////////////////////
  useEffect(() => {
    socket.current = io();
    socket.current?.on("getMessage", (data) => {
      socket.current.open();
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    console.log("arrival>", arrivalMessage);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current?.emit("addUser", id);
    //console.log(socket)
    socket.current?.on("getUsers", (users) => {
      //  console.log(users)
    });
  }, [id]);

  ////////////////////////////////////////////////////////////////////

  // es para obtener todas las conversaciones de un postulante en particular
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversations/postulant/${id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [id]);

  // Traerá todos los mensajes de un chat en particular

  useEffect(() => {
    const getMessage = async () => {
      if (currentChat) {
        try {
          const res = await axios.get(`/messages/${currentChat?.id}`);
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getMessage();
  }, [currentChat, newMessage, arrivalMessage]);

  // Controlamos el botón "sender" del mensaje
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      postulantId: id,
      text: newMessage,
      conversationId: currentChat.id,
    };

    const receiverId = currentChat?.members[0];
    //console.log(currentChat.members)

    socket.current?.emit("sendMessage", {
      senderId: id,
      receiverId: receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("/messages/postulant", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  // La conversación se renderiza arriba, con esto "scrolleamos" a la última charla, abajo, y con movimiento "smooth"
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div>
      <NavBar />
      <header className="bg-verdeOscuro shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Chat Room</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="messenger">
            <div className="chatMenu bg-zinc-200">
              <div className="chatMenuWrapper">
                <h1 className="text-nuevoFondo text-4xl "> Recruiters</h1>
                {conversations.map((c) => (
                  <div onClick={() => setCurrentChat(c)} className="nombres">
                    <ConversationPostulant conversation={c} />
                  </div>
                ))}
              </div>
            </div>
            <div className="chatBox  bg-zinc-100">
              <div className="chatBoxWrapper">
                {currentChat ? (
                  <>
                    <div className="chatBoxTop">
                      {messages[0]?.messages?.map((m) => (
                        <div ref={scrollRef}>
                          <Message
                            message={m}
                            own={m.businessId ? true : false}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="chatBoxBottom">
                      <textarea
                        className="chatMessageInput"
                        placeholder="write something..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
                        value={newMessage}
                      >
                        {" "}
                      </textarea>
                      <button
                        className="chatSubmitButton"
                        onClick={handleSubmit}
                      >
                        Send
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="text-zinc-400 text-4xl">
                    Open a conversation to start a chat.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MessengerPostulant;
