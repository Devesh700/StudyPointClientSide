import React from 'react'
import ArticleListing from './Components/ArticleListing'
import TiltedBanner from '../components/utils/TiltedBanner'
import Footer from '../components/Footer'
import { useDispatch } from 'react-redux'
import { addArticle } from '../store/slices/articleSlice'

const ArticlePage = () => {
  const dispatch=useDispatch();

  const PostArticle=()=>{
    dispatch(addArticle());
  }
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <ArticleListing/>
        <TiltedBanner heading={"start posting articles today"} description={"posting articles may give you a chance to present your knowledge among other peoples, so what are you waiting for lets create an article"} button={{text:"Create article",link:"",handleClick:PostArticle}}/>
      </main>
      <Footer/>
    </div>
  )
}

export default ArticlePage
