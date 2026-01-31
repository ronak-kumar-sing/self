'use client';

import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Code2, Instagram, Youtube, Linkedin, Menu, X } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'DSA Problems', href: '/admin/dsa', icon: Code2 },
    { name: 'Instagram', href: '/admin/instagram', icon: Instagram },
    { name: 'YouTube', href: '/admin/videos', icon: Youtube },
    { name: 'LinkedIn', href: '/admin/linkedin', icon: Linkedin },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-zinc-200 bg-white transition-transform duration-200 ease-in-out dark:border-zinc-800 dark:bg-zinc-900 lg:static lg:translate-x-0",
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-zinc-100 px-6 dark:border-zinc-800">
            <Link href="/" className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                S
              </div>
              <span className="text-lg">Admin</span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="ml-auto lg:hidden"
            >
              <X className="h-5 w-5 text-zinc-500" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-400')} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="flex items-center border-b border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="mr-2"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <span className="font-semibold text-zinc-900 dark:text-white">Admin Dashboard</span>
        </div>

        <main className="flex-1 overflow-auto bg-zinc-50 p-4 dark:bg-zinc-950 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
