/** Shared mock event data for the phone app prototype (Feed, Map, Events tabs). */

export interface CrikEvent {
  id: string;
  name: string;
  venue: string;
  playersJoined: number;
  maxPlayers: number;
  distance: string;
  time: string;
  status: "live" | "open" | "filling";
  feedText?: string;
  /** Percentage position on the fake map (0–100). */
  mapPosition: { x: number; y: number };
}

export const CRIK_EVENTS: CrikEvent[] = [
  {
    id: "evt-1",
    name: "Sunset Street Match",
    venue: "Central Park Ground",
    playersJoined: 5,
    maxPlayers: 12,
    distance: "0.4 mi",
    time: "Today · 5:30 PM",
    status: "open",
    feedText: "Cricket game starting near you – 5 players joined",
    mapPosition: { x: 38, y: 42 },
  },
  {
    id: "evt-2",
    name: "Riverside Nets Session",
    venue: "Riverside Nets",
    playersJoined: 8,
    maxPlayers: 10,
    distance: "1.2 mi",
    time: "Today · 7:00 PM",
    status: "live",
    feedText: "New street match live now",
    mapPosition: { x: 62, y: 55 },
  },
  {
    id: "evt-3",
    name: "Weekend Community Oval",
    venue: "Community Oval",
    playersJoined: 4,
    maxPlayers: 14,
    distance: "2.1 mi",
    time: "Tomorrow · 9:00 AM",
    status: "open",
    feedText: "Weekend pickup — 4 spots filled, 10 open",
    mapPosition: { x: 28, y: 68 },
  },
  {
    id: "evt-4",
    name: "Night Floodlit T20",
    venue: "Metro Sports Complex",
    playersJoined: 9,
    maxPlayers: 12,
    distance: "0.8 mi",
    time: "Today · 8:30 PM",
    status: "filling",
    feedText: "Floodlit T20 filling fast — 3 spots left",
    mapPosition: { x: 72, y: 32 },
  },
];

export function getEventById(id: string): CrikEvent | undefined {
  return CRIK_EVENTS.find((e) => e.id === id);
}
