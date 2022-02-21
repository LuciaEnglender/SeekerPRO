import React from 'react'
import NavHomeE from '../empresas/modules/NavHomeE'
import ConversationBusiness from "./ConversationBusiness";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import { useContext, useEffect, useRef, useState } from 'react'
import { getProfile } from '../../redux/actions/index';
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Messenger.css";
import { io } from "socket.io-client"



// Es la page donde se va a renderizar el Chat Online, el conjunto de conversaciones.

function MessengerBussines() {
  const { user } = useAuth0();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const socket = useRef()
  const scrollRef = useRef();

  // To bring business data

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);
  const profile = useSelector((state) => state.rootReducer.business);//es el que tengo en reducer empresa
  const id = profile[0]?.id

  //socket io////////////////////////////////////////////////////////
  useEffect(() => {
    socket.current = io("ws://localhost:8900")
    socket.current?.on("getMessage", data => {
      socket.current.open();
      setArrivalMessage({
        sender: data.senderId,
        text: data.text
      })
    })
  }, [])


  useEffect(() => {
    arrivalMessage && currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
    console.log("arrival>", arrivalMessage)
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current?.emit("addUser", id)
    //console.log(socket)
    socket.current?.on("getUsers", users => {
      //  console.log(users)
    })
  }, [id])


  ////////////////////////////////////////////////////////////////////

  // es para obtener todas las conversaciones de un postulante en particular
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversations/business/${id}`);
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
      businessId: id,
      text: newMessage,
      conversationId: currentChat.id
    };

    const receiverId = currentChat?.members[1]
    //console.log(currentChat.members)

    socket.current?.emit("sendMessage", {
      senderId: id,
      receiverId: receiverId,
      text: newMessage
    })
    try {
      const res = await axios.post("/messages/business", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  }
  // La conversación se renderiza arriba, con esto "scrolleamos" a la última charla, abajo, y 
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      <NavHomeE />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) =>
              <div onClick={() => setCurrentChat(c)} >
                <ConversationBusiness conversation={c} />
              </div>
            )}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {
                    messages[0]?.messages?.map(m => (
                      <div ref={scrollRef}>
                        <Message message={m} own={m.businessId ? false : true} />
                      </div>
                    ))
                  }
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  > </textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>) :
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  )
}

export default MessengerBussines