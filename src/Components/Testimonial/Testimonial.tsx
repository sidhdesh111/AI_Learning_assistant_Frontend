import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { FaRegStar, FaStar } from 'react-icons/fa6';


const testimonialData = [
    {
        "name": "Aarav Sharma",
        "role": "Engineering Student",
        "img": "./testimonial_img2.avif",
        "rating": 5,
        "message": "This AI Learning Assistant completely changed the way I study. Uploading my notes and instantly getting quizzes and flashcards saves me hours every week."
    },
    {
        "name": "Priya Verma",
        "role": "Medical Aspirant",
        "img": "./testimonial_img1.avif",
        "rating": 5,
        "message": "The AI chat feature is amazing. I can ask questions directly from my uploaded PDFs and get simple explanations instantly."
    },
    {
        "name": "Rahul Singh",
        "role": "Software Developer",
        "img": "./testimonial_img2.avif",
        "rating": 5,
        "message": "I use this platform to learn technical documentation faster. The summaries and key insights are incredibly accurate and useful."
    },
    {
        "name": "Sneha Kapoor",
        "role": "College Student",
        "img": "./testimonial_img1.avif",
        "rating": 4,
        "message": "The flashcards and quizzes help me revise before exams very quickly. The interface is clean and easy to use."
    },
    {
        "name": "Aditya Mishra",
        "role": "UPSC Aspirant",
        "img": "./testimonial_img2.avif",
        "rating": 5,
        "message": "One of the best AI study tools I have used. It turns large documents into manageable learning content within seconds."
    },
    {
        "name": "Neha Gupta",
        "role": "Teacher",
        "img": "./testimonial_img1.avif",
        "rating": 5,
        "message": "I recommend this platform to my students regularly. It helps them understand topics better through interactive learning."
    },
    {
        "name": "Vikram Patel",
        "role": "Research Scholar",
        "img": "./testimonial_img2.avif",
        "rating": 5,
        "message": "The ability to upload research papers and instantly generate summaries and notes is a huge productivity boost."
    },
    {
        "name": "Ananya Roy",
        "role": "MBA Student",
        "img": "./testimonial_img1.avif",
        "rating": 4,
        "message": "The dashboard and document management system are very organized. Everything feels modern and smooth."
    }
]
const maxDefaultRating = 5;





const Testimonial = () => {
    return (
        <>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={20}
                centeredSlides={true}
                loop={true}

                speed={800}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1.2,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper my_testimonial !py-10"
            >

                {testimonialData.map((data, index) => (
                    <SwiperSlide key={index} className='lg:p-4 '>
                        <div className='p-6 bg-white rounded-2xl shadow-lg'>
                            <div className='flex items-center gap-2 '>
                                <div className="w-15 h-15 rounded-full overflow-hidden">
                                    <img
                                        src={data.img}
                                        alt=""
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                                <div className='flex flex-col gap-0.5'>
                                    <h2 className='text-md font-medium'>{data.name}</h2>
                                    <p className='text-xs italic'>{data.role}</p>
                                    <div>
                                        <ul className='flex gap-0.5'>
                                            {Array(maxDefaultRating).fill(null).map((_, index) => (
                                                <li key={index} className='text-amber-500 text-sm'>
                                                    {index + 1 <= data.rating ? <FaStar /> : <FaRegStar />}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='pt-8'>
                                <p className='text-md text-slate-800'>
                                    {data.message}
                                </p>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}


            </Swiper>
        </>
    )
}

export default Testimonial