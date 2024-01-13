import React from 'react'
import ImageCloud from './imageCloud'

function OSS() {
    return (
        <div>
            <div className="p-10 max-w-screen-lg mx-auto mb-20">
                <h1 className="text-4xl font-bold mb-6 text-center">Free and <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-400'>Open-Source</span></h1>
                <h2 className="text-2xl mb-4 text-center">Built by the community</h2>
                <p className="mb-10 text-center">PackRat welcomes contributions from developers around the world</p>
                <ImageCloud />
                {/* <h2 className="text-xl font-bold mb-4 text-center">Sponsors and backers</h2>
                <div className="grid grid-cols-8 gap-4">
                    <div className="rounded-full overflow-hidden h-12 w-12">
                        <img src="https://avatars.githubusercontent.com/u/94939237?s=64&v=4" alt="Sponsor" className="object-cover object-center w-full h-full" />
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default OSS
