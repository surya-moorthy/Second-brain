import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config/config";

export function useContent() {
    const [contents,setContents] = useState([]);

    useEffect(()=> {
         axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        .then((response) => {
            setContents(response.data.contents);
        })
    })
    return contents;
}