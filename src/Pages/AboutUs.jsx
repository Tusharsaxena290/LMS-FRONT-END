import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImg from "../assets/images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";

//character-img-imports

import nelsonMandela from "../assets/images/nelsonMandela.png";
import steveJobs from "../assets/images/steveJobs.png";
import billGates from "../assets/images/billGates.png";
import einstein from "../assets/images/einstein.png";
import apj from "../assets/images/apj.png";


function AboutUs() {
  const celebs = [
    {
      title: "APJ ABDUL KALAM",
      description:
        "Education is the most powerful tool that can be used by the mankind.",
      image: apj,
      slideNumber: 1,
    },

    {
      title: "NELSON MANDELA",
      description:
        "Education is the most powerful tool that can be used by the mankind.",
      image: nelsonMandela,
      slideNumber: 2,
    },

    {
      title: "STEVE JOBS",
      description:
        "Education is the most powerful tool that can be used by the mankind.",
      image: steveJobs,
      slideNumber: 3,
    },

    {
      title: "BILL GATES",
      description:
        "Education is the most powerful tool that can be used by the mankind.",
      image: billGates,
      slideNumber: 4,
    },

    {
      title: "ALBERT EINSTEIN",
      description:
        "Education is the most powerful tool that can be used by the mankind.",
      image: einstein,
      slideNumber: 5,
    },
  ];



  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center gap-5 px-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable and Quality Education
            </h1>
            <p className="text-xl text-gray-200 font-bold w-[100%]">
              Our goal is to provide the offordable and quality education to the
              world. We are providing the plaform for the aspiring teachers and
              students to share their skills, creativity and knowledge to each
              other to empower and contribute in the growth and wellness of
              mankind.
            </p>
          </section>

          <div className="w-1/2">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0)",
              }}
              className="drop-shadow-2xl"
              src={aboutMainImg}
              alt="aboutMainImg"
            />
          </div>
        </div>
        <div className="carousel w-1/2 my-16 m-auto">
            {
                // celebs.forEach((c)=>(
                //     // <CarouselSlide title={c.title} description={c.description} image={c.image}
                //     // slideNumber={c.slideNumber} totalSlides={celebs.length}
                //     // />
                //     console.log(c)
                // ))
                celebs.map((c)=>{
                    return(
                        <CarouselSlide title={c.title} description={c.description} image={c.image}
                        slideNumber={c.slideNumber} totalSlides={celebs.length}
                        />
                    )
                })
            }
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
