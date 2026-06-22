/** Client-side waitlist persistence (localStorage). */

const STORAGE_KEY = "crik_waitlist";

export interface WaitlistEntry {
  name: string;
  email: string;
  zipCode: string;
  joinedAt: string;
}

export function getWaitlistEntries(): WaitlistEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WaitlistEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveWaitlistEntry(entry: Omit<WaitlistEntry, "joinedAt">): void {
  const entries = getWaitlistEntries();
  entries.push({ ...entry, joinedAt: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}
