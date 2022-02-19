import React from 'react'
import NavBar from "../postulantes/NavBar"
import NavHomeE from '../empresas/modules/NavHomeE'
import Conversation from "./Conversation";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import { useContext, useEffect, useRef, useState } from 'react'
import { getUsers } from '../../redux/actions/indexL'
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Messenger.css";


// Es la page donde se va a renderizar el Chat Online, el conjunto de conversaciones.

function Messager() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('')


  const dispatch = useDispatch()
  const { user } = useAuth0();

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  const perfil = useSelector((state) => state.rootReducerLanding.perfiles) //es el que me da de auth0
  const profile = useSelector((state) => state.rootReducerPostulante.profile); //es el que tengo guardado

  const id = profile[0].id
  //console.log(id)
  const scrollRef = useRef();
  // es para obtener mis datos personales
  useEffect(() => {
    dispatch(getUsers(email2))
  }, [])

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
      try {
        const res = await axios.get(`/messages/${currentChat?.id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currentChat, newMessage]);


  // Controlamos el botón "sender" del mensaje
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      postulantId: id,
      text: newMessage,
      conversationId: currentChat.id
    };
    try {
      const res = await axios.post("/messages/postulant", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  // La conversación se renderiza arriba, con esto "scrolleamos" a la última charla, abajo, y con movimiento "smooth"
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {perfil?.profile === 'DEVELOPER' ? <NavBar /> : <NavHomeE />}
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) =>
              <div onClick={() => setCurrentChat(c)} >
                <Conversation conversation={c} />
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
                        <Message message={m} own={m.businessId ? true : false} />
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

export default Messager