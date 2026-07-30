const dayOrder = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

function getSortedWorkouts() {
    return [...workouts].sort((a, b) => {
        return (
            dayOrder.indexOf(a.day) -
            dayOrder.indexOf(b.day)
        );
    });
}

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

// Load workouts from Local Storage
let workouts = JSON.parse(
    localStorage.getItem("liftlogWorkouts")
) || [];

function saveWorkouts() {
    localStorage.setItem(
        "liftlogWorkouts",
        JSON.stringify(workouts)
    );
}

let personalRecordsData = JSON.parse(
    localStorage.getItem("liftlogRecords")
) || {};

function savePersonalRecords() {
    localStorage.setItem(
        "liftlogRecords",
        JSON.stringify(personalRecordsData)
    );
}

let weightUnit =
    localStorage.getItem("weightUnit") || "kg";

function formatWeight(weightKg) {
    if (!weightKg) return 0;

    const value =
        weightUnit === "kg"
            ? Number(weightKg)
            : Number(weightKg) * 2.20462;

    return Number(value.toFixed(1)).toString();
}

function convertToKg(value) {
    return weightUnit === "kg"
        ? Number(value)
        : Number(value) / 2.20462;
}

function convertFromKg(valueKg) {
    return weightUnit === "kg"
        ? Number(valueKg).toFixed(1)
        : (Number(valueKg) * 2.20462).toFixed(1);
}

// ========================================
// WORKOUT PLANS
// Uses Exercise IDs from exerciseLibrary
// ========================================

const workoutPlans = {
    muscleGain: {
        title: "Muscle Gain",
        days: {
            Monday: {
                title: "Chest",
                exercises: [1, 44, 2, 45, 5]
            },
            Tuesday: {
                title: "Legs",
                exercises: [11, 10, 47, 13, 16]
            },
            Wednesday: {
                title: "Rest",
                exercises: []
            },
            Thursday: {
                title: "Back",
                exercises: [18, 19, 20, 21, 22]
            },
            Friday: {
                title: "Push",
                exercises: [25, 26, 27, 28, 29]
            },
            Saturday: {
                title: "Arms",
                exercises: [31, 32, 33, 34, 37]
            },
            Sunday: {
                title: "Rest",
                exercises: []
            }
        }
    },

    weightLoss: {
        title: "Weight Loss",
        days: {
            Monday: {
                title: "Cardio",
                exercises: [51, 58, 59, 57]
            },
            Tuesday: {
                title: "Rest",
                exercises: []
            },
            Wednesday: {
                title: "Core",
                exercises: [54, 52, 38, 39]
            },
            Thursday: {
                title: "Rest",
                exercises: []
            },
            Friday: {
                title: "HIIT",
                exercises: [56, 58, 53]
            },
            Saturday: {
                title: "Cardio",
                exercises: [51, 54, 57, 59]
            },
            Sunday: {
                title: "Rest",
                exercises: []
            }
        }
    },

    gluteGrowth: {
        title: "Glute Growth",
        days: {
            Monday: {
                title: "Glutes",
                exercises: [6, 48, 17, 8]
            },
            Tuesday: {
                title: "Rest",
                exercises: []
            },
            Wednesday: {
                title: "Legs",
                exercises: [9, 13, 49, 16]
            },
            Thursday: {
                title: "Rest",
                exercises: []
            },
            Friday: {
                title: "Glutes",
                exercises: [6, 7, 48, 8]
            },
            Saturday: {
                title: "Glutes",
                exercises: [17, 9, 49, 50]
            },
            Sunday: {
                title: "Rest",
                exercises: []
            }
        }
    },

    strength: {
        title: "Strength",
        days: {
            Monday: {
                title: "Power",
                exercises: [11, 12, 1]
            },
            Tuesday: {
                title: "Upper",
                exercises: [25, 20, 18]
            },
            Wednesday: {
                title: "Rest",
                exercises: []
            },
            Thursday: {
                title: "Lower",
                exercises: [43, 47, 48]
            },
            Friday: {
                title: "Rest",
                exercises: []
            },
            Saturday: {
                title: "Power",
                exercises: [12, 11, 25]
            },
            Sunday: {
                title: "Rest",
                exercises: []
            }
        }
    }
};

// ========================================
// Get Full Exercise Objects
// ========================================

const getWorkoutExercises = (exerciseIds, exerciseLibrary) => {
    return exerciseIds.map(id =>
        exerciseLibrary.find(exercise => exercise.id === id)
    );
};

async function loadNavbar() {
    const placeholder =
        document.getElementById("navbar-placeholder");

    if (!placeholder) return;

    try {
        const response = await fetch("/partials/navbar.html");

        if (!response.ok) {
            throw new Error("Navbar could not be loaded.");
        }

        placeholder.innerHTML = await response.text();
        updateNavbarProfile();
    } catch (error) {
        console.error(error);
    }
}
async function loadFooter() {
    const footerPlaceholder =
        document.getElementById("footer-placeholder");

    if (!footerPlaceholder) return;

    try {
        const response = await fetch("/partials/footer.html");

        if (!response.ok) {
            throw new Error("Failed to load footer.");
        }

        footerPlaceholder.innerHTML =
            await response.text();
    } catch (error) {
        console.error(error);
    }
}


document.addEventListener("DOMContentLoaded", async () => {
    await loadNavbar();
    await loadFooter();
});

function updateNavbarProfile() {
    const profile =
        JSON.parse(localStorage.getItem("profile"));

    const headerAvatar =
        document.getElementById("headerAvatar");

    if (!headerAvatar) return;

    if (profile && profile.name) {
        const initials =
            profile.name
                .trim()
                .split(" ")
                .map(word => word.charAt(0))
                .join("")
                .substring(0, 2)
                .toUpperCase();

        headerAvatar.textContent = initials;
    } else {
        headerAvatar.textContent = "G";
    }
}

document.addEventListener("click", (e) => {
    if (e.target.closest("#profileButton")) {
        window.location.href = "settings.html";
    }
});



window.addEventListener("scroll", () => {
    const navbar =
        document.querySelector(".navbar");

    if (!navbar) return;

    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 10
    );
});