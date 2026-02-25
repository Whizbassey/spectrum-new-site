-- ============================================
-- SPECTRUM AI WEBSITE - DATABASE SETUP
-- Run this in Supabase SQL Editor
-- ============================================

-- Check existing tables and their status
-- This script creates tables if they don't exist and adds RLS policies

-- ============================================
-- BLOG POSTS
-- ============================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'blog_posts') THEN
        CREATE TABLE blog_posts (
          id SERIAL PRIMARY KEY,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          title TEXT NOT NULL,
          content TEXT,
          category TEXT,
          cover_image TEXT,
          slug TEXT UNIQUE
        );
    END IF;
END $$;

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to recreate cleanly)
DROP POLICY IF EXISTS "Public read blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Auth insert blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Auth update blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Auth delete blog_posts" ON blog_posts;

-- Create policies
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Auth insert blog_posts" ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update blog_posts" ON blog_posts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete blog_posts" ON blog_posts FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- CATEGORIES
-- ============================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'categories') THEN
        CREATE TABLE categories (
          id SERIAL PRIMARY KEY,
          name TEXT UNIQUE NOT NULL
        );
    END IF;
END $$;

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read categories" ON categories;
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth insert categories" ON categories;
CREATE POLICY "Auth insert categories" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- CASE STUDIES
-- ============================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'case_studies') THEN
        CREATE TABLE case_studies (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          company TEXT,
          industry TEXT,
          cover_image TEXT,
          description TEXT,
          results TEXT,
          slug TEXT UNIQUE
        );
    END IF;
END $$;

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read case_studies" ON case_studies;
CREATE POLICY "Public read case_studies" ON case_studies FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth insert case_studies" ON case_studies;
CREATE POLICY "Auth insert case_studies" ON case_studies FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Auth update case_studies" ON case_studies;
CREATE POLICY "Auth update case_studies" ON case_studies FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Auth delete case_studies" ON case_studies;
CREATE POLICY "Auth delete case_studies" ON case_studies FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- INDUSTRIES
-- ============================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'industries') THEN
        CREATE TABLE industries (
          id SERIAL PRIMARY KEY,
          name TEXT UNIQUE NOT NULL
        );
    END IF;
END $$;

ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read industries" ON industries;
CREATE POLICY "Public read industries" ON industries FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth insert industries" ON industries;
CREATE POLICY "Auth insert industries" ON industries FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- SERVICES
-- ============================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'services') THEN
        CREATE TABLE services (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          icon TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;
END $$;

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read services" ON services;
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth insert services" ON services;
CREATE POLICY "Auth insert services" ON services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Auth update services" ON services;
CREATE POLICY "Auth update services" ON services FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Auth delete services" ON services;
CREATE POLICY "Auth delete services" ON services FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- SOLUTIONS
-- ============================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'solutions') THEN
        CREATE TABLE solutions (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          platforms TEXT[],
          industries TEXT[],
          impact TEXT,
          details TEXT,
          category TEXT
        );
    END IF;
END $$;

ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read solutions" ON solutions;
CREATE POLICY "Public read solutions" ON solutions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth insert solutions" ON solutions;
CREATE POLICY "Auth insert solutions" ON solutions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Auth update solutions" ON solutions;
CREATE POLICY "Auth update solutions" ON solutions FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Auth delete solutions" ON solutions;
CREATE POLICY "Auth delete solutions" ON solutions FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- TEAM MEMBERS
-- ============================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'team_members') THEN
        CREATE TABLE team_members (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          role TEXT,
          bio TEXT,
          image TEXT,
          linkedin TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;
END $$;

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read team_members" ON team_members;
CREATE POLICY "Public read team_members" ON team_members FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth insert team_members" ON team_members;
CREATE POLICY "Auth insert team_members" ON team_members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Auth update team_members" ON team_members;
CREATE POLICY "Auth update team_members" ON team_members FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Auth delete team_members" ON team_members;
CREATE POLICY "Auth delete team_members" ON team_members FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- TESTIMONIALS
-- ============================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'testimonials') THEN
        CREATE TABLE testimonials (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          role TEXT,
          company TEXT,
          content TEXT NOT NULL,
          avatar TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;
END $$;

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read testimonials" ON testimonials;
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth insert testimonials" ON testimonials;
CREATE POLICY "Auth insert testimonials" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Auth update testimonials" ON testimonials;
CREATE POLICY "Auth update testimonials" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Auth delete testimonials" ON testimonials;
CREATE POLICY "Auth delete testimonials" ON testimonials FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE SETUP
-- ============================================
-- Create blog-images bucket if not exists
INSERT INTO storage.buckets (id, name, public) 
SELECT 'blog-images', 'blog-images', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'blog-images');

-- Storage policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Auth Upload" ON storage.objects;
CREATE POLICY "Auth Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Auth Update" ON storage.objects;
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Add missing columns to blog_posts
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image TEXT;

-- Add missing column to case_studies (image)
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS image TEXT;

-- ============================================
-- DONE
-- ============================================
SELECT 'Columns added!' as status;
