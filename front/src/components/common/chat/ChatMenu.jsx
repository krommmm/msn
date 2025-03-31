import { useState, useEffect } from "react";
import { getMyInfo, getFriendInfo } from "../../../services/auth";
import { getMessages } from "../../../services/messages";
import { useNavigate } from "react-router-dom";
import { Chat } from "./Chat";
import { ChatInput } from "./ChatInput";
import { ChatProfil } from "./ChatProfil";
import { useSocket } from "../../../hooks/useSocket";

export function ChatMenu() {

    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [hisUser, setHisUser] = useState();
    const { socket } = useSocket();
    const [msg, setMsg] = useState("");
    const [historyChat, setHistoryChat] = useState([]);

    useEffect(() => {
        init(); 
    }, []);

    useEffect(() => {
       if (msg) socket.emit("sendMsg", ({ sender: user, receiver: hisUser, msg: msg }));
        if (msg) majMessageHistory(user._id, hisUser._id);
    }, [msg]);

    useEffect(() => {
        socket.on("receiveMessage", async ({ sender, receiver, msg }) => {
            await majMessageHistory(sender._id, receiver._id);
        });
    }, [])
    

    async function init() {
        const receiverId = getUserIdParam();
        const friendRes = await getFriendInfo(receiverId);
        const friend = friendRes.data.infos;

        setHisUser(friend);
        const myUserRes = await getMyInfo();
        const myUser = myUserRes.data.user;
        setUser(myUser);

        // Créer une room entre user1 et user2 (si elle n'est pas déjà crée)
        if (myUser && friend) {
            socket.emit("joinRoom", ({ sender: myUser, receiver: friend }));
            majMessageHistory(myUser._id, friend._id);

        }

    }

    function getUserIdParam() {
        const str = window.location.href;
        const url = new URL(str);
        const userId = url.searchParams.get("userId");
        if (userId) return userId;
    }

    function handleLeave() {
        navigate("/home");
    }

    async function majMessageHistory(sender, receiver) {
        const res = await getMessages(sender, receiver);
        const messages = res.data.messages;
        const updateMessages = updateDate(messages);
        setHistoryChat(updateMessages);
    }

    function updateDate(messages) {
        for (let i = 0; i < messages.length; i++) {
            const timeStamp = messages[i].created_at;
            const date = new Date(timeStamp);
            const dateData = {
                day: date.getDay(),
                month: date.getMonth(),
                year: date.getFullYear(),
                hours: date.getHours(),
                minutes: date.getMinutes()
            }
            messages[i].dateData = dateData;
        }
        return messages;
    }


    return (
        <div className="chatMenu">
            <div className="chatContent">
                <div className="addFriendOnglet__header">
                    <p> {user && user.name} - Conversation</p><i className="fa-solid fa-xmark" onClick={handleLeave}></i>
                </div>
                <div className="chatContent__navigation"></div>
                <div classname="chatContent__actions"></div>
                <div className="chatContent__body">
                    <div className="chatContent__body__left">
                        <div classname="chatContent__body__left__chat">{user && <Chat data={historyChat} user={hisUser} />}</div>
                        <div className="chatContent__body__left__input">
                            <ChatInput onUpdateMsg={setMsg} />
                        </div>
                    </div>
                    <div className="chatContent__body__right">
                        <div className="chatContent__body__right--hisProfil">{user && <ChatProfil avatar={hisUser.img_url} />}</div>
                        <div className="chatContent__body__right--myProfil">{user && <ChatProfil avatar={user.img_url} />}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}