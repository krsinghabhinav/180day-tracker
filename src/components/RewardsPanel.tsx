import React from 'react';
import { Trophy, Flame, Star, Zap, Lock, CheckCircle2, Award, Shield, Crown } from 'lucide-react';

interface RewardsPanelProps {
  points: number;
  streak: number;
  unlockedBadges: string[];
}

const BADGES = [
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    desc: 'Complete 7 consecutive days at 100%',
    bonus: '+50 Points',
    icon: Flame,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.25)',
    req: '7-day streak',
  },
  {
    id: 'month-master',
    name: 'Month Master',
    desc: 'Maintain a 30-day perfect streak',
    bonus: '+200 Points',
    icon: Shield,
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.25)',
    req: '30-day streak',
  },
  {
    id: 'consistency-king',
    name: 'Consistency King',
    desc: 'Complete at least 60 total days',
    bonus: '+100 Points',
    icon: Star,
    color: '#22D3EE',
    bg: 'rgba(34,211,238,0.12)',
    border: 'rgba(34,211,238,0.25)',
    req: '60 days done',
  },
  {
    id: 'champion',
    name: 'Elite Champion',
    desc: 'Finish all 180 days of the challenge',
    bonus: '+500 Points',
    icon: Crown,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
    req: 'Complete Day 180',
  },
];

const MILESTONES = [
  { pts: 500,   label: 'Starter',         color: '#64748B' },
  { pts: 2000,  label: 'Momentum',        color: '#4F8EF7' },
  { pts: 6000,  label: 'Disciplined',     color: '#8B5CF6' },
  { pts: 15000, label: 'Consistent',      color: '#10B981' },
  { pts: 40000, label: 'Elite Achiever',  color: '#F59E0B' },
];

const PENALTY_RULES = [
  { label: 'Miss Morning Routine',  pts: '-5',  color: '#F87171' },
  { label: 'Miss Trading Session',  pts: '-10', color: '#F87171' },
  { label: 'Miss DSA / Coding',     pts: '-8',  color: '#F87171' },
  { label: 'Miss Flutter / React',  pts: '-10', color: '#F87171' },
  { label: 'Miss Night Review',     pts: '-5',  color: '#F87171' },
  { label: 'Miss ALL tasks in day', pts: '-30', color: '#EF4444' },
];

const REWARD_RULES = [
  { label: '100% day completion',   pts: '+20',  color: '#10B981' },
  { label: '7-day streak',          pts: '+50',  color: '#10B981' },
  { label: '30-day streak',         pts: '+200', color: '#10B981' },
  { label: 'Complete 180 days',     pts: '+500', color: '#F59E0B' },
];

const RewardsPanel: React.FC<RewardsPanelProps> = ({ points, streak, unlockedBadges }) => {
  const currentMilestone = MILESTONES.filter(m => points >= m.pts).slice(-1)[0];
  const nextMilestone = MILESTONES.find(m => points < m.pts);
  const toNext = nextMilestone ? nextMilestone.pts - points : 0;
  const progressToNext = nextMilestone ? Math.round(((points - (currentMilestone?.pts || 0)) / (nextMilestone.pts - (currentMilestone?.pts || 0))) * 100) : 100;

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Achievements & Badges</div>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 42, fontWeight: 700, color: '#F1F5F9', letterSpacing: '-0.02em' }}>Trophy Room</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Points Hero Card */}
          <div style={{ padding: '32px', borderRadius: 24, background: 'linear-gradient(135deg, rgba(79,142,247,0.15), rgba(139,92,246,0.08))', border: '1px solid rgba(79,142,247,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(79,142,247,0.08)', filter: 'blur(40px)' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, position: 'relative', zIndex: 1 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#4F8EF7', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Total Score</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 60, fontWeight: 700, color: '#F1F5F9', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {points.toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>{currentMilestone?.label || 'Beginner'} Level</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end' }}>
                <div style={{ padding: '12px 20px', borderRadius: 16, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                  <div style={{ fontSize: 10, color: '#F59E0B', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Streak</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Flame size={20} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 32, fontWeight: 700, color: '#F59E0B', lineHeight: 1 }}>{streak}</span>
                  </div>
                  <div style={{ fontSize: 10, color: '#78350F', marginTop: 2 }}>days in a row</div>
                </div>
              </div>
            </div>

            {/* Progress to next level */}
            {nextMilestone && (
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 600, color: '#64748B', marginBottom: 8 }}>
                  <span>→ {nextMilestone.label}</span>
                  <span>{toNext.toLocaleString()} pts to go</span>
                </div>
                <div className="progress-bar-track" style={{ height: 8 }}>
                  <div className="progress-bar-fill" style={{ width: `${progressToNext}%`, background: 'linear-gradient(90deg,#4F8EF7,#8B5CF6)' }} />
                </div>
              </div>
            )}
          </div>

          {/* Milestones ladder */}
          <div className="card-static" style={{ padding: '22px 24px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#F1F5F9', marginBottom: 20 }}>Level Progression</div>
            <div style={{ position: 'relative', paddingLeft: 20 }}>
              <div className="timeline-line" style={{ background: 'linear-gradient(180deg,rgba(79,142,247,0.3),rgba(255,255,255,0.03))' }} />
              {MILESTONES.map((m, i) => {
                const isReached = points >= m.pts;
                return (
                  <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: i < MILESTONES.length - 1 ? 20 : 0, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: -24, width: 10, height: 10, borderRadius: '50%', background: isReached ? m.color : '#1E293B', border: `2px solid ${isReached ? m.color : '#334155'}`, boxShadow: isReached ? `0 0 10px ${m.color}` : 'none' }} />
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 12, background: isReached ? `${m.color}0D` : 'rgba(255,255,255,0.02)', border: `1px solid ${isReached ? m.color+'33' : 'rgba(255,255,255,0.05)'}` }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: isReached ? m.color : '#475569' }}>{m.label}</div>
                        <div style={{ fontSize: 11, color: '#334155', marginTop: 2 }}>{m.pts.toLocaleString()} pts</div>
                      </div>
                      {isReached && <CheckCircle2 size={16} color={m.color} />}
                      {!isReached && <Lock size={14} color="#334155" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Badges */}
          <div className="card-static" style={{ padding: '22px 24px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#F1F5F9', marginBottom: 20 }}>Achievement Badges</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {BADGES.map(badge => {
                const isUnlocked = unlockedBadges.includes(badge.id);
                const BIcon = badge.icon;
                return (
                  <div key={badge.id} style={{ padding: '20px', borderRadius: 18, background: isUnlocked ? badge.bg : 'rgba(255,255,255,0.02)', border: `1px solid ${isUnlocked ? badge.border : 'rgba(255,255,255,0.05)'}`, transition: 'all 0.3s', filter: isUnlocked ? 'none' : 'grayscale(80%) opacity(0.5)', position: 'relative', overflow: 'hidden' }}>
                    {isUnlocked && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${badge.color}, transparent)` }} />}
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: `${badge.color}22`, border: `1px solid ${badge.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                      {isUnlocked
                        ? <BIcon size={22} color={badge.color} fill={badge.color + '33'} />
                        : <Lock size={18} color="#475569" />
                      }
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: isUnlocked ? '#F1F5F9' : '#475569', marginBottom: 4, lineHeight: 1.3 }}>{badge.name}</div>
                    <div style={{ fontSize: 11, color: '#475569', lineHeight: 1.5, marginBottom: 10 }}>{badge.desc}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: badge.color, opacity: isUnlocked ? 1 : 0.4 }}>{badge.bonus}</span>
                      {isUnlocked
                        ? <span style={{ fontSize: 10, fontWeight: 700, color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: 99 }}>UNLOCKED</span>
                        : <span style={{ fontSize: 10, color: '#334155', fontWeight: 600 }}>{badge.req}</span>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rules reference */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card-static" style={{ padding: '18px 20px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#F87171', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>⚠ Penalties</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {PENALTY_RULES.map(r => (
                  <div key={r.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 11, color: '#64748B', lineHeight: 1.3 }}>{r.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: r.color, flexShrink: 0 }}>{r.pts}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-static" style={{ padding: '18px 20px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#10B981', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>✦ Rewards</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {REWARD_RULES.map(r => (
                  <div key={r.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 11, color: '#64748B', lineHeight: 1.3 }}>{r.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: r.color, flexShrink: 0 }}>{r.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPanel;
