import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AllCommunityModule, ModuleRegistry } from "ag-charts-community";

// ✅ REQUIRED: register modules ONCE
ModuleRegistry.registerModules([AllCommunityModule]);

function Graph() {
  const [chartOptions] = useState({
    data: [
      { month: "Jan", users: 120 },
      { month: "Feb", users: 180 },
      { month: "Mar", users: 260 },
      { month: "Apr", users: 340 },
      { month: "May", users: 420 },
      { month: "Jun", users: 520 },
    ],
    title: {
      text: "Platform Growth by Month",
    },
    series: [
      {
        type: "bar",
        xKey: "month",
        yKey: "users",
        fill: "#4f46e5",
        stroke: "#312e81",
        cornerRadius: 8,
      },
    ],
  });

  return (
    <div className="min-h-[360px] w-full overflow-hidden rounded-3xl border border-slate-100 bg-white/90 p-4 shadow-sm sm:p-5">
      <AgCharts options={chartOptions} />
    </div>
  );
}

export default Graph;
