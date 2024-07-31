/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const TripsIndexLazyImport = createFileRoute('/trips/')()
const SignInIndexLazyImport = createFileRoute('/sign-in/')()
const RegisterIndexLazyImport = createFileRoute('/register/')()
const ProfileIndexLazyImport = createFileRoute('/profile/')()
const PrivacyIndexLazyImport = createFileRoute('/privacy/')()
const PasswordResetIndexLazyImport = createFileRoute('/password-reset/')()
const PacksIndexLazyImport = createFileRoute('/packs/')()
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
const DestinationQueryLazyImport = createFileRoute('/destination/query')()
const ProfileSettingsIndexLazyImport = createFileRoute('/profile/settings/')()

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TripsIndexLazyRoute = TripsIndexLazyImport.update({
  path: '/trips/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/trips/index.lazy').then((d) => d.Route))

const SignInIndexLazyRoute = SignInIndexLazyImport.update({
  path: '/sign-in/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/sign-in/index.lazy').then((d) => d.Route))

const RegisterIndexLazyRoute = RegisterIndexLazyImport.update({
  path: '/register/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/register/index.lazy').then((d) => d.Route),
)

const ProfileIndexLazyRoute = ProfileIndexLazyImport.update({
  path: '/profile/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile/index.lazy').then((d) => d.Route))

const PrivacyIndexLazyRoute = PrivacyIndexLazyImport.update({
  path: '/privacy/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/privacy/index.lazy').then((d) => d.Route))

const PasswordResetIndexLazyRoute = PasswordResetIndexLazyImport.update({
  path: '/password-reset/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/password-reset/index.lazy').then((d) => d.Route),
)

const PacksIndexLazyRoute = PacksIndexLazyImport.update({
  path: '/packs/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/packs/index.lazy').then((d) => d.Route))

const MapsIndexLazyRoute = MapsIndexLazyImport.update({
  path: '/maps/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/maps/index.lazy').then((d) => d.Route))

const MapIndexLazyRoute = MapIndexLazyImport.update({
  path: '/map/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/map/index.lazy').then((d) => d.Route))

const ItemsIndexLazyRoute = ItemsIndexLazyImport.update({
  path: '/items/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/items/index.lazy').then((d) => d.Route))

const FeedIndexLazyRoute = FeedIndexLazyImport.update({
  path: '/feed/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/feed/index.lazy').then((d) => d.Route))

const DashboardIndexLazyRoute = DashboardIndexLazyImport.update({
  path: '/dashboard/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/dashboard/index.lazy').then((d) => d.Route),
)

const AppearanceIndexLazyRoute = AppearanceIndexLazyImport.update({
  path: '/appearance/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/appearance/index.lazy').then((d) => d.Route),
)

const AboutIndexLazyRoute = AboutIndexLazyImport.update({
  path: '/about/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about/index.lazy').then((d) => d.Route))

const TripCreateLazyRoute = TripCreateLazyImport.update({
  path: '/trip/create',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/trip/create.lazy').then((d) => d.Route))

const TripTripIdLazyRoute = TripTripIdLazyImport.update({
  path: '/trip/$tripId',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/trip/$tripId.lazy').then((d) => d.Route))

const ProfileIdLazyRoute = ProfileIdLazyImport.update({
  path: '/profile/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile/$id.lazy').then((d) => d.Route))

const PackCreateLazyRoute = PackCreateLazyImport.update({
  path: '/pack/create',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/pack/create.lazy').then((d) => d.Route))

const PackIdLazyRoute = PackIdLazyImport.update({
  path: '/pack/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/pack/$id.lazy').then((d) => d.Route))

const DestinationQueryLazyRoute = DestinationQueryLazyImport.update({
  path: '/destination/query',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/destination/query.lazy').then((d) => d.Route),
)

const ProfileSettingsIndexLazyRoute = ProfileSettingsIndexLazyImport.update({
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

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  DestinationQueryLazyRoute,
  PackIdLazyRoute,
  PackCreateLazyRoute,
  ProfileIdLazyRoute,
  TripTripIdLazyRoute,
  TripCreateLazyRoute,
  AboutIndexLazyRoute,
  AppearanceIndexLazyRoute,
  DashboardIndexLazyRoute,
  FeedIndexLazyRoute,
  ItemsIndexLazyRoute,
  MapIndexLazyRoute,
  MapsIndexLazyRoute,
  PacksIndexLazyRoute,
  PasswordResetIndexLazyRoute,
  PrivacyIndexLazyRoute,
  ProfileIndexLazyRoute,
  RegisterIndexLazyRoute,
  SignInIndexLazyRoute,
  TripsIndexLazyRoute,
  ProfileSettingsIndexLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/destination/query",
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
        "/packs/",
        "/password-reset/",
        "/privacy/",
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
    "/packs/": {
      "filePath": "packs/index.lazy.tsx"
    },
    "/password-reset/": {
      "filePath": "password-reset/index.lazy.tsx"
    },
    "/privacy/": {
      "filePath": "privacy/index.lazy.tsx"
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
