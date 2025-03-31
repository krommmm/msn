import picture from "../../../assets/pictures/icon/input_header/picture.png";
import police from "../../../assets/pictures/icon/input_header/police.png";
import present from "../../../assets/pictures/icon/input_header/present.png";
import smile from "../../../assets/pictures/icon/smileys/smile.png";
import voice from "../../../assets/pictures/icon/input_header/voice.png";
import wink from "../../../assets/pictures/icon/input_header/wink.png";
import wizz from "../../../assets/pictures/icon/input_header/wizz.png";
import angry from "../../../assets/pictures/icon/smileys/angry.png";
import party from "../../../assets/pictures/icon/smileys/party.png";
import shy from "../../../assets/pictures/icon/smileys/shy.png";
import sunglass from "../../../assets/pictures/icon/smileys/sunglass.png";
import  sad from "../../../assets/pictures/icon/smileys/sad.png";

export function ChatInput({ onUpdateMsg }) { 

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const msg = form.elements['msg'].value;
        onUpdateMsg(msg);
        form.reset();
    }

    return (
        <div className="chatInput">
            <div className="chatInput__header">
                <div className="chatInput__header__ico">
                    <img src={police} />
                </div>
                <div className="chatInput__header__ico">
                    <img src={smile} />
                    <i className="fa-solid fa-caret-down"></i>
                    <ul>
                        <li>
                            <img src={smile} /><p>{':)'}</p>
                        </li>
                        <li>
                            <img src={sad} /><p>:(</p>
                        </li>
                        <li>
                            <img src={angry} /><p>:@</p>
                        </li>
                        <li>
                            <img src={wink} /><p>;)</p>
                        </li>
                        <li>
                        <img src={party} /><p>{'<:O'}</p>
                        </li>
                        <li>
                            <img src={shy} /><p>:$</p>
                        </li>
                        <li>
                            <img src={sunglass} /><p>(H)</p>
                        </li>
                    </ul>
                </div>
                <div className="chatInput__header__ico">
                    <img src={voice} />
                    <p>Voice Clip</p>
                </div>
                <div className="chatInput__header__ico">
                    <img src={wink} />
                    <i className="fa-solid fa-caret-down"></i>
                </div>
                <div className="chatInput__header__ico">
                    <img src={picture} />
                    <i className="fa-solid fa-caret-down"></i>
                </div>
                <div className="chatInput__header__ico">
                    <img src={present} />
                    <i className="fa-solid fa-caret-down"></i>
                </div>
                <div className="chatInput__header__ico">
                    <img src={wizz} />
                </div>
            </div>
            <div className="chatInput__body">
                <form onSubmit={handleSubmit}>
                    <textarea name="msg"></textarea>
                    <button><span className="underline">S</span>end</button>
                </form>
            </div>
            <div className="chatInput__footer"></div>
        </div>
    );
}