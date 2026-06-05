import { Mr_Dafoe, WindSong, Zeyada } from "next/font/google";
import { BsInstagram } from "react-icons/bs";

const zeyada = Zeyada({
    variable: "--zeyada",
    subsets: ["latin"],
    weight: ['400'],
});

const dafoe = Mr_Dafoe({
    variable: "--dafoe",
    subsets: ['latin'],
    weight: ['400'],
})

const wind = WindSong({
    variable:"--wind",
    subsets:['latin'],
    weight:['400'],
});

interface NavbarProps {
    isNight?: boolean;
    isAboutVisible?: boolean;
}

export default function Navbar({
    isNight = false,
    isAboutVisible = false,
}: NavbarProps) {
    // If about is visible, we always want dark text to contrast with the light cream background.
    const isDarkText = isAboutVisible || !isNight;
    const textColor = isDarkText ? "text-black" : "text-white";
    const borderColor = isDarkText ? "border-black" : "border-white/50";
    const bgColor = isDarkText ? "bg-black" : "bg-white";
    const bgTextColor = isDarkText ? "text-white" : "text-black";

    return (
        <header className={`absolute top-0 left-0 z-50 flex w-full items-start justify-between px-10 py-8 transition-colors duration-500 ${textColor}`}>
            
            {/* LEFT: Logo */}
            <div className="flex flex-col items-center justify-center">
                <p className={`${wind.className} text-5xl tracking-wide`}>maikanshi</p>
                <p className="font-mono text-[0.6rem] tracking-[0.2em] mt-1">*m*</p>
            </div>

            {/* MIDDLE: Tagline */}
            <div className="hidden md:flex items-center pt-3">
                <p className={`text-[0.65rem] font-mono tracking-[0.2em] uppercase font-bold`}>
                    natural beauty from sake treasures
                </p>
            </div>

            {/* RIGHT: Navigation Buttons */}
            <div className="flex items-center gap-3 pt-1">
                <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('toggleAboutSection'))}
                    className={`font-mono border ${borderColor} px-6 py-2 text-[0.65rem] tracking-[0.15em] hover:bg-black/5 transition-colors`}
                    style={{ clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)" }}
                >
                    ABOUT
                </button>
                <button 
                    className={`font-mono border ${borderColor} px-6 py-2 text-[0.65rem] tracking-[0.15em] hover:bg-black/5 transition-colors`}
                    style={{ clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)" }}
                >
                    CONTACT US
                </button>

                <button 
                    className={`font-mono border ${borderColor} px-4 py-2 flex items-center justify-center text-[0.8rem] hover:bg-black/5 transition-colors`}
                    style={{ clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)" }}
                >
                    <BsInstagram/>
                </button>

                <button 
                    className={`font-mono ${bgColor} ${bgTextColor} px-6 py-2 text-[0.65rem] tracking-[0.15em] hover:opacity-80 transition-opacity`}
                    style={{ clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)" }}
                >
                    SHOP HAND-CARE
                </button>
            </div>
        </header>
    )
}