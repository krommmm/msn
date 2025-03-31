// socket.js
const socketIo = require('socket.io');
const pool = require("../connection/sqlConnection");
const { sendMyMessage } = require("./messages");

module.exports = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: '*', // Permet à tous les domaines d'accéder, mais tu peux spécifier un domaine spécifique
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type'],
            credentials: true // Permet de gérer les cookies entre l'app front et le back
        }
    });

    let users = [];

    // Gestion des connexions Socket.io
    io.on('connection', (socket) => {
        console.log('Un client est connecté avec l\'ID:', socket.id);

        socket.on('setUserId', (userId, userEmail) => {
             
            // si l'utilisateur est déjà dans user, on ne l'ajoute pas 
            const includedUser = users.some((user)=>user.userId===userId);
           if(!includedUser) users.push({ email: userEmail, userId: userId, socketId: socket.id })
            // users[userId] = socket.id;
            console.log(`Utilisateur ${userEmail}  (userId:${userId}) associé à socket.id ${socket.id}`);

            // une fois qu'on a setUp users, on revoit à tous les users (emit [pas socket]) le nouveau tableau des users pour afficher deco/connected
            io.emit("connectedUsers", users);
        });

        socket.on('sendFriendRequest', async (data) => {
            console.log('Demande d\'ami reçue:', data);

            const [receiverIdRes] = await pool.execute(`SELECT _id FROM users WHERE email = ?`, [data.receiverEmail]);
            if (receiverIdRes && receiverIdRes.length === 0) return;

            const receiverId = receiverIdRes[0]._id;

            // const receiverSocketId = users[receiverId]; // Trouver le socket.id de l'utilisateur récepteur
            const receiverSocketId = users.find((cell) => cell.userId === receiverId)

            if (receiverSocketId) {
                // Émettre l'événement seulement à l'utilisateur récepteur
                io.to(receiverSocketId).emit('newFriendRequest', ({ name: data[senderName], email: data[senderEmail] }));
                console.log(`Demande d'ami envoyée à l'utilisateur ${data.receiverId}`);
            } else {
                console.log('Utilisateur récepteur non trouvé');
            }
        });

        // affiche les utilisateurs connectés
        socket.on("getConnectedUsers", () => {
            socket.emit("connectedUsers", users);
        });

        socket.on('joinRoom', ({ sender, receiver }) => {
            const roomName = getChatRoomName(sender._id, receiver._id);
            socket.join(roomName);
            // console.log(`${sender.name} a rejoind la room ${roomName}`);
        });

        socket.on('sendMsg', async ({ sender, receiver, msg }) => {
            try {
                await sendMyMessage(sender._id, receiver._id, msg);
                const roomName = getChatRoomName(sender._id, receiver._id);
                console.log(roomName);
                io.to(roomName).emit('receiveMessage', ({ sender, receiver, msg }));
                const userConcerned = users.find((user)=>user.userId === receiver._id);
                if(userConcerned) io.to(userConcerned.socketId).emit("alertMsg",(sender._id));
                //io.to(users[sender]).emit('cleanAlert');
            } catch (err) {
                console.log(err);
            }
            console.log("end");
        });

        socket.on('disconnect', () => {

            const user = users.find((user) => user.socketId === socket.id);
            if (user) {
                console.log(`Utilisateur ${user.email} déconnecté`);
                users = users.filter(user => user.socketId !== socket.id);
               
                // Informer tous les users de la nouvelle liste
                io.emit("connectedUsers", users);
            }

        });

        function getChatRoomName(userId1, userId2) {
            return `chat-${[userId1, userId2].sort().join('-')}`;
        }

    });

    return io;
};
