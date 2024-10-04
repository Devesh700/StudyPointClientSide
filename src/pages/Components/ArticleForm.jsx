import React, { useEffect, useState } from 'react'
import Select from "react-select"
import TextEditor from '../../components/utils/TextEditor'
import { useDispatch, useSelector } from 'react-redux';
import { getAllSkillTitle } from '../../store/slices/tutorialSlice';
import { addArticle } from '../../store/slices/articleSlice';
const ArticleForm = ({article,setArticle}) => {
  const [img,setimg]=useState();
  const dispatch=useDispatch();
  const allTitle=useSelector((state)=>state.tutorials?.allTitle);
  const [optionValue,setoptionValue]=useState([])
  const handleImageChange=(e)=>{
    console.log(e.target)
    console.log(e.target.files)
    console.log(e.target.files[0])
    setimg(e.target.files[0]);
    setArticle(pre=>({...pre,post:URL.createObjectURL(e.target.files[0])}))
  }
  const PostArticle=()=>{
    debugger
    const formdata=new FormData();
    console.log(article);
    formdata.append("technology",article.technology)
    formdata.append("title",article.title)
    formdata.append("description",article.description)
    formdata.append("post",img)
    for (let [key, value] of formdata.entries()) {
  console.log(key, value);
}


    dispatch(addArticle(formdata))
  }
  useEffect(()=>{
    if(allTitle?.length===0)
    dispatch(getAllSkillTitle());
  },[dispatch])

  useEffect(()=>{
    if(allTitle?.length>0)
    setoptionValue(allTitle?.map(elem=>({label:elem.title,value:elem.title})))
  },[allTitle])
  return (
    <div className='w-full'>
      <form className='w-full sm:px-6 px-2 py-2 relative'>
        <div className='fixed z-10 right-5 top-24'>
        <button className='bg-green-800 text-white py-2 px-6 rounded-sm hover:bg-green-500 transition-colors' onClick={()=>PostArticle()} type='button'>Post Article</button>
      </div>
        <div>
            <label htmlFor='post' className='px-6 py-2 rounded-lg bg-primary text-white cursor-pointer'>select an article image</label>
            <input type='file' className='size-0 ' id='post' onChange={(e)=>handleImageChange(e)}/>
        </div>
        <div className='w-full'>
        <label htmlFor='technology' className='my-3 block'>
            Select technology   <span className='text-red-800'>*</span>
        </label>
        <Select
        id='technology'
        name='technology'
        className=''
        options={optionValue}
        closeMenuOnSelect={true}
        defaultInputValue={"select technology"}
        onChange={(selectedOption)=>setArticle(pre=>({...pre,technology:selectedOption.value}))}
        />
        </div>
        <div className='w-full'>
        <label htmlFor='title' className='my-3 block'>
            Enter Title of your Article  <span className='text-red-800'>*</span>
        </label>
        <input type='text' id='title' name='title' className=' py-3 px-2 w-full outline-gray-600 outline-1 outline rounded-lg border-slate-400 mb-4' onChange={(e)=>setArticle(pre=>({...pre,title:e.target.value}))} value={article.title}/>
        </div>

        <TextEditor setData={setArticle}/>
        
      </form>
    </div>
  )
}

export default ArticleForm
