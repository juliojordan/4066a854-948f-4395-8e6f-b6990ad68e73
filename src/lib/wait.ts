export function wait(duration: number): Promise<void> {
  return new Promise((resolve, reject) => {
    if (duration < 0) {
      reject(new Error("Time travel not yet implemented"));
    }
    setTimeout(resolve, duration);
  });
}
