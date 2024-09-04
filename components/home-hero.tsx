"use client";

import { useState } from 'react'

export default function HomeHero() {

  return (
    <div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl text-shadow-lg shadow-gray-400">
              Jabbour Tasks
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-400">
              Log in or sign up to see what&apos;s next.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
