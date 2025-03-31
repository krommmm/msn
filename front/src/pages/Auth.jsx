import { useState, useEffect } from "react";
import { SignIn } from "../components/form/auth/SignIn";
import { SignUp } from "../components/form/auth/SignUp";
import msn_logo from "../assets/pictures/logo/msn_logo.png"
import avatar from "../assets/pictures/logo/avatar.png";
import { signUp, logIn } from "../services/auth";
import { useNavigate } from "react-router-dom";
import onglet from "../assets/pictures/icon/onglet.png";

export function Auth() {

    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [sign, setSign] = useState(true);

    useEffect(() => {
        if(data) manageData();
    }, [data])

    async function manageData() {
        const dataValues = Object.values(data);
        const isDataFilled = dataValues.every((cell)=>cell);
        if(!isDataFilled) return;

        if (sign) {
            const res = await logIn(data);
            if (res.ok) {
                // Remonter un etat qui signale que la page home est débloqué
                navigate("/home");
            }
        } else {
            await signUp(data);
            const res = await logIn(data);
            if (res.ok) {
                //  Remonter un etat qui signale que la page home est débloqué
                navigate("/home");
            }
        }

    }

    function toogleSign() {
        setSign((prevS) => !prevS);
    }


    return (
        <div className="auth">
            <div className="auth__content">
                <div className="auth__content__header">
                  <img className="onglet" src={onglet}/>  <img src={msn_logo} /> <p>Messenger</p>
                </div>
                <div className="auth__content__body">
                    <img src={avatar} alt="avatar profil" />
                    {sign ? (<SignIn onUpdate={setData} />) : (<SignUp onUpdate={setData} />)}
                </div>
                <div className="auth__content__footer">
                    <p onClick={toogleSign}> {sign ? "Get a new account" : "Connect"}</p>
                </div>
            </div>
        </div>
    );
}