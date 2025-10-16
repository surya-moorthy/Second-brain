import { ShareIcon } from "../icons/share";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}

export default function Card({ link, title, type }: CardProps) {
    return (
        <div>
            <div className="my-5 max-w-90 border border-slate-100 p-8 bg-white rounded-lg shadow outline-slate-200">
                <div className="flex justify-between">
                    <div className="flex gap-4 text-lg">
                        <div className="text-gray-500">
                            <ShareIcon />
                        </div>
                        <h1 className="font-semibold">{title} </h1>
                    </div>
                    <div className="flex gap-4 text-gray-500">
                        <a href={link} target="_blank">
                            <ShareIcon />
                        </a>
                        <ShareIcon />
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
