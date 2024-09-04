'use client';

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import TaskList from '@/components/tasks/taskslist';
import { useSession } from "next-auth/react"
import HomeHero from '@/components/home-hero';

export default function Home() {
  const session = useSession()

  return (
    <>
      <div>
        <main className="py-10 h-screen">
          <div className="px-4 sm:px-6 lg:px-8">
            {session.status === "authenticated" && session.data.user && (
              <TaskList session={session} />
            )}
            {session.status === "unauthenticated" && (
              <HomeHero/>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
