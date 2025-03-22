/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const TripsIndexLazyImport = createFileRoute('/trips/')()
const SignInIndexLazyImport = createFileRoute('/sign-in/')()
const RegisterIndexLazyImport = createFileRoute('/register/')()
const ProfileIndexLazyImport = createFileRoute('/profile/')()
const ProductsIndexLazyImport = createFileRoute('/products/')()
const PrivacyIndexLazyImport = createFileRoute('/privacy/')()
const PasswordResetIndexLazyImport = createFileRoute('/password-reset/')()
const PacksIndexLazyImport = createFileRoute('/packs/')()
const PackTemplatesIndexLazyImport = createFileRoute('/pack-templates/')()
const MapsIndexLazyImport = createFileRoute('/maps/')()
const MapIndexLazyImport = createFileRoute('/map/')()
const ItemsIndexLazyImport = createFileRoute('/items/')()
const FeedIndexLazyImport = createFileRoute('/feed/')()
const DashboardIndexLazyImport = createFileRoute('/dashboard/')()
const AppearanceIndexLazyImport = createFileRoute('/appearance/')()
const AboutIndexLazyImport = createFileRoute('/about/')()
const TripCreateLazyImport = createFileRoute('/trip/create')()
const TripTripIdLazyImport = createFileRoute('/trip/$tripId')()
const ProfileIdLazyImport = createFileRoute('/profile/$id')()
const PackCreateLazyImport = createFileRoute('/pack/create')()
const PackIdLazyImport = createFileRoute('/pack/$id')()
const PackTemplatesIdLazyImport = createFileRoute('/pack-templates/$id')()
const ItemItemIdLazyImport = createFileRoute('/item/$itemId')()
const DestinationQueryLazyImport = createFileRoute('/destination/query')()
const ProfileSettingsIndexLazyImport = createFileRoute('/profile/settings/')()

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TripsIndexLazyRoute = TripsIndexLazyImport.update({
  id: '/trips/',
  path: '/trips/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/trips/index.lazy').then((d) => d.Route))

const SignInIndexLazyRoute = SignInIndexLazyImport.update({
  id: '/sign-in/',
  path: '/sign-in/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/sign-in/index.lazy').then((d) => d.Route))

const RegisterIndexLazyRoute = RegisterIndexLazyImport.update({
  id: '/register/',
  path: '/register/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/register/index.lazy').then((d) => d.Route),
)

const ProfileIndexLazyRoute = ProfileIndexLazyImport.update({
  id: '/profile/',
  path: '/profile/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile/index.lazy').then((d) => d.Route))

const ProductsIndexLazyRoute = ProductsIndexLazyImport.update({
  id: '/products/',
  path: '/products/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/products/index.lazy').then((d) => d.Route),
)

const PrivacyIndexLazyRoute = PrivacyIndexLazyImport.update({
  id: '/privacy/',
  path: '/privacy/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/privacy/index.lazy').then((d) => d.Route))

const PasswordResetIndexLazyRoute = PasswordResetIndexLazyImport.update({
  id: '/password-reset/',
  path: '/password-reset/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/password-reset/index.lazy').then((d) => d.Route),
)

const PacksIndexLazyRoute = PacksIndexLazyImport.update({
  id: '/packs/',
  path: '/packs/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/packs/index.lazy').then((d) => d.Route))

const PackTemplatesIndexLazyRoute = PackTemplatesIndexLazyImport.update({
  id: '/pack-templates/',
  path: '/pack-templates/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/pack-templates/index.lazy').then((d) => d.Route),
)

const MapsIndexLazyRoute = MapsIndexLazyImport.update({
  id: '/maps/',
  path: '/maps/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/maps/index.lazy').then((d) => d.Route))

const MapIndexLazyRoute = MapIndexLazyImport.update({
  id: '/map/',
  path: '/map/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/map/index.lazy').then((d) => d.Route))

const ItemsIndexLazyRoute = ItemsIndexLazyImport.update({
  id: '/items/',
  path: '/items/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/items/index.lazy').then((d) => d.Route))

const FeedIndexLazyRoute = FeedIndexLazyImport.update({
  id: '/feed/',
  path: '/feed/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/feed/index.lazy').then((d) => d.Route))

const DashboardIndexLazyRoute = DashboardIndexLazyImport.update({
  id: '/dashboard/',
  path: '/dashboard/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/dashboard/index.lazy').then((d) => d.Route),
)

const AppearanceIndexLazyRoute = AppearanceIndexLazyImport.update({
  id: '/appearance/',
  path: '/appearance/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/appearance/index.lazy').then((d) => d.Route),
)

const AboutIndexLazyRoute = AboutIndexLazyImport.update({
  id: '/about/',
  path: '/about/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about/index.lazy').then((d) => d.Route))

const TripCreateLazyRoute = TripCreateLazyImport.update({
  id: '/trip/create',
  path: '/trip/create',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/trip/create.lazy').then((d) => d.Route))

const TripTripIdLazyRoute = TripTripIdLazyImport.update({
  id: '/trip/$tripId',
  path: '/trip/$tripId',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/trip/$tripId.lazy').then((d) => d.Route))

const ProfileIdLazyRoute = ProfileIdLazyImport.update({
  id: '/profile/$id',
  path: '/profile/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile/$id.lazy').then((d) => d.Route))

const PackCreateLazyRoute = PackCreateLazyImport.update({
  id: '/pack/create',
  path: '/pack/create',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/pack/create.lazy').then((d) => d.Route))

const PackIdLazyRoute = PackIdLazyImport.update({
  id: '/pack/$id',
  path: '/pack/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/pack/$id.lazy').then((d) => d.Route))

const PackTemplatesIdLazyRoute = PackTemplatesIdLazyImport.update({
  id: '/pack-templates/$id',
  path: '/pack-templates/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/pack-templates/$id.lazy').then((d) => d.Route),
)

const ItemItemIdLazyRoute = ItemItemIdLazyImport.update({
  id: '/item/$itemId',
  path: '/item/$itemId',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/item/$itemId.lazy').then((d) => d.Route))

const DestinationQueryLazyRoute = DestinationQueryLazyImport.update({
  id: '/destination/query',
  path: '/destination/query',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/destination/query.lazy').then((d) => d.Route),
)

const ProfileSettingsIndexLazyRoute = ProfileSettingsIndexLazyImport.update({
  id: '/profile/settings/',
  path: '/profile/settings/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/profile/settings/index.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/destination/query': {
      id: '/destination/query'
      path: '/destination/query'
      fullPath: '/destination/query'
      preLoaderRoute: typeof DestinationQueryLazyImport
      parentRoute: typeof rootRoute
    }
    '/item/$itemId': {
      id: '/item/$itemId'
      path: '/item/$itemId'
      fullPath: '/item/$itemId'
      preLoaderRoute: typeof ItemItemIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/pack-templates/$id': {
      id: '/pack-templates/$id'
      path: '/pack-templates/$id'
      fullPath: '/pack-templates/$id'
      preLoaderRoute: typeof PackTemplatesIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/pack/$id': {
      id: '/pack/$id'
      path: '/pack/$id'
      fullPath: '/pack/$id'
      preLoaderRoute: typeof PackIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/pack/create': {
      id: '/pack/create'
      path: '/pack/create'
      fullPath: '/pack/create'
      preLoaderRoute: typeof PackCreateLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile/$id': {
      id: '/profile/$id'
      path: '/profile/$id'
      fullPath: '/profile/$id'
      preLoaderRoute: typeof ProfileIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/trip/$tripId': {
      id: '/trip/$tripId'
      path: '/trip/$tripId'
      fullPath: '/trip/$tripId'
      preLoaderRoute: typeof TripTripIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/trip/create': {
      id: '/trip/create'
      path: '/trip/create'
      fullPath: '/trip/create'
      preLoaderRoute: typeof TripCreateLazyImport
      parentRoute: typeof rootRoute
    }
    '/about/': {
      id: '/about/'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/appearance/': {
      id: '/appearance/'
      path: '/appearance'
      fullPath: '/appearance'
      preLoaderRoute: typeof AppearanceIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/feed/': {
      id: '/feed/'
      path: '/feed'
      fullPath: '/feed'
      preLoaderRoute: typeof FeedIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/items/': {
      id: '/items/'
      path: '/items'
      fullPath: '/items'
      preLoaderRoute: typeof ItemsIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/map/': {
      id: '/map/'
      path: '/map'
      fullPath: '/map'
      preLoaderRoute: typeof MapIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/maps/': {
      id: '/maps/'
      path: '/maps'
      fullPath: '/maps'
      preLoaderRoute: typeof MapsIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/pack-templates/': {
      id: '/pack-templates/'
      path: '/pack-templates'
      fullPath: '/pack-templates'
      preLoaderRoute: typeof PackTemplatesIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/packs/': {
      id: '/packs/'
      path: '/packs'
      fullPath: '/packs'
      preLoaderRoute: typeof PacksIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/password-reset/': {
      id: '/password-reset/'
      path: '/password-reset'
      fullPath: '/password-reset'
      preLoaderRoute: typeof PasswordResetIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/privacy/': {
      id: '/privacy/'
      path: '/privacy'
      fullPath: '/privacy'
      preLoaderRoute: typeof PrivacyIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/products/': {
      id: '/products/'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductsIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile/': {
      id: '/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/register/': {
      id: '/register/'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/sign-in/': {
      id: '/sign-in/'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/trips/': {
      id: '/trips/'
      path: '/trips'
      fullPath: '/trips'
      preLoaderRoute: typeof TripsIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile/settings/': {
      id: '/profile/settings/'
      path: '/profile/settings'
      fullPath: '/profile/settings'
      preLoaderRoute: typeof ProfileSettingsIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/destination/query': typeof DestinationQueryLazyRoute
  '/item/$itemId': typeof ItemItemIdLazyRoute
  '/pack-templates/$id': typeof PackTemplatesIdLazyRoute
  '/pack/$id': typeof PackIdLazyRoute
  '/pack/create': typeof PackCreateLazyRoute
  '/profile/$id': typeof ProfileIdLazyRoute
  '/trip/$tripId': typeof TripTripIdLazyRoute
  '/trip/create': typeof TripCreateLazyRoute
  '/about': typeof AboutIndexLazyRoute
  '/appearance': typeof AppearanceIndexLazyRoute
  '/dashboard': typeof DashboardIndexLazyRoute
  '/feed': typeof FeedIndexLazyRoute
  '/items': typeof ItemsIndexLazyRoute
  '/map': typeof MapIndexLazyRoute
  '/maps': typeof MapsIndexLazyRoute
  '/pack-templates': typeof PackTemplatesIndexLazyRoute
  '/packs': typeof PacksIndexLazyRoute
  '/password-reset': typeof PasswordResetIndexLazyRoute
  '/privacy': typeof PrivacyIndexLazyRoute
  '/products': typeof ProductsIndexLazyRoute
  '/profile': typeof ProfileIndexLazyRoute
  '/register': typeof RegisterIndexLazyRoute
  '/sign-in': typeof SignInIndexLazyRoute
  '/trips': typeof TripsIndexLazyRoute
  '/profile/settings': typeof ProfileSettingsIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/destination/query': typeof DestinationQueryLazyRoute
  '/item/$itemId': typeof ItemItemIdLazyRoute
  '/pack-templates/$id': typeof PackTemplatesIdLazyRoute
  '/pack/$id': typeof PackIdLazyRoute
  '/pack/create': typeof PackCreateLazyRoute
  '/profile/$id': typeof ProfileIdLazyRoute
  '/trip/$tripId': typeof TripTripIdLazyRoute
  '/trip/create': typeof TripCreateLazyRoute
  '/about': typeof AboutIndexLazyRoute
  '/appearance': typeof AppearanceIndexLazyRoute
  '/dashboard': typeof DashboardIndexLazyRoute
  '/feed': typeof FeedIndexLazyRoute
  '/items': typeof ItemsIndexLazyRoute
  '/map': typeof MapIndexLazyRoute
  '/maps': typeof MapsIndexLazyRoute
  '/pack-templates': typeof PackTemplatesIndexLazyRoute
  '/packs': typeof PacksIndexLazyRoute
  '/password-reset': typeof PasswordResetIndexLazyRoute
  '/privacy': typeof PrivacyIndexLazyRoute
  '/products': typeof ProductsIndexLazyRoute
  '/profile': typeof ProfileIndexLazyRoute
  '/register': typeof RegisterIndexLazyRoute
  '/sign-in': typeof SignInIndexLazyRoute
  '/trips': typeof TripsIndexLazyRoute
  '/profile/settings': typeof ProfileSettingsIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/destination/query': typeof DestinationQueryLazyRoute
  '/item/$itemId': typeof ItemItemIdLazyRoute
  '/pack-templates/$id': typeof PackTemplatesIdLazyRoute
  '/pack/$id': typeof PackIdLazyRoute
  '/pack/create': typeof PackCreateLazyRoute
  '/profile/$id': typeof ProfileIdLazyRoute
  '/trip/$tripId': typeof TripTripIdLazyRoute
  '/trip/create': typeof TripCreateLazyRoute
  '/about/': typeof AboutIndexLazyRoute
  '/appearance/': typeof AppearanceIndexLazyRoute
  '/dashboard/': typeof DashboardIndexLazyRoute
  '/feed/': typeof FeedIndexLazyRoute
  '/items/': typeof ItemsIndexLazyRoute
  '/map/': typeof MapIndexLazyRoute
  '/maps/': typeof MapsIndexLazyRoute
  '/pack-templates/': typeof PackTemplatesIndexLazyRoute
  '/packs/': typeof PacksIndexLazyRoute
  '/password-reset/': typeof PasswordResetIndexLazyRoute
  '/privacy/': typeof PrivacyIndexLazyRoute
  '/products/': typeof ProductsIndexLazyRoute
  '/profile/': typeof ProfileIndexLazyRoute
  '/register/': typeof RegisterIndexLazyRoute
  '/sign-in/': typeof SignInIndexLazyRoute
  '/trips/': typeof TripsIndexLazyRoute
  '/profile/settings/': typeof ProfileSettingsIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/destination/query'
    | '/item/$itemId'
    | '/pack-templates/$id'
    | '/pack/$id'
    | '/pack/create'
    | '/profile/$id'
    | '/trip/$tripId'
    | '/trip/create'
    | '/about'
    | '/appearance'
    | '/dashboard'
    | '/feed'
    | '/items'
    | '/map'
    | '/maps'
    | '/pack-templates'
    | '/packs'
    | '/password-reset'
    | '/privacy'
    | '/products'
    | '/profile'
    | '/register'
    | '/sign-in'
    | '/trips'
    | '/profile/settings'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/destination/query'
    | '/item/$itemId'
    | '/pack-templates/$id'
    | '/pack/$id'
    | '/pack/create'
    | '/profile/$id'
    | '/trip/$tripId'
    | '/trip/create'
    | '/about'
    | '/appearance'
    | '/dashboard'
    | '/feed'
    | '/items'
    | '/map'
    | '/maps'
    | '/pack-templates'
    | '/packs'
    | '/password-reset'
    | '/privacy'
    | '/products'
    | '/profile'
    | '/register'
    | '/sign-in'
    | '/trips'
    | '/profile/settings'
  id:
    | '__root__'
    | '/'
    | '/destination/query'
    | '/item/$itemId'
    | '/pack-templates/$id'
    | '/pack/$id'
    | '/pack/create'
    | '/profile/$id'
    | '/trip/$tripId'
    | '/trip/create'
    | '/about/'
    | '/appearance/'
    | '/dashboard/'
    | '/feed/'
    | '/items/'
    | '/map/'
    | '/maps/'
    | '/pack-templates/'
    | '/packs/'
    | '/password-reset/'
    | '/privacy/'
    | '/products/'
    | '/profile/'
    | '/register/'
    | '/sign-in/'
    | '/trips/'
    | '/profile/settings/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DestinationQueryLazyRoute: typeof DestinationQueryLazyRoute
  ItemItemIdLazyRoute: typeof ItemItemIdLazyRoute
  PackTemplatesIdLazyRoute: typeof PackTemplatesIdLazyRoute
  PackIdLazyRoute: typeof PackIdLazyRoute
  PackCreateLazyRoute: typeof PackCreateLazyRoute
  ProfileIdLazyRoute: typeof ProfileIdLazyRoute
  TripTripIdLazyRoute: typeof TripTripIdLazyRoute
  TripCreateLazyRoute: typeof TripCreateLazyRoute
  AboutIndexLazyRoute: typeof AboutIndexLazyRoute
  AppearanceIndexLazyRoute: typeof AppearanceIndexLazyRoute
  DashboardIndexLazyRoute: typeof DashboardIndexLazyRoute
  FeedIndexLazyRoute: typeof FeedIndexLazyRoute
  ItemsIndexLazyRoute: typeof ItemsIndexLazyRoute
  MapIndexLazyRoute: typeof MapIndexLazyRoute
  MapsIndexLazyRoute: typeof MapsIndexLazyRoute
  PackTemplatesIndexLazyRoute: typeof PackTemplatesIndexLazyRoute
  PacksIndexLazyRoute: typeof PacksIndexLazyRoute
  PasswordResetIndexLazyRoute: typeof PasswordResetIndexLazyRoute
  PrivacyIndexLazyRoute: typeof PrivacyIndexLazyRoute
  ProductsIndexLazyRoute: typeof ProductsIndexLazyRoute
  ProfileIndexLazyRoute: typeof ProfileIndexLazyRoute
  RegisterIndexLazyRoute: typeof RegisterIndexLazyRoute
  SignInIndexLazyRoute: typeof SignInIndexLazyRoute
  TripsIndexLazyRoute: typeof TripsIndexLazyRoute
  ProfileSettingsIndexLazyRoute: typeof ProfileSettingsIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DestinationQueryLazyRoute: DestinationQueryLazyRoute,
  ItemItemIdLazyRoute: ItemItemIdLazyRoute,
  PackTemplatesIdLazyRoute: PackTemplatesIdLazyRoute,
  PackIdLazyRoute: PackIdLazyRoute,
  PackCreateLazyRoute: PackCreateLazyRoute,
  ProfileIdLazyRoute: ProfileIdLazyRoute,
  TripTripIdLazyRoute: TripTripIdLazyRoute,
  TripCreateLazyRoute: TripCreateLazyRoute,
  AboutIndexLazyRoute: AboutIndexLazyRoute,
  AppearanceIndexLazyRoute: AppearanceIndexLazyRoute,
  DashboardIndexLazyRoute: DashboardIndexLazyRoute,
  FeedIndexLazyRoute: FeedIndexLazyRoute,
  ItemsIndexLazyRoute: ItemsIndexLazyRoute,
  MapIndexLazyRoute: MapIndexLazyRoute,
  MapsIndexLazyRoute: MapsIndexLazyRoute,
  PackTemplatesIndexLazyRoute: PackTemplatesIndexLazyRoute,
  PacksIndexLazyRoute: PacksIndexLazyRoute,
  PasswordResetIndexLazyRoute: PasswordResetIndexLazyRoute,
  PrivacyIndexLazyRoute: PrivacyIndexLazyRoute,
  ProductsIndexLazyRoute: ProductsIndexLazyRoute,
  ProfileIndexLazyRoute: ProfileIndexLazyRoute,
  RegisterIndexLazyRoute: RegisterIndexLazyRoute,
  SignInIndexLazyRoute: SignInIndexLazyRoute,
  TripsIndexLazyRoute: TripsIndexLazyRoute,
  ProfileSettingsIndexLazyRoute: ProfileSettingsIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/destination/query",
        "/item/$itemId",
        "/pack-templates/$id",
        "/pack/$id",
        "/pack/create",
        "/profile/$id",
        "/trip/$tripId",
        "/trip/create",
        "/about/",
        "/appearance/",
        "/dashboard/",
        "/feed/",
        "/items/",
        "/map/",
        "/maps/",
        "/pack-templates/",
        "/packs/",
        "/password-reset/",
        "/privacy/",
        "/products/",
        "/profile/",
        "/register/",
        "/sign-in/",
        "/trips/",
        "/profile/settings/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/destination/query": {
      "filePath": "destination/query.lazy.tsx"
    },
    "/item/$itemId": {
      "filePath": "item/$itemId.lazy.tsx"
    },
    "/pack-templates/$id": {
      "filePath": "pack-templates/$id.lazy.tsx"
    },
    "/pack/$id": {
      "filePath": "pack/$id.lazy.tsx"
    },
    "/pack/create": {
      "filePath": "pack/create.lazy.tsx"
    },
    "/profile/$id": {
      "filePath": "profile/$id.lazy.tsx"
    },
    "/trip/$tripId": {
      "filePath": "trip/$tripId.lazy.tsx"
    },
    "/trip/create": {
      "filePath": "trip/create.lazy.tsx"
    },
    "/about/": {
      "filePath": "about/index.lazy.tsx"
    },
    "/appearance/": {
      "filePath": "appearance/index.lazy.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.lazy.tsx"
    },
    "/feed/": {
      "filePath": "feed/index.lazy.tsx"
    },
    "/items/": {
      "filePath": "items/index.lazy.tsx"
    },
    "/map/": {
      "filePath": "map/index.lazy.tsx"
    },
    "/maps/": {
      "filePath": "maps/index.lazy.tsx"
    },
    "/pack-templates/": {
      "filePath": "pack-templates/index.lazy.tsx"
    },
    "/packs/": {
      "filePath": "packs/index.lazy.tsx"
    },
    "/password-reset/": {
      "filePath": "password-reset/index.lazy.tsx"
    },
    "/privacy/": {
      "filePath": "privacy/index.lazy.tsx"
    },
    "/products/": {
      "filePath": "products/index.lazy.tsx"
    },
    "/profile/": {
      "filePath": "profile/index.lazy.tsx"
    },
    "/register/": {
      "filePath": "register/index.lazy.tsx"
    },
    "/sign-in/": {
      "filePath": "sign-in/index.lazy.tsx"
    },
    "/trips/": {
      "filePath": "trips/index.lazy.tsx"
    },
    "/profile/settings/": {
      "filePath": "profile/settings/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
