// FETCH AVAILABLE ZIPCODES FROM API : --------------------------------------------------------------------------------

let zipcode = document.querySelector('#zipcode');
const url = "https://cnos4.herokuapp.com/predict"; 

fetch(url)
.then(response => response.json())
.then(data =>{
    let dropdownZip = (data.properties.data.properties['zip-code'].enum).sort();   // sort() in nummeric order for better accesibility
        // console.log(data.properties.data.properties['zip-code'].enum)               

    dropdownZip.forEach(code => {
          zipcode.insertAdjacentHTML("beforeend", `<option>${code}</option>`);      // for each code, create an option
    }); 
});
// FETCH AVAILABLE ZIPCODES FROM API END --------------------------------------------------------------------------------

// Event Listener for First Button #submit1
document.getElementById('submit1').addEventListener("click", () => {
    
    let area = new Number(document.getElementById('area').value);
    // console.log(area);   OK  
    
    let rooms = new Number(document.getElementById('rooms').value);
    // console.log(rooms);  OK
    
    let zip = new Number(document.getElementById('zipcode').value);
    // console.log(zip);  OK
    
    let typeOfProperty = document.querySelector('input[name="type"]:checked').value;
    // console.log(typeOfProperty);  OK
    
    let landArea = new Number(document.getElementById('landarea').value);
    // console.log(landArea);   OK
    
    let garden = document.querySelector('select[name="garden"]').value;
        if (garden == "true"){
            garden = true;
        } else {
            garden = false;
        }
        // console.log(garden);  OK
    
    let gardenArea = new Number(document.getElementById('gardenarea').value);
    // console.log(gardenArea); OK

    let equippedKitchen = document.querySelector('select[name="equipped-kitchen"]').value;
        if (equippedKitchen == "true"){
            equippedKitchen = true;
        } else {
            equippedKitchen = false;
        }
        // console.log(equippedKitchen);  OK

    let swimmingpool = document.querySelector('select[name="swimmingpool"]').value;
        if (swimmingpool == "true"){
            swimmingpool = true;
        } else {
            swimmingpool = false;
        }
        // console.log(swimmingpool);   OK

    let furnished = document.querySelector('select[name="furnished"]').value;
        if (furnished == "true"){
            furnished = true;
        } else {
            furnished = false;
        }
        // console.log(furnished);  OK
    
    let openFire = document.querySelector('select[name="open-fire"]').value;
        if (openFire == "true"){
            openFire = true;
        } else {
            openFire = false;
        }
        // console.log(openFire);  OK

    let terrace = document.querySelector('select[name="terrace"]').value;
        if (terrace == "true"){
            terrace = true;
        } else {
            terrace = false;
        }
        // console.log(terrace);  OK

    let terraceArea = new Number(document.getElementById('terrace-area').value);
    // console.log(terraceArea); 

    let facadesNumber = new Number(document.getElementById('facades-number').value);
    // console.log(facadesNumber); 

    let buildingState = document.querySelector('select[name="buildingstate"]').value;
    // console.log(buildingState);

    // this input needs fine-tuning: format should be (number,street,ville,zip) > (no spaces before/after commas, nodashes between words, multiple words allowed on the street and ville name)
    let address = document.getElementById("full-address").value;
    let addressArray = address.split(" ");
    let fullAddress = addressArray.join(",");
    // console.log(fullAddress);

    let propertySubtype = document.querySelector('select[name="property-subtype"]').value;
    // console.log(propertySubtype);
 

    let inputData = {
        data: {
            "area": area,
            "property-type": typeOfProperty,
            "rooms-number": rooms, 
            "zip-code": zip,
            "land-area": landArea,
            "garden": garden,
            "garden-area": gardenArea,
            "equipped-kitchen": equippedKitchen,
            "swimmingpool": swimmingpool,
            "furnished": furnished,
            "open-fire": openFire,
            "terrace": terrace,
            "terrace-area": terraceArea,
            "facades-number": facadesNumber,
            "building-state": buildingState,
            "full-address": fullAddress,
            "property-subtype": propertySubtype
        }
    };
    console.log(inputData);

    const url = "https://cnos4.herokuapp.com/predict";
    fetch(url,                                                  // This is the request, 1st parameter : the URL of the API
        {method: 'POST',                                        // the 2nd parameter is the data we provide to the API. (Header, body, method)
        body: JSON.stringify(inputData),                        // Packaging up all of my data and send it as a stringify, the js object data and make it into a JSON string.
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
            }                                                   // Header is data that can be packaged along with any POST or GET request that's moving between client and server.
        })
    .then(response => (response.json()))                        // This is the API's response to the data sent above, and we converted it into JSON
    .then((data)=> {
        //console.log(data);                                    // OK
        //console.log(data.prediction);                         // comes as a STRING , example:  "{'prediction': array([1509242.50882198])}"

        let propertyValue = data.prediction.slice(22, -3);      // sliced the begining and end of the string to keep only the digits
        //console.log(propertyValue);                           // OK

        propertyValue = new Number(propertyValue);              // transformed the digits into a number
        //console.log(new Number(propertyValue));               // OK
        
        propertyValue = new Number(propertyValue.toFixed(2));   // Limited decimals to only 2.
        //console.log(new Number(propertyValue));               // OK

        propertyValue = propertyValue.toLocaleString();         // Added comma separators

        alert(`Your propertyestimated values is: €${propertyValue}`);
    })
    .catch(error => {
        console.log('error!');
        console.log(error);
    });
});

// Event Listener for Second Button #submit2
document.getElementById('submit2').addEventListener("click", () => {
    
    let area = new Number(document.getElementById('area').value);
    // console.log(area);   OK  
    
    let rooms = new Number(document.getElementById('rooms').value);
    // console.log(rooms);  OK
    
    let zip = new Number(document.getElementById('zipcode').value);
        // console.log(zip);  OK
    
    let typeOfProperty = document.querySelector('input[name="type"]:checked').value;
    // console.log(typeOfProperty);  OK
    
    let landArea = new Number(document.getElementById('landarea').value);
    // console.log(landArea);   OK
    
    let garden = document.querySelector('select[name="garden"]').value;
        if (garden == "true"){
            garden = true;
        } else {
            garden = false;
        }
        // console.log(garden);  OK
    
    let gardenArea = new Number(document.getElementById('gardenarea').value);
    // console.log(gardenArea); OK

    let equippedKitchen = document.querySelector('select[name="equipped-kitchen"]').value;
        if (equippedKitchen == "true"){
            equippedKitchen = true;
        } else {
            equippedKitchen = false;
        }
        // console.log(equippedKitchen);  OK

    let swimmingpool = document.querySelector('select[name="swimmingpool"]').value;
        if (swimmingpool == "true"){
            swimmingpool = true;
        } else {
            swimmingpool = false;
        }
        // console.log(swimmingpool);   OK

    let furnished = document.querySelector('select[name="furnished"]').value;
        if (furnished == "true"){
            furnished = true;
        } else {
            furnished = false;
        }
        // console.log(furnished);  OK
    
    let openFire = document.querySelector('select[name="open-fire"]').value;
        if (openFire == "true"){
            openFire = true;
        } else {
            openFire = false;
        }
        // console.log(openFire);  OK

    let terrace = document.querySelector('select[name="terrace"]').value;
        if (terrace == "true"){
            terrace = true;
        } else {
            terrace = false;
        }
        // console.log(terrace);  OK

    let terraceArea = new Number(document.getElementById('terrace-area').value);
    // console.log(terraceArea);  OK

    let facadesNumber = new Number(document.getElementById('facades-number').value);
    // console.log(facadesNumber);  OK

    let buildingState = document.querySelector('select[name="buildingstate"]').value;
    //  console.log(buildingState);  OK

    let address = document.getElementById("full-address").value;
    let addressArray = address.split(" ");
    let fullAddress = addressArray.join(",");
    // console.log(fullAddress);  OK

    let propertySubtype = document.querySelector('select[name="property-subtype"]').value;
    // console.log(propertySubtype);  OK
 
    let inputData = {
        data: {
            "area": area,
            "property-type": typeOfProperty,
            "rooms-number": rooms, 
            "zip-code": zip,
            "land-area": landArea,
            "garden": garden,
            "garden-area": gardenArea,
            "equipped-kitchen": equippedKitchen,
            "swimmingpool": swimmingpool,
            "furnished": furnished,
            "open-fire": openFire,
            "terrace": terrace,
            "terrace-area": terraceArea,
            "facades-number": facadesNumber,
            "building-state": buildingState,
            "full-address": fullAddress,
            "property-subtype": propertySubtype
        }
    }
    console.log(inputData);

    const url = "https://cnos4.herokuapp.com/predict";
    fetch(url,                                              // This is the request, 1st parameter : the URL of the API
        {method: 'POST',                                    // the 2nd parameter is the data we provide to the API.
        body: JSON.stringify(inputData),                    // Packaging up all of my data and send it as a stringify, the js object data and make it into a JSON string.
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
            }                                               // Header is something that can be packaged along with any POST or GET request that's moving between client and server.
        })
    .then(response => (response.json()))                    // This is the API's response to the data sent above, and we converted it into JSON
    .then((data)=> {
        // console.log(data);                               // OK
        // console.log(data.prediction);                    // comes as a STRING , example:  "{'prediction': array([1509242.50882198])}"

        let propertyValue = data.prediction.slice(22, -3);  // sliced the begining and end of the string to keep only the digits
        // console.log(propertyValue);                      // OK

        propertyValue = new Number(propertyValue);          // transformed the digits into a number
        // console.log(new Number(propertyValue));          // OK
        
        propertyValue = new Number(propertyValue.toFixed(2));   // Limited decimals to only 2.
        // console.log(new Number(propertyValue));          // OK

        propertyValue = propertyValue.toLocaleString();     // Add comma separators for better readability

        alert(`Your propertyestimated values is: €${propertyValue}`);
    })
    .catch(error => {
        console.log('error!');
        console.log(error);
    })
});