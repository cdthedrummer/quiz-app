import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

export function AnimatedNumber({ value, duration = 0.5 }: AnimatedNumberProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => latest.toFixed(1));

  useEffect(() => {
    const controls = useSpring(count, {
      from: 0,
      to: value,
      duration: duration * 1000,
      bounce: 0
    });

    return () => controls.stop();
  }, [value, duration]);

  return <motion.span>{rounded}</motion.span>;
}
