// XpBar.jsx
// Hero banner: level, rank title and an XP progress bar.
import { levelInfo, XP_PER_LEVEL } from "../xp";

export default function XpBar({ xp, done, total }) {
  const { level, into, toNext, rank } = levelInfo(xp);

  return (
    <section className="hero" aria-label="Player progress">
      <div className="hero-top">
        <div className="level-badge" aria-label={`Level ${level}`}>
          <span className="level-label">LVL</span>
          <span className="level-num">{level}</span>
        </div>
        <div className="hero-text">
          <h2 className="rank">{rank}</h2>
          <p className="muted">
            {done} of {total} quests complete · {xp} XP earned
          </p>
        </div>
      </div>

      <div
        className="xp-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={XP_PER_LEVEL}
        aria-valuenow={into}
      >
        <div className="xp-fill" style={{ width: `${(into / XP_PER_LEVEL) * 100}%` }} />
      </div>
      <p className="xp-caption">
        {into} / {XP_PER_LEVEL} XP · {toNext} XP to level {level + 1}
      </p>
    </section>
  );
}
