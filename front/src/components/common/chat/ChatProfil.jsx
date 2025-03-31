import { HOST } from "../../../../host";
export function ChatProfil({ avatar }) {

    return (
        <>
            <div className="chatProfil">
                <div classname="chatProfil__content">
                    <img src={`${HOST}/api/images/avatars/${avatar}`} />
                </div>
                <i className="fa-solid fa-caret-down carretDown"></i>
            </div>
            <div className="excroissanceProfil">
                <i className="fa-solid fa-caret-left carretLeft"></i>
            </div>
        </>
    );
}