import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

ChartDashboard.propTypes = {
  dataDashboard: PropTypes.array,
};
function ChartDashboard({ dataDashboard }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const data = [
    { name: "بدهی جاری ", value: dataDashboard.loanAmountPaidSum },
    { name: "وصول شده", value: dataDashboard.loanAmountReceivedSum },
    { name: "معوق شده", value: dataDashboard.loanAmountDeyaledSum },
  ];
  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "100%",
        }}
      >
        {data.map((entry, index) => (
          <Box
            key={`legend-${index}`}
            sx={{
              display: "flex",
              alignItems: "center",

              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Box
              sx={{
                width: "10px",
                height: "10px",
                backgroundColor: COLORS[index],
                borderRadius: "50%",
                marginRight: "5px",
              }}
            ></Box>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {entry.name}
            </Typography>
          </Box>
        ))}
      </Box>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={150}
          innerRadius={50} // افزایش شعاع داخلی برای باریکتر کردن نوار نمودار
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={renderCustomizedLabel}
          labelLine={false} // حذف خط‌های تیره
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                activeIndex === index || activeIndex === null
                  ? COLORS[index]
                  : "#d9d9d9"
              }
              opacity={activeIndex === index || activeIndex === null ? 1 : 0.3}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Box>
  );
}

export default ChartDashboard;
