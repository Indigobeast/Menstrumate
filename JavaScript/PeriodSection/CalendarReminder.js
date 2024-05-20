// author - Satwik Kar
// author  - Sahil Dash
document.addEventListener("DOMContentLoaded", async function () {
  const current_month_num = new Date().getMonth();
  const current_year = new Date().getFullYear();
  const month_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day_lst = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const current_month = month_names[current_month_num];
  const previous_month = month_names[current_month_num - 1];
  const next_month = month_names[current_month_num + 1];
  const next_month_plus = month_names[current_month_num + 2];

  const current_num_days = new Date(
    current_year,
    current_month_num + 1,
    0
  ).getDate();
  const previous_num_days = new Date(
    current_year,
    current_month_num,
    0
  ).getDate();
  const next_num_days = new Date(
    current_year,
    current_month_num + 2,
    0
  ).getDate();
  const nextplus_num_days = new Date(
    current_year,
    current_month_num + 3,
    0
  ).getDate();

  const month_lst = [
    [previous_month, previous_num_days],
    [current_month, current_num_days],
    [next_month, next_num_days],
    [next_month_plus, nextplus_num_days],
  ];

  const color_lst = [
    "#BE0000",
    "#BE0000",
    "#CAC221",
    "#4BB080",
    "#4BB080",
    "#4BB080",
    "#CAC221",
    "#BE0000",
    "#BE0000",
  ];
  const date_idx = Math.floor(color_lst.length / 2);

  let email = localStorage.getItem("email");
  let response = await fetch(
    `http://localhost:3000/get-user-data?email=${email}`
  );
  let data = await response.json();

  date_data = data.date;

  console.log("user data :- ", date_data);

  function addDaysToDate(dateString, daysToAdd) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + daysToAdd);
    return date;
  }

  let prevDate = new Date(date_data.dates[0]);
  let currentDate = addDaysToDate(
    date_data.dates[0],
    date_data.week_days + date_data.month_days
  );
  const date = [prevDate.getDate(), currentDate.getDate(), 0, 0];
  console.log(date);
  let gotPeriods = false;

  const all_dates = [];
  for (let i = 0; i < month_lst.length; i++) {
    for (let j = 1; j <= month_lst[i][1]; j++) {
      all_dates.push(j);
    }
  }

  function getStartDate(date) {
    if (date === 0) {
      return [0, 0];
    }

    let srt_date = 0;
    let color_idx = 0;

    if (date > date_idx) {
      srt_date = date - date_idx;
      color_idx = 0;
    } else {
      srt_date = 1;
      color_idx = date_idx - (date - 1);
    }

    return [srt_date, color_idx];
  }

  function getCalendar(dateArr) {
    const date_lst = [];

    try {
      let i = 0,
        iter = 0;
      while (i < all_dates.length) {
        if (all_dates[i] === getStartDate(dateArr[iter])[0]) {
          iter++;
          let idx = getStartDate(dateArr[iter])[1];
          while (idx < color_lst.length) {
            const dict = {
              date: all_dates[i],
              color: color_lst[idx],
            };
            date_lst.push(dict);

            idx++;
            i++;
          }
        } else {
          const dict = {
            date: all_dates[i],
            color: "#D9D9D9",
          };
          date_lst.push(dict);
          i++;
        }
      }
    } catch (error) {
      console.log("An error occurred: " + error);
    }

    const Calendar = [];
    let month_idx = 0;
    let dates = [];

    let mon;
    let day_name;
    try {
      for (let i = 0; i < date_lst.length; i++) {
        mon = month_names.indexOf(month_lst[month_idx][0]);
        day_name = new Date(
          `${current_year}-${month_lst[month_idx][0]}-${date_lst[i].date}`
        ).toLocaleString("en-US", { weekday: "short" });
        date_lst[i].day = day_name;
        dates.push(date_lst[i]);

        if (date_lst[i]["date"] === month_lst[month_idx][1]) {
          const dict = {
            dates: dates,
            month: month_lst[month_idx][0],
          };
          Calendar.push(dict);
          month_idx++;
          dates = [];
        }
      }
    } catch (error) {
      console.log(error);
    }

    console.log(Calendar);

    return Calendar;
  }

  function buildCalendar(Calendar, gotPeriods) {
    let calenderDiv = document.querySelector(".carousel-inner");

    while (calenderDiv.firstChild) {
      calenderDiv.removeChild(calenderDiv.firstChild);
    }

    let mainDiv = document.createElement("div");
    let chk_month = 0;
    let main = ``;
    let tbody;
    let idx;
    for (let i = 0; i < Calendar.length; i++) {
      if (i === 1) {
        main += `<div class="carousel-item active">`;
      } else {
        main += `<div class="carousel-item">`;
      }

      main += `<table class="calendar ${Calendar[i].month}">`;

      let thead = `<thead><tr>`;
      for (let j = 0; j < day_lst.length; j++) {
        thead += `<th><div class="calendarDay">${day_lst[j]}</div></th>`;
      }
      thead += `</tr></thead>`;

      // ADDING HTML FOR TABLE BODY
      let dates = Calendar[i].dates;
      tbody = `<tbody><tr>`;
      let count = 0;
      for (let k = 0; k < dates.length; k++) {
        if (dates[k].date === 1) {
          chk_month += 1;
          idx = day_lst.indexOf(dates[k].day);
          for (let x = 0; x < idx; x++) {
            count++;
            tbody += `<td><div class="calendarDateParentDiv"></div></td>`;
          }
          count++;
          tbody += `<td><div class="calendarDateParentDiv"><div id="${
            dates[k].date + "/" + (month_names.indexOf(Calendar[i].month) + 1)
          }" class="calendarDate"
                   style="background-color:${dates[k].color} ;">${
            dates[k].date
          }</div></div></td>`;
        } else {
          count++;
          let bgColor =
            chk_month <= 2
              ? `background-color:${dates[k].color} ;`
              : chk_month === 3 && gotPeriods
              ? `background-color:${dates[k].color} ;`
              : "";

          tbody += `<td><div class="calendarDateParentDiv"><div id="${
            dates[k].date + "/" + (month_names.indexOf(Calendar[i].month) + 1)
          }"  class="calendarDate"
                   style=${bgColor}>${dates[k].date}</div></div></td>`;
        }

        if (count === 7) {
          count = 0;
          tbody += `<tr></tr>`;
        }
      }

      tbody += `</tr></tbody>`;

      // ADDING EVERYTHING TOGETHER

      main += thead + tbody + `</table></div>`;
      mainDiv.innerHTML += main;
      main = ``;
    }

    calenderDiv.appendChild(mainDiv);
  }

  let Calendar = getCalendar(date);
  buildCalendar(Calendar, gotPeriods);

  const prev = document.querySelector(".prev-btn-div");
  const next = document.querySelector(".next-btn-div");
  const got_periods_btn = document.querySelector(".btn-got-periods");
  const go_back = document.querySelector(".back-btn");

  const left_child = document.querySelector(".left-child");
  const right_child = document.querySelector(".right-child");
  const carouselInstance = document.getElementById("carouselExampleIndicators");
  const carousel = new bootstrap.Carousel(carouselInstance);
  const lengthOfCarousel = Calendar.length;

  let monthNameView = document.querySelector(".month-name");

  let counter = 1;
  monthNameView.innerText = Calendar[counter].month;

  prev.addEventListener("click", function () {
    counter--;

    carousel.prev();
    next.style.visibility = "visible";
    right_child.style.visibility = "visible";

    if (checkVisibility() === 1) {
      prev.style.visibility = "hidden";
      left_child.style.visibility = "hidden";
      gsap.to(".right-child", {
        opacity: 0,
        x: "50%",
        duration: 0.7,
        ease: "power2.out",
      });
      gsap.fromTo(
        ".right-child",
        { opacity: 0, x: "-50%" },
        {
          opacity: 1,
          x: "0%",
          duration: 0.7,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(".left-child", {
        opacity: 0,
        x: "50%",
        duration: 0.7,
        ease: "power2.out",
      });
      gsap.fromTo(
        ".left-child",
        { opacity: 0, x: "-50%" },
        {
          opacity: 1,
          x: "0%",
          duration: 0.7,
          ease: "power2.out",
        }
      );

      gsap.to(".right-child", {
        opacity: 0,
        x: "50%",
        duration: 0.7,
        ease: "power2.out",
      });
      gsap.fromTo(
        ".right-child",
        { opacity: 0, x: "-50%" },
        {
          opacity: 1,
          x: "0%",
          duration: 0.7,
          ease: "power2.out",
        }
      );
    }
    monthNameView.innerText = Calendar[counter].month;
  });

  next.addEventListener("click", function () {
    counter++;

    carousel.next();
    prev.style.visibility = "visible";
    left_child.style.visibility = "visible";

    if (checkVisibility() === lengthOfCarousel - 2) {
      console.log(lengthOfCarousel);
      next.style.visibility = "hidden";
      right_child.style.visibility = "hidden";
      gsap.to(".left-child", {
        opacity: 0,
        x: "-50%",
        duration: 0.7,
        ease: "power2.out",
      });
      gsap.fromTo(
        ".left-child",
        { opacity: 0, x: "50%" },
        {
          opacity: 1,
          x: "0%",
          duration: 0.7,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(".left-child", {
        opacity: 0,
        x: "-50%",
        duration: 0.7,
        ease: "power2.out",
      });
      gsap.fromTo(
        ".left-child",
        { opacity: 0, x: "50%" },
        {
          opacity: 1,
          x: "0%",
          duration: 0.7,
          ease: "power2.out",
        }
      );

      gsap.to(".right-child", {
        opacity: 0,
        x: "-50%",
        duration: 0.7,
        ease: "power2.out",
      });
      gsap.fromTo(
        ".right-child",
        { opacity: 0, x: "50%" },
        {
          opacity: 1,
          x: "0%",
          duration: 0.7,
          ease: "power2.out",
        }
      );
    }
    monthNameView.innerText = Calendar[counter].month;
  });

  function checkVisibility() {
    const activeElement = carousel._getActive();
    return carousel._getItemIndex(activeElement);
  }

  function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    return day + "/" + month;
  }

  got_periods_btn.addEventListener("click", function () {
    if (!gotPeriods) {
      gotPeriods = true;
      let dateList = [];
      let currentDate = new Date();

      dateList.push(formatDate(currentDate));

      for (
        let i = 1;
        i <= currentDate.getDate() - getStartDate(date[1])[0];
        i++
      ) {
        let prevDate = new Date(currentDate);
        prevDate.setDate(currentDate.getDate() - i);
        dateList.unshift(formatDate(prevDate));
      }

      for (let i = 1; i <= date_data.week_days; i++) {
        let nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + i);
        dateList.push(formatDate(nextDate));
      }

      let newdate = currentDate.toISOString().slice(0, 10);
      let nextDate = addDaysToDate(
        newdate,
        date_data.week_days + date_data.month_days
      );

      date[2] = nextDate.getDate();
      let Calendar = getCalendar(date);
      buildCalendar(Calendar, gotPeriods);

      got_period(dateList);
      got_periods_btn.textContent = "Get Period Insights";
    } else {
      console.log("clicked");
      location.href = "perioddashboardupdated.html";
    }
  });

  async function got_period(listOfDates) {
    let currentDateIdx = listOfDates.indexOf(formatDate(new Date()));

    let backgroundColor = color_lst[currentDateIdx];
    let email = localStorage.getItem("email");
    let date = 0;
    while (date < currentDateIdx) {
      const div = document.getElementById(listOfDates[date]);
      div.style = null;
      date++;
    }

    while (date < listOfDates.length) {
      const div = document.getElementById(listOfDates[date]);

      if (div) {
        div.classList.remove("calendarDate");
        div.style = null;
        div.classList.add("blood-div");
        // console.log(div)
      } else {
        console.log("no div found");
      }

      date++;
    }

    let data = {
      email: email,
      color: backgroundColor,
    };

    const response = await fetch("http://localhost:3000/set-period-data", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let resData = await response.json();
    console.log(resData);
  }
});
