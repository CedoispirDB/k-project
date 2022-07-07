import axios from "axios"



export async function getAllUsernames() {
    await axios.get('https://eu-1.lolo.co/nuMt2ZKatFKC2uCKN1VAjB/getAllUsernames')
        .then((res) => {
            return res.data.response.usernames_list.L;
        })
}

export default function o() {
    console.log("ooo")
}