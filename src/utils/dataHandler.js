import axios from "axios"

export default function getData() {
    let obj;
    axios.get("http://localhost:4800/data?amount=100")
    .then(res => {
        obj = res.data;
    })
    .catch(error => console.error(`Error ${error}`)); 
  
    return obj;

}


