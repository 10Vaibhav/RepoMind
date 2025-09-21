"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Bot,
  CreditCard,
  LayoutDashboard,
  Plus,
  Presentation,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useProject from "@/hooks/use-project";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Q&A",
    url: "/qa",
    icon: Bot,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Presentation,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
];


export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const {projects, projectId, setProjectId} = useProject();
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2">
        <a href="./" className="flex items-center min-w-0" aria-label="RepoMind Home">
                <span className="relative">
                  <div className="bg-primary p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
                    <img 
                      src="/cosmic-logo.jpg" 
                      alt="RepoMind Logo" 
                      className="h-4 w-4 sm:h-6 sm:w-6 object-cover rounded"
                    />
                    <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-white hidden" />
                  </div>
                </span>
              </a>
          {open && (
            <h1 className="text-primary/80 text-xl font-bold">RepoMind</h1>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          {
                            "!bg-primary !text-white": pathname === item.url,
                          },
                          "list-none",
                        )}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((project) => {
                return (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <div onClick={()=> {
                        setProjectId(project.id);
                      }}>
                        <div
                          className={cn(
                            "text-primary flex size-6 items-center justify-center rounded-sm bg-white text-sm",
                            {
                              'bg-primary text-white': project.id === projectId
                            },
                          )}
                        >
                          {project.name[0]}
                        </div>
                        <span>{project.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <div className="h-2"></div>

              {open && (
                <SidebarMenuItem>
                  <Link href="/create">
                    <Button size="sm" variant={"outline"} className="w-fit">
                      <Plus />
                      Create Project
                    </Button>
                  </Link>
                </SidebarMenuItem>
              )}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
