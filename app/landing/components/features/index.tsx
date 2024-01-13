import { FeatureCard } from "./featureCard"
import { NeglectCard } from "./neglectCard"

function Features() {
    return (
        <div>
            <div className="flex flex-col p-8 mt-14 mx-auto max-w-screen-lg">
                <div className="text-center">
                    <h2 className="text-4xl font-bold"><span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"></span>Arsenal of Features</h2>
                    <p className="text-xl max-w-lg text-center mx-auto mt-6 text-muted-foreground mb-2">
                        Our tool is engineered to seamlessly integrate into your adventure rhythm with unmatched precision. Behold the detailed strategy map for extended outdoor excursions.
                    </p>
                </div>
                <FeatureCard />
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailedFeatureOne />
                    <DetailedFeatureOne />
                </div> */}
                <NeglectCard />
            </div>
        </div>
    )
}

export default Features