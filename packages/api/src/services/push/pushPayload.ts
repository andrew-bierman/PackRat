/** What every push carries, whichever gateway delivers it. The app routes a tap by the id present. */
export type PushPayload = {
  alert: { title: string; body: string };
  sound?: string;
  badge?: number;
} & ({ weatherLocationId: number } | { tripId: string } | { postId: number });
