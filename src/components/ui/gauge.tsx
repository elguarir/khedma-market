export const Gauge = ({
  value,
  size = "small",
  showValue = true,
}: {
  value: number;
  size: "small" | "medium" | "large";
  showValue: boolean;
}) => {
  const circumference = 332; //2 * Math.PI * 53; // 2 * pi * radius
  const valueInCircumference = (value / 100) * circumference;
  const strokeDasharray = `${circumference} ${circumference}`;
  const initialOffset = circumference;
  const strokeDashoffset = initialOffset - valueInCircumference;

  const sizes = {
    small: {
      width: "36",
      height: "36",
      textSize: "text-xs",
    },
    medium: {
      width: "72",
      height: "72",
      textSize: "text-sm",
    },
    large: {
      width: "144",
      height: "144",
      textSize: "text-3xl",
    },
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg
        fill="none"
        shapeRendering="crispEdges"
        height={sizes[size].height}
        width={sizes[size].width}
        viewBox="0 0 120 120"
        strokeWidth="2"
        className="-rotate-90 transform"
      >
        <circle
          className="text-neutral-700"
          strokeWidth="12"
          stroke="currentColor"
          fill="transparent"
          shapeRendering="geometricPrecision"
          r="53"
          cx="60"
          cy="60"
        />
        <circle
          className="animate-gauge_fill text-neutral-800"
          strokeWidth="12"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={initialOffset}
          shapeRendering="geometricPrecision"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="53"
          cx="60"
          cy="60"
          style={{
            strokeDashoffset: strokeDashoffset,
            transition: "stroke-dasharray 1s ease 0s,stroke 1s ease 0s",
          }}
        />
      </svg>

      {showValue ? (
        <div className="absolute flex">
          <p className={`font-medium text-[#e8e7e7] ${sizes[size].textSize}`}>
            {value}%
          </p>
        </div>
      ) : null}
    </div>
  );
};
