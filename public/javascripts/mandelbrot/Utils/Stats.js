function Stats() {
  let $container = $("#stats");
  function render(data) {
    $container.find("#canvasHeight").val(data.height);
    $container.find("#canvasWidth").val(data.width);
  }

  return {
    render
  };
}

export default Stats;
