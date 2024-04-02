import { test, expect, describe } from "vitest";

import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

describe("Carousel", function () {

  test("renders without crashing", function () {
    render(<Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
    );
  });

  test("matches snapshot", function () {
    const { container } = render(<Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />);

    expect(container).toMatchSnapshot();
  });

  test("works when you click on the right arrow", function () {
    const { container } = render(
      <Carousel
        photos={TEST_IMAGES}
        title="images for testing"
      />
    );
    // expect the first image to show, but not the second
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();
  });

  test("works when you click on the left arrow", function () {
    const { container } = render(
      <Carousel
        photos={TEST_IMAGES}
        title="images for testing"
      />
    );

    // expect the first image to show, but not the second
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();

    // move backward in the carousel
    const leftArrow = container.querySelector(".bi-arrow-left-circle");
    fireEvent.click(leftArrow);

    // expect the first image to show, but not the second
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();

    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();
  });

  test("left and right arrows do not show when on first and last image respectively", function () {
    const { container } = render(
      <Carousel
        photos={TEST_IMAGES}
        title="images for testing"
      />
    );

    // expect right arrow to be visible, while left arrow is hidden
    expect(
      container.querySelector('.bi-arrow-left-circle').getAttribute("style")
    ).toEqual("visibility: hidden;");
    expect(
      container.querySelector('.bi-arrow-right-circle')
    ).toBeInTheDocument();

    // move forward to the end of the carousel
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

    // expect left arrow to be visible, while right arrow is hidden
    expect(
      container.querySelector('.bi-arrow-left-circle')
    ).toBeInTheDocument();
    expect(
      container.querySelector('.bi-arrow-right-circle').getAttribute("style")
    ).toEqual("visibility: hidden;");
  });
});
