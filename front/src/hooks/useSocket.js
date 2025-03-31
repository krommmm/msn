import { useEffect, useState } from "react";
import { socket } from "../functions/socket";
import { getFriendRequests, getMyInfo, getMyFriends } from "../services/auth";
import { playSound } from "../services/sound";
import { HOST } from "../../host";

export function useSocket() {

    const [demandeAmi, setDemandeAmi] = useState([]);
    const [myFriends, setMyFriends] = useState([]); // friends avec status(true/false pour connected/deconnected)
    const [usersConnected, setUsersConnected] = useState([]);


    // partie socket
    useEffect(() => {

        init();

        // on doit vérifier qu'on est pas déjà connecté, sinon boucle infini
        if (!socket.connected) {
            socket.connect();
        }

        socket.on("connect", async () => {
            console.log("✅ Connecté au serveur WebSocket avec ID :", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("❌ Déconnecté du serveur WebSocket");
        });

        socket.on("alertMsg", async (userId) => {
            await new Audio(`${HOST}/api/sound/levelUp.mp3`).play();
            // const audio = new Audio(`${HOST}/api/sound/levelUp.mp3`);
            // audio.play().catch(error => console.error('Erreur de lecture:', error));
            console.log("Essaie de modification de users en incluant la key 'alerting'");
            console.log(userId);
            setMyFriends((prevS) =>
                prevS.map((friend) =>
                    friend._id === userId ? { ...friend, alerting: true } : friend
                )
            );

        });


        socket.on('sendFriendRequest', async (data) => {
            console.log(data);
            await init(); // quand on reçoit une demande on met à jour le tableau
        });

        socket.on("connectedUsers", async (users) => {

            console.log("Utilisateurs connectés:", users);

            // Indication des users si connected or not
            const myInfo = await fetchMyUser();
            const friends = await getYourFriendsList(myInfo);

            for (let i = 0; i < friends.length; i++) {
                if (users.some((user) => user.userId === friends[i]._id)) {
                    friends[i].status = true;
                } else {
                    friends[i].status = false;
                }
            }
            setMyFriends(friends);

        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("sendFriendRequest");
            socket.off("connectedUsers");
        };
    }, []);




    async function init() {
        // Récupération mes infos et jointure de uuid et socket.id
        const myInfo = await fetchMyUser();
        socket.emit("setUserId", myInfo._id, myInfo.email);
        // si friendRequest add it
        setUpDemandeAmiList(myInfo);
        // Demande au serveur la liste des utilisateurs connectés
        socket.emit("getConnectedUsers");
    }


    async function fetchMyUser() {
        const myInfoRes = await getMyInfo();
        const myInfo = myInfoRes.data.user;
        return myInfo;
    }

    async function setUpDemandeAmiList(myInfo) {
        const myMail = myInfo.email;
        const friendReqRes = await getFriendRequests(myMail);
        let friendReqArray = [];
        if (friendReqRes.data.friendReq.length > 0) {
            friendReqArray = friendReqRes.data.friendReq;
            setDemandeAmi(friendReqArray);
        }
    }

    async function getYourFriendsList(myInfo) {
        const myId = myInfo._id;
        const friendRes = await getMyFriends(myId);
        if (!friendRes.data.friends) return;
        const friends = friendRes.data.friends;
        return friends;
    }




    // function indicateIfFriendsAreConnectedOrNot(friends) {
    //     const copyFriends = JSON.parse(JSON.stringify(friends));

    //     console.log(usersConnected);
    // }

    return { socket, demandeAmi, setDemandeAmi, myFriends };
}


