import axios from "axios";
import { DeleteIcon } from "../icons/delete";
import { TwitterIcon } from "../icons/twitter";
import { YoutubeIcon } from "../icons/youtube";
import { Button } from "./Button";
import type { CardProps } from "../types/types";



export default function Card({ link, title, type ,_id}: CardProps) {

    async function DeleteHandle() {
        const deleteHandle = await axios.delete(`http://localhost:3000/api/v1/content?id=${_id}`,{
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        console.log(deleteHandle);
    }

    return (
        <div>
            <div className="my-5 max-w- border border-slate-100 p-8 bg-white rounded-lg shadow outline-slate-200">
                <div className="flex justify-between">
                    <div className="flex gap-4 text-lg">
                        <div className="text-gray-500">
                            {type === "twitter" ? <TwitterIcon/> : <YoutubeIcon/>}
                        </div>
                        <h1 className="font-semibold">{title} </h1>
                    </div>
                    <div className="flex items-center">
                         <div className="flex gap-4 text-gray-500">
                        <a href={link} target="_blank">
                             <div className="mx-2 flex items-center rounded-md bg-purple-500 hover:bg-purple-600 text-white px-4 py-2">
                                Open
                            </div>
                        </a>
                        <div onClick={DeleteHandle}>
                            <DeleteIcon />
                        </div>     
                    </div>
                    </div>
                </div>
                <div className="pt-4">
                    {type === "youtube" && (
                        <iframe
                            className="w-full"
                            src={`https://www.youtube.com/embed/${new URL(link).searchParams.get("v")}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
                {type === "twitter" && (
                    <div>
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>

                    </div>
                )}
            </div>
        </div>
    )
}
