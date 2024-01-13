export function NeglectCard() {
    return (
        <div className="overflow-hidden rounded-lg border  shadow-md p-6 md:flex items-center justify-between mt-4">
            <div className="flex-shrink-0 text-9xl ml-8">
                🎒
            </div>
            <div className="flex flex-col space-y-4 md:w-3/4">
                <h3 className="text-2xl font-semibold ">What does PackRat do?</h3>
                <ul className="text-base list-none">
                    users can create new trips and manage existing ones by adding details such as dates, locations, and activities.PackRat integrates with Mapbox to provide users with accurate maps and directions to their destinations.the app suggests popular outdoor activities based on the location and season of the trip.users can create and manage packing lists for their trips to ensure they have everything they need.PackRat provides up-to-date weather forecasts for the trip location to help users prepare accordingly.
                </ul>
            </div>
        </div>
    )
}