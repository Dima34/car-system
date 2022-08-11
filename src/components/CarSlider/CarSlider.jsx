import s from "./CarSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../Container/Container";
import { Navigation } from "swiper";


export default function CarSlider(props) {
  let car = props.car
  let mainImageUrl = car.photoData.seoLinkF;

  return (
    <Container addClass={s.galleryContainer}>
      <Swiper navigation={true} modules={[Navigation]} className={s.slider}>
        {car.photoData.all.map((id) => (
          <SwiperSlide key={id} className="slide">
            <img src={getImageLink(mainImageUrl, id)} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className={s.galleryThumbs}>
                        {
                            car.photoData.all.map(id=>(
                                <button onClick={()=>{
                                    setSwiper(
                                        ...swiper,
                                        {activeIndex: 5}
                                    )
                                }} className={s.galleryThumbItem}>
                                    <img src={getImageLink(mainImageUrl, id)} />
                                </button> 
                            ))
                        }
                    </div> */}
    </Container>
  );
}

function getImageLink(exampleLink, id) {
  const regexp = /__\d*/gm
  return exampleLink.replace(regexp, `__${id}`)
}

