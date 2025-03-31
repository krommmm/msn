import { useState } from "react";
import { handleLogout } from "../../functions/actions";
import { useNavigate } from "react-router-dom";


export function Navigation({ data, handleLeave }) {
    const [selectedValue, setSelectedValue] = useState(null);
    const navigate = useNavigate();


    async function handleAction(value) {
        switch (value) {
            case 'logout':
                const res = await handleLogout();
                if (handleLeave) handleLeave();
                break;
            case 'addFriend':
                navigate("/add");
                break;
            case 'changePassword':
                handleChangePassword();
                break;
            default:
                console.log("Action non définie pour : ", value);
        }
    }

    return (
        <ul className="nav-menu">
            {data.map((cell, index) => (
                cell.type === "folder" ? (
                    <li key={index} className="folder">
                        {cell.name} <i className="fa-solid fa-angle-right"></i>
                        <Navigation data={cell.children} handleLeave={handleLeave}/>
                    </li>
                ) : (
                    <li key={index} className="folder" onClick={() => handleAction(cell.value)}>
                        {cell.name}
                    </li>
                )
            ))}
        </ul>
    );
}
