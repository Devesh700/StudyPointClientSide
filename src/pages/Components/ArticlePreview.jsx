import React, { useEffect } from 'react'

const ArticlePreview = ({article}) => {
    useEffect(()=>{
        if(article?.description!==""){
            let description=document.getElementById("description")
            description.innerHTML="";
            article.description?.map((section)=>description.innerHTML+=section)
            // document.getElementById("description").innerHTML=article.description;
        }
    },[article])
  return (
    <div>
      <div className='w-full bg-primary-gradient h-64'>
        <h3 className='text-balance text-3xl font-semibold text-center text-white py-4'>{article?.title!==""?article.title:"This is Title"}</h3>
      </div>
        <img src='.././src/assets/hero.png' className='sm:size-72 size-56 object-cover relative sm:bottom-36 bottom-28 mx-auto'/>
        <p id='description' className='text-lg text-balance my-4 relative sm:bottom-36 bottom-28 text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum quas esse molestiae delectus a illum porro, consequatur voluptas earum sapiente nemo, velit quos non necessitatibus commodi alias soluta, quibusdam nam accusamus dicta culpa? Recusandae praesentium repellat dolores eum ad aspernatur iusto voluptas, aut in nisi ratione deleniti magni velit aliquam officiis? Reprehenderit impedit enim accusantium libero dolores, delectus nisi repellendus corporis. Quia, ullam? Necessitatibus deleniti ad provident non nemo eos maiores odit cum sit cupiditate nesciunt, aut ducimus, beatae vitae placeat omnis dignissimos voluptatibus dolores pariatur soluta. Necessitatibus laudantium tenetur, vero, cum magnam temporibus placeat consequatur blanditiis deserunt doloremque dicta.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis repellendus, modi, quod sunt officiis dolorem nulla, saepe illo dolorum aliquid tenetur illum. Ducimus deleniti corrupti animi veniam ut iusto sed, rem iure sequi adipisci asperiores dignissimos! Fugiat, corrupti nesciunt cumque quod provident, maxime consequuntur, labore natus maiores rem incidunt voluptatum libero quas? Perferendis explicabo placeat magnam, numquam earum quia dicta, quaerat accusamus maiores vero odit accusantium suscipit reiciendis at dolorem sequi nobis ullam ad, quisquam perspiciatis non! Natus, dolore voluptas, blanditiis hic impedit labore quo saepe quibusdam asperiores eum cumque, voluptatibus laborum nobis vero quam cum et eaque excepturi. Optio voluptatibus magni ex similique provident asperiores ad iure sequi veritatis, in quae deleniti aspernatur! Dolore mollitia veniam impedit eos sint totam minima ex aperiam. Quod omnis inventore saepe possimus optio consequuntur magnam nam voluptatibus corporis. Debitis blanditiis quo fugiat sed? Vitae totam ut sed nesciunt iure illo veritatis perferendis rem optio porro! Saepe perferendis blanditiis id fugit temporibus quibusdam similique atque soluta nisi ullam porro earum quidem inventore ipsam, doloribus qui vitae ratione placeat! Optio, fugit repudiandae similique obcaecati laboriosam ea expedita velit quod voluptate numquam cumque quam excepturi. Odio architecto corporis, atque laboriosam tenetur id a quam nam consequatur?
        </p>
    </div>
  )
}

export default ArticlePreview
