// xp.js
// The game rules. Pure functions, no React, easy to reason about.

export const XP_BY_DIFFICULTY = { easy: 10, medium: 20, hard: 40 };
export const XP_PER_LEVEL = 100;

const RANKS = [
  "Novice Adventurer",
  "Apprentice",
  "Journeyman",
  "Knight",
  "Veteran",
  "Champion",
  "Hero",
  "Legend",
];

// XP a single quest is worth (falls back to medium for old tasks without difficulty)
export const xpFor = (task) => XP_BY_DIFFICULTY[task.difficulty] ?? XP_BY_DIFFICULTY.medium;

// Total XP = sum of the XP of every completed quest
export const totalXp = (tasks) =>
  tasks.filter((t) => t.completed).reduce((sum, t) => sum + xpFor(t), 0);

// Turn total XP into level, progress inside the level and a rank title
export function levelInfo(xp) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const into = xp % XP_PER_LEVEL;
  const rank = RANKS[Math.min(level - 1, RANKS.length - 1)];
  return { level, into, toNext: XP_PER_LEVEL - into, rank };
}
