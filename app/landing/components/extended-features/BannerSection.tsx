import packrat_map from '../../assets/packrat_map.png'
import Image from "next/image"

export function BannerSection() {
    return (
        <div className="flex border-2 border-accent rounded-lg mb-8">
            <Image src={packrat_map} alt="" />
        </div>
    )
}