import { useNavigate } from "react-router-dom";
import { HOST } from "../../../host";
import { avatarsDefaults } from "../../../data/avatarsDefaults";
import { useState, useRef } from "react";
import { updateImg } from "../../services/auth";

export function UpdateImgOnglet() {

    const navigate = useNavigate();
    const imgRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null); // Etat pour l'aperçu de l'image

    function handleLeave(e) {
        e.preventDefault();
        navigate("/home");
    }

    function handlePreviewImg(e) {
        const avatarFile = e.currentTarget.getAttribute("data-file");
        if (avatarFile) {
            setPreviewImage(`${HOST}/api/images/avatars/${avatarFile}`);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const newImg = previewImage.split("avatars/")[1];
        await updateImg(newImg);
        navigate("/home");
    }

    return (
        <div className="updateImg">
            <div className="home__content__headerTop">
                <p>Windows Messenger</p><i className="fa-solid fa-xmark" onClick={handleLeave}></i>
            </div>
            <div className="updateImg__header">
                <p>Select a picture to represent you that others will see in instant message conversations:</p>
            </div>
            <div className="updateImg__body">
                <div className="updateImg__body__selectionImg">
                    <p className="updateImg__body__selectionImg--title">Display picture</p>
                    <div className="updateImg__body__selectionImg__centent">
                        {avatarsDefaults.map((avatar, index) => (
                            <div key={index} data-file={avatar.file} ref={imgRef} onClick={handlePreviewImg}>
                                <img src={`${HOST}/api/images/avatars/${avatar.file}`} />
                                <p>{avatar.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="updateImg__body__manageImg">
                    <div className="updateImg__body__manageImg__buttons">
                        <button className="btn-xp">Browse ...</button>
                        <button className="btn-xp">Remove</button>
                    </div>

                    <div className="updateImg__body__manageImg__preview">
                        <p>Preview</p>
                        <img src={previewImage || `${HOST}/api/images/avatars/${avatarsDefaults[0].file}`} />
                    </div>
                </div>
            </div>
            <div className="updateImg__footer">
                <button className="btn-xp" onClick={handleSubmit}>OK</button>
                <button className="btn-xp" onClick={handleLeave}>Cancel</button>
                <button className="btn-xp" >Help</button>
            </div>
        </div>
    );
}