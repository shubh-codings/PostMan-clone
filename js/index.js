// Togglemenu
let toggleMenu =document.getElementById('toggleMenu');
toggleMenu.addEventListener('click', ()=>{
    let navMenu = document.getElementById('navMenu');
    let navbar = document.getElementById('navbar');
    let sec = document.querySelector('section');
    if (navMenu.style.display =="none"){
        navMenu.style.display = "flex";
        navbar.style.height = "25vh";
        sec.style.marginTop = "25vh";
        
    }
    else{
        navMenu.style.display = "none";
        navbar.style.height = "40px";
        sec.style.marginTop = "";
    }
})  

// Setting the Display of JSON BOX and PARAMETERS BOX from none to Flex.
const jsonBox = document.querySelector('#jsonBox');
const parametersBox = document.querySelector('#parametersBox');
jsonBox.style.display = 'none';
parametersBox.style.display = 'none';
// If User click on json hide parameter box 
const json = document.getElementById('json');
json.addEventListener('click', () => {
    jsonBox.style.display = 'flex';
    parametersBox.style.display = 'none';
})
// If User click on custom hide json box 
const custom = document.getElementById('custom');
custom.addEventListener('click', () => {

    parametersBox.style.display = 'flex';
    jsonBox.style.display = 'none';
})
// for adding more parameters 
const addParamBtn = document.getElementById('addParamBtn');
let parameterCount = 1;
// Adding an EventListner to add parameters button 
addParamBtn.addEventListener('click', (e) => {
    e.preventDefault();
    parameterCount += 1;
    let parameters = document.getElementById('parameters');
    parameters.innerHTML = parameters.innerHTML + `<div class = "width100 paramGrid my-1" id ="${parameterCount}">
    <label class="label" for="parameterKey${parameterCount}">Parameter${parameterCount}</label>
    <input class="width100" type="text" name="key${parameterCount + 1}" id="parameterKey${parameterCount}" placeholder="Key">
    <input class="width100" type="text" name="value${parameterCount}" placeholder="Value" id="parameterValue${parameterCount}">
    <input class="btn" id="deleteParamBtn${parameterCount}" onclick = "deleteParam(${parameterCount})" type="button" value="Delete">
    </div>`;
})
// function for delete parameters buttons 
let deleteCount = 0;
function deleteParam(id) {
    // console.log(id)
    let item = document.getElementById(id.toString());
    // console.log(paramToDelete)
    item.parentNode.removeChild(item);
    deleteCount += 1

}
// using get method from the api using fetch api

const submit = document.getElementById('requestSubmit');
submit.addEventListener('click', (e) => {
    e.preventDefault();
    
    document.getElementById('responsePrism').innerText = "Please Wait. Fetching Response.....";

    // Fetching All The Value The User Has Entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    parameterCount = parameterCount - deleteCount;

    // logging all the values in console for debugging
    // console.log(url,requestType,contentType) 
    if (contentType == "Custom") {
        data = {};
        for (let index = 0; index < parameterCount + 1; index++) {
            // console.log(document.getElementById('parameterKey' + (index+1))); for debugging purpose
            if (document.getElementById('parameterKey' + (index + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (index + 1)).value;
                let value = document.getElementById('parameterValue' + (index + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('jsonText').value;
    }

    // console.log(data)

    // if the request is GET invoking fetch api 
    if (requestType == 'GET') {
        // console.log(requestType)
        fetch(url, { method: 'GET' }).then(response => response.text()).then((text) => {
            document.getElementById('responsePrism').innerText = text;
        });
    }
    else {
        console.log(requestType)
        // fetch(url,{mathod:"POST",headers:{'Content-type': 'application/json; charset=UTF-8'},body :data,}).then(response => response.text()).then((text)=>{
        //     document.getElementById('jsonResponseBox').value = text;
        // });

        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {  
                document.getElementById('responsePrism').innerText = JSON.stringify(json)});

    }





})







// Setting Clock On The Screen 
const time = document.getElementById('time');
setInterval(() => {
    let date = new Date();
    let curHours = date.getHours();
    let curMinutes = date.getMinutes();
    let curSeconds = date.getSeconds();
    let s = '';
    if (curHours < 12) { s = ' AM' } else { s = ' PM' }
    if (curHours < 10) {
        curHours = '0' + curHours
    }
    if (curMinutes < 10) {
        curMinutes = '0' + curMinutes
    }
    if (curSeconds < 10) {
        curSeconds = '0' + curSeconds
    }

    screenTime = curHours + ":" + curMinutes + ":" + curSeconds + s;
    time.innerText = screenTime;
}, 1000)