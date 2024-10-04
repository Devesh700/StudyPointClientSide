import React, { useState } from 'react'
import ArticleForm from './Components/ArticleForm'
import ArticlePreview from './Components/ArticlePreview'
import { useLocation } from 'react-router-dom'

const PostArticle = () => {
  // const Article=useLocation().state.article;
  // console.log(Article);
    const [article,setArticle]=useState({title:"",technology:"",description:"",post:""})
    console.log(article)
  return (
    <div className='flex flex-wrapz'>
        <div className='sm:w-80 w-full'>
            <ArticleForm article={article} setArticle={setArticle}/>
        </div>
        <div className='custom-w--80 sm:block hidden'>
            <ArticlePreview article={article}/>
        </div>
    </div>
  )
}

export default PostArticle
