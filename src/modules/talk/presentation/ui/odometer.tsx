import { formatMetric, type Metric } from "../../domain/metric";
import { cssVars } from "./styles";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

interface OdometerProps {
  readonly metric: Metric;
}

/** Number whose digits roll up from a blur when the scene enters. Pure CSS, final value without JS. */
export function Odometer({ metric }: OdometerProps) {
  const text = formatMetric(metric);

  return (
    <span className="od" role="img" aria-label={text}>
      {[...text].map((char, position) =>
        /\d/.test(char) ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: static characters, never reordered
          <span key={position} className="od-col" aria-hidden="true">
            <i style={cssVars({ "--t": char, "--k": position })}>
              {DIGITS.map((digit) => (
                <b key={digit}>{digit}</b>
              ))}
            </i>
          </span>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: static characters, never reordered
          <span key={position} aria-hidden="true">
            {char}
          </span>
        ),
      )}
    </span>
  );
}
