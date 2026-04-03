import React from "react";
import { useNavigate } from "react-router-dom";

function Panel(props){
    const navigate = useNavigate();
    const handleClick = () => {
        if(props.panel === "admin"){
        navigate("/admin");
    }

    if(props.panel === "company"){
        navigate("/company");
    }

    if(props.panel === "student"){
        navigate("/client");
    }
    }
    
    return (
            <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#a09a79_0%,#6d694d_100%)] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_24px_rgba(7,20,46,0.22)]">
            <div className="rounded-xl bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)] px-2 py-2">
                <svg viewBox="0 0 300 110" className="h-[72px] w-full text-violet-500/80" fill="none">
                    <path
                        d="M12 72 C35 8, 52 8, 72 34 C92 60, 116 26, 136 40 C156 54, 168 84, 178 72 C196 50, 212 18, 234 32 C252 44, 264 62, 286 72"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            <button className="mx-auto mt-2.5 block h-[32px] w-[114px] cursor-pointer rounded-full bg-violet-700 text-sm font-semibold capitalize text-white shadow-lg transition hover:bg-violet-600" onClick={handleClick}>{props.panel}</button>
        </div>
    )
}

export default Panel;
