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
import { useNavigate } from "react-router-dom";

const ArticleListing = ({Articles}) => {
  const navigate=useNavigate();
  console.log(Articles);
  const articles = Articles?Articles:[
    {
      name: "Learn React in 2023",
      description: "A comprehensive guide to React development.",
      post: "https://via.placeholder.com/300",
    },
    {
      name: "Understanding Tailwind CSS",
      description: "Master utility-first CSS with Tailwind.",
      post: "https://via.placeholder.com/300",
    },
    {
      name: "Top 10 JavaScript Tips",
      description: "Improve your JavaScript skills with these tips.",
      post: "https://via.placeholder.com/300",
    },
    {
      name: "Top 10 JavaScript Tips",
      description: "Improve your JavaScript skills with these tips.",
      post: "https://via.placeholder.com/300",
    },
    {
      name: "Top 10 JavaScript Tips",
      description: "Improve your JavaScript skills with these tips.",
      post: "https://via.placeholder.com/300",
    },
    {
      name: "Top 10 JavaScript Tips",
      description: "Improve your JavaScript skills with these tips.",
      post: "https://via.placeholder.com/300",
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {articles?.length===0 && 
              <div className="place-custom-center mt-8">
                <h3 className="text-2xl font-semibold my-4">No Articles to Display</h3>
                <button className="bg-green-600 text-white px-8 py-2 rounded-md" onClick={()=>navigate("/postarticle")}>Post Article</button>
              </div>}

            {articles.map((article, index) => (
              <ArticleCard
                key={index}
                title={article?.name?article?.name:article?.title?article?.title:"title"}
                description={article?._id?.description}
                image={article?._id?.post?article?._id?.post:article?.post?article.post:"https://via.placeholder.com/300"}
                link={article?._id}
                postedBy={article?.postedBy}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleListing;
