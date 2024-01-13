import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'

function GetStarted() {
    return (
        <div className='flex flex-col items-center justify-center max-w-screen-lg  mx-auto my-24 '>
            <div className="relative">
                <div
                    className="absolute -inset-2 rounded-full bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-blue-600 to-purple-300 opacity-10 blur-2xl"
                ></div>
                <div className="relative flex flex-col w-full h-64 items-center justify-center   rounded-lg  text-5xl font-bold">
                    Get Started Today
                    <Button className='mt-8 bg-gradient-to-r from-purple-600 to-red-400 text-black'>
                        Try now <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default GetStarted
