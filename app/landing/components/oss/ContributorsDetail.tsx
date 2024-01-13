import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { LinkIcon } from "lucide-react"

export function ContributorsDetail({ contributor, index }: { contributor: any, index: number }) {
    return (
        <HoverCard key={index}>
            <HoverCardTrigger asChild>
                <div className="rounded-full overflow-hidden h-24 w-24">
                    <img src={contributor.imgUrl} alt={contributor.name} className="object-cover object-center w-full h-full" />
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage src={contributor.imgUrl} />
                        <AvatarFallback>{contributor.name}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{contributor.name} - {contributor.role}</h4>
                        <p className="text-sm text-muted-foreground">
                            {contributor.description}
                        </p>
                        <div className="flex items-center pt-2">
                            <LinkIcon className="mr-2 h-4 w-4 opacity-70" />
                            <a href={contributor.link} className="text-xs text-blue-500">
                                {contributor.link}
                            </a>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}