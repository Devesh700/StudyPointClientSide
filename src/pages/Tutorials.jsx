import React, { useEffect } from 'react'
import Sidebar from './Components/Sidebar'
import TextEditor from '../components/utils/TextEditor';

const Tutorials = () => {
    let str="<h1>heading</h1> <p>heading ends here </p> <ul><li>first list</li><li>second list</li></ul>"
    // function putinnerHtml(){

    // let innerhtml=document.getElementById("innerhtml");
    // console.log(innerhtml);
    // innerhtml.innerHTML=str
    // }
    // useEffect(()=>{
    //     putinnerHtml();
    // },[])
  return (
    <div className='flex justify-between'>
      <Sidebar/>
      {/* <div dangerouslySetInnerHTML={{__html:str}}/> */}
      {/* <div id='innerhtml' onLoad={putinnerHtml} onLoadedData={putinnerHtml}></div> */}
      <div className='w-8/12'>
      <TextEditor/>
      </div>
    </div>
  )
}

export default Tutorials
