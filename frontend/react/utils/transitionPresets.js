import { spring } from 'react-motion';

const fadeConfig = { stiffness: 200, damping: 22 };
const popConfig = { stiffness: 360, damping: 25 };
const slideConfig = { stiffness: 200, damping: 25 };


const fade = {
  atEnter: {
    opacity: 0,
  },
  atLeave: {
    opacity: spring(0, fadeConfig),
  },
  atActive: {
    opacity: spring(1, fadeConfig),
  },
};

const pop = {
  atEnter: {
    scale: 0.8,
    opacity: 0,
  },
  atLeave: {
    scale: spring(0.8, popConfig),
    opacity: spring(0, popConfig),
  },
  atActive: {
    scale: spring(1, popConfig),
    opacity: 1,
  },
  mapStyles(styles) {
    return {
      opacity: styles.opacity,
      transform: `scale(${styles.scale})`,
    };
  },
};

const slideLeft = {
  atEnter: {
    zIndex: 0,
    offset: -20,
  },
  atLeave: {
    // 右方向に100%移動する
    zIndex: 1,
    offset: spring(100, slideConfig),
  },
  atActive: {
    // zIndex: 1,
    zIndex: 0,
    offset: spring(0, slideConfig),
  },
  mapStyles(styles) {
    return {
      zIndex: styles.zIndex,
      minHeight: `${window.innerHeight}px`,
      transform: `translateX(${styles.offset}%)`,
    };
  },
};

const slideRight = {
  atEnter: {
    zIndex: 1,
    // mount開始点のX座標
    offset: 100,
  },
  // unmountされるほうのコンポーネントのアニメーション
  atLeave: {
    zIndex: 0,
    offset: spring(-20, slideConfig),
  },
  atActive: {
    zIndex: 1,
    // mount完了時点のX座標
    offset: spring(0, slideConfig),
  },
  mapStyles(styles) {
    return {
      zIndex: styles.zIndex,
      minHeight: `${window.innerHeight}px`,
      transform: `translateX(${styles.offset}%)`,
    };
  },
};


const noAnimation = {
  atEnter: {
    zIndex: 0,
    offset: 0,
  },
  atLeave: {
    zIndex: 0,
    offset: 0,
  },
  atActive: {
    zIndex: 0,
    offset: 0,
  },
  mapStyles(styles) {
    return {
      zIndex: styles.zIndex,
      minHeight: `${window.innerHeight}px`,
      transform: `translateX(${styles.offset}%)`,
    };
  },
};

export default { fade, pop, slideLeft, slideRight, noAnimation };
