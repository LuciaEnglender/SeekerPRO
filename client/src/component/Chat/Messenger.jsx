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


// es la page donde se va a renderizar el Chat Online, el conjunto de conversaciones.

function Messager() {
  const [conversations, setConversations] = useState([]);


  const dispatch = useDispatch()
  const { user } = useAuth0();
 // console.log(user)
  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  const perfil = useSelector((state) => state.rootReducerLanding.perfiles) //es el que me da de auth0
  const profile = useSelector((state) => state.rootReducerPostulante.profile); //es el que tengo guardado

  const id = profile[0].id
  //console.log(id)

    useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversations/postulant/${id}`);
        setConversations(res.data);
       // console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [id]);

  useEffect(() => {
    dispatch(getUsers(email2))
  }, [])

  
  return (
    <>
      {perfil?.profile === 'DEVELOPER' ? <NavBar /> : <NavHomeE />}

      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) =>  
                <Conversation conversation={c}  />
            )}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            Box
            <Message own={true} />
            <Message own={false} />
            <Message own={true} />
            <Message own={false} />
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="write something..."
            /*onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}*/
            > </textarea>
            <button className="chatSubmitButton" /*onClick={handleSubmit}*/>
              Send
            </button>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
         <ChatOnline/>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Messager