
import { useModal } from "../context/ModalContext";
import { CrossIcon } from "../icons/crossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

export function CreateContentModal() {
    const {isOpen,closeModal} = useModal();
    return (
        <div>
            {
                isOpen && (
                    <div className="fixed inset-0 bg-slate-500 opacity-65 flex items-center justify-center">
                        <div className="bg-white p-4 rounded-2xl shadow-lg">
                            <div className="flex justify-end cursor-pointer" onClick={closeModal}>
                                <CrossIcon />
                            </div>
                            <div className="flex flex-col ">
                                <Input placeholder="Title" onChange={()=>{}}/>
                                <Input placeholder="Link" onChange={()=>{}}/>
                                <div className="">
                                  <Button variant="primary" text="Submit"/>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }
        </div>
    )
}

