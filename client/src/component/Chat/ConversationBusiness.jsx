import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Conversation.css";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/index";

function ConversationBusiness({ conversation }) {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  //console.log(conversation.fk_postulant)
  const [userChat, setUserChat] = useState(null);

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);
  //console.log(user) //-OJO no esta renderizando picture
  //const profile = useSelector((state) => state.rootReducer.business);

  //useEffect(() => {
  //    dispatch(getProfile(email2))
  //}, [])

  useEffect(() => {
    const postulantId = conversation.fk_postulant;
    // console.log(postulantId)
    const getPostulantById = async () => {
      try {
        const res = await axios.get(
          `/conversations/dataPostulant/${postulantId}`
        );
        setUserChat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPostulantById();
  }, [conversation]);

  return (
    <>
      <div className="conversation">
        {userChat && (
          <button className="conversationName tex">{userChat[0]?.name}</button>
        )}
      </div>
    </>
  );
}

export default ConversationBusiness;
