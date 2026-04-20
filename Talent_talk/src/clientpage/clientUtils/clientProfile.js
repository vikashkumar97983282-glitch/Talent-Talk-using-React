export const CLIENT_PROFILE_CACHE_KEY = "client_profile_cache";

export const getClientAvatarUrl = (avatarName) => {
  if (!avatarName) return "https://i.pravatar.cc/100";
  const base = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
  return `${base}/uploads/${avatarName}`;
};

export const getClientFullName = (client) => {
  const fullName = [client?.firstname, client?.lastname].filter(Boolean).join(" ").trim();
  return fullName || "Client Profile";
};

export const setClientProfileCache = (client) => {
  if (!client) return;
  localStorage.setItem(CLIENT_PROFILE_CACHE_KEY, JSON.stringify(client));
};

export const getClientProfileCache = () => {
  const raw = localStorage.getItem(CLIENT_PROFILE_CACHE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
