export function ExtendedFeatureCard({ title, description, Icon }: { title: string, description: string, Icon: React.JSXElementConstructor<any> }) {
    return (
        <div className="overflow-hidden rounded-lg border p-8 items-center justify-center flex flex-col">
            <div className="shadow-lg border self-start mb-2 p-2 rounded-md">
                <Icon className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="self-start mb-2">{title}</span>
            <p className="self-start text-muted-foreground">{description}</p>
        </div>
    )
}