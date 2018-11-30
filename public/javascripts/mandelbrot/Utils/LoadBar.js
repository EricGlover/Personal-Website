function LoadBar() {
  var startTime, endTime, elapsedTime, elapsed;
  function start() {
    startTime = new Date();
  }
  function reset() {
    $("#loading").text("loading...");
  }
  function stop() {
    endTime = new Date();
    elapsed = endTime - startTime;
    let seconds = elapsed / 1000;
    seconds = Math.round(seconds);
    elapsedTime = seconds;
  }
  function render() {}
  function updateUI() {
    $("#loading").text(
      `Loaded ! Go api rendered in ${elapsedTime} seconds.  ${elapsed} milliseconds`
    );
  }
  return {
    start,
    stop,
    updateUI,
    reset
  };
}
export default LoadBar;
