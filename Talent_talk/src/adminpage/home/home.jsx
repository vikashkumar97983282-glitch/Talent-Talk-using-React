import React from "react";
import Panel from "./panel";
import { Outlet } from "react-router-dom";


function Home(){

    const panels = ["student","company","admin"]

    return (
        <div className="h-dvh w-screen overflow-hidden bg-slate-900">
            <div className="flex h-full w-full overflow-hidden bg-[#193d7a] md:flex-row">
                <div className="relative hidden h-full flex-1 overflow-hidden bg-linear-to-br from-cyan-400 via-teal-500 to-cyan-700 md:block">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(7,35,58,0.2),transparent_34%)]" />
                    <div className="absolute bottom-0 left-0 right-0 h-14 bg-[linear-gradient(180deg,#d8b07c_0%,#c99763_45%,#b98045_100%)]" />
                    <div className="absolute bottom-11 left-0 right-0 h-2.5 bg-white/10 blur-sm" />
                    <div className="relative z-10 flex h-full flex-col justify-between px-10 py-8 lg:px-16 lg:py-10">
                        <div className="pt-10">
                            <h1 className="max-w-md text-4xl font-bold tracking-tight text-white lg:text-[52px]">
                                Choice your Roll
                            </h1>
                        </div>

                        <svg
                            viewBox="0 0 520 220"
                            className="absolute left-10 top-32 h-55 w-[72%] max-w-147.5 text-white/85 lg:left-16 lg:top-36"
                            fill="none"
                        >
                            <path d="M30 155 L95 130 L150 205 L230 120 L315 132 L455 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M430 30 L455 30 L448 54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            {[
                                [30, 155],
                                [95, 130],
                                [150, 205],
                                [230, 120],
                                [315, 132],
                            ].map(([cx, cy], idx) => (
                                <circle key={idx} cx={cx} cy={cy} r="5" fill="#1f9bb0" stroke="white" strokeWidth="2" />
                            ))}
                        </svg>

                        <div className="relative z-10 ml-auto mt-auto w-full max-w-96 lg:max-w-lg">
                            <div className="ml-auto flex w-90 justify-end">
                                <img
                                    src="https://pngimg.com/uploads/cup/cup_PNG1986.png"
                                    alt="Coffee cup"
                                    className="h-auto w-285 object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.22)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex h-full w-full flex-col bg-[#17356b] px-4 py-4 md:w-[32%] md:min-w-75 md:max-w-95">
                    <div className="mb-4 block pt-3 md:hidden">
                        <h1 className="text-center text-3xl font-bold text-white">Choice your Roll</h1>
                    </div>
                    <div className="grid flex-1 grid-rows-3 gap-4 py-2">
                        {panels.map((elem,idx)=>{
                            return <Panel key={idx} panel={elem}/>
                        })}
                    </div>
                    <div className="hidden">
                        <Outlet />
                    </div>
                </div>
            </div>

            <div className="hidden">
                <Outlet />
            </div>
        </div>
    )
}

export default Home;
