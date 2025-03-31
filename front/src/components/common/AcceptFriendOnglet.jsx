import { friendRequest, getMyInfo, acceptFriend } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import error_ico from "../../assets/pictures/icon/error_ico.png"
import { useSocket } from "../../hooks/useSocket";

export function AcceptFriendOnglet() {

    const { socket, demandeAmi, setDemandeAmi } = useSocket();

    const navigate = useNavigate();

    function handleLeave() {
        navigate("/home");
    }

    async function handleAccept(e) {
        const container = e.target.closest(".addFriendOnglet__body__demandeAmi__answerButtons");

        const senderEmail = container.dataset.senderemail;
        const receiverEmail = container.dataset.receiveremail;
        const data = {
            senderEmail: senderEmail,
            receiverEmail: receiverEmail,
            answer: true
        }
        console.log(data);
        console.log(demandeAmi);
        const acceptRes = await acceptFriend(data);
        if (acceptRes.ok) setDemandeAmi((prev) => prev.filter(req => req.sender_email !== senderEmail));
    }

   async function handleDecline(e) {
        const container = e.target.closest(".addFriendOnglet__body__demandeAmi__answerButtons");

        const senderEmail = container.dataset.senderemail;
        const receiverEmail = container.dataset.receiveremail;
        const data = {
            senderEmail: senderEmail,
            receiverEmail: receiverEmail,
            answer: false
        }
        const acceptRes = await acceptFriend(data);
        if (acceptRes.ok) setDemandeAmi((prev) => prev.filter(req => req.sender_email !== senderEmail));
    }

    return (
        <div className="addFriendOnglet">
            <div className="addFriendOnglet__header">
                <p>Contact's Request</p><i className="fa-solid fa-xmark" onClick={handleLeave}></i>
            </div>
            <div className="addFriendOnglet__body">
                <p className="addFriendOnglet__body--title">Manage the users you want to add or not.</p>
                <div className="addFriendOnglet__body__demandeAmi">
                    {demandeAmi.map((cell, index) => (
                        <div key={index}>
                            <p><span className="bold">{cell.sender_email}</span> requests to be your friend</p>
                            <div className="addFriendOnglet__body__demandeAmi__answerButtons" data-senderemail={cell.sender_email} data-receiveremail={cell.receiver_email}>
                                <button className="btn" onClick={handleAccept}>Accept</button><button className="btn" onClick={handleDecline}>Decline</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}