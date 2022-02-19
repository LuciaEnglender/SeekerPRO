import axios from "axios";
import { useEffect, useState } from "react";
import "./ChatOnline.css";


//Pasar y destacar en HomeP empresas seguidas o de postulaciones hechas ? en HomeE:personas postuladas
//con un useSelector

function ChatOnline({ currentId, setCurrentChat }) {
    return (
        <div className="chatOnline">
            <div className="chatOnlineImgContainer">
                <img
                    className="messageImg"
                    src="https://st3.depositphotos.com/4726595/19453/v/600/depositphotos_194536900-stock-illustration-male-silhouette-profile-businessman-with.jpg" alt="" />
                <p> Soy la empresa que te va a contratar</p>
            </div>
            <div className="chatOnlineBadge"> </div>
        </div>
    )
}

export default ChatOnline