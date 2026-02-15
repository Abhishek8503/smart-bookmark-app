# Smart Bookmark App

A simple, secure bookmark manager built with Next.js (App Router), Supabase, and Tailwind CSS.

## 🚀 Live Demo

Live URL: https://smart-bookmark-app-khaki-nu.vercel.app/login

GitHub Repository: https://github.com/Abhishek8503/smart-bookmark-app

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **Supabase**
  - Authentication (Google OAuth)
  - PostgreSQL Database
  - Row Level Security (RLS)
- **Tailwind CSS**
- **TypeScript**

---

## ✨ Features

- Google OAuth authentication (no email/password)
- Private bookmarks per user
- Add and delete bookmarks
- Automatic data updates across tabs (polling fallback)
- Secure database with Row Level Security
- Fully deployed on Vercel

---

## 🔐 Authentication Flow

1. User clicks "Sign in with Google"
2. Supabase handles OAuth with Google
3. Google redirects back to Supabase
4. Supabase exchanges the OAuth code for a session
5. User is redirected to `/dashboard`
6. Session is stored securely in cookies

Both `/login` and `/dashboard` are protected using server-side session validation.

---

## 🗄 Database Design

Table: `bookmarks`

```sql
create table bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  created_at timestamp with time zone default now()
);
```

---

## 🔒 Row Level Security (RLS)

RLS is enabled to ensure users can only access their own data.

- SELECT
    ```
    using (user_id = auth.uid());
    ```
- INSERT
    ```
    with check (user_id = auth.uid());
    ```
- DELETE
    ```
    using (user_id = auth.uid());
    ```

    - This guarantees complete user-level data isolation at the database level.

---

## 🔄 Realtime Updates

- Realtime synchronization is implemented using Supabase Realtime with postgres_changes.

- The application subscribes to database changes on the bookmarks table and updates the UI instantly without requiring a page refresh.

- This ensures bookmark updates appear automatically across multiple tabs.

---

## 🧠 Architectural Decisions
1. Server vs Client Components

2. Interactive components use "use client"

3. Route protection is handled server-side

4. Supabase server client is abstracted into a reusable helper

5. This keeps authentication secure while minimizing client-side logic.

---

## ⚠ Challenges Faced & Solutions

### 1. Supabase SSR Cookie API Deprecation
- The createServerClient API changed to require getAll and setAll instead of get, set, and remove.

- Solution: Refactored the cookie adapter to align with the updated API.

### 2. React Event Type Deprecation

- React.FormEvent produced deprecation warnings in the environment.

- Solution:
Switched to React.SyntheticEvent<HTMLFormElement> for better type compatibility.

### 3. Supabase Replication Limitation

- Logical replication was unavailable in the current project, preventing realtime database subscriptions.

- Solution:
Implemented polling as a fallback to ensure updates occur without manual refresh. 
Update: The realtime workflow is in effect right now.

## 🧪 Testing Checklist

1. Multiple Google accounts tested

2. Two-tab synchronization verified

3. RLS confirmed (users cannot see each other's bookmarks)

4. Production deployment tested on Vercel

## 📦 Deployment

- Deployed using Vercel.

- Environment variables required:

        NEXT_PUBLIC_SUPABASE_URL
        NEXT_PUBLIC_SUPABASE_ANON_KEY
