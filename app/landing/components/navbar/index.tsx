"use client"
import { ModeToggle } from '@/components/mode-toggle'
import Image from 'next/image'
import packratIcon from '../../assets/packrat_icon.png'
import { NavigationList } from './navigationList'
import { LogoTitle } from '../../constant'
import { CTANav } from './NavbarCTA'

export function NavBar() {
    return (
        <div className='flex items-center justify-between bg-gradient max-w-screen-xl mx-auto'>
            <div className='flex items-center'>
                <p className=''>
                    <Image src={packratIcon} alt="" className='w-16 h-16' width={100} height={100} />
                </p>
                <h1 className='text-gradient text-2xl font-serif'>{LogoTitle}</h1>
            </div>
            <NavigationList />
            <div className='flex gap-4'>
                <CTANav />
                <ModeToggle />
            </div>
        </div>
    )
}
