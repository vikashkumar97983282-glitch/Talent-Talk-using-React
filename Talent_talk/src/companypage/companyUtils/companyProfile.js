export const COMPANY_PROFILE_CACHE_KEY = "company_profile_cache";

export const getCompanyAvatarUrl = (avatarName) => {
  if (!avatarName) return "https://randomuser.me/api/portraits/women/65.jpg";
  const base = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
  return `${base}/uploads/${avatarName}`;
};

export const setCompanyProfileCache = (company) => {
  if (!company) return;
  localStorage.setItem(COMPANY_PROFILE_CACHE_KEY, JSON.stringify(company));
};

export const getCompanyProfileCache = () => {
  const raw = localStorage.getItem(COMPANY_PROFILE_CACHE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
