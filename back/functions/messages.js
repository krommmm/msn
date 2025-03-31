const pool = require("../connection/sqlConnection");


async function sendMyMessage(senderId, receiverId, content) {
    try {
        const query = `INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`;
        await pool.execute(query, [senderId, receiverId, content]);
    } catch (err) {
        console.error(err);
    }
}

module.exports = { sendMyMessage };