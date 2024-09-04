"use client";

import { useState } from 'react'

export default function HomeHero() {

  return (
    <div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl pt-8 pb-32 sm:pb-48 sm:pt-12 lg:pb-56 lg:pt-14">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl text-shadow-lg shadow-gray-400">
              Jabbour Tasks Demo
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-500">
              A simple, RESTFul, React demo app.
            </p>
            <hr className='mt-3' />
            <ul>
              <li className="mt-2 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-500">
                <a href="https://nextjs.org/" target="_blank" className='hover:text-blue-700 transition ease-in-out'>
                  Nextjs frontend
                </a>
                <a href="https://github.com/georgejabbour/jabbour-tasks" target="_blank" className='ml-2 bg-gray-400 rounded-md text-sm p-1 hover:text-blue-700 transition ease-in-out'>
                  Github
                </a>
              </li>
              <li className="mt-6 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-500">
                <a href="https://www.djangoproject.com/" target="_blank" className='hover:text-blue-700 transition ease-in-out'>
                  Django backend
                </a>
                <a href="https://github.com/georgejabbour/tasks-api" target="_blank" className='ml-2 bg-gray-400 rounded-md text-sm p-1 hover:text-blue-700 transition ease-in-out'>
                  Github
                </a>
              </li>
              <li className="mt-6 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-500">
                <a href="https://www.postgresql.org/" target="_blank" className='hover:text-blue-700 transition ease-in-out'>
                  PostgreSQL database
                </a>
              </li>
              <li className="mt-6 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-500">
                <a href="https://authjs.dev/" target="_blank" className='hover:text-blue-700 transition ease-in-out'>
                  Authjs/Google OAuth for authentication
                </a>
              </li>
              <li className="mt-6 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-500">
                Deployed on <a href="https://vercel.com" target="_blank" className='hover:text-blue-700 transition ease-in-out'>Vercel</a> and <a href="https://railway.app/" target="_blank" className='hover:text-blue-700 transition ease-in-out'>Railway</a>
              </li>
            </ul>
            <hr className='mt-3' />
            <p className="mt-6 text-lg leading-8 text-gray-800 text-shadow-lg shadow-gray-500">
              Log in or sign up to see what&apos;s next.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
