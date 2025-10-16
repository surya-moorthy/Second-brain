
import { useRef, useState } from "react";
import { useModal } from "../context/ModalContext";
import { CrossIcon } from "../icons/crossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
 
enum ContentType {
   Youtube = "youtube",
   Twitter = "twitter"
}

export function CreateContentModal() {
    const {isOpen,closeModal} = useModal();
    const titleRef= useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type,setType] = useState(ContentType.Youtube) 

    async function addContentHandle() {
      const title = titleRef.current?.value;
      const link = linkRef.current?.value;

      await axios.post(`${BACKEND_URL}/api/v1/content`,{
          link,
          title,
          type
      },{
        headers : {
            "Authorization" : ` Bearer ${localStorage.getItem("jwt")}`
        }
      })
    }

    return (
        <div>
            {
                isOpen && (
                    <div className="fixed inset-0 bg-slate-500/65 flex items-center justify-center">
                        <div className="bg-white p-4 rounded-2xl shadow-lg ">
                            <div className="flex justify-end cursor-pointer" onClick={closeModal}>
                                <CrossIcon />
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <Input placeholder="Title" ref={titleRef}/>
                                    <Input placeholder="Link" ref={linkRef}/>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <h1 className="mx-auto">Type</h1>
                                    <div className="flex gap-2 p-4"> 
                                         <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={()=> setType(ContentType.Youtube)}></Button>
                                         <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={()=> setType(ContentType.Twitter)}></Button>
                                    </div>
                                </div>
                                <div className="" onClick={() => addContentHandle()}>
                                  <Button variant="primary" text="Submit" />
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }
        </div>
    )
}

