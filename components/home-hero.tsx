"use client";

import { useState } from 'react'

export default function HomeHero() {

  return (
    <div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl pt-16 pb-32 sm:pb-48 sm:pt-24 lg:pb-56 lg:pt-28">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl text-shadow-lg shadow-gray-400">
              Jabbour Tasks
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-400">
              A Nextjs + Django demo app. 
            </p>
            <ul>
              <li className="mt-6 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-400">
                Nextjs frontend
              </li>
              <li className="mt-6 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-400">
                Django backend
              </li>
              <li className="mt-6 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-400">
                PostgreSQL database
              </li>
              <li className="mt-6 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-400">
                Authjs/Google OAuth for authentication
              </li>
              <li className="mt-6 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-400">
                Deployed on Vercel and Railway
              </li>
            </ul>
            <hr className='mt-3'/>
            <p className="mt-6 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-400">
              Log in or sign up to see what&apos;s next.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
