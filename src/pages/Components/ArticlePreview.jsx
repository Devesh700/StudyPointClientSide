import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { addLike, getArticleById, removeLike } from '../../store/slices/articleSlice';
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft, FaHeart } from 'react-icons/fa6';
import hero from "../../assets/hero.webp"
import { verifyLogin } from '../../components/utils';

const ArticlePreview = ({article}) => {
  const params=useParams();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const articleDetail=useSelector(state=>state.article.article)
  const User=JSON.parse(sessionStorage.getItem("user"))?.user || useSelector(state=>state.user.user)
  const [edit,setEdit]=useState(false);
  const [liked,setliked]=useState(false);
  const [Article,setArticle]=useState();
  const timeRef=useRef();
    useEffect(()=>{
        if(Article?.description!==""){
            let description=document.getElementById("description")
            description.innerHTML="";
            Article?.description?.map((section)=>description.innerHTML+=section)
            // document.getElementById("description").innerHTML=article.description;
        }
    },[Article])

    useEffect(()=>{
      if(!params?._id)
      setArticle(article)
    },[article])

    useEffect(()=>{
     //debugger
      if(params._id){
        if(!articleDetail?._id || articleDetail?._id!==params._id)
        dispatch(getArticleById(params._id));
      }
    },[params,dispatch])

    useEffect(()=>{
      console.log(articleDetail);
      setArticle(articleDetail)
      if(articleDetail?.postedBy===User?._id)
      !edit && setEdit(true);
      else
      edit && setEdit(false)
    },[articleDetail])

    useEffect(()=>{
      ////debugger
      if(!timeRef.current){
      const liked=Article?.likes?.find(elem=>elem?.likedBy===User?._id);      
      setliked(liked?true:false);
      }
    },[Article,User])

    const handleLike = () => {
      if(!verifyLogin()){
        alert("please log in to continue liking posts");
        return ;
      }
  const prevLiked = liked; // Capture the previous like status
  setliked(!liked); // Optimistically update the like status

  if (timeRef.current) {
    clearTimeout(timeRef.current);
  }

  // Use a timeout for the API call (optional, but gives smoother UX)
  timeRef.current = setTimeout(() => {
    // Based on previous like status, make the respective API call
    const liked=Article?.likes?.find(elem=>elem?.likedBy===User?._id);      
    if (!prevLiked && !liked) {
      // Article was not liked, so add a like
      dispatch(addLike({ articleId: Article?._id, title: Article?.title }))
        .unwrap()
        .then(data => {
          if (data?._id) {
            // Update the article with the new like data
            setArticle(data);
          } else {
            // If there's no valid response, revert the optimistic update
            setliked(prevLiked);
          }
        })
        .catch(err => {
          console.error("Add like error: ", err);
          // If there's an error, revert the optimistic update
          setliked(prevLiked);
        });
    } else if(liked){
      // Article was liked, so remove the like
      dispatch(removeLike({ articleId: Article?._id, title: Article?.title }))
        .unwrap()
        .then(data => {
          if (data?._id) {
            // Update the article with the new like data
            setArticle(data);
          } else {
            // If there's no valid response, revert the optimistic update
            setliked(prevLiked);
          }
        })
        .catch(err => {
          console.error("Remove like error: ", err);
          // If there's an error, revert the optimistic update
          setliked(prevLiked);
        });
    }
  }, 1000); // Adjust the delay to suit the UX, you can remove it for instant calls
};



      

  return (
    <div>
      <div className='w-full bg-primary-gradient h-64 relative'>
        <button className='absolute md:right-8 right-1 md:top-8 top-2 text-white' onClick={()=>handleLike()}><FaHeart className={!liked?'text-white text-3xl':'text-red-600 text-4xl'}/>{Article?.likes?.length} </button>
        {/* {edit && <button className='text-white text-3xl font-bold absolute right-5'
        onClick={()=>navigate("/postarticle",{state:{article:Article}})}><FaDeleteLeft/></button>} */}
        <h3 className='text-balance text-3xl font-semibold text-center text-white py-4'>{Article?.title!==""?Article?.title:"This is Title"}</h3>
      </div>
        <img src={Article?.post?Article?.post:'.././src/assets/hero.webp'} className='sm:size-72 size-56 object-cover relative sm:bottom-36 bottom-28 mx-auto'/>
        <div id='description' className='text-lg text-balance my-4 relative sm:bottom-36 bottom-28 px-4 w-full mx-auto'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum quas esse molestiae delectus a illum porro, consequatur voluptas earum sapiente nemo, velit quos non necessitatibus commodi alias soluta, quibusdam nam accusamus dicta culpa? Recusandae praesentium repellat dolores eum ad aspernatur iusto voluptas, aut in nisi ratione deleniti magni velit aliquam officiis? Reprehenderit impedit enim accusantium libero dolores, delectus nisi repellendus corporis. Quia, ullam? Necessitatibus deleniti ad provident non nemo eos maiores odit cum sit cupiditate nesciunt, aut ducimus, beatae vitae placeat omnis dignissimos voluptatibus dolores pariatur soluta. Necessitatibus laudantium tenetur, vero, cum magnam temporibus placeat consequatur blanditiis deserunt doloremque dicta.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis repellendus, modi, quod sunt officiis dolorem nulla, saepe illo dolorum aliquid tenetur illum. Ducimus deleniti corrupti animi veniam ut iusto sed, rem iure sequi adipisci asperiores dignissimos! Fugiat, corrupti nesciunt cumque quod provident, maxime consequuntur, labore natus maiores rem incidunt voluptatum libero quas? Perferendis explicabo placeat magnam, numquam earum quia dicta, quaerat accusamus maiores vero odit accusantium suscipit reiciendis at dolorem sequi nobis ullam ad, quisquam perspiciatis non! Natus, dolore voluptas, blanditiis hic impedit labore quo saepe quibusdam asperiores eum cumque, voluptatibus laborum nobis vero quam cum et eaque excepturi. Optio voluptatibus magni ex similique provident asperiores ad iure sequi veritatis, in quae deleniti aspernatur! Dolore mollitia veniam impedit eos sint totam minima ex aperiam. Quod omnis inventore saepe possimus optio consequuntur magnam nam voluptatibus corporis. Debitis blanditiis quo fugiat sed? Vitae totam ut sed nesciunt iure illo veritatis perferendis rem optio porro! Saepe perferendis blanditiis id fugit temporibus quibusdam similique atque soluta nisi ullam porro earum quidem inventore ipsam, doloribus qui vitae ratione placeat! Optio, fugit repudiandae similique obcaecati laboriosam ea expedita velit quod voluptate numquam cumque quam excepturi. Odio architecto corporis, atque laboriosam tenetur id a quam nam consequatur?
        </div>
    </div>
  )
}

export default ArticlePreview
