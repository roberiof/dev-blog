import React , { useState , useEffect } from 'react'
import {PostType} from '@/types'
import Post from '../utils/Post'
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/pagination'
import { Swiper , SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper/modules';

const CarouselPosts = ({posts} : {posts: PostType[]}) => {
  const [ slidesPerView , setSlidesPerView ] = useState<number | undefined>(3)
  // this type must be number | undefined to match the settingsSwiper
  const settingsSwiper = {
    modules: [Pagination, A11y],
    spaceBetween: 30,
    slidesPerView: slidesPerView,
    pagination: {clickable: true},
  }
  
  useEffect( () => {
    const handleResize = () => {
      if(window.innerWidth < 490){
        setSlidesPerView(1)
      }else if(window.innerWidth <= 1090 && window.innerWidth >= 490){
        setSlidesPerView(2)
      } else{
        setSlidesPerView(3)
      }
    }
    
    handleResize()

    window.addEventListener("resize", handleResize)
    
    return () =>{
      window.removeEventListener("resize", handleResize)
    }
  })

  return (
    <div className='lg:pt-28'>
      <section className='wrapper-content justify-center flex' >
        <Swiper                   
          {...settingsSwiper}
        >
          {posts && posts.map( (post, index) => (
            <SwiperSlide key={index}>
                <Post post={post} containerStyles={'select-none overflow-hidden cursor-grab max-w-sm justify-center flex'}/>
            </SwiperSlide>
          ))}
        </Swiper>

      </section>
    </div>
  )
}

export default CarouselPosts