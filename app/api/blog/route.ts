import { NextResponse } from "next/server";

interface BlogPost {
  title: string;
  url: string;
  date: string;
  excerpt?: string;
}

export async function GET() {
  try {
    // Fetch blog posts from Cursor's website
    // Note: This is a placeholder - you'll need to update with the actual blog API endpoint
    // Common options: RSS feed, JSON API, or scraping
    
    // For now, returning mock data structure that can be replaced with real API call
    // Example: const response = await fetch('https://cursor.com/api/blog/posts');
    
    const blogPosts: BlogPost[] = [
      {
        title: "Cursor 0.40: Agent Mode and More",
        url: "https://cursor.com/blog",
        date: "2024-01-15",
        excerpt: "Introducing Agent Mode and powerful new features for AI-assisted coding.",
      },
      {
        title: "Building Faster with Cursor Composer",
        url: "https://cursor.com/blog",
        date: "2024-01-10",
        excerpt: "Learn how to use Composer to build features across multiple files.",
      },
      {
        title: "Getting Started with Cursor",
        url: "https://cursor.com/blog",
        date: "2024-01-05",
        excerpt: "A comprehensive guide to your first steps with Cursor.",
      },
    ];

    // TODO: Replace with actual API call to cursor.com/blog or RSS feed
    // Example implementation:
    // try {
    //   const response = await fetch('https://cursor.com/api/blog/posts', {
    //     headers: {
    //       'Accept': 'application/json',
    //     },
    //   });
    //   const data = await response.json();
    //   return NextResponse.json({ posts: data });
    // } catch (error) {
    //   // Fallback to cached/default posts
    //   return NextResponse.json({ posts: blogPosts });
    // }

    return NextResponse.json({ posts: blogPosts });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { posts: [] },
      { status: 500 }
    );
  }
}

