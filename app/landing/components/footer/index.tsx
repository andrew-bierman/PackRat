import React from 'react'
import FooterNavigations from './navigations'
import FooterBrand from './footerBrand'
import FooterRights from './footerRights'

function Footer() {
    return (
        <div>
            <footer className="px-4 divide-y border-t-2">
                <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                    <FooterBrand />
                    <FooterNavigations />
                </div>
                <FooterRights />
            </footer>
        </div>
    )
}

export default Footer