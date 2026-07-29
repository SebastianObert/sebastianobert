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

  sendChat: async (message: string, sessionId?: string): Promise<ChatResponse> => ({
    reply: "Chatbot sedang offline. Coba lagi nanti.",
    sessionId: sessionId || "",
    chips: [],
  }),

  getSessions: async (): Promise<SessionDto[]> => [],

  getChatHistory: async (_sessionId: string): Promise<MessageDto[]> => [],

  createSession: async (title: string): Promise<{ id: string; title: string }> => ({
    id: crypto.randomUUID(),
    title,
  }),

  deleteSession: async (_id: string): Promise<boolean> => false,
};
