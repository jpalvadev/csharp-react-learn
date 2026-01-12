import {
    ChevronRightIcon,
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    TwitterIcon,
} from 'lucide-react';

import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';

import ProfileDropdown from '@/components/blocks/DropdownProfile';

import { ModeToggle } from '@/components/blocks/ModeToggle';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { navigationConfig } from '@/config/navigation';
import type { ReactNode } from 'react';

type AppShellProps = {
    children: ReactNode;
};

const AppShell = ({ children }: AppShellProps) => {
    return (
        <div className="flex min-h-dvh w-full">
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        {navigationConfig.map(
                            (navMainMenu, navMainMenuIndex) => (
                                <SidebarGroup key={navMainMenuIndex}>
                                    {navMainMenu.title && (
                                        <SidebarGroupLabel>
                                            {navMainMenu.title}
                                        </SidebarGroupLabel>
                                    )}
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {navMainMenu?.menus?.map(
                                                (menu, menuIndex) =>
                                                    menu.menus ? (
                                                        <Collapsible
                                                            key={menuIndex}
                                                            defaultOpen={false}
                                                            className="group/collapsible"
                                                        >
                                                            <SidebarMenuItem>
                                                                <CollapsibleTrigger
                                                                    asChild
                                                                >
                                                                    <SidebarMenuButton>
                                                                        {menu.icon && (
                                                                            <menu.icon />
                                                                        )}

                                                                        <span>
                                                                            {
                                                                                menu.title
                                                                            }
                                                                        </span>
                                                                        <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                                                    </SidebarMenuButton>
                                                                </CollapsibleTrigger>
                                                                <CollapsibleContent>
                                                                    <SidebarMenuSub>
                                                                        {menu.menus.map(
                                                                            (
                                                                                m,
                                                                                mIndex
                                                                            ) => (
                                                                                <SidebarMenuSubItem
                                                                                    key={
                                                                                        mIndex
                                                                                    }
                                                                                >
                                                                                    <SidebarMenuSubButton
                                                                                        asChild
                                                                                    >
                                                                                        <Link
                                                                                            to={
                                                                                                m.to!
                                                                                            }
                                                                                            activeOptions={{
                                                                                                exact: true,
                                                                                            }}
                                                                                            className="[&.active]:font-bold [&.active>svg]:stroke-3"
                                                                                        >
                                                                                            {m.icon && (
                                                                                                <m.icon />
                                                                                            )}
                                                                                            <span>
                                                                                                {
                                                                                                    m.title
                                                                                                }
                                                                                            </span>
                                                                                        </Link>
                                                                                    </SidebarMenuSubButton>
                                                                                </SidebarMenuSubItem>
                                                                            )
                                                                        )}
                                                                    </SidebarMenuSub>
                                                                </CollapsibleContent>
                                                            </SidebarMenuItem>
                                                        </Collapsible>
                                                    ) : (
                                                        <SidebarMenuItem
                                                            key={menuIndex}
                                                        >
                                                            <SidebarMenuButton
                                                                asChild
                                                            >
                                                                <Link
                                                                    to={
                                                                        menu.to!
                                                                    }
                                                                    className="[&.active]:font-bold [&.active>svg]:stroke-3"
                                                                >
                                                                    {menu.icon && (
                                                                        <menu.icon />
                                                                    )}
                                                                    <span>
                                                                        {
                                                                            menu.title
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            </SidebarMenuButton>
                                                            {menu.badge && (
                                                                <SidebarMenuBadge className="bg-primary/10 rounded-full">
                                                                    {menu.badge}
                                                                </SidebarMenuBadge>
                                                            )}
                                                        </SidebarMenuItem>
                                                    )
                                            )}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            )
                        )}
                    </SidebarContent>
                </Sidebar>
                <div className="flex flex-1 flex-col">
                    <header className="bg-card sticky top-0 z-50 border-b">
                        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
                            <div className="flex items-center gap-4">
                                <SidebarTrigger className="[&_svg]:!size-5" />
                                <Separator
                                    orientation="vertical"
                                    className="hidden !h-4 sm:block"
                                />
                                <Breadcrumb className="hidden sm:block">
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="#">
                                                Home
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="#">
                                                Dashboard
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>
                                                Implementar Breadcrumb
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ModeToggle />
                                <ProfileDropdown
                                    trigger={
                                        <Button variant="ghost" size="icon">
                                            <Avatar className="rounded-md">
                                                <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
                                                <AvatarFallback>
                                                    JPA
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                    </header>

                    {/* Main Content - Outlet */}
                    <main className="mx-auto size-full max-w-480 flex-1 p-4 sm:px-6">
                        {children}
                    </main>

                    {/* Footer */}
                    <footer>
                        <div className="text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6">
                            <p className="text-sm text-balance max-sm:text-center">
                                {`©${new Date().getFullYear()}`}{' '}
                                <a href="#" className="text-primary">
                                    By Juan
                                </a>
                                , Made with ❤
                            </p>
                            <div className="flex items-center gap-5">
                                <a href="#">
                                    <FacebookIcon className="size-4" />
                                </a>
                                <a href="#">
                                    <InstagramIcon className="size-4" />
                                </a>
                                <a href="#">
                                    <LinkedinIcon className="size-4" />
                                </a>
                                <a href="#">
                                    <TwitterIcon className="size-4" />
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default AppShell;
