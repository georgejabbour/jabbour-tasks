import { auth } from "@/auth";

// lib/taskHelpers.ts
const baseUrl = 'http://localhost:8000'

export async function fetchTasks() {
  const session = await auth();
  console.log('session user', session?.user);
  const res = await fetch(baseUrl + '/api/tasks', {
    headers: {
    }
  });
  const data = await res.json();
  return data;
}

export async function submitTaskData(
  url: string,
  method: 'POST' | 'PUT',
  body: object
) {
  const res = await fetch(baseUrl + url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res.ok;
}

export async function exchangeToken(sessionToken: string) {
  const response = await fetch(baseUrl+'/api/exchange-token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ session_token: sessionToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange token');
  }

  const data = await response.json();
  return data;
}

export async function refreshToken(refreshToken: string){
  const response = await fetch(baseUrl+'/api/refresh-token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  return data;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};