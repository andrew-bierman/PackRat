import PackRatPreview from 'app/assets/PackRat Preview.jpg';
import PackRatPreviewLeft from 'app/assets/PackRat Preview_Left.jpg';
import PackRatPreview_Right from 'app/assets/PackRat Preview_Right.jpg';

export const FAQ_ITEMS = [
  {
    index: 0,
    title: 'Create and manage trips',
    content:
      'Easily create new trips and manage existing ones by adding details such as dates, locations, and activities.',
    iconName: 'directions',
    frameLink: PackRatPreview,
  },
  {
    index: 1,
    title: 'Map integration with route planning',
    content:
      'PackRat integrates with OpenStreetMap to provide users with accurate maps and directions to their destinations.',
    iconName: 'map',
    frameLink: PackRatPreviewLeft,

  },
  {
    index: 2,
    title: 'Activity suggestions',
    content:
      'The app suggests popular outdoor activities based on the location and season of the trip.',
    iconName: 'landscape',
    frameLink: PackRatPreview_Right,

  },
  {
    index: 3,
    title: 'Packing list',
    content:
      'Users can create and manage packing lists for their trips to ensure they have everything they need.',
    iconName: 'backpack',
    frameLink: PackRatPreview,

  },
  {
    index: 4,
    title: 'Weather forecast',
    content:
      'PackRat provides up-to-date weather forecasts for the trip location to help users prepare accordingly.',
    iconName: 'wb-sunny',
    frameLink: PackRatPreviewLeft,
  },
  {
    index: 5,
    title: 'Save your hikes and packs, and sync between devices',
    content:
      'User authentication ensures privacy and data security, while enabling you to save and sync your hikes and packs between devices.',
    iconName: 'lock',
    frameLink: PackRatPreview_Right,

  },
];
