import axios from "axios"

export default async function getUserData(username, pass) {
    await axios.get(`https://eu-1.lolo.co/nuMt2ZKatFKC2uCKN1VAjB/getUserData?username=${username}&password=${pass}`)
        .then((res) => {
            return res.data.response;
        })
}