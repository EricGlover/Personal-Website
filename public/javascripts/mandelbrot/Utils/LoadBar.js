function LoadBar() {
  var startTime, endTime, elapsed;
  function start() {
    $("#loading").text(
      ``
    );
    $("#redrawButton").text('Loading...');
    let $spinner = $(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`);
    $("#redrawButton").prepend($spinner);
    startTime = new Date();
  }
  function stop() {
    endTime = new Date();
    elapsed = endTime - startTime;
  }
  function updateUI() {
    $("#loading").text(
      `Loaded ! Go api rendered in ${elapsed / 1000} seconds.`
    );
    $("#redrawButton").text('redraw');
    $("#redrawButton").find(".spinner-border").remove();
  }
  return {
    start,
    stop,
    updateUI
  };
}
export default LoadBar;
