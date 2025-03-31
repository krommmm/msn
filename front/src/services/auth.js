import { HOST } from "../../host";

export async function signUp(data) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/signUp`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        }
    } catch (err) {
        console.error(err);
    }
}

export async function logIn(data) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/logIn`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        }
    } catch (err) {
        console.error(err);
    }
}


export async function getMyInfo() {
    try {
        const preRes = await fetch(`${HOST}/api/auth/getMyInfo`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        }
    } catch (err) {
        console.error(err);
    }
}

export async function disconnect() {
    try {
        const preRes = await fetch(`${HOST}/api/auth/disconnect`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        }
    } catch (err) {
        console.error(err);
    }
}

export async function update(data) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/update`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        }
    } catch (err) {
        console.error(err);
    }
}

export async function friendRequest(data) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/friendRequest`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        }
    } catch (err) {
        console.error(err);
    }
}

export async function getFriendRequests(senderEmail) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/getFriendRequests/${senderEmail}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        }
    } catch (err) {
        console.error(err);
    }
}

export async function acceptFriend(data) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/acceptFriend`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        }
    } catch (err) {
        console.error(err);
    }
}

export async function getMyFriends(myId) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/getMyFriends/${myId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        }
    } catch (err) {
        console.error(err);
    }
}

export async function updateImg(img) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/updateImg`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ nouvelleImage: img }),
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        }
    } catch (err) {
        console.error(err);
    }
}




export async function getFriendInfo(friendId) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/getFriendInfo/${friendId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        }
    } catch (err) {
        console.error(err);
    }
}
