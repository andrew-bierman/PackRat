import Image from 'next/image'
import React from 'react'
import packrat from '../../assets/packrat_icon.png'

function FooterBrand() {
    return (
        <div className="lg:w-1/3">
            <a rel="noopener noreferrer" href="#" className="flex justify-center space-x-3 lg:justify-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full ">
                    <Image src={packrat} alt="" className='w-16 h-16' />
                </div>
                <span className="self-center text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-400">Packrat</span>
            </a>
        </div>
    )
}

export default FooterBrand