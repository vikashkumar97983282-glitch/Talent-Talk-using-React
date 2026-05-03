import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AllCommunityModule, ModuleRegistry } from "ag-charts-community";

// Required: register modules once
ModuleRegistry.registerModules([AllCommunityModule]);

function Graph() {
  const [chartOptions] = useState({
    data: [
      { month: "Jan", iceCreamSales: 162000 },
      { month: "Mar", iceCreamSales: 302000 },
      { month: "May", iceCreamSales: 800000 },
      { month: "Jul", iceCreamSales: 1254000 },
      { month: "Sep", iceCreamSales: 950000 },
      { month: "Nov", iceCreamSales: 200000 },
    ],
    title: {
      text: "Monthly Revenue",
    },
    series: [
      {
        type: "bar",
        xKey: "month",
        yKey: "iceCreamSales",
      },
    ],
  });

  return (
    <div className="min-h-[360px] w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <AgCharts options={chartOptions} />
    </div>
  );
}

export default Graph;
