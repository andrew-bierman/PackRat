import { createDb, createOsmDb } from '@packrat/api/db';
import { authPlugin } from '@packrat/api/middleware/auth';
import { reportAuthorNames } from '@packrat/api/services/reportAuthors';
import type { TrailDb } from '@packrat/api/services/trailIndex';
import { getTripTrailConditions } from '@packrat/api/services/tripTrailConditions';
import { trips } from '@packrat/db/schema';
import { and, eq } from 'drizzle-orm';
import { Elysia, status } from 'elysia';
import { z } from 'zod';
import { toReportResponse } from './reports';

/** The trail database, or null when this server has none configured. */
function trailDbOrNull(): TrailDb | null {
  try {
    return createOsmDb();
  } catch {
    return null;
  }
}

export const tripTrailConditionRoutes = new Elysia().use(authPlugin).get(
  '/trip/:tripId',
  async ({ params, user }) => {
    const db = createDb();
    const trip = await db.tag('tripTrailConditions.trip').query.trips.findFirst({
      columns: { id: true, trailId: true, location: true },
      where: and(
        eq(trips.id, params.tripId),
        eq(trips.userId, user.userId),
        eq(trips.deleted, false),
      ),
    });
    if (!trip) return status(404, { error: 'Trip not found' });

    const result = await getTripTrailConditions({
      db,
      trailDb: trailDbOrNull(),
      trip: {
        id: trip.id,
        trailId: trip.trailId,
        location: trip.location
          ? { latitude: trip.location.latitude, longitude: trip.location.longitude }
          : null,
      },
    });
    const authorName = await reportAuthorNames({
      db,
      userIds: result.reports.map((r) => r.userId),
    });

    return {
      scope: result.scope,
      reports: result.reports.map((r) => ({
        ...toReportResponse(r),
        distanceM: r.distanceM,
        authorName: authorName.get(r.userId) ?? null,
      })),
    };
  },
  {
    params: z.object({ tripId: z.string() }),
    isAuthenticated: true,
    detail: {
      tags: ['Trail Conditions'],
      summary: "Reports for a trip's trail, or trails near its destination",
      security: [{ bearerAuth: [] }],
    },
  },
);
