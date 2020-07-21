"use strict";
const calculateTransform = (horizontal, vertical, offset) =>
  `translate(${(horizontal * offset) / 0.5}px, ${(vertical * offset) / 0.5}px)`;

const loadingPage = document.querySelector(".loading-page");
if (loadingPage) {
  loadingPage.addEventListener("mousemove", event => {
    const computedStyle = getComputedStyle(loadingPage);
    const horizontal = event.clientX / parseInt(computedStyle.width, 10);
    const vertical = event.clientY / parseInt(computedStyle.height, 10);
    const calTransform = calculateTransform.bind(null, horizontal, vertical);

    loadingPage.querySelector(".title").style.transform = calTransform(5);
    loadingPage.querySelector(
      ".reflect-loading"
    ).style.transform = calTransform(-3);
  });
}
