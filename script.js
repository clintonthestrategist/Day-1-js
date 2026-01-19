const generateCard = document.getElementById('generatebutton');
const cardContainer = document.getElementById('profilecard');
const formContainer = document.getElementById('inputform');

generateCard.addEventListener('click', function() {
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const birthYear = document.getElementById('byear').value;
    const favouriteColor = document.getElementById('favcolor').value;
    const bio = document.getElementById('biodata').value;
    const fileInput = document.getElementById('proimage');

    if (!firstName || !lastName || !birthYear || !favouriteColor || !bio) {
        alert("Please fill out all fields before generating the card.");
        return;
    }

    const currentYear = new Date().getFullYear();
    const birthDate = new Date(birthYear);
    
    if (!birthYear || isNaN(birthDate.getTime()) || birthDate.getFullYear() < 1800 || birthDate.getFullYear() > currentYear) {
        alert("Please select a valid birth date.");
        return;
    }
    
    const birthYearValue = birthDate.getFullYear();
    const age = currentYear - birthYearValue;

    const fullName = firstName + " " + lastName;

    const isMinor = age < 18 ? "Yes" : "No";
    
    if (!fileInput.files.length) {
        alert("Please upload a profile image.");
        return;
    }
    const file = fileInput.files[0];

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
        alert("Only JPEG or PNG images are allowed.");
        return;
    }
    if (file.size > 3 * 1024 * 1024) {
        alert("Image must be less than 3MB");
        return;
    }

    const profileImage = URL.createObjectURL(file);
    document.getElementById('profileimage').src = profileImage;

    document.getElementById('fullname').innerText = fullName;
    document.getElementById('realage').innerText = `Age: ${age}`;
    document.getElementById('minor').innerText = `Is a Minor: ${isMinor}`;
    document.getElementById('biodisplay').innerText = `Biodata: ${bio}`;

    const typeSummary = `
    Data Types: 
    Name (${typeof fullName})
    Age: (${typeof age})
    Is Minor: ${typeof (age < 18)}`;
    document.getElementById('datatypes').innerText = typeSummary;

    const profileCard = document.getElementById('profilecard');
    profileCard.style.backgroundColor = favouriteColor;
    profileCard.style.display = "block";
    formContainer.style.display = "none";
});