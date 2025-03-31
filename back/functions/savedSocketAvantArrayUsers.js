// socket.js
const socketIo = require('socket.io');
const pool = require("../connection/sqlConnection");

module.exports = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: '*', // Permet à tous les domaines d'accéder, mais tu peux spécifier un domaine spécifique
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type'],
            credentials: true // Permet de gérer les cookies entre l'app front et le back
        }
    });

    const users = {};

    // Gestion des connexions Socket.io
    io.on('connection', (socket) => {
        console.log('Un client est connecté avec l\'ID:', socket.id);

        socket.on('setUserId', (userId, userEmail) => {
            users[userId] = socket.id;
            console.log(`Utilisateur ${userId} associé à socket.id ${socket.id}`);
        });

        socket.on('sendFriendRequest', async (data) => {
            console.log('Demande d\'ami reçue:', data);

            const [receiverIdRes] = await pool.execute(`SELECT _id FROM users WHERE email = ?`, [data.receiverEmail]);
            if (receiverIdRes && receiverIdRes.length === 0) return;

            const receiverId = receiverIdRes[0]._id;

            const receiverSocketId = users[receiverId]; // Trouver le socket.id de l'utilisateur récepteur

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

        socket.on('disconnect', () => {
            // Retirer l'utilisateur du mapping lors de la déconnexion
            for (let userId in users) {
                if (users[userId] === socket.id) {
                    delete users[userId];
                    console.log(`Utilisateur ${userId} déconnecté`);
                    break;
                }
            }
        });
        
    });

    return io;
};
