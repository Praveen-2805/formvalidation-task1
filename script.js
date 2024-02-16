const validmessage = (element, message) => {
    let inputcontrol = element.parentElement;
    let error = inputcontrol.querySelector("#error");
    error.innerHTML = message;
    error.style.color= "green";
}
const invalidmessage = (element, message) => {
    let inputcontrol = element.parentElement;
    let error = inputcontrol.querySelector("#error");
    error.innerHTML = message;
    error.style.color = "red";
};
function nametest() {
    let name = document.getElementById("name");
    if (!/^[a-zA-Z]+$/.test(name.value)) {
        invalidmessage(name, "Enter the valid Name!");
        name.classList.add("invalid");
        name.classList.remove("valid");
        return false;
    }
    else {
        validmessage(name, "Name is valid!");
        name.classList.remove("invalid");
        name.classList.add("valid");
        return true;
    }
}
function mailtest() {
    let email = document.getElementById("email");
    if (!/\S+@\S+\.\S+/.test(email.value)) {
        invalidmessage(email, "Enter the Valid E-Mail!");
        email.classList.add("invalid");
        email.classList.remove("valid");
        return false;
    }
    else {
        validmessage(email, "Mail-ID is Valid!");
        email.classList.remove("invalid");
        email.classList.add("valid");
        return true;
    }
}
function contacttest() {
    let contact = document.getElementById("contact");
    if (!/^[9876]\d{9}$/.test(contact.value)) {
        invalidmessage(contact, "Enter the Valid Contact Number!");
        contact.classList.add("invalid");
        contact.classList.remove("valid");
        return false;
    } else {
        validmessage(contact, "Contact Number is Valid!");
        contact.classList.remove("invalid");
        contact.classList.add("valid");
        return true;
    }
}
function dobtest() {
    let dob = document.getElementById("dob");
    var dobYear = new Date(dob.value).getFullYear();
    if (dobYear < 1950 || dobYear > 2010) {
        invalidmessage(dob, "Date of birth should be between 1950 and 2010.");
        dob.classList.add("invalid");
        dob.classList.remove("valid");
        return false;
    }
    else {
        validmessage(dob, "correct!");
        dob.classList.remove("invalid");
        dob.classList.add("valid");
        return true;
    }
}
function passwordshow(password) {
    let parentclass = password.parentElement;
    let passElement = parentclass.querySelector(".password");
    if(password.innerHTML=='<i class="bi bi-eye-fill"></i>'){
        password.innerHTML='<i class="bi bi-eye-slash-fill"></i>'
    }
    else{
        password.innerHTML='<i class="bi bi-eye-fill"></i>';
    }
    passElement.type == "text" ? passElement.type = "password" : passElement.type = "text";
}
function passwordtest() {
    let password = document.getElementById("password");
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/.test(password.value)) {
        invalidmessage(password.parentElement, "Password is weak!");
        password.classList.add("invalid");
        password.classList.remove("valid");
        return false;
    }
    else {
        validmessage(password.parentElement, "Password is Strong!");
        password.classList.remove("invalid")
        password.classList.add("valid");
        return true;
    }
}
function usernametest() {
    let username = document.getElementById("username");
    let userData = localStorage.getItem(username.value);

    console.log(userData);
    if (userData !== null) {
        invalidmessage(username, "Username already exists. Please choose a different one.");
        username.classList.remove("valid")
        username.classList.add("invalid")
        return false;
    }
    else {
        validmessage(username, "Username is unique");
        username.classList.remove("invalid");
        username.classList.add("valid");
        return true;
    }
}
function pantest() {
    let pan = document.getElementById("pan");
    if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(pan.value)) {
        invalidmessage(pan, "Invalid PAN number. Format should be ABCDE1234F.");
        pan.classList.add("invalid");
        pan.classList.remove("valid");
        return false;
    }
    else {
        validmessage(pan, "PAN is valid");
        pan.classList.add("valid");
        pan.classList.remove("invalid");
        return true;
    }
}
function profiletest() {
    let profilePic = document.getElementById("profilePic");
    if (profilePic.files.length > 0) {
        let fileSize = profilePic.files[0].size; // Get the size of the selected file
        // Check if the file size exceeds 2MB
        if (fileSize > 2 * 1024 * 1024) {
            invalidmessage(profilePic, "Profile picture size should be below 2MB.");
            profilePic.classList.add("invalid");
            profilePic.classList.remove("valid");
            return false;
        } else {
            validmessage(profilePic, "Profile Picture looks good!");
            profilePic.classList.add("valid");
            profilePic.classList.remove("invalid");
            return true;
        }
    }
}
function Store() {
    if (!nametest() || !mailtest() || !contacttest() || !dobtest() || !passwordtest() || !usernametest() || !pantest() || !profiletest()) {
        // If any validation fails, return false 
        alert("Enter Correct Detials..!");
        return false;
    }
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var contact = document.getElementById("contact").value;
    var dob = document.getElementById("dob").value;
    var gender = document.getElementById("gender").value;
    var education = document.getElementById("education").value;
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;
    var occupation = document.getElementById("occupation").value;
    var pan = document.getElementById("pan").value;
    var profilePic = document.getElementById("profilePic").files[0];
    var profilePicSize = profilePic.size;

    if (!occupation || occupation == "") {
        occupation = "NA";
    }
    var reader = new FileReader();
    reader.onload = function (event) {
        var profilePicBase64 = event.target.result;
        // Create an object with the user data
        var userData = {
            name: name,
            email: email,
            contact: contact,
            education: education,
            dob: dob,
            gender: gender,
            username: username,
            password: password,
            pan: pan,
            occupation: occupation,
            profilePic: profilePicBase64,
            profilePicSize: profilePicSize
        };
        localStorage.setItem(username, JSON.stringify(userData));
        alert("User registration successful!");
    };
    // Read the profile picture as data URL
    reader.readAsDataURL(profilePic);
    return true;
}

//Function to Search the Data
function searchData() {
    var searchTerm = document.getElementById("searchTerm").value.trim().toLowerCase();

    var searchResults = document.getElementById("searchResults");
    if(!searchTerm||searchTerm == ""){
        searchResults.textContent = "No results found.";
        searchResults.style.color="red";
        return;
    }
    searchResults.style.color="black";
    searchResults.innerHTML = "";
    // Iterate over local storage key
    for (var i = 0; i < localStorage.length; i++) {
        var username = localStorage.key(i);
        var userData = JSON.parse(localStorage.getItem(username));

        if (userData.name.toLowerCase().includes(searchTerm)) {
            displayUserData(username, userData);
        } else if (!isNaN(searchTerm)) {
            var dob = userData.dob;
            var ageInDays = calculateAge(dob);
            if (ageInDays < parseInt(searchTerm)) {
                displayUserData(username, userData);
            }
        } else if (searchTerm.toLowerCase().endsWith("mb") || searchTerm.toLowerCase().endsWith("kb")) {
            var size = searchTerm.endsWith("mb") ? parseFloat(searchTerm) * 1024 * 1024 : parseFloat(searchTerm) * 1024;
            if (userData.profilePicSize < size) {
                displayUserData(username, userData);
            }
        }
    }
    if (searchResults.innerHTML === "") {
        //Results Not Found Error Message
        var noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No results found.";
        noResultsMessage.classList.add("error");
        searchResults.appendChild(noResultsMessage);
    }
}
//For Display the User Search Results
function displayUserData(username, userData) {
    var searchResults = document.getElementById("searchResults");
    var userDetailsContainer = document.createElement("div");
    userDetailsContainer.classList.add("userDetailsContainer");
    userDetailsContainer.innerHTML = `
        <div id="profile" class="column">
            <img id ="PreviewPic" height=100px width=100px src="${userData.profilePic}" >
        </div>
        <div id="data" class="column">
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Username:</strong> ${userData.username}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Contact:</strong> ${userData.contact}</p>
            <p><strong>Gender:</strong> ${userData.gender}</p>
            <p><strong>Education:</strong> ${userData.education}</p>
            <p><strong>Date of Birth:</strong> ${userData.dob}</p>
            <p><strong>PAN:</strong> ${userData.pan}</p>
            <p><strong>Occuption:</strong>${userData.occupation}</p>
        </div>
    `;
    searchResults.appendChild(userDetailsContainer);
}
//For Calculating Age 
function calculateAge(dob) {
    var dobDate = new Date(dob);
    var today = new Date();
    var ageInMilliseconds = today - dobDate;
    var ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
    return ageInDays;
}