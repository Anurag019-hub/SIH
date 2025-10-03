import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-orange-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-[10rem] font-extrabold text-orange-500 animate-pulse">
          404
        </h1>
        <p className="text-3xl sm:text-4xl font-semibold mb-4">
          Page Not Found
        </p>
        <p className="text-md sm:text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-orange-600 transition-all duration-300"
        >
          Go to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;