import { HOST } from "../../host";

export async function playSound(soundName) {
    try {
        const preRes = await fetch(`${HOST}/api/sound/${soundName}`, {
            method: "GET",
            credentials: 'include',
            headers: {
            },
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}