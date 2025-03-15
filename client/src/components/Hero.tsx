import { useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import axios from 'axios';
import { Autoplay, Navigation } from 'swiper/modules';


const baseUrl = import.meta.env.VITE_API_BASE_URL;


const Hero = () => {
  const [hero,setHero] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
   
      try {
        const response = await axios.get(`${baseUrl}/appData`);
        const Pub = response.data.Send.pub.Hero;
    
Pub != null ? 
setHero(Pub) : console.log('nothing to fetcg');
       // Store the response data in state
      
      } catch (err) {
      console.log(err); // Handle error
      } 
    };

    fetchData();
  }, []);
  return (      <>
    <Swiper
     key={"swi"}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Navigation]}
      className="mySwiper"
    >
     
  {
    hero.map((heo,index)=>(
        <SwiperSlide key={`h-${index}`}>
<img src={heo} key={index} alt={`hero-${index}`} className='w-full h-full max-h-[70vh] pxn'  />

        </SwiperSlide>
    ))
  }
    </Swiper>
  </>
  )
}

export default Hero