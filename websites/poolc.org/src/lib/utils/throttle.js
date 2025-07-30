function throttle(func, timeFrame) {
  let lastTime = 0;
  return (...args) => {
    const now = new Date();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}

export default throttle;
