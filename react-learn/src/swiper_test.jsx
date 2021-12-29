/** @format */
import React from "react";
import Swiper from "react-id-swiper";

import "./swiper_test.scss";

const params = {
  navigation: {
    nextEl: `.nextButton`,
    prevEl: `.preButton`,
  },
  paginationClickable: true,
  containerClass: `swiperContainer`,
  slideClass: `swiperSlider`,
  wrapperClass: `swiperWrapper`,
  slideActiveClass: `slideActiveClass`,
  // effect: "fade",
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  slidesPerView: 2,
  spaceBetween: 8,
};
export default class SwiperTest extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: Array.from(Array(6).keys()),
      swiper: null,
      displayNonePre: true,
      displayNoneNext: true,
    };
  }

  componentDidMount() {}

  handleMouseEnter = () => {
    const { swiper } = this.state;
    if (swiper) {
      swiper.autoplay.stop();
    }
  };

  handleMouseLeave = () => {
    const { swiper } = this.state;
    if (swiper) {
      swiper.autoplay.start();
    }
  };
  render() {
    return (
      <div className="container">
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <Swiper
            {...params}
            ref={(node) => {
              if (node) this.state.swiper = node.swiper;
            }}
          >
            {this.state.data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="card"
                  onClick={() => {
                    console.log("onClick idx:", idx, "item:", item);
                  }}
                >
                  Slide {item}
                </div>
              );
            })}
          </Swiper>
        </div>
      </div>
    );
  }
}
