import { friendRequest, getMyInfo } from "../../services/auth";
import { useSocket } from "../../hooks/useSocket";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import  error_ico  from "../../assets/pictures/icon/error_ico.png"

export function AddFriendOnglet() {
    const [answerMsg, setAnswerMsg] = useState("");

    const socket = useSocket();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const receiverEmail = form.elements['email'].value;
        const myUserRes = await getMyInfo();
        const myUser = myUserRes.data.user;
        const senderEmail = myUser.email;
        const data = {
            senderEmail: senderEmail,
            receiverEmail: receiverEmail
        }
        const friendReqRes = await friendRequest(data); 
        if(friendReqRes.ok){
            setAnswerMsg("Demande envoyée");
        }else{
            setAnswerMsg("Demande impossible");
        }
        const friendReq = friendReqRes.data;

        const friendReqData = {
            senderId: myUser._id,
            senderName: myUser.name,
            senderEmail: myUser.email,
            receiverEmail: receiverEmail
        }

        // envoie de l'alert (marche uniquement si l'utilisateur est connecté)
        if (socket && socket.emit) {
            socket.emit("sendFriendRequest", friendReqData);
        }
        form.reset();
    }

    function handleLeave(){
        navigate("/home");
    }

    return (
        <div className="addFriendOnglet">
            <div className="addFriendOnglet__header">
                <p>Add a Contact</p><i className="fa-solid fa-xmark" onClick={handleLeave}></i>
            </div>
            <div className="addFriendOnglet__body">
                <p className="addFriendOnglet__body--title">Please type your contact's complete e-mail address</p>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" />
                </form>
                <div className="addFriendOnglet__body__exemples">
                    <p>Exemple:</p><p>name_123@msn.com</p>
                </div>
                <div className="answerContainer">
                   {answerMsg==="Demande impossible" && <img src={error_ico}/> }
                <p className={`answerMsgAdd ${answerMsg==="Demande impossible" ? "red" : "green"}`}>{answerMsg && answerMsg}</p>
                </div>
            </div>
        </div>
    );
}