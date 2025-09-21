import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { AppSidebar } from "./app-sidebar";

type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="m-2 w-full">
        <div className="bg-sidebar flex items-center gap-2 rounded-md p-2 px-4 shadow">
          {/* Mobile hamburger menu */}
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          {/* <SearchBar /> */}
          <div className="ml-auto"></div>
          <UserButton />
        </div>
        <div className="h-4"></div>
        {/* main content */}
        <div className="bg-sidebar h-[calc(100vh-6rem)] overflow-y-scroll rounded-md p-4 shadow">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
