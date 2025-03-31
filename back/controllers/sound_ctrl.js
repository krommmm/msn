// npm install sound-play
const path = require('path');

exports.playSound = (req, res) => {
    const filePath = path.join(__dirname, '../uploads/sounds', `levelUp.mp3`);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Erreur lors de l\'envoi du fichier audio:', err);
            res.status(500).json({ message: 'Erreur lors de l\'envoi du fichier audio' });
        }
    });
};
