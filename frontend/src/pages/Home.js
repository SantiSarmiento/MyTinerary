import React from 'react'
import Carousel from '../components/Carousel'
import HomeInfo from '../components/Homeinfo'
import CalltoAction from '../components/CalltoAction'
import Header from '../components/Header'
import Footer from '../components/Footer'


class Home extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <>
                <Header />
                <div className="headerImg" style={{ backgroundImage: `url('https://i.postimg.cc/QhWpw0pZ/portada.png')` }}>
                    <HomeInfo />
                </div>
                <CalltoAction />
                <div className="myCarousel">
                    <div className="carouselContainer">
                        <h2 className="carouselh2">Popular MyTinerary</h2>
                        <Carousel />
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}
export default Home