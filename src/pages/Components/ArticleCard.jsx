import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ title, description, image,link }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition duration-300 sm:max-w-full w-full">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md" />
      <h3 className="font-bold text-xl mt-4">{title}</h3>
      {/* <p className="text-gray-600 mt-2">{description}</p> */}
      <Link to={`/${title}/${link}`} className="text-blue-500 mt-4 inline-block hover:underline">Read More</Link>
    </div>
  );
};

export default ArticleCard;