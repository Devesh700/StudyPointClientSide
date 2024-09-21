import React from 'react'
import Select from "react-select"
import TextEditor from '../../components/utils/TextEditor'
const ArticleForm = ({article,setArticle}) => {
  return (
    <div className='w-full'>
      <form className='w-full sm:px-6 px-2 py-2'>
        <div>
            <label htmlFor='post' className='px-6 py-2 rounded-lg bg-primary text-white cursor-pointer'>select an article image</label>
            <input type='file' className='size-0 ' id='post'/>
        </div>
        <div className='w-full'>
        <label htmlFor='technology' className='my-3 block'>
            Select technology   <span className='text-red-800'>*</span>
        </label>
        <Select
        id='technology'
        name='technology'
        className=''
        options={[]}
        closeMenuOnSelect={true}
        defaultInputValue={"selecte technology"}
        onChange={(selectedOption)=>setArticle(pre=>({...pre,technology:selectedOption.value}))}
        />
        </div>
        <div className='w-full'>
        <label htmlFor='title' className='my-3 block'>
            Enter Title of your Article  <span className='text-red-800'>*</span>
        </label>
        <input type='text' id='title' name='title' className=' py-3 px-2 w-full outline-gray-600 outline-1 outline rounded-lg border-slate-400 mb-4' onChange={(e)=>setArticle(pre=>({...pre,title:e.target.value}))}/>
        </div>

        <TextEditor setData={setArticle}/>
        
      </form>
    </div>
  )
}

export default ArticleForm
