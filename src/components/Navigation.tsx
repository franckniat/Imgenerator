import { Moon, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"

export default function Navigation() {
    const {theme, setTheme} = useTheme();
  return (
    <nav className="w-full fixed top-0 bg-white dark:bg-neutral-900">
        <div className="max-w-[500px] mx-auto px-3">
            <div className="flex items-center justify-between h-[65px]">
                <h1 className="text-2xl font-bold">Image Generator</h1>
                <button 
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                    className="p-2 rounded-full relative">
                    <SunMedium size={20} className="absolute scale-100 dark:scale-0 transition-all rotate-0 dark:rotate-45"/>
                    <Moon size={20} className=" scale-0 dark:scale-100 transition-all rotate-45 dark:rotate-0"/>
                </button>
            </div>
        </div>
    </nav>
  )
}
