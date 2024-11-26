import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    EffectCoverflow,
    Pagination,
    Keyboard,
    Mousewheel,
    Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Carousel = () => {
    const [carouselProducts, setCarouselProducts] = useState([]);
    // console.log("probe1");

    useEffect(() => {
        const fetchProducts = async () => {
            // console.log("probe");
            try {
                const response = await fetch(
                    "http://localhost:3000/api/products/?type=topRated"
                );
                const data = await response.json();
                // console.log("products in carousel", data);
                setCarouselProducts(data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []); //einmal render

    return (
        // <main className="bg-colorSecondary relative w-[min(90rem,90%)] mx-auto min-h-screen gap-6 py-12 flex flex-col lg:flex-row items-center">
        <main className="relative w-full mx-auto flex flex-col items-center">
            <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                speed={1000}
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                mousewheel={{ thresholdDelta: 70 }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 10,
                    depth: 100,
                    modifier: 3,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1560: { slidesPerView: 4 },
                }}
                modules={[
                    EffectCoverflow,
                    Pagination,
                    Keyboard,
                    Mousewheel,
                    Autoplay,
                ]}
                className="swiper w-full max-w-[9xl] mx-auto pt-4"
            >
                {/* Add similar SwiperSlide elements */}
                {/* <SwiperSlide className="swiper-slide--two bg-cover bg-center h-72"> */}
                {/* Photos */}
                {carouselProducts.map((product) => (
                    <SwiperSlide
                        key={product.id}
                        className="bg-cover bg-center h-[30rem]"
                    >
                        <Link to={`/product/${product._id}`}>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="object-cover w-full h-full"
                            />
                        </Link>
                    </SwiperSlide>
                ))}
                {/* <SwiperSlide className="bg-cover bg-center h-[30rem]">
          <img
            src="/images/beds/bed2.webp"
            alt="Scallop"
            className="object-cover w-full h-full"
          />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide--two bg-cover bg-center h-[30rem]">
          <img
            src="/images/beds/bed3.webp"
            alt="Scallop"
            className="object-cover w-full h-full"
          />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide--two bg-cover bg-center h-[30rem]">
          <img
            src="/images/chairs/chair1.webp"
            alt="Scallop"
            className="object-cover w-full h-full"
          />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide--two bg-cover bg-center h-[30rem]">
          <img
            src="/images/chairs/chair2.webp"
            alt="Scallop"
            className="object-cover w-full h-full"
          />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide--two bg-cover bg-center h-[30rem]">
          <img
            src="/images/chairs/chair3.webp"
            alt="Scallop"
            className="object-cover w-full h-full"
          />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide--two bg-cover bg-center h-[30rem]">
          <img
            src="/images/sofas/sofa1.webp"
            alt="Scallop"
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide--two bg-cover bg-center h-[30rem]">
          <img
            src="/images/sofas/sofa2.webp"
            alt="Scallop"
            className="object-cover w-full h-full"
          />
        </SwiperSlide>

        {/* Pagination  */}
                <div className="swiper-pagination !bottom-5"></div>
            </Swiper>

            {/* <img
        src="https://cdn.pixabay.com/photo/2021/11/04/19/39/jellyfish-6769173_960_720.png"
        alt=""
        className="absolute top-[-4rem] left-[-12rem] opacity-10 z-[-1] hidden lg:block"
      />
      <img
        src="https://cdn.pixabay.com/photo/2012/04/13/13/57/scallop-32506_960_720.png"
        alt=""
        className="absolute bottom-[-2rem] right-[-3rem] opacity-10 w-24 z-[-1] hidden lg:block"
      /> */}
        </main>
    );
};

export default Carousel;
