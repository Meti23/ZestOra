import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ConfettiProps {
  show: boolean;
  onComplete?: () => void;
}

export const Confetti: React.FC<ConfettiProps> = ({ show, onComplete }) => {
  const [pieces, setPieces] = useState<Array<{ id: number; x: number; color: string }>>([]);

  useEffect(() => {
    if (show) {
      const newPieces = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#522B5B', '#854F6C', '#DEB6B2', '#FBE4DB'][Math.floor(Math.random() * 4)]
      }));
      setPieces(newPieces);

      const timer = setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {pieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{ y: -20, x: `${piece.x}vw`, rotate: 0, opacity: 1 }}
              animate={{
                y: '100vh',
                rotate: 720,
                opacity: 0
              }}
              transition={{
                duration: 3,
                ease: 'easeIn'
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{ backgroundColor: piece.color }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

interface SparkEffectProps {
  x: number;
  y: number;
  show: boolean;
}

export const SparkEffect: React.FC<SparkEffectProps> = ({ x, y, show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, rotate: 0, opacity: 1 }}
          animate={{ scale: 1.5, rotate: 360, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute pointer-events-none"
          style={{ left: x, top: y }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-[#854F6C] to-[#DEB6B2] rounded-full blur-sm" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const GlowButton: React.FC<GlowButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = ''
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative px-6 py-3 rounded-lg overflow-hidden
        ${variant === 'primary' 
          ? 'bg-gradient-to-r from-[#522B5B] to-[#854F6C] text-[#FBE4DB]' 
          : 'bg-gradient-to-r from-[#854F6C] to-[#DEB6B2] text-[#190019]'}
        ${className}
      `}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'linear'
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

interface BadgeDisplayProps {
  badge: {
    name: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
  };
  size?: 'sm' | 'md' | 'lg';
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badge, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl'
  };

  const rarityColors = {
    common: 'from-[#DEB6B2] to-[#854F6C]',
    rare: 'from-[#854F6C] to-[#522B5B]',
    epic: 'from-[#522B5B] to-[#2B124C]',
    legendary: 'from-[#2B124C] via-[#522B5B] to-[#854F6C]'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      className={`
        ${sizeClasses[size]}
        gem-badge bg-gradient-to-br ${rarityColors[badge.rarity]}
        flex items-center justify-center
        shadow-lg cursor-pointer
      `}
      title={badge.name}
    >
      <span className="relative z-10">{badge.icon}</span>
    </motion.div>
  );
};

interface XPBarProps {
  current: number;
  max: number;
  level: number;
}

export const XPBar: React.FC<XPBarProps> = ({ current, max, level }) => {
  const percentage = (current / max) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Level {level}</span>
        <span className="text-sm text-muted-foreground">{current} / {max} XP</span>
      </div>
      <div className="xp-bar">
        <motion.div
          className="xp-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

interface RankUpAnimationProps {
  show: boolean;
  level: number;
  onComplete?: () => void;
}

export const RankUpAnimation: React.FC<RankUpAnimationProps> = ({ show, level, onComplete }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="bg-gradient-to-br from-[#2B124C] to-[#522B5B] p-8 rounded-2xl border-4 border-[#854F6C] shadow-2xl"
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.5 }}
              className="text-6xl mb-4 text-center"
            >
              ⭐
            </motion.div>
            <h2 className="text-4xl mb-2 text-[#FBE4DB] text-center">Level Up!</h2>
            <p className="text-2xl text-[#DEB6B2] text-center">You reached Level {level}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
