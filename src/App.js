import React from "react";
import BlogSearchApp from "./components/BlogSearchApp";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Blog Search Platform
        </h1>
        <BlogSearchApp />
      </div>
    </div>
  );
}

export default App;
