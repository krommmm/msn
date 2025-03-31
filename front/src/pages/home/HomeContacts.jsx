import user_big from "../../assets/pictures/icon/user_big.png";
import user_on from "../../assets/pictures/icon/user_on.png";
import user_off from "../../assets/pictures/icon/user_off.png";
import user_away from "../../assets/pictures/icon/user_away.png";
import user_add from "../../assets/pictures/icon/user_add.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function HomeContact({ myFriends }) {

    const navigate = useNavigate();
    const [userConnected, setUserConnected] = useState({
        connected: [],
        deconnected: [],
        total: 0
    });

    function handleAdd() {
        navigate("/add");
    }

    function handleClick(e) {
        const userId = e.target.closest(".homeContact__content__body__online__content__user").dataset.id;
        navigate(`/chat?userId=${userId}`)
    };
    useEffect(() => {
        console.log("myFriends mis à jour");
        console.log(myFriends);
        init();
        function init() {
            const userCo = myFriends.filter((friend) => friend.status);
            const userDeco = myFriends.filter((friend) => !friend.status);

            const users = {
                connected: userCo,
                deconnected: userDeco,
                total: userCo.length + userDeco.length
            }
            setUserConnected(users);
        }
    }, [myFriends])

    return (
        <div className="homeContact">
            <div className="homeContact__content">
                <div className="homeContact__content__header">
                    <div className="homeContact__content__header__left">
                        <img src={user_big} />
                    </div>
                    <div className="homeContact__content__header__right">
                        <div className="homeContact__content__header__right__warning">
                            <p>i</p><p>Click here to learn about the Customer Exeperience Improvement Program.</p>
                        </div>
                        <div className="homeContact__content__header__right__addContact" onClick={handleAdd}>
                            <img src={user_add} />
                            <p>Add a Contact</p>
                        </div>
                    </div>
                </div>
                <div className="homeContact__content__body">
                    <div className="homeContact__content__body__online">
                        <div className="homeContact__content__body__online__title"> <p><i className="fa-solid fa-minus"></i></p><p>{userConnected && `Online: (${userConnected.connected.length}/${userConnected.total})`}</p></div>
                        <div className="homeContact__content__body__online__content">
                            {myFriends.map((friend, index) => (
                                friend.status &&
                                <div key={index} className="homeContact__content__body__online__content__user" data-id={friend._id} onClick={handleClick}>
                                    <img src={user_on} />
                                    <p>{friend.email}</p>
                                    {friend.alerting ? (<p className="visualAlert">🔔</p>) : ""}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="homeContact__content__body__offline">
                        <div className="homeContact__content__body__offline__title"> <p><i className="fa-solid fa-minus"></i></p><p>{userConnected && `Offline: (${userConnected.deconnected.length}/${userConnected.total})`}</p></div>
                        <div className="homeContact__content__body__offline__content">
                            {myFriends.map((friend, index) => (
                                !friend.status && <div key={index} className="homeContact__content__body__online__content__user" data-id={friend._id} onClick={handleClick}>
                                    <img src={user_off} />
                                    <p>{friend.name} <span className="grey">({friend.email})</span></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="homeContact__content__footer"></div>
            </div>
        </div>
    );
}