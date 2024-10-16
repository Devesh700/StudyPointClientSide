import React, { useEffect } from 'react'
import ArticleListing from './Components/ArticleListing'
import TiltedBanner from '../components/utils/TiltedBanner'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addArticle, getAllArticle } from '../store/slices/articleSlice'
import { useNavigate } from 'react-router-dom'

const ArticlePage = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const allArticle=useSelector(state=>state.article.allArticles);

  useEffect(()=>{
    document.title="Articles | WebAlay"
    if(allArticle?.length===0)
    dispatch(getAllArticle())
  },[dispatch])
  const PostArticle=()=>{
    navigate("/postarticle")
  }
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <ArticleListing Articles={allArticle}/>
        <TiltedBanner heading={"start posting articles today"} description={"posting articles may give you a chance to present your knowledge among other peoples, so what are you waiting for lets create an article"} button={{text:"Create article",link:"",handleClick:PostArticle}}/>
      </main>
      {/* <Footer/> */}
    </div>
  )
}

export default ArticlePage
