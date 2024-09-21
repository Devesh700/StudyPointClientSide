import React, { useState } from 'react'
import ArticleForm from './Components/ArticleForm'
import ArticlePreview from './Components/ArticlePreview'

const PostArticle = () => {
    const [article,setArticle]=useState({title:"",technology:"",description:""})
  return (
    <div className='flex flex-wrap'>
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
