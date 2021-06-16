import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from "react-slick"
import Slides from './Slides'
import { useMediaQuery } from '@material-ui/core'

const cities = [
  { name: "Venice", id: 1, photo: "https://i.postimg.cc/9002k1fg/venice.png" },
  { name: "Buenos Aires", id: 2, photo: "https://i.postimg.cc/QNmVnnfm/buenosaires.png" },
  { name: "Egypt", id: 3, photo: "https://i.postimg.cc/FRg1vPN9/egipto.png" },
  { name: "Greece", id: 4, photo: "https://i.postimg.cc/FzrzHjH0/grecia.png" },
  { name: "London", id: 5, photo: "https://i.postimg.cc/Jzvs5DpW/londres.png" },
  { name: "Morocco", id: 6, photo: "https://i.postimg.cc/13fgFccH/marruecos.png" },
  { name: "Moscow", id: 7, photo: "https://i.postimg.cc/L4x6Vgs0/moscu.png" },
  { name: "New York", id: 8, photo: "https://i.postimg.cc/8cXpk93V/newyork.png" },
  { name: "Paris", id: 9, photo: "https://i.postimg.cc/c4jxpqwR/paris.png" },
  { name: "Rio de Janeiro", id: 10, photo: "https://i.postimg.cc/wB59R7P2/rio.png" },
  { name: "Sydney", id: 11, photo: "https://i.postimg.cc/rp28pShz/sydney.png" },
  { name: "Tokyo", id: 12, photo: "https://i.postimg.cc/ZRT48JzS/tokyo.png" },
]

const Carousel = () => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    rows: 2,
    arrows: true,
  }

  const tablet = useMediaQuery("(max-width: 900px)")
  const smartphone = useMediaQuery("(max-width: 600px)")

  if (tablet) {
    settings.rows = 2
    settings.slidesToShow = 1
    settings.slidesToScroll = 1
    settings.autoplaySpeed = 3500
  }
  if (smartphone) {
    settings.slidesToScroll = 1
    settings.rows = 1
    settings.slidesToShow = 1
    settings.autoplaySpeed = 3000
  }

  return (
    <div className="App" >
      <Slider {...settings}>
        {
          cities.map((city) => <Slides key={city.id} city={city} />)
        }
      </Slider>
    </div>
  )
}

export default Carousel



