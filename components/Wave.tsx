// components/Wave.tsx
import Image from 'next/image'

export default function Wave({ color = "#0099ff", className = "" }: { color?: string, className?: string }) {
    return (
        <div className={`w-full ${className}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                <path
                    fill={color}
                    fillOpacity="1"
                    d="M0,160L30,138.7C60,117,120,75,180,69.3C240,64,300,96,360,128C420,160,480,192,540,192C600,192,660,160,720,170.7C780,181,840,235,900,218.7C960,203,1020,117,1080,106.7C1140,96,1200,160,1260,176C1320,192,1380,160,1410,144L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
                />
            </svg>
        </div>
    )
}