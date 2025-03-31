
import { HomeContact } from "../home/HomeContacts";
import { menuHome } from "../../../data/menuHome";
import { HomeProfil } from "../home/HomeProfil";
import { Navigation } from "../../components/common/Navigation";
import { useNavigate } from "react-router-dom";
import msn_messenger from "../../assets/pictures/logo/msn_messenger.jpg";
import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import onglet from "../../assets/pictures/icon/onglet.png";

export function Home() {

    const navigate = useNavigate();
    const { socket, demandeAmi, myFriends } = useSocket(); // demande d'ami est mis à jour au debut(au cas ou un des users est déco) et à chaque sendFriendRequest

    function handleLeave() {
        navigate("/");
        socket.disconnect(); // "disconnect est un event reservé, donc on n'utilise pas socket.emit("disconect") , mais juste socket.disconnect()
    }

    return (
        <div className="home">
            <div className="home__content">
                <div className="home__content__headerTop">
                    <p>Windows Messenger</p><i className="fa-solid fa-xmark" onClick={handleLeave}></i>
                </div>
                <div className="home__content__header__nav">
                    <Navigation data={menuHome} handleLeave={handleLeave} />
                </div>
                <div className="home__content__header">
                    {demandeAmi && <HomeProfil demandeAmi={demandeAmi} />}
                </div>
                <div className="home__content__body">
                    <HomeContact myFriends={myFriends} />
                </div>
                <div className="home__content__footer">
                    <img src={msn_messenger} />
                </div>
            </div>
        </div>
    );
}