// import React from 'react'

// const ArticleListing = () => {
//   return (
//     <div className='relative container mx-auto p-4 pt-10 lg:w-10/12 md:w-11/12 sm:w-full  my-4'>
//       <div className='absolute w-72 px-6 py-4'>
//         <a className='text-base py-4 border-2'>Author</a>
//         <h3 className='font-semibold text-2xl'>Title</h3>
//       </div>
//     </div>
//   )
// }

// export default ArticleListing


// ArticlesPage.jsx
import React from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
import ArticleCard from "./ArticleCard";
import Sidebar from "./Sidebar";

const ArticleListing = ({Articles}) => {
  const articles = [
    {
      title: "Learn React in 2023",
      description: "A comprehensive guide to React development.",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Understanding Tailwind CSS",
      description: "Master utility-first CSS with Tailwind.",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Top 10 JavaScript Tips",
      description: "Improve your JavaScript skills with these tips.",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Top 10 JavaScript Tips",
      description: "Improve your JavaScript skills with these tips.",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Top 10 JavaScript Tips",
      description: "Improve your JavaScript skills with these tips.",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Top 10 JavaScript Tips",
      description: "Improve your JavaScript skills with these tips.",
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <div className="container mx-auto sm:p-4 flex">
        {/* <Sidebar /> */}
        <div className="flex-grow sm:ml-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Articles</h2>
            <input
              type="text"
              placeholder="Search articles"
              className="border p-2 rounded-md sm:w-64 w-56"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                description={article.description}
                image={article.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleListing;
