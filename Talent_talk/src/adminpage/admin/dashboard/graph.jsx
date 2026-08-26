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
<<<<<<< HEAD
    <div className="min-h-[360px] w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
=======
    <div className="min-h-[360px] w-full rounded-2xl border border-white/80 bg-white/80 p-5 shadow-[0_12px_30px_rgba(79,70,229,0.10)] backdrop-blur">
>>>>>>> 0cc237e (change css and structure in admin page.)
      <AgCharts options={chartOptions} />
    </div>
  );
}

export default Graph;
