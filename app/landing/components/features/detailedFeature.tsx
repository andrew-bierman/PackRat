import { BusIcon, GithubIcon, TriangleIcon } from "lucide-react"

export function DetailedFeatureOne() {
    return (
        <div className="overflow-hidden ">
            <div className="border flex justify-center items-center flex-col p-4 rounded-lg ">
                <h2 className="text-2xl font-bold mb-2 self-start">Lorem ipsum dolor sit </h2>
                <p className="mb-6 self-start text-muted-foreground max-w-screen-sm">amet consectetur adipisicing elit. Beatae laborum unde provident </p>
                <div className="flex justify-center space-x-4 my-6 group">
                    <div className="w-20 h-20  rounded-lg flex items-center justify-center shadow-lg border group-hover:border-red-500">
                        <BusIcon className="w-8 h-8 " />
                    </div>
                    <div className="w-20 h-20  rounded-lg flex items-center justify-center shadow-lg border group-hover:border-blue-500">
                        <GithubIcon className="w-8 h-8 " />
                    </div>
                    <div className="w-20 h-20  rounded-lg flex items-center justify-center shadow-lg border group-hover:border-yellow-500">
                        <TriangleIcon className="w-8 h-8 " />
                    </div>
                </div>
            </div>
        </div>
    )
}