import {
  type Profile,
  type Project,
  type Skill,
  type Organization,
  type GalleryItem,
  type SocialLink,
  type NavLink,
  type SeoMetadata,
  type ChatResponse,
  type SessionDto,
  type MessageDto,
  DEFAULT_PROFILE,
  DEFAULT_PROJECTS,
  DEFAULT_SKILLS,
  DEFAULT_ORGANIZATIONS,
  DEFAULT_GALLERY,
  DEFAULT_CONTACT,
  DEFAULT_NAV,
  DEFAULT_SEO,
} from "./defaults";

export type {
  Profile,
  Project,
  Skill,
  Organization,
  GalleryItem,
  SocialLink,
  NavLink,
  SeoMetadata,
  ChatResponse,
  SessionDto,
  MessageDto,
};

export const api = {
  getProfile: async (): Promise<Profile> => DEFAULT_PROFILE,
  getProjects: async (): Promise<Project[]> => DEFAULT_PROJECTS,
  getSkills: async (): Promise<Skill[]> => DEFAULT_SKILLS,
  getOrganizations: async (): Promise<Organization[]> => DEFAULT_ORGANIZATIONS,
  getGallery: async (): Promise<GalleryItem[]> => DEFAULT_GALLERY,
  getContact: async (): Promise<SocialLink[]> => DEFAULT_CONTACT,
  getNavLinks: async (): Promise<NavLink[]> => DEFAULT_NAV,
  getSeo: async (): Promise<SeoMetadata> => DEFAULT_SEO,

  sendChat: async (messages: { role: string; content: string }[], sessionId?: string, userId?: string): Promise<ChatResponse> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          sessionId,
          userId,
        }),
      });
      const data = await res.json();
      if (res.status === 429) {
        return {
          reply: data.reply,
          sessionId: sessionId || "",
          chips: [],
          limitReached: true,
          remaining: data.remaining,
          limit: data.limit,
        };
      }
      if (!res.ok) {
        console.error("Chat API error:", res.status, data);
        throw new Error(`API ${res.status}: ${JSON.stringify(data)}`);
      }
      return {
        reply: data.reply,
        sessionId: data.sessionId,
        chips: [],
        remaining: data.remaining,
        limit: data.limit,
      };
    } catch (e) {
      console.error("sendChat catch:", e);
      return {
        reply: "Maaf, lagi ada gangguan. Coba lagi ya!",
        sessionId: sessionId || "",
        chips: [],
      };
    }
  },

  getSessions: async (userId?: string): Promise<SessionDto[]> => {
    try {
      const params = new URLSearchParams({ action: "sessions" });
      if (userId) params.set("userId", userId);
      const res = await fetch(`/api/chat?${params}`);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },

  fetchQuota: async (userId?: string): Promise<{ used: number; limit: number; remaining: number }> => {
    try {
      const params = new URLSearchParams({ action: "quota" });
      if (userId) params.set("userId", userId);
      const res = await fetch(`/api/chat?${params}`);
      if (!res.ok) return { used: 0, limit: 3, remaining: 0 };
      return await res.json();
    } catch {
      return { used: 0, limit: 3, remaining: 0 };
    }
  },

  getChatHistory: async (sessionId: string, userId?: string): Promise<MessageDto[]> => {
    try {
      const params = new URLSearchParams({ action: "history", id: sessionId });
      if (userId) params.set("userId", userId);
      const res = await fetch(`/api/chat?${params}`);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },

  createSession: async (_title: string): Promise<{ id: string; title: string }> => {
    return { id: "", title: "" };
  },

  deleteSession: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/chat?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      return res.ok;
    } catch {
      return false;
    }
  },
};
