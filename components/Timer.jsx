import { useEffect, useState } from "react";
import Bar from "./Bar";

export const TIMES = {
  MILLISECONDS: {
    label: "Milliseconds",
    max: 1000,
    scaler: 0.1,
    getter: () => new Date().getMilliseconds(),
    background: `linear-gradient(180deg, #A0FF27 0%, #007256 100%)`,
    transitionDuration: "0ms",
  },
  SECONDS: {
    label: "Seconds",
    max: 60,
    getter: () => new Date().getSeconds(),
    background: `linear-gradient(180deg, #FFA149 0%, #AB0000 100%)`,
  },
  MINUTES: {
    label: "Minutes",
    max: 60,
    getter: () => new Date().getMinutes(),
    background: `linear-gradient(180deg, #FF00B8 0%, #7F00AB 100%)`,
  },
  HOURS: {
    label: "Hours",
    max: 24,
    getter: () => new Date().getHours(),
    background: `linear-gradient(180deg, #00D1FF 0%, #0026AB 100%)`,
  },
};

const Timer = ({
  label,
  max,
  getter,
  background,
  transitionDuration,
  scaler = 1,
}) => {
  const [time, setTime] = useState(getter());

  useEffect(() => {
    let breaker = false;

    const handler = () => {
      if (breaker) return;
      requestAnimationFrame(() => {
        setTime(getter());
        handler();
      });
    };

    handler();

    return () => {
      breaker = true;
    };
  }, []);

  const children = [];

  for (let i = 0; i < max * scaler; i++) {
    children.push(
      <Bar
        index={i}
        key={i}
        currentTime={time * scaler}
        max={max * scaler}
        background={background}
        transitionDuration={transitionDuration}
      />
    );
  }

  return (
    <div>
      <h1 className="time-label">
        {time + 1} {label}
      </h1>
      <div className="bar-container">{children}</div>
    </div>
  );
};

export default Timer;
