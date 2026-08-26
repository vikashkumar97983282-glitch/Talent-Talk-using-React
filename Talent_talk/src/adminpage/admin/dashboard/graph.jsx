import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AllCommunityModule, ModuleRegistry } from "ag-charts-community";
import { useAdminTheme } from "../adminThemeHook";

// Required: register modules once
ModuleRegistry.registerModules([AllCommunityModule]);

function Graph() {
  const { theme } = useAdminTheme();
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
    <div className={`min-h-[360px] w-full rounded-xl border p-4 shadow-[0_12px_30px_rgba(14,165,233,0.10)] ${theme === "dark" ? "border-slate-700/70 bg-[#142033]" : "border-sky-100 bg-white/90"}`}>
      <AgCharts options={chartOptions} />
    </div>
  );
}

export default Graph;
