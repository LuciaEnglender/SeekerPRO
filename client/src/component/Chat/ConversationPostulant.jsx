import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Conversation.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/indexL";

function ConversationPostulant({ conversation }) {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  //  console.log(conversation.fk_business)

  const [userChat, setUserChat] = useState(null);

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);
  //console.log(user) //-OJO no esta renderizando picture
  const profile = useSelector((state) => state.rootReducerPostulante.profile);

  useEffect(() => {
    dispatch(getUsers(email2));
  }, []);

  useEffect(() => {
    const businessId = conversation.fk_business;
    const getBusinessById = async () => {
      try {
        const res = await axios.get(`/business/${businessId}`);
        setUserChat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBusinessById();
  }, [conversation]);

  return (
    <>
      <div className="conversation">
        {isAuthenticated && (
          <img
            className="h-8 w-8 rounded-full"
            alt="Not img"
            src={user.picture}
          ></img>
        )}
        {userChat && (
          <span className="conversationName text-nuevoFondo">
            {userChat[0]?.businesses[0]?.name}
          </span>
        )}
      </div>
    </>
  );
}

export default ConversationPostulant;

/**/
