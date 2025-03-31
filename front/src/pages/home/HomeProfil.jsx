import msn_logo from "../../assets/pictures/logo/msn_logo.png";
import avatar from "../../assets/pictures/logo/avatar.png";
import email from "../../assets/pictures/icon/email.png";
import { useState, useEffect } from "react";
import { getMyInfo, update } from "../../services/auth";
import { HOST } from "../../../host";
import { useNavigate } from "react-router-dom";
import  onglet from "../../assets/pictures/icon/onglet.png";

export function HomeProfil({demandeAmi}) {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tooglePersoMsg, setTooglePersoMsg] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    async function fetchUser() {
        const res = await getMyInfo();
        if (res.ok) setUser(res.data.user);
    }

    async function handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        const textContent = form.elements['personalMsg'].value;
        const res = await update({personalMsg: textContent});
        await fetchUser();
        setTooglePersoMsg(true);
    }

    function handleAccept(){
        navigate("/accept");
    }

    function handleImg(){
        navigate("/updateImg");
    }

    return (
        <>
        
            <div className="home__content__header__profile">
                <div className="home__content__header__profile__logo">
                <img className="onglet" src={onglet}/>
                    <img src={msn_logo} />
                    <p>Messenger</p>
                </div>
                <div className="home__content__header__profile__console">
                    <div>
                        <div className="home__content__header__profile__console__left">
                            {user && <img src={`${HOST}/api/images/avatars/${user.img_url ? user.img_url : "avatar.png"}`} onClick={handleImg}/>}
                        </div>
                        <div className="home__content__header__profile__console__right">
                            <div className="home__content__header__profile__console__right__title">
                                {user && <p>{user.name}</p>}
                            </div>
                            <div className="home__content__header__profile__console__right__personalMsg">
                                {user && tooglePersoMsg ? (<p>{user.personalMsg}&nbsp;</p>) : (<form onSubmit={handleSubmit}><input type="text" name="personalMsg" placeholder="<Type a personal message>" /></form>)}<p className="changePm" onClick={() => setTooglePersoMsg((prevS) => !prevS)}>▼</p>
                            </div>
                        </div>
                    </div>
                    <div className="home__content__header__profile__console__msgCount">
                        <div className="home__content__header__profile__console__msgCount__content">
                            <img src={email} onClick={handleAccept}/>
                            <p>({demandeAmi.length})</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}