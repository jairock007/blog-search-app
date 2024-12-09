import React, { useState, useEffect } from "react";
import { Search, X, Filter } from "lucide-react";

// Sample blog post data
const BLOG_POSTS = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    content: "React Hooks revolutionized how we write React components...",
    author: "Jane Doe",
    tags: ["React", "JavaScript", "Web Development"],
  },
  {
    id: 2,
    title: "Advanced JavaScript Techniques",
    content: "Exploring the depths of JavaScript's powerful features...",
    author: "John Smith",
    tags: ["JavaScript", "Programming"],
  },
  {
    id: 3,
    title: "Design Patterns in Modern Web Development",
    content: "Understanding and implementing design patterns...",
    author: "Alice Johnson",
    tags: ["Design", "Web Development", "Architecture"],
  },
  {
    id: 4,
    title: "React Performance Optimization",
    content: "Techniques to make your React applications faster...",
    author: "Bob Williams",
    tags: ["React", "Performance"],
  },
  {
    id: 5,
    title: "Serverless Functions with AWS Lambda",
    content: "Deploying serverless functions on AWS Lambda...",
    author: "Charlie Brown",
    tags: ["AWS", "Serverless"],
  },
  {
    id: 6,
    title: "Introduction to GraphQL",
    content: "GraphQL is a query language for APIs...",
    author: "Eve Green",
    tags: ["GraphQL", "APIs"],
  },
  {
    id: 7,
    title: "React Context API",
    content: "The React Context API provides a way to share data...",
    author: "Franklin White",
    tags: ["React", "State Management"],
  },
  {
    id: 8,
    title: "React Hooks vs. Class Components",
    content: "Comparing React Hooks with class components...",
    author: "Grace Adams",
    tags: ["React", "Hooks"],
  },
  {
    id: 9,
    title: "Serverless Functions with AWS Lambda",
    content: "Deploying serverless functions on AWS Lambda...",
    author: "Charlie Brown",
    tags: ["AWS", "Serverless"],
  },
  {
    id: 10,
    title: "Introduction to GraphQL",
    content: "GraphQL is a query language for APIs...",
    author: "Eve Green",
    tags: ["GraphQL", "APIs"],
  },
];

const BlogSearchApp = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Available tags from all posts
  const allTags = [...new Set(BLOG_POSTS.flatMap((post) => post.tags))];

  // Search and filter logic
  useEffect(() => {
    const filtered = BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags.includes(tag));

      return matchesSearch && matchesTags;
    });

    setFilteredPosts(filtered);
  }, [searchTerm, selectedTags]);

  // Tag filter toggle
  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      {/* Search Container */}
      <div className="mb-4 relative">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchTerm && (
              <X
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setSearchTerm("")}
              />
            )}
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="ml-2 p-3 border rounded-lg hover:bg-gray-100"
          >
            <Filter />
          </button>
        </div>

        {/* Tag Filters */}
        {isFilterOpen && (
          <div className="mt-2 flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm 
                  ${
                    selectedTags.includes(tag)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      <div>
        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No posts found matching your search
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="border-b py-4 hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2">
                {post.content.slice(0, 150)}...
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">By {post.author}</span>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogSearchApp;
