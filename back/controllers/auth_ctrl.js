const pool = require("../connection/sqlConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

exports.signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ msg: "Tous les champs sont requis" });
        const [user] = await pool.execute('SELECT email FROM users WHERE email = ?', [email]);
        if (user && user.length > 0) return res.status(400).json({ msg: "Email indisponible" });
        const hash = await bcrypt.hash(password, 10);
        const _id = uuidv4();
        const [response] = await pool.execute('INSERT INTO users (_id, name, email, password) VALUES (?, ?, ?, ?)', [_id, name, email, hash]);
        return res.status(200).json({ msg: "Inscription réussie" });
    } catch (err) {
        return res.status(400).json({ err });
    }
};

exports.logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ msg: "Tous les champs sont requis" });
        const [user] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length <= 0) return res.status(400).json({ msg: "Email introuvable" });
        const isPasswordOk = await bcrypt.compare(password, user[0].password);
        if (!isPasswordOk) return res.status(400).json({ msg: "Mauvais mot de passe" });
        // creation token
        const token = jwt.sign({ _id: user[0]._id },
            `${process.env.JWT_SECRET}`,
            { expiresIn: '24h' });

        // creation cookie http only
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('authTokenMsn', token, {
            httpOnly: true,
            secure: 'production',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'None',
            partitioned: true,
            path: "/"
        });

        return res.status(200).json({ msg: "Connexion réussie" });
    } catch (err) {
        return res.status(400).json({ err });
    }
};

exports.update = async (req, res, next) => {
    try {
        const { personalMsg, isConnected } = req.body;
        const authData = {};
        if (req.file && req.file.filename) authData.img_url = req.file.filename;
        if (personalMsg) authData.personalMsg = personalMsg;
        if (isConnected) authData.isConnected = isConnected;
        const keys = Object.keys(authData);
        const values = Object.values(authData);
        values.push(req.auth.userId);
        const set = keys.map((cell) => `${cell} = ?`).join(", ");
        const [answer] = await pool.execute(`UPDATE users SET ${set} WHERE _id = ?`, values);
        return res.status(200).json({ msg: "Modification réussie" });
    } catch (err) {
        return res.status(400).json({ err: err });
    }
};

exports.getMyInfo = async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const [user] = await pool.execute("SELECT * FROM users u WHERE u._id = ?", [userId]);
        return res.status(200).json({ user: user[0] });
    } catch (err) {
        return res.status(400).json({ err });
    }
};


exports.disconnect = async (req, res, next) => {
    try {
        res.clearCookie('authTokenMsn', {
            httpOnly: true,
            secure: 'production',
            sameSite: 'None',
            partitioned: true,
            path: "/"
        });
        return res.status(200).json({ msg: "Déconnexion réussie" });
    } catch (err) {
        return res.status(400).json({ err });
    }
};


exports.friendRequest = async (req, res, next) => {
    try {
        const { senderEmail, receiverEmail } = req.body;

        // Vérifier si le destinataire existe
        const [email] = await pool.execute(`SELECT email FROM users WHERE email = ?`, [receiverEmail]);
        if (email.length === 0) return res.status(404).json({ msg: "Email inconnu" });

        // Récupération de l'id du mail
        const [senderIdRes] = await pool.execute(`SELECT _id FROM users WHERE email = ?`, [senderEmail]);
        const [receiverIdRes] = await pool.execute(`SELECT _id FROM users WHERE email = ?`, [receiverEmail]);
        const senderId = senderIdRes[0]._id;
        const receiverId = receiverIdRes[0]._id;

        // Vérifier si les utilisateurs sont déjà amis
        const [existingFriend] = await pool.execute(
            `SELECT * FROM friends 
              WHERE (user1_id = ? AND user2_id = ?) 
              OR (user2_id = ? AND user1_id = ?)`,
            [senderId, receiverId, receiverId, senderId]
        );
        console.log("vérification si déjà amis");
        if (existingFriend.length > 0) {
            return res.status(400).json({ msg: "Vous êtes déjà amis" });
        }
        // Vérifier si une demande d'ami est déjà envoyée
        const [existingRequest] = await pool.execute(
            `SELECT * FROM friend_requests 
             WHERE (sender_id = ? AND receiver_id = ?) 
             OR (receiver_id = ? AND sender_id = ?)`,
            [senderId, receiverId, receiverId, senderId]
        );
        console.log("vérification déjà demande d'ami");
        if (existingRequest.length > 0) {
            return res.status(400).json({ msg: "Demande déjà envoyée ou en attente" });
        }

        console.log("avant la requete demande ami");
        // Insérer la demande d'ami
        await pool.execute(
            `INSERT INTO friend_requests (sender_id, receiver_id, sender_email, receiver_email) VALUES(?, ?, ?, ?)`,
            [senderId, receiverId, senderEmail, receiverEmail]
        );
        console.log("après la requete demande ami");

        return res.status(200).json({ msg: "Demande d'ami envoyée" });

    } catch (err) {
        return res.status(500).json({ msg: "Erreur serveur", error: err.message });
    }
};

exports.getFriendRequests = async (req, res, next) => {
    try {
        const senderEmail = req.params.senderEmail;

        // Récupération de l'id du mail
        const [senderIdRes] = await pool.execute(`SELECT _id FROM users WHERE email = ?`, [senderEmail]);
        const senderId = senderIdRes[0]._id;
        const query = `
        SELECT * FROM friend_requests 
          WHERE status="pending" 
          AND receiver_id = ?`;
        const [friendReq] = await pool.execute(query, [senderId]);
        return res.status(200).json({ friendReq: friendReq });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.acceptFriend = async (req, res, next) => {
    try {
        const { senderEmail, receiverEmail, answer } = req.body;

        // Récupération de l'id du mail
        const [senderIdRes] = await pool.execute(`SELECT _id FROM users WHERE email = ?`, [senderEmail]);
        const [receiverIdRes] = await pool.execute(`SELECT _id FROM users WHERE email = ?`, [receiverEmail]);
        const senderId = senderIdRes[0]._id;
        const receiverId = receiverIdRes[0]._id;

        if (!answer) {
            // Rejeter la demande
            await pool.execute(
                `UPDATE friend_requests 
                 SET status = 'rejected' 
                 WHERE sender_id = ? AND receiver_id = ?`,
                [senderId, receiverId]
            );

            return res.status(200).json({ msg: "Demande d'ami refusée" });
        }

        // Accepter la demande
        const [updateResult] = await pool.execute(
            `UPDATE friend_requests 
             SET status = 'accepted' 
             WHERE sender_id = ? AND receiver_id = ?`,
            [senderId, receiverId]
        );

        // Vérifier si la mise à jour a réussi
        if (updateResult.affectedRows === 0) {
            return res.status(400).json({ msg: "Aucune demande d'ami trouvée" });
        }

        // Vérifier si les utilisateurs sont déjà amis
        const [existingFriend] = await pool.execute(
            `SELECT * FROM friends 
             WHERE (user1_id = ? AND user2_id = ?) 
                OR (user2_id = ? AND user1_id = ?)`,
            [senderId, receiverId, receiverId, senderId]
        );

        if (existingFriend.length > 0) {
            return res.status(400).json({ msg: "Vous êtes déjà amis" });
        }

        // Ajouter les amis dans la table friends
        await pool.execute(
            `INSERT INTO friends (user1_id, user2_id, user1_email, user2_email) VALUES (?, ?, ?, ?)`,
            [senderId, receiverId, senderEmail, receiverEmail]
        );

        return res.status(201).json({ msg: "Ami ajouté" });

    } catch (err) {
        return res.status(500).json({ msg: "Erreur serveur", error: err.message });
    }
};


exports.getMyFriends = async (req, res, next) => {
    try {
        const myId = req.params.myId;
        const [myFriends] = await pool.execute(`SELECT users.* 
                                                FROM users 
                                                INNER JOIN friends 
                                                ON (friends.user1_id = users._id OR friends.user2_id = users._id) 
                                                WHERE (friends.user1_id = ? OR friends.user2_id = ?) 
                                                AND users._id != ?;`,
            [myId, myId, myId]);
        if (myFriends.length === 0) return res.status(200).json({ msg: "Aucun ami" });
        return res.status(200).json({ friends: myFriends });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.updateImg = async (req, res, next) => {
    try {
        console.log(`---CTRL updateImg---`);
        const { nouvelleImage } = req.body;
        const userId = req.auth.userId;

        const sql = `UPDATE users SET img_url = ? WHERE _id = ?`;
        await pool.execute(sql, [nouvelleImage, userId]);
        return res.status(200).json({ msg: "Avatar modifié" });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getFriendInfo = async (req, res, next) => {
    try {
        const [infos] = await pool.execute(`SELECT name, email, _id, img_url, personalMsg FROM users WHERE _id = ?`, [req.params.friendId]);
        return res.status(200).json({ infos: infos[0] })
    } catch (err) {
        return res.status(500).json({ err });
    }
};