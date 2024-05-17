async function saveLoginData(data) {

    try {
        const response = await fetch('http://localhost:3000/save-signup-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // if (!response.ok) {
        // throw new Error(`API call failed with status ${response.status}`);
        // }


        const responseData = await response.json();
        console.log('Signup data saved successfully:', responseData);
        if (responseData.success === false) {
            alert("User already exists")
            location.href = "loginhtml.html"
        }
        else {

            alert("User data saved")
            location.href = "../../HTML/PeriodSection/CalendarReminder.html"
        }

    } catch (error) {
        console.error('Error saving login data:', error);
    }

}

function submitHandler1(event) {
    event.preventDefault();

    const name = document.getElementById("inputname").value.trim();
    const phoneNumber = document.getElementById("inputmobno").value.trim();
    const email = document.getElementById("inputemail").value.trim();

    console.log("Name:", name);
    console.log("Phone Number:", phoneNumber);
    console.log("Email:", email);

    dataObj.name = name;
    dataObj.phoneNo = phoneNumber;
    dataObj.email = email



    const form1 = document.getElementById("submitbutton1").parentElement;
    form1.style.display = "none";

    const form2 = document.getElementById("submitbutton2").parentElement;
    form2.style.display = "flex";


}



function submitHandler2(event) {
    event.preventDefault();

    const space1 = document.getElementById("inputotpspace1").value.trim();
    const space2 = document.getElementById("inputotpspace2").value.trim();
    const space3 = document.getElementById("inputotpspace3").value.trim();
    const space4 = document.getElementById("inputotpspace4").value.trim();


    console.log(space1, space2, space3, space4)


    const form2 = document.getElementById("submitbutton2").parentElement;
    form2.style.display = "none";

    const form3 = document.getElementById("submitbutton3").parentElement;
    form3.style.display = "flex";
}

function submitHandler3(event) {
    event.preventDefault();

    const age = document.getElementById("inputage").value.trim();

    console.log("Age:", age);

    dataObj.age = age;

    const form3 = document.getElementById("submitbutton3").parentElement;
    form3.style.display = "none";

    const form4 = document.getElementById("submitbutton4").parentElement;
    form4.style.display = "flex";

}



function submitHandler4(event) {
    event.preventDefault();

    const monthDays = document.getElementById("inputmonthdays").value.trim();
    const weekDays = document.getElementById("inputweekdays").value.trim();


    console.log("Month-Days", monthDays);
    console.log("Week-Days", weekDays);

    dataObj.monthDays = monthDays;
    dataObj.weekDays = weekDays;

    const form4 = document.getElementById("submitbutton4").parentElement;
    form4.style.display = "none";

    const form5 = document.getElementById("submitbutton5").parentElement;
    form5.style.display = "flex";


}

function submitHandler5(event) {
    event.preventDefault();

    const date = document.getElementById("inputdate").value.trim();

    console.log("Date:", date);

    dataObj.date = date;

    const form5 = document.getElementById("submitbutton5").parentElement;
    form5.style.display = "none";

    const finalScreen = document.getElementById("finalscreen")
    finalScreen.style.display = "flex";

    localStorage.setItem('email', dataObj.email)


    saveLoginData(dataObj)


}




// Main-Code

let dataObj = {}

document.getElementById("submitbutton1").addEventListener("click", submitHandler1);
document.getElementById("submitbutton2").addEventListener("click", submitHandler2);
document.getElementById("submitbutton3").addEventListener("click", submitHandler3);
document.getElementById("submitbutton4").addEventListener("click", submitHandler4);
document.getElementById("submitbutton5").addEventListener("click", submitHandler5);


