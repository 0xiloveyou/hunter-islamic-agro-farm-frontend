import type { SidebarItems } from "@/types";

export const adminRoutes: SidebarItems = [
  {
    title: "Management",
    items: [
      { title: "Overview", url: "/admin" },
      { title: "Shark Applications", url: "/admin/approve-shark" },
      { title: "Shares", url: "/shares" },
    ],
  },
  {
    title: "Operations",
    items: [
      { title: "Projects", url: "/projects" },
      { title: "Public Site", url: "/" },
    ],
  },
];

export const sharkRoutes: SidebarItems = [
  {
    title: "Workspace",
    items: [
      { title: "Overview", url: "/shark" },
      { title: "Buy Shares", url: "/shares" },
      { title: "Projects", url: "/projects" },
    ],
  },
];

export const investorRoutes: SidebarItems = [
  {
    title: "Workspace",
    items: [
      { title: "Overview", url: "/investor" },
      { title: "Buy Shares", url: "/shares" },
      { title: "Projects", url: "/projects" },
    ],
  },
];
