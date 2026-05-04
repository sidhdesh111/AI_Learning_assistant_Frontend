import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";
import type { LucideIcon } from "lucide-react";

type FeaturesData = {
  Icons: LucideIcon;
  label: string;
  para: string;
  colorclass: string;
  textColor: string;
  children?: {
    label: string;
    para: string;
    img: string;
  }[];
};

type FeaturesDataprops = {
  FeturesData: FeaturesData[];
};

const Features_Slider = (props: FeaturesDataprops) => {
  return (
    <>
      <div className='hidden lg:block '>
        <Swiper
          breakpoints={{}}
          navigation={true}
          modules={[Navigation, Autoplay]}
          slidesPerView={4.5}

          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}

          className="Myfeature_slider z-50">

          {props.FeturesData.map((data, index) => (
            <SwiperSlide key={index} className=' bg-white hover:shadow-xl rounded-2xl overflow-hidden hover:shadow-emerald-700/60 my-10 !transition-all !duration-500'>
              <div className='p-6 bg-white  h-70'>
                <div className='flex flex-col items-start gap-4'>
                  <div className={`bg-linear-to-br ${data.colorclass} p-4 rounded-md`}>
                    <data.Icons className={`w-8 h-8 ${data.textColor}`} />
                  </div>
                  <div className='flex flex-col gap-4'>
                    <h2 className='text-slate-900 text-lg font-bold pr-10'>{data.label}</h2>
                    <p className='text-sm font-medium text-slate-500 pr-4'>
                      {data.para}
                    </p>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}


        </Swiper>
      </div>

      <div className=' mx-auto w-full grid sm:grid-cols-1 md:grid-cols-2 gap-5 lg:hidden px-6'>
        {props.FeturesData.map((data, index) => (
          <div key={index} className='p-6 bg-white h-70 border border-slate-300 rounded-xl z-40'>
            <div className='flex flex-col items-start gap-4'>
              <div className={`bg-linear-to-br ${data.colorclass} p-4 rounded-md`}>
                <data.Icons className={`w-8 h-8 ${data.textColor}`} />
              </div>
              <div className='flex flex-col gap-4'>
                <h2 className='text-slate-900 text-lg font-bold pr-10'>{data.label}</h2>
                <p className='text-sm font-medium text-slate-500 pr-4'>
                  {data.para}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  )
}






export default Features_Slider