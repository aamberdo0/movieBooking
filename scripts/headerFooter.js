// function that creater header
function makeHeader(){
    const headerCountry = `Vietnam`; 
    const headerName = `Amber Do`; 
    const headerTitle = `Fall 2023 Assignment 1`;   
    const header = document.getElementById("navigation"); 
    header.innerHTML = `<h3 id ="headerTitle">${headerTitle}</h3>`; 
    header.innerHTML += `<h3 id ="headerName">${headerName}</h3>`; 
    header.innerHTML += `<h3 id ="headerCountry">${headerCountry}</h3>`; 
}

// function that creater footer
function makeFooter(){
    const footerText1 = `do10 `; 
    const footerText2 = `991673528`;
    const footerText3= `Software Engineering`; 
    const footer = document.getElementById("footerDisplay"); 
    footer.innerHTML = `<h3 id ="footerText1">${footerText1}</h3>`; 
    footer.innerHTML += `<h3 id ="footerText2">${footerText2}</h3>`; 
    footer.innerHTML += `<h3 id ="footerText3">${footerText3}</h3>`; 
}
