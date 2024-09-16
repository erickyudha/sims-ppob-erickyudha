import mockBanner from "../assets/images/Banner 1.png";
import "./Promotions.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";

export default function Promotions() {
    let sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 8000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
        variableWidth: true
    };

    return (
        <section id="promotions">
            <div className="subtitle">Temukan promo menarik</div>

            <Slider className="promotions-container" {...sliderSettings}>
                <div className="promotion-banner">
                    <img src={mockBanner} alt="" />
                </div>
                <div className="promotion-banner">
                    <img src={mockBanner} alt="" />
                </div>
                <div className="promotion-banner">
                    <img src={mockBanner} alt="" />
                </div>
                <div className="promotion-banner">
                    <img src={mockBanner} alt="" />
                </div>
                <div className="promotion-banner">
                    <img src={mockBanner} alt="" />
                </div>
                <div className="promotion-banner">
                    <img src={mockBanner} alt="" />
                </div>
                <div className="promotion-banner">
                    <img src={mockBanner} alt="" />
                </div>
            </Slider>

        </section>
    )
}