import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Promotions.scss";
import { fetchBanners, selectBanners } from '../app/informationSlice';
import { selectToken } from '../app/userSlice';

export default function Promotions() {
    const dispatch = useAppDispatch();
    const banners = useAppSelector(selectBanners);
    const token = useAppSelector(selectToken);

    useEffect(() => {
        if (token) {
            dispatch(fetchBanners(token));
        }
    }, [dispatch, token]);

    let sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 5000,
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
                {banners.map((banner) => (
                    <div key={banner.banner_name} className="promotion-banner">
                        <img src={banner.banner_image} alt={banner.banner_name} />
                    </div>
                ))}
            </Slider>
        </section>
    );
}
