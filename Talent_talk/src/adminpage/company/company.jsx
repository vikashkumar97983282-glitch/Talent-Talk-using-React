import React, { useEffect, useState } from "react";
import axios from "axios";
import { Building2, Search, ShieldCheck, Sparkles, Users2 } from "lucide-react";
import AdminPanel from "../admin/adminPanel/adminPanel";
import CompanyContainer from "./companyContainer";

function Company() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const res = await axios.get("/admin/companies", { withCredentials: true });
        setCompanies(res.data?.companies || []);
      } catch (err) {
        console.log(err);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    getCompanies();
  }, []);

  const normalisedSearch = search.trim().toLowerCase();
  const categories = Array.from(
    new Set((companies || []).map((item) => String(item?.category || "").trim()).filter(Boolean))
  );

  const filteredCompanies = (companies || []).filter((item) => {
    const name = String(item?.name || "").toLowerCase();
    const category = String(item?.category || "").toLowerCase();
    const description = String(item?.description || "").toLowerCase();
    const matchesSearch =
      !normalisedSearch ||
      name.includes(normalisedSearch) ||
      category.includes(normalisedSearch) ||
      description.includes(normalisedSearch);
    const matchesCategory = activeCategory === "all" || category === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const stats = [
    {
      label: "Total companies",
      value: companies.length,
      icon: Building2,
      tone: "from-indigo-600 via-violet-600 to-cyan-500",
    },
    {
      label: "Visible now",
      value: filteredCompanies.length,
      icon: Users2,
      tone: "from-slate-900 via-slate-700 to-slate-500",
    },
    {
      label: "Categories",
      value: categories.length,
      icon: ShieldCheck,
      tone: "from-emerald-600 via-teal-600 to-cyan-500",
    },
  ];

  return (
    <div className="admin-page-theme flex min-h-screen w-full flex-col bg-[radial-gradient(circle_at_top,_rgba(165,180,252,0.2),_transparent_30%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] md:h-screen md:flex-row md:overflow-hidden">
      <AdminPanel />
      <main className="min-w-0 flex-1 text-slate-700 md:overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full max-w-7xl justify-center px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-10 w-full">
            <div className="mb-6 flex flex-col gap-5 rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_20px_45px_rgba(79,70,229,0.12)] lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
                  <Sparkles size={13} />
                  Admin review
                </div>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Company verification</h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Review registered companies in a cleaner, more visual layout. Search, filter, and scan each profile
                  quickly from one place.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[34rem]">
                {stats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-sm"
                    >
                      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.tone} text-white shadow-md`}>
                        <Icon size={18} />
                      </div>
                      <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{item.value}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/80 bg-white/80 p-4 shadow-[0_16px_38px_rgba(79,70,229,0.1)] sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <label className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100">
                  <Search size={18} className="text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search companies, categories, or descriptions"
                    className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </label>

                <div className="flex flex-wrap gap-2">
                  {["all", ...categories].map((category) => {
                    const active = activeCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          active
                            ? "bg-slate-950 text-white shadow-md shadow-slate-950/20"
                            : "bg-slate-100 text-slate-600 hover:bg-violet-50 hover:text-violet-700"
                        }`}
                      >
                        {category === "all" ? "All categories" : category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {loading ? (
              <div className="rounded-3xl border border-white/80 bg-white/80 p-8 text-sm text-slate-500 shadow-[0_16px_38px_rgba(79,70,229,0.1)]">
                Loading companies...
              </div>
            ) : filteredCompanies.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-10 text-center shadow-[0_16px_38px_rgba(79,70,229,0.08)]">
                <p className="text-lg font-semibold text-slate-900">No companies found</p>
                <p className="mt-2 text-sm text-slate-500">
                  Try a different search term or clear the category filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 sm:gap-6 lg:gap-7">
                {filteredCompanies.map((elem, idx) => {
                  return (
                    <CompanyContainer
                      key={idx}
                      name={elem.name}
                      cate={elem.category}
                      desc={elem.description}
                      img={elem.image}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Company;
