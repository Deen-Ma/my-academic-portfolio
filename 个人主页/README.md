# Academic Portfolio

A modern, minimal academic portfolio website built with Next.js 14, Tailwind CSS, and MDX.

## Features

- 🎨 **Minimal Design**: Clean, professional layout inspired by top academic websites
- 📝 **MDX Support**: Write technical notes with Markdown + React components
- 📐 **LaTeX Support**: Full KaTeX integration for mathematical formulas
- 🎯 **Syntax Highlighting**: Beautiful code highlighting with highlight.js
- 📱 **Responsive**: Perfect on all devices
- ⚡ **Fast**: Optimized for performance with Next.js App Router
- 🔍 **SEO Ready**: Built-in metadata and Open Graph support
- 💡 **Tech Board**: A dynamic bulletin board for quick tech tips (powered by Supabase)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── actions.ts          # Server Actions (CRUD for Tech Board)
│   │   ├── notes/              # Technical notes section
│   │   │   ├── page.tsx        # Notes listing
│   │   │   └── [slug]/         # Individual note pages
│   │   └── tech-board/         # Tech Board (Supabase)
│   │       └── page.tsx        # Dynamic bulletin board
│   ├── components/             # React components
│   │   ├── Hero.tsx            # Hero section
│   │   ├── Navbar.tsx          # Navigation
│   │   ├── Footer.tsx          # Footer
│   │   ├── News.tsx            # News timeline
│   │   ├── Publications.tsx    # Publications list
│   │   ├── PublicationItem.tsx # Single publication
│   │   ├── Projects.tsx        # Projects grid
│   │   └── MDXContent.tsx      # MDX renderer
│   └── lib/                    # Utilities
│       └── notes.ts            # Note processing
├── content/
│   └── notes/                  # MDX note files
├── public/                     # Static assets
│   ├── avatar.jpg              # Your photo
│   └── cv.pdf                  # Your CV
└── package.json
```

## Writing Notes

Create a new `.mdx` file in `content/notes/`:

```mdx
---
title: "Your Note Title"
date: "2026-01-13"
description: "Brief description"
tags: ["Tag1", "Tag2"]
category: "Category Name"
---

# Your Content

Write your content here with **Markdown** and LaTeX:

$$
E = mc^2
$$

```python
print("Hello, World!")
```
```

## Customization

### Personal Information

Edit the following files:
- `src/components/Hero.tsx`: Name, title, bio, social links
- `src/components/News.tsx`: News items
- `src/components/Publications.tsx`: Publication list
- `src/components/Projects.tsx`: Project cards
- `src/app/layout.tsx`: SEO metadata

### Styling

- Colors: `tailwind.config.ts`
- Global styles: `src/app/globals.css`

## Tech Board Setup (Supabase)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to **SQL Editor** and run the following SQL:

```sql
-- Create tech_notes table
CREATE TABLE tech_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'General',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_tech_notes_created_at ON tech_notes(created_at DESC);

-- Enable RLS
ALTER TABLE tech_notes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON tech_notes FOR SELECT USING (true);
CREATE POLICY "Allow insert" ON tech_notes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow delete" ON tech_notes FOR DELETE USING (true);
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ADMIN_SECRET=your-super-secret-admin-key
```

- Get Supabase URL and Anon Key from: **Settings > API**
- Set a strong `ADMIN_SECRET` for publishing notes

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

```bash
npm run build
npm start
```

## License

MIT

## License

MIT
