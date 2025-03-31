import { useState, useEffect } from "react";
import smile from "../../../assets/pictures/icon/smileys/smile.png";
import sad from "../../../assets/pictures/icon/smileys/sad.png";
import tongue from "../../../assets/pictures/icon/smileys/tongue.png";
import wink from "../../../assets/pictures/icon/smileys/wink.png";
import angry from "../../../assets/pictures/icon/smileys/angry.png";
import party from "../../../assets/pictures/icon/smileys/party.png";
import shy from "../../../assets/pictures/icon/smileys/shy.png";
import sunglass from "../../../assets/pictures/icon/smileys/sunglass.png";

export function Chat({ data, user }) {

    const [newData, setNewData] = useState([]);

    useEffect(() => {
        const result = data.map((cell) => {
            return { ...cell, content: fillSmileyWithImage(cell.content) };
        });
        setNewData(result);
    }, [data]);

    function fillSmileyWithImage(text) {
        const correspondanceSmileys = {
            ":)": <img src={smile} alt=":)" width="25" />,
            ":(": <img src={sad} alt=":(" width="25" />,
            ":p": <img src={tongue} alt=":p" width="25" />,
            ";)": <img src={wink} alt=";)" width="25" />,
            ":@": <img src={angry} alt=":@" width="25" />,
            "<:O": <img src={party} alt="<:O" width="25" />,
            ":$": <img src={shy} alt=":$" width="25" />,
            "(H)": <img src={sunglass} alt="(H)" width="25" />
        };

        // Remplacer chaque smiley dans le texte
        const regex = /(:\)|:\(|:p|;\)|:@|<:O|:\$|\(H\))/g;
        return text.split(regex).map((part) =>
            correspondanceSmileys[part] || part
        );
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <p>To: <span className="title">{user.name}</span></p>
            </div>
            <div className="chat__body">
                {newData.map((cell, index) => (
                    <div key={index}>
                        <p className="chat__body__title">{cell.sender_name}:</p>
                        <p className="chat__body__msg">{cell.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
