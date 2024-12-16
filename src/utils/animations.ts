import { ANIMATION } from '@/lib/constants';

export const getTransitionStyles = (duration = ANIMATION.DURATION.NORMAL) => ({
  enter: {
    opacity: 0,
    transform: 'scale(0.95)'
  },
  enterActive: {
    opacity: 1,
    transform: 'scale(1)',
    transition: `all ${duration}ms ${ANIMATION.EASING.DEFAULT}`
  },
  exit: {
    opacity: 0,
    transform: 'scale(0.95)',
    transition: `all ${duration}ms ${ANIMATION.EASING.DEFAULT}`
  }
});

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const withDebounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
