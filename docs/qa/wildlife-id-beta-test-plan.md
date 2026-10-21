# Wildlife ID: beta tester guide

Wildlife ID names a plant or animal from a photo. Recognition runs on the phone or Mac itself, so it is meant to work just as well with no signal as with full coverage. This round covers iPhone, Mac and Android.

The iPhone and Mac builds come from TestFlight. The Android build is an APK on the GitHub release page.

The feature should feel the same on all three. It is worth reporting where it does not.

## Before you start

This release covers Wildlife ID, plus two Android fixes described in the Android section.

The app currently knows 22 species, mostly North American: American Black Bear, American Robin, Bald Eagle, Common Blue Violet, Common Eastern Firefly, Coyote, Death Cap, Eastern Garter Snake, Eastern Gray Squirrel, Eastern White Pine, Golden Chanterelle, Great Horned Owl, Monarch Butterfly, Ostrich Fern (Fiddlehead), Painted Turtle, Poison Ivy, Raccoon, Ruby-throated Hummingbird, Sugar Maple, White Trillium, White-tailed Deer and Wild Blackberry. If none of these live near you, pull up a clear photo of one on a laptop or another phone and point the camera at that screen. Save a few of those photos to your library too, for the library tests.

## iPhone

Install the update from TestFlight.

Open Home and tap Wildlife. The screen is titled Wildlife ID, with Take Photo and Choose Photo near the top and Sightings in the top corner.

### Identifying

- Tap Take Photo and photograph one of the 22 species. Expect a short "Identifying…" and then a list under "Ranked matches", with the right species at or near the top.
- Look at the top match. Expect a name, a percentage like "87% confident", a safety rating of Safe, Caution or Dangerous, and the words "On this device".
- Open the top match. Expect Habitat, How to tell and Conservation status to be filled in, not blank.
- Choose Photo and pick one of the species photos from your library. Expect the same kind of result as with the camera.
- Photograph the same subject from a few angles. The top match should stay reasonably steady instead of jumping between unrelated species.
- Tap Identify another. Expect to be back at the start with the old result cleared.

### Safety

- Identify Death Cap, Poison Ivy or American Black Bear. Expect "Safety rating: Dangerous", shown so it stands out from the rest of the result.
- Identify Coyote or Raccoon. Expect Caution.
- Look below the matches. Expect the note that starts "Fine-grained identification is often ambiguous", ending with the warning about eating anything.
- Photograph something that is clearly not one of the 22, like a cat, a house plant or a coffee mug. Expect "No confident match" or a weak "Possible match · 30%" style answer. It should never present that guess as a confident result.

### Sightings

- After a result, tap Save sighting. Then open Sightings. Expect the sighting there with its photo, the date and the top match.
- Open a saved sighting. Expect the ranked matches, When and Where to all be there.
- On a fresh account with nothing saved, open Sightings. Expect "No sightings yet".

### Offline

This is the main thing to test. Wildlife ID is built for places with no signal, so it has to work fully in airplane mode.

- Turn on airplane mode, open Wildlife and take a photo of one of the species. Expect a full result with "On this device", with no error about the connection and no spinner that never ends.
- Still offline, save the sighting, then open Sightings. Expect it to be listed with its photo.
- Force quit the app with airplane mode still on, reopen it and go back to Sightings. Expect every saved sighting to still be there.
- Turn airplane mode off. Expect nothing to disappear or show up twice.

## Mac

Install the Mac update from TestFlight. Wildlife is in the sidebar.

The Mac has no camera button, so use Choose Photo with the species photos from your Photos library. Run the Identifying, Safety and Sightings lists from the iPhone section with that in mind.

- Turn Wi-Fi off and identify a photo. Expect a full result with "On this device".
- Resize the window from narrow to full screen with a result showing. Expect the matches and the safety rating to stay readable, with nothing cut off or overlapping.

## Android

Open the GitHub release link on your phone, download the APK and open it. If Android asks, allow installs from your browser.

On Home, tap the Wildlife tile that says "Identify plants & animals offline". That opens the Wildlife screen with your Recent Identifications. Tap Identify Species to start one.

### Identifying

- Tap Add a Photo, choose Take Photo, and photograph one of the 22 species. Tap Identify Now. Expect "Identifying..." and then "Ranked matches", with the right species at or near the top.
- Look at the top match. Expect a percentage like "87% confident", a safe, caution or dangerous rating, and "On this device".
- Tap the top match. Expect Species Detail with Description, Characteristics, Habitat and Interesting Facts filled in.
- Add a Photo again and use Choose from Library this time. Expect the same kind of result.
- Tap Change Photo on an existing photo and identify again. Expect the old results to be replaced, not stacked under the new ones.

### Safety

- Identify Death Cap, Poison Ivy or American Black Bear. Expect it marked dangerous and easy to spot.
- Look below the matches. Expect the note that starts "Fine-grained identification is often ambiguous".
- Photograph something that is not one of the 22. Expect "No confident match" or a low "Possible match · 30%" style answer, never a confident wrong name.

### History

- Go back to Wildlife after a few identifications. Expect each one under Recent Identifications with its photo, saved without you having to do anything.
- On a fresh account, expect "No Identifications Yet" with the line "Take a photo of a plant or animal to identify it. Works offline!"

### Offline

- Turn on airplane mode and run a full identification with the camera. Expect a complete result with "On this device" and no connection error.
- Still offline, go back to Wildlife. Expect the new identification at the top of Recent Identifications.
- Swipe the app away from recents with airplane mode still on, reopen it, and check Recent Identifications. Everything should still be there.
- Turn airplane mode off. Expect nothing to vanish or duplicate.

### Also fixed in this build

- Open the Catalog, pick an item and tap Add to Pack. Tap the Category field so the keyboard comes up. Expect the field to stay visible above the keyboard while you type. Category should come pre-filled, with suggestion chips under it.
- Open the Trips tab and look at the Trail Conditions banner. Expect the arrow to sit inside the banner on the right, lined up with the text, even when the text wraps onto two lines.

## Reporting

Reports go to GitHub issues as usual. For a wrong identification, attach the photo you used and the name the app gave, and say whether you were online or in airplane mode. On iPhone, screenshot with the side button and volume up. On a Mac, press Shift, Command and 4 and drag over the window. On most Android phones, press power and volume down together.

Anything merely annoying rather than broken is still worth reporting.
