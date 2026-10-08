import { createDb, createOsmDb } from '@packrat/api/db';
import { authPlugin } from '@packrat/api/middleware/auth';
import type { TrailDb } from '@packrat/api/services/trailIndex';
import { getTripTrailConditions } from '@packrat/api/services/tripTrailConditions';
import { trips, users } from '@packrat/db/schema';
import { and, eq, inArray } from 'drizzle-orm';
import { Elysia, status } from 'elysia';
import { z } from 'zod';
import { toReportResponse } from './reports';

const WHITESPACE = /\s+/;

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
    // Who wrote each report, first name only: enough for "Sam, 2 days ago".
    const authorIds = [...new Set(result.reports.map((r) => r.userId))];
    const authors =
      authorIds.length === 0
        ? []
        : await db
            .tag('tripTrailConditions.authors')
            .select({ id: users.id, firstName: users.firstName, name: users.name })
            .from(users)
            .where(inArray(users.id, authorIds));
    const authorName = new Map(
      authors.map((a) => [a.id, a.firstName?.trim() || a.name.trim().split(WHITESPACE)[0] || null]),
    );

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
