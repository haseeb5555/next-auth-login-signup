"use client"

// import { Login } from '@/components/Login'
// import { SignUp } from '@/components/SignUp'
// import Image from 'next/image'
// const linksArray = [
//   {
//       text: 'FAQ',
//       url: '/'
//   },
//   {
//       text: 'Help Center',
//       url: '/'
//   },
//   {
//       text: 'Terms of Use',
//       url: '/'
//   },
//   {
//       text: 'Privacy',
//       url: '/'
//   },
//   {
//       text: 'Cookie Preferences',
//       url: '/'
//   },
//   {
//       text: 'Corporate Information',
//       url: '/'
//   }
// ];
import {useInfiniteQuery} from '@tanstack/react-query';
import {useIntersection} from '@mantine/hooks'
import { use, useEffect, useRef ,useState} from 'react';

// Define an array to hold the fetched posts
interface Post {
  userId: number;
  id:number;
  title : string ;
  body:string | null| undefined;

}
let posts:Post[] = [];

// Fetch posts from JSONPlaceholder API
fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((data) => {
    // Destructure the data into the 'posts' array
    posts = [...data];

    // You can now work with the 'posts' array
    console.log(posts);
  })
  .catch((error) => {
    // Handle errors here
    console.error('Error:', error);
  });


const fetchPost = async(page:number)=>{
  await new Promise((resolve)=>setTimeout(resolve,1000))
  return posts.slice((page-1)*2,page*2)
}


export default function Home() {
const {data,fetchNextPage,isFetchingNextPage}= useInfiniteQuery(
  ['query'],
  async({pageParam=1})=>{
   const res = await fetchPost(pageParam)
   return res
  },
  {
    getNextPageParam:(_,pages)=>{
      return pages.length+1
    },
    initialData:{
      pages:[posts.slice(0,2)],
      pageParams:[1]
    }
  }
)

const lastPostRef = useRef<HTMLElement>(null)

const {ref, entry}=useIntersection({
  root:lastPostRef.current,
  threshold:1
})
useEffect(()=>{
  if(entry?.isIntersecting) fetchNextPage()
},[entry])

const _posts = data?.pages.flatMap((page)=>page)



 
  return (


      <div>
      post:

        {_posts?.map((post,i)=>{
          if(i===_posts.length-1)
          return(
        <>

        <div className='h-80 bg-white text-3xl text-black' ref={ref} key={post.id}>{post.title}</div>
        <p>{post.body}</p>
    
        </>
        )
        
          return(
          <>
          
          <div className='h-80 bg-white text-3xl text-black' key={post.id}>{post.title}</div>
          <p>{post.body}</p>
          </>
          )
})}
     
      <button onClick={()=>fetchNextPage()} disabled={isFetchingNextPage}>
       {isFetchingNextPage?
       "loading more..."
        :(data?.pages.length??0)<3
        ? "Load more"
        :"nothing more"
      }
      </button>
      </div>


    






















    // <>
    
    // <main className="flex w-full flex-col items-center justify-center p-24">
    //   <div className='flex items-center  justify-center rounded-lg shadow-2xl px-12 py-9 bg-[#070707]  bg-opacity-60'>

    //    <Login/>

    //   </div>
      
    // </main>
    //    <div className=' mt-40  px-20 flex flex-col flex-wrap justify-center items-start w-full bg-[#070707]  gap-20 bg-opacity-60'>
    //       <h2 className='font-bold text-xl text-gray-500 hover:underline'>Questions? Contact us.</h2>
    //     <div className=' flex  flex-wrap  justify-between items-end gap-20 '>
    //       {linksArray.map((link)=>(

    //         <li ><a href="" className='no-underline text-gray-500 text-sm font-normal break-words'>{link.text}</a></li>
           
    //       ))}

         

    //     </div>
    //    </div>
    // </>
  )
}
