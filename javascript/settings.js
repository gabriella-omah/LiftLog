// ========================================
// PROFILE
// ========================================

const profileName =
    document.getElementById("profileName");

const bodyHeight =
    document.getElementById("bodyHeight");

const bodyWeight =
    document.getElementById("bodyWeight");

const fitnessLevel =
    document.getElementById("fitnessLevel");

const fitnessGoal =
    document.getElementById("fitnessGoal");

const bmiField =
    document.getElementById("bmi");

const saveProfileBtn =
    document.getElementById("saveProfileBtn");

const profileAvatar =
    document.getElementById("profileAvatar");

const displayName =
    document.getElementById("displayName");

const displayGoal =
    document.getElementById("displayGoal");


// ========================================
// CLOSE ALL OPEN SECTIONS
// ========================================

function closeAllSections(){

    document
        .querySelectorAll(".accordion-collapse.show")
        .forEach(section=>{

            bootstrap
                .Collapse
                .getOrCreateInstance(section)
                .hide();

        });

}

// ========================================
// LOAD PROFILE
// ========================================

let profile =
    JSON.parse(
        localStorage.getItem("profile")
    ) || {

        name: "",

        height: "",

        weight: "",

        level: "Beginner",

        goal: "Build Muscle"

    };


// ========================================
// FILL FORM
// ========================================

if(profileName){

    profileName.value = profile.name;

}

if(bodyHeight){

    bodyHeight.value = profile.height;

}

if(bodyWeight){

    bodyWeight.value = profile.weight;

}

if(fitnessLevel){

    fitnessLevel.value = profile.level;

}

if(fitnessGoal){

    fitnessGoal.value = profile.goal;

}


// ========================================
// UPDATE PROFILE CARD
// ========================================

function updateProfileCard(){

    if(!displayName) return;

    const fullName =
        profile.name.trim();

    if(fullName){

        displayName.textContent =
    fullName
        .split(" ")
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase()
        )
        .join(" ");

        const initials =
            fullName
                .split(" ")
                .map(word => word.charAt(0))
                .join("")
                .substring(0,2)
                .toUpperCase();

        profileAvatar.textContent =
            initials;

    }

    else{

        displayName.textContent =
            "Your Name";

        profileAvatar.textContent =
            "G";

    }

    displayGoal.textContent =
        profile.goal;

}


// ========================================
// BMI
// ========================================

function calculateBMI(){

    if(!bmiField) return;

    const height =
        parseFloat(bodyHeight.value);

    const weight =
        parseFloat(bodyWeight.value);

    if(

        !height ||

        !weight ||

        height <= 0

    ){

        bmiField.value = "";

        return;

    }

    const bmi =
        weight /
        Math.pow(height / 100,2);

    bmiField.value =
        bmi.toFixed(1);

}


// ========================================
// SAVE PROFILE
// ========================================

if(saveProfileBtn){

saveProfileBtn.addEventListener("click",()=>{

    if(

        profileName.value.trim()===""

    ){

        toastMessage.textContent =
            "Please enter your name.";

        new bootstrap.Toast(
            exerciseToast
        ).show();

        return;

    }

    profile = {

        name:
            profileName.value.trim(),

        height:
            bodyHeight.value,

        weight:
            bodyWeight.value,

        level:
            fitnessLevel.value,

        goal:
            fitnessGoal.value

    };

    localStorage.setItem(

        "profile",

        JSON.stringify(profile)

    );

    updateNavbarProfile();
    
    updateProfileCard();

    calculateBMI();

    toastMessage.textContent =
        "Profile updated successfully.";

    new bootstrap.Toast(
        exerciseToast
    ).show();

    closeAllSections();

});

}


// ========================================
// LIVE BMI
// ========================================

if(bodyHeight){

    bodyHeight.addEventListener(

        "input",

        calculateBMI

    );

}

if(bodyWeight){

    bodyWeight.addEventListener(

        "input",

        calculateBMI

    );

}


// ========================================
// INITIAL LOAD
// ========================================

updateProfileCard();

calculateBMI();

// ========================================
// PREFERENCES
// ========================================


const notificationsSwitch =
    document.getElementById("notifications");

if (notificationsSwitch) {
    notificationsSwitch.disabled = true;
}

const weightUnitSelect =
    document.getElementById("weightUnit");




// ========================================
// NOTIFICATIONS
// ========================================

const notificationsEnabled =
    localStorage.getItem("notifications") === "true";

if(notificationsSwitch){

    notificationsSwitch.checked =
        notificationsEnabled;

    notificationsSwitch.addEventListener("change",()=>{

        localStorage.setItem(

            "notifications",

            notificationsSwitch.checked

        );

        toastMessage.textContent =

            notificationsSwitch.checked

            ? "Workout reminders enabled."

            : "Workout reminders disabled.";

        new bootstrap.Toast(
            exerciseToast
        ).show();

    });

}


// ========================================
// WEIGHT UNIT
// ========================================


if(weightUnitSelect){

    weightUnitSelect.value =
        weightUnit;

    weightUnitSelect.addEventListener("change",()=>{

        weightUnit =
            weightUnitSelect.value;

        localStorage.setItem(
            "weightUnit",
            weightUnit
        );

        updateWeightLabels();

        showToast(

            weightUnit === "kg"

            ? "Weight unit changed to kilograms."

            : "Weight unit changed to pounds."

        );

        // Close accordion automatically

        bootstrap
            .Collapse
            .getOrCreateInstance(

                document.getElementById(
                    "weightUnitCollapse"
                )

            )
            .hide();

    });

}


// ========================================
// UPDATE LABELS
// ========================================

function updateWeightLabels(){

    document.querySelectorAll(

        ".weight-unit"

    ).forEach(label=>{

        label.textContent =
            weightUnit;

    });

}


// ========================================
// GLOBAL HELPERS
// ========================================

// Display weight according to preference

function formatWeight(weightKg){

    if(!weightKg) return 0;

    if(weightUnit === "kg"){

        return Number(weightKg).toFixed(1);

    }

    return (weightKg * 2.20462).toFixed(1);

}


// Convert entered value back to kg before saving

function convertToKg(value){

    if(weightUnit === "kg"){

        return Number(value);

    }

    return Number(value) / 2.20462;

}


// Convert stored kg to current display unit

function convertFromKg(valueKg){

    if(weightUnit === "kg"){

        return Number(valueKg).toFixed(1);

    }

    return (valueKg * 2.20462).toFixed(1);

}


// ========================================
// INITIALISE
// ========================================

updateWeightLabels();
// ========================================
// MODALS
// ========================================

const signOutBtn =
    document.getElementById("signOutBtn");

const confirmSignOut =
    document.getElementById("confirmSignOut");

const deleteAccountBtn =
    document.getElementById("deleteAccountBtn");

const confirmDeleteAccount =
    document.getElementById("confirmDeleteAccount");


// ========================================
// SIGN OUT
// ========================================

if(signOutBtn){

    signOutBtn.addEventListener("click",()=>{

        closeAllSections();

        const modal =
            new bootstrap.Modal(

                document.getElementById(

                    "signOutModal"

                )

            );

        modal.show();

    });

}


if(confirmSignOut){

    confirmSignOut.addEventListener("click",()=>{

        localStorage.clear();

        window.location.href =
            "home.html";

    });

}


// ========================================
// DELETE ACCOUNT
// ========================================

if(deleteAccountBtn){

    deleteAccountBtn.addEventListener("click",()=>{

        closeAllSections();

        const modal =
            new bootstrap.Modal(

                document.getElementById(

                    "deleteAccountModal"

                )

            );

        modal.show();

    });

}


if(confirmDeleteAccount){

    confirmDeleteAccount.addEventListener("click",()=>{

        localStorage.clear();

        sessionStorage.clear();

        toastMessage.textContent =
            "Account deleted successfully.";

        new bootstrap.Toast(
            exerciseToast
        ).show();

        setTimeout(()=>{

            window.location.href =
                "home.html";

        },1200);

    });

}


// ========================================
// HOME PAGE PROFILE UPDATE
// ========================================

function updateHomeProfile(){

    const savedProfile =
        JSON.parse(
            localStorage.getItem("profile")
        );

    if(!savedProfile) return;

    const firstName =
        savedProfile.name
        .trim()
        .split(" ")[0];

    const homeGreeting =
        document.getElementById("homeUserName");

    const homeAvatar =
        document.getElementById("homeAvatar");

    if(homeGreeting){

        homeGreeting.textContent =
            firstName;

    }

    if(homeAvatar){

        const initials =
            savedProfile.name
            .split(" ")
            .map(word=>word.charAt(0))
            .join("")
            .substring(0,2)
            .toUpperCase();

        homeAvatar.textContent =
            initials;

    }

}


// ========================================
// INITIALISE
// ========================================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        updateProfileCard();

        calculateBMI();

        updateWeightLabels();

        updateHomeProfile();

    }

);


// ========================================
// HELPER
// ========================================

const exerciseToast =
    document.getElementById("exerciseToast");

const toastMessage =
    document.getElementById("toastMessage");

function showToast(message){

    if(!exerciseToast) return;

    toastMessage.textContent =
        message;

    new bootstrap.Toast(
        exerciseToast
    ).show();

}

// ========================================
// ABOUT MODAL
// ========================================

const aboutTrigger =
    document.getElementById("aboutTrigger");

if(aboutTrigger){

    aboutTrigger.addEventListener("click",()=>{

        closeAllSections();

        new bootstrap.Modal(

            document.getElementById(
                "aboutModal"
            )

        ).show();

    });

}

// ========================================
// SETTINGS ACCORDION BEHAVIOUR
// ========================================


const settingsTriggers =
    document.querySelectorAll(
        ".settings-collapse-trigger"
    );

settingsTriggers.forEach(trigger => {

    trigger.addEventListener("click", () => {

        const targetSelector =
            trigger.dataset.bsTarget;

        document
            .querySelectorAll(".accordion-collapse")
            .forEach(section => {

                if(
                    "#" + section.id !== targetSelector &&
                    section.classList.contains("show")
                ){

                    bootstrap
                        .Collapse
                        .getOrCreateInstance(section)
                        .hide();

                }

            });

    });

});