//Landing Page animation
(function landingPageAnimation(){
  gsap.from(
    "#container1>h1",
    {
      y: "100%",
      stagger: "0.5s",
      duration: 0.9,
    },
    "animation"
  );
  gsap.from(
    "#container2>h1",
    {
      y: "-100%",
      stagger: "0.5s",
      duration: 0.9,
    },
    "animation"
  );
  gsap.from("#container2>#image-div>video", {
    y: "100%",
    stagger: 0.5,
  });
  gsap.from("#wrapper-para>p", {
    y: "100%",
    delay: 0.8,
    stagger: "0.5s",
  });
  gsap.from("#main-content>#wrapper-text>#container2>#image-div>img", {
    y: "100%",
    stagger: "0.5s",
  });
  gsap.from("#nav", {
    y: "-100%",
    duration: 0.9,
    stagger: 0.5,
  });
  gsap.to("#seemore", {
    scale: 1,
    duration: 0.8,
    delay: 0.8,
  });
  gsap.to("#seemore", {
    scale: 1,
    duration: 0.8,
    delay: 0.8,
  });
})();
//Middle Page Anumation
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".middlepage",
    // markers: true,
    start: "38% 50%",
    end: "100% 50%",
    scrub: 2,
    pin: true,
  },
});
tl.to(
  ".text",
  {
    top: "-7%",
  },
  "a"
)
  .to(
    "#card-one",
    {
      top: "35%",
    },
    "a"
  )
  .to(
    "#card-two",
    {
      top: "130%",
    },
    "a"
  )
  .to(
    "#card-two",
    {
      top: "42%",
    },
    "b"
  )
  .to(
    "#card-one",
    {
      width: "65%",
      height: "65vh",
    },
    "b"
  )
  .to(
    "#card-three",
    {
      top: "130%",
    },
    "b"
  )
  .to(
    "#card-three",
    {
      top: "50%",
    },
    "c"
  )
  .to(
    "#card-two",
    {
      width: "70%",
      height: "70vh",
    },
    "c"
  );

//Lower Page Animation
(function lowerAnimation(){
  gsap.to(
    "#main>#page1>#left>#lower-part-1>.lower1",
    {
      scrollTrigger: {
        trigger: "#page1",
        start: "20% 50%",
        end: "80% 50%",
        // markers: true,
        scrub: 2,
      },
      y: "-8vw",
      duration: 10,
    },
    "loweranimation"
  );
  gsap.to(
    "#main>#page1>#right>#lower-part-2>.lower2",
    {
      scrollTrigger: {
        trigger: "#page1",
        start: "20% 50%",
        end: "80% 50%",
        // markers: true,
        scrub: 2,
      },
      y: "-8vw",
      duration: 10,
    },
    "loweranimation"
  );
})();
(function center(){
  gsap.to("#page1>#center>#text-div", {
    scrollTrigger: {
      trigger: "#page1",
      start: "20% 50%",
      end: "80% 50%",
      // markers: true,
      scrub: 2,
    },
    opacity:1,
    scale:1,
    duration:1
  });
})();
(function upperAnimation(){
  gsap.to("#main>#page1>#left>#upper-part-1>.upper1", {
    scrollTrigger: {
      trigger: "#page1",
      start: "20% 50%",
      end: "80% 50%",
      // markers: true,
      scrub: 2,
    },
    y: "-20vw",
    duration: 10,
  });
  gsap.to("#main>#page1>#right>#upper-part-2>.upper2", {
    scrollTrigger: {
      trigger: "#page1",
      start: "20% 50%",
      end: "80% 50%",
      // markers: true,
      scrub: 2,
    },
    y: "-20vw",
    duration: 10,
  });
})();