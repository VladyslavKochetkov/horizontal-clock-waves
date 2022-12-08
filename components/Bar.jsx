import clamp from "../util/clamp";

const Bar = ({ index, currentTime, max, background, transitionDuration }) => {
  const STEPPER = 100 / (max * (1 / 3));
  let val = (100 - (currentTime - index) * STEPPER) / 100;

  if (val > 1) {
    val = 0;
  }
  if (currentTime < max * (1 / 3) && index > max * (2 / 3)) {
    val = (100 - (currentTime + (max - index)) * STEPPER) / 100;
  }

  val = clamp(val, 0, 1);

  const style = {
    background,
    opacity: val,
    height: val * 100,
    transitionDuration,
  };
  return <div className="bar" style={style} />;
};

export default Bar;
