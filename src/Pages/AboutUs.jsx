import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImg from "../assets/images/aboutMainImage.png";

//character-img-imports

import nelsonMandela from "../assets/images/nelsonMandela.png";
import steveJobs from "../assets/images/steveJobs.png";
import billGates from "../assets/images/billGates.png";
import einstein from "../assets/images/einstein.png";
import apj from "../assets/images/apj.png";

function AboutUs() {
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
          <div id="slide1" className="carousel-item relative w-full">

            <div className="flex items-center justify-center flex-col gap-4 px-[15%]">
              <img src={apj} className="w-40 rounded-full border-gry-400" />

              <p className="text-xl font-semibold text-gray-200">
                Education is the most powerful tool.
              </p>

              <h3 className="text-2xl">APJ ABDUL KALAM</h3>

              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide5" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>

            </div>
          </div>

          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex items-center justify-center flex-col gap-4 px-[15%]">
              <img
                src={nelsonMandela}
                className="w-40 rounded-full border-gry-400"
              />
              <p className="text-xl font-semibold text-gray-200">
                Education is the most powerful tool.
              </p>
              <h3 className="text-2xl">NELSON MANDELA</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>

          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex items-center justify-center flex-col gap-4 px-[15%]">
              <img
                src={steveJobs}
                className="w-40 rounded-full border-gry-400"
              />
              <p className="text-xl font-semibold text-gray-200">
                Education is the most powerful tool.
              </p>
              <h3 className="text-2xl">STEVE JOBS</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>

          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex items-center justify-center flex-col gap-4 px-[15%]">
              <img
                src={billGates}
                className="w-40 rounded-full border-gry-400"
              />
              <p className="text-xl font-semibold text-gray-200">
                Education is the most powerful tool.
              </p>
              <h3 className="text-2xl">BILL GATES</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide5" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>

          <div id="slide5" className="carousel-item relative w-full">
            <div className="flex items-center justify-center flex-col gap-4 px-[15%]">
              <img
                src={einstein}
                className="w-40 rounded-full border-gry-400"
              />
              <p className="text-xl font-semibold text-gray-200">
                Education is the most powerful tool.
              </p>
              <h3 className="text-2xl">ALBERT EINSTEIN</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;