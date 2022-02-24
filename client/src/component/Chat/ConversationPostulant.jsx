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
      <button className="conversation">
        {userChat && (
          <button className="conversationName text-black rounded active:text-bold translate-x-1 transition active:text-white hover:text-white">
            {userChat[0]?.businesses[0]?.name}
          </button>
        )}
      </button>
    </>
  );
}

export default ConversationPostulant;
