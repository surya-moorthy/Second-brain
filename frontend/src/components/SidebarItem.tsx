import type { ReactElement } from "react"

interface SidebarProps {
    text : string,
    icon : ReactElement
}
export const SidebarItem = ({text,icon} : SidebarProps) => {
    return (
        <div className="flex gap-4 items-center w-full text-xl px-4 py-2 text-gray-500 font-semibold hover:bg-gray-200 rounded-xl hover:text-neutral-900">
            <div className="p-2">
           {icon}
           </div>
           <div className="p-2">
            {text}
            </div>
        </div>
    )

} 