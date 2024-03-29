"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./embla-carousel-dot-button";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./embla-carousel-arrow-buttons";
import useEmblaCarousel from "embla-carousel-react";
import { CategoryCard, CategoryCardProps } from "./category-card";

type PropType = {
  options?: EmblaOptionsType;
};

const PopularCategories: React.FC<PropType> = (props) => {
  let categories = [
    {
      title: "WordPress Development",
      href: "/services/wordpress-development",
      image:
        "https://res.cloudinary.com/upwork-cloud/image/upload/catalog-ui-assets/taxonomy/category/wordpress.jpg",
    },
    {
      title: "Logo Design",
      href: "/services/logo-branding",
      image:
        "https://res.cloudinary.com/upwork-cloud/image/upload/catalog-ui-assets/taxonomy/category/logo-design.jpg",
    },
    {
      title: "Video Editing",
      href: "/services/editing-post-production",
      image:
        "https://res.cloudinary.com/upwork-cloud/image/upload/catalog-ui-assets/taxonomy/category/video-editing.jpg",
    },
    {
      title: "Data Science & ML",
      href: "/services/data-science-ml",
      image:
        "https://res.cloudinary.com/upwork-cloud/image/upload/catalog-ui-assets/taxonomy/category/data-analysis-reports.jpg",
    },
    {
      title: "Legal Services",
      href: "/services/legal-services",
      image:
        "https://res.cloudinary.com/upwork-cloud/image/upload/catalog-ui-assets/taxonomy/category/legal-writing.jpg",
    },
    {
      title: "Editing & Proofreading",
      href: "/services/editing-proofreading",
      image:
        "https://res.cloudinary.com/upwork-cloud/image/upload/catalog-ui-assets/taxonomy/category/proofreading-editing.jpg",
    },
  ] as CategoryCardProps[];
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {categories.map((cat, index) => (
              <div className="embla__slide" key={index}>
                <CategoryCard {...cat} />
              </div>
            ))}
          </div>
        </div>
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularCategories;
