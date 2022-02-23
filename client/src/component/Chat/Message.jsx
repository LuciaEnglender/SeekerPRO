import React from "react";
import "./Message.css";
import { format } from "timeago.js";
//Es el component propiamente dicho

function Message({ message, own }) {
  // console.log("soy mensaje en message", message)

  return (
    <>
      <div className={own ? "message own" : "message"}>
        <div className="messageTop"></div>
        <img
          className="messageImg"
          src="https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-redes-sociales-desconocida-icono-desconocido-en-184816085.jpg"
          alt=""
        />
        <p className="messageText">
          {message ? message.text : <p> Conseguite un amigo</p>}
        </p>
        <p className="text-zinc-400"> {format(message?.createdAt)}</p>
      </div>
    </>
  );
}

export default Message;