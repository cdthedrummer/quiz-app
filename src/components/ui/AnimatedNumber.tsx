import { useSpring, animated } from '@react-spring/web';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

export function AnimatedNumber({ value, duration = 500 }: AnimatedNumberProps) {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { duration }
  });

  return (
    <animated.span>
      {number.to(n => n.toFixed(1))}
    </animated.span>
  );
}
