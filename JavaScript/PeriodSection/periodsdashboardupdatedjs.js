
document.addEventListener("DOMContentLoaded", async function () {


    async function getPeriodData() {
        let email = localStorage.getItem("email")
        let response = await fetch(`http://localhost:3000/get-period-data?email=${email}`);
        let data = await response.json();
        data = data.data

        console.log(data)

        const today = new Date();
        const savedDate = new Date(data.date);

        // const savedDate = new Date(today.getTime() - (2 * 24 * 60 * 60 * 1000)); //Trial Dates 
  
        const milliseconds = today.getTime() - savedDate.getTime();

        const periodDaysPassed = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

        const periodCompletion = Math.floor((periodDaysPassed / data.week_days) * 100);
        console.log(periodCompletion)

        return {
            zone: data.period_zone,
            day: periodDaysPassed,
            periodCompletion: periodCompletion,
            bleeding_meter: [70,55,45,30,20,10],
            cramp_meter: [70,55,45,30,20,10]
        }

    }



    function updateDashBoard(data) {
        const period_zone = document.querySelector(".zonefromjs")
        const zone = data.zone
        const periodCompletion = data.periodCompletion

        const textContainer = document.getElementById("heading-text");
        const dataContent = [
            { text: "Cramp-O-meter", progress: data.cramp_meter },
            { text: "Bleeding-meter", progress: data.bleeding_meter },
            { text: "Period Completed", progress: data.periodCompletion }
        ];

        let currentIndex = 0;

        function updateText() {

            let text = dataContent[currentIndex].text;

            let progress = (text === "Period Completed" )
            ? dataContent[currentIndex].progress
            : dataContent[currentIndex].progress[data.day]

            textContainer.textContent = text ;
            textContainer.appendChild(document.createElement('br'))
            textContainer.appendChild(document.createTextNode(`For Day ${data.day+1}`))

            updateProgress(progress)

            currentIndex = (currentIndex + 1) % dataContent.length;
        }

        setInterval(updateText, 3700);

        console.log(zone, periodCompletion)

        period_zone.textContent = (zone === "#4BB080") ? "Green" : (zone === "#CAC221") ? "Yellow" : "Red"
        period_zone.style.color = zone


    }




    function circularProgressBar() {
        let circularProgress = document.querySelector(".progress-bar");
        let progressStartValue = 0;
        let progressEndValue = 100; //helps to create the end value (Can be made dynamic)
        let speed = 40; //you can change the speed of the progress bar using this variable

        let progress = setInterval(() => {
            progressStartValue++;
            circularProgress.style.background = `conic-gradient(maroon ${progressStartValue * 3.6
                }deg,#fff 0deg)`;

            if (progressStartValue === progressEndValue) {
                clearInterval(progress);
            }
        }, speed);
    }
    // circularProgressBar();
    function updateProgress(progressMaxValue) {
        let thumb = document.querySelector(".thumb");

        let circularProgress = document.querySelector(".circular-progress")
        let progressStartValue = 0,
            progressEndValue = progressMaxValue,
            speed = 20;

        let progress = setInterval(() => {

            if (progressStartValue === progressEndValue) {
                clearInterval(progress);
            }

            
            progressStartValue++;
            circularProgress.style.background = `conic-gradient(#8E0C2C ${progressStartValue * 3.6}deg, #FFFFFF 0deg)`

            let angleInRadians = ((progressStartValue * 3.6) - 90) * (Math.PI / 180);
            let radius = parseFloat(window.getComputedStyle(circularProgress).getPropertyValue("width")) / 2.025;
            let centerX = parseFloat(window.getComputedStyle(circularProgress).getPropertyValue("left")) + radius;
            let centerY = parseFloat(window.getComputedStyle(circularProgress).getPropertyValue("top")) + radius;
            let thumbX = centerX + (radius * Math.cos(angleInRadians)) - (thumb.offsetWidth / 2);
            let thumbY = centerY + (radius * Math.sin(angleInRadians)) - (thumb.offsetHeight / 2);



            thumb.style.left = thumbX + "px";
            thumb.style.top = thumbY + "px";

            if (progressStartValue === progressEndValue) {
                clearInterval(progress);
            }
        
        }, speed);
    }






// MAIN PART 

    const data = await getPeriodData();
    console.log(data)

    updateDashBoard(data);

});




