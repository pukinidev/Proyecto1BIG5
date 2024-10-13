import { Stack, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

export default function ModelGauge({ data }: ModelDetailsProps) {
  if (data == null) {
    return null;
  }

  const transformedData = {
    "3": parseFloat((data["3"] * 100).toFixed(2)),
    "4": parseFloat((data["4"] * 100).toFixed(2)),
    "5": parseFloat((data["5"] * 100).toFixed(2)),
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack direction="column" alignItems="center">
        <Typography variant="h6" color="primary">
          ODS 3
        </Typography>
        <Gauge
          width={150}
          height={150}
          value={transformedData["3"]}
          sx={{
            [`& .${gaugeClasses.valueArc}`]: {
              fill: "#4C9F38",
            },
          }}
        />
      </Stack>

      <Stack direction="column" alignItems="center">
        <Typography variant="h6" color="primary">
          ODS 4
        </Typography>
        <Gauge
          width={150}
          height={150}
          value={transformedData["4"]}
          sx={{
            [`& .${gaugeClasses.valueArc}`]: {
              fill: "#C5192D",
            },
          }}
        />
      </Stack>

      <Stack direction="column" alignItems="center">
        <Typography variant="h6" color="primary">
          ODS 5
        </Typography>
        <Gauge
          width={150}
          height={150}
          value={transformedData["5"]}
          sx={{
            [`& .${gaugeClasses.valueArc}`]: {
              fill: "#FF3A20",
            },
          }}
        />
      </Stack>
    </Stack>
  );
}
