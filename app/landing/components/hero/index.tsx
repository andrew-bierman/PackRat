import { Button } from "@/components/ui/button"
import Featured from "./featured"
import { HeroTitle, heroCTA, heroDescription, heroDetailedDescription } from "../../constant"

function HeroSection() {
    return (
        <div>
            <div className="px-8 py-12">
                <div className="flex flex-col items-center text-center">
                    <div className="text-center py-2 px-4">
                        <div className=" flex justify-center items-center border border-primary rounded-xl p-1 max-w-fit ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 ml-1 animate-pulse">
                                <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
                                <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
                            </svg>
                            <span className="text-xs font-semibold mr-2 ">{HeroTitle}</span>
                        </div>
                    </div>
                    <h1 className="mt-4 text-7xl font-bold max-w-lg mx-auto">{heroDescription.firstLine}<br />
                        <span className=" bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-400">{heroDescription.secondLineWithGradient}</span> <br /><span className="">{heroDescription.thirdLine}<span className=" bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"> {heroDescription.thirdLineWithGradient}</span></span></h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">{heroDetailedDescription}</p>
                    <div className="mt-8 flex justify-center">
                        <Button className="mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                            </svg>
                            {heroCTA[1].title}</Button>
                        <Button className="bg-gradient-to-r from-purple-600 to-red-400 text-black font-bold">
                            {heroCTA[0].title} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
            <Featured />
        </div>
    )
}

export default HeroSection