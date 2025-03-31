export const menuHome = [
    {
        type: "folder",
        name: "File",
        children: [
            {
                type: "action",
                name: "Se déconnecter",
                value: "logout"
            },
            {
                type: "action",
                name: "Changer de compte",
            },
            {
                type: "action",
                name: "Enregistrer les conversations",
            },
            {
                type: "action",
                name: "Envoyer un fichier",
            },
            {
                type: "action",
                name: "Envoyer une invitation à MSN Messenger",
            },
            {
                type: "action",
                name: "Quitter",
            },
            {
                type: "folder",
                name: "coucou",
                children: [
                    {
                        type: "action",
                        name: "coucou 1",
                    },
                    {
                        type: "action",
                        name: "coucou 2",
                    },
                    {
                        type: "action",
                        name: "coucou 3",
                    },
                ]
            }
        ]
    },
    {
        type: "folder",
        name: "Contacts",
        children: [
            {
                type: "action",
                name: "Ajouter un contact",
                value: "addFriend"
            },
            {
                type: "action",
                name: "Chercher un contact",
            },
            {
                type: "action",
                name: "Supprimer un contact",
            },
            {
                type: "action",
                name: "Bloquer/débloquer un contact",
            },
            {
                type: "action",
                name: "Organiser les contacts (par groupes)",
            },
            {
                type: "action",
                name: "Afficher/masquer les contacts hors ligne",
            },
        ],
    },
    {
        type: "folder",
        name: "Actions",
        children: [
            {
                type: "action",
                name: "Envoyer un message instantané",
            },
            {
                type: "action",
                name: "Envoyer un e-mail",
            },
            {
                type: "action",
                name: "Démarrer une conversation vocale",
            },
            {
                type: "action",
                name: "Démarrer une conversation vidéo",
            },
            {
                type: "action",
                name: "Jouer à un jeu ou partager une activité",
            },
        ],
    },
    {
        type: "folder",
        name: "Outils",
        children: [
            {
                type: "action",
                name: "Modifier mon statut",
            },
            {
                type: "action",
                name: "Personnaliser mon avatar et mon pseudo",
            },
            {
                type: "action",
                name: "Modifier les paramètres de connexion",
            },
            {
                type: "action",
                name: "Configurer la webcam et le microphone",
            },
            {
                type: "action",
                name: "Options générales",
            },
        ],
    },
    {
        type: "folder",
        name: "Aide",
        children: [
            {
                type: "action",
                name: "Centre d'aide MSN Messenger",
            },
            {
                type: "action",
                name: "Rechercher des mises à jour",
            },
            {
                type: "action",
                name: "À propos de MSN Messenger",
            },
        ],
    }
]