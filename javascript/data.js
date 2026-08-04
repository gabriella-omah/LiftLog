// ========================================
// LiftLog — Shared Data & Helpers
// javascript/data.js
// ========================================

const dayOrder = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const workoutTimerAudio = new Audio("/image/sound.mp3");

// ========================================
// Workouts Storage
// ========================================

let workouts = JSON.parse(localStorage.getItem("liftlogWorkouts")) || [];

function saveWorkouts() {
    localStorage.setItem("liftlogWorkouts", JSON.stringify(workouts));
}

function getSortedWorkouts() {
    return [...workouts].sort((a, b) => {
        return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    });
}

// ========================================
// Personal Records
// ========================================

let personalRecordsData = JSON.parse(localStorage.getItem("liftlogRecords")) || {};

function savePersonalRecords() {
    localStorage.setItem("liftlogRecords", JSON.stringify(personalRecordsData));
}

// ========================================
// Weight Unit Helpers
// ========================================

let weightUnit = localStorage.getItem("weightUnit") || "kg";

function formatWeight(weightKg) {
    if (!weightKg) return "0";
    const value = weightUnit === "kg"
        ? Number(weightKg)
        : Number(weightKg) * 2.20462;
    return Number(value.toFixed(1)).toString();
}

function convertToKg(value) {
    return weightUnit === "kg" ? Number(value) : Number(value) / 2.20462;
}

function convertFromKg(valueKg) {
    return weightUnit === "kg"
        ? Number(valueKg).toFixed(1)
        : (Number(valueKg) * 2.20462).toFixed(1);
}

// ========================================
// RECOMMENDED WORKOUT PLANS
// ========================================

const workoutPlans = {
    muscleGain: {
        title: "Muscle Gain",
        days: {
            Monday: {
                title: "Chest",
                exercises: [1, 44, 2, 45, 5]          // Bench, Incline BB, Incline DB, Pec Deck, Push-up
            },
            Tuesday: {
                title: "Legs",
                exercises: [11, 10, 47, 13, 16]        // Back Squat, Leg Press, Hack Squat, Lunges, Calf Raise
            },
            Wednesday: {
                title: "Rest",
                exercises: []
            },
            Thursday: {
                title: "Back",
                exercises: [18, 19, 20, 21, 22]        // Pull-up, Lat Pulldown, Bent Over Row, Seated Row, Face Pull
            },
            Friday: {
                title: "Shoulders",
                exercises: [25, 26, 27, 28, 29]        // OHP, DB Press, Lateral Raise, Front Raise, Rear Delt Fly
            },
            Saturday: {
                title: "Arms",
                exercises: [31, 32, 33, 34, 37]        // Bicep Curl, Hammer Curl, Tricep Pushdown, Overhead Extension, Skull Crushers
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
                title: "Cardio + Full Body",
                exercises: [51, 58, 59, 11, 18]        // Treadmill, Burpees, Mountain Climbers, Squat, Pull-up
            },
            Tuesday: {
                title: "Rest",
                exercises: []
            },
            Wednesday: {
                title: "HIIT '<br>' + '<br>' Core",
                exercises: [53, 57, 38, 39, 40]        // Sprint Intervals, Jump Rope, Plank, Russian Twist, Hanging Leg Raise
            },
            Thursday: {
                title: "Rest",
                exercises: []
            },
            Friday: {
                title: "Cardio Circuit",
                exercises: [54, 56, 58, 59]            // Bike, StairMaster, Burpees, Mountain Climbers
            },
            Saturday: {
                title: "Active Recovery",
                exercises: [51, 52, 38, 17]            // Walk, Jog, Plank, Glute Bridge
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
                title: "Glute Focus",
                exercises: [6, 48, 17, 8, 7]           // Hip Thrust, Sumo Deadlift, Glute Bridge, Kickback, RDL
            },
            Tuesday: {
                title: "Rest",
                exercises: []
            },
            Wednesday: {
                title: "Legs + Glutes",
                exercises: [9, 13, 49, 47, 16]         // Bulgarian Split Squat, Lunges, Step Up, Hack Squat, Calf Raise
            },
            Thursday: {
                title: "Rest",
                exercises: []
            },
            Friday: {
                title: "Glute Pump",
                exercises: [6, 7, 48, 8, 50]           // Hip Thrust, RDL, Sumo DL, Kickback, Seated Calf
            },
            Saturday: {
                title: "Lower Body",
                exercises: [11, 9, 17, 49, 16]         // Back Squat, Bulgarian, Glute Bridge, Step Up, Calf Raise
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
                title: "Power Lower",
                exercises: [11, 12, 48]                // Back Squat, Deadlift, Sumo Deadlift
            },
            Tuesday: {
                title: "Power Upper",
                exercises: [1, 25, 20, 18]             // Bench Press, Overhead Press, Bent Over Row, Pull-up
            },
            Wednesday: {
                title: "Rest",
                exercises: []
            },
            Thursday: {
                title: "Lower Strength",
                exercises: [11, 47, 7, 16]             // Back Squat, Hack Squat, RDL, Calf Raise
            },
            Friday: {
                title: "Rest",
                exercises: []
            },
            Saturday: {
                title: "Full Power",
                exercises: [12, 1, 25, 20]             // Deadlift, Bench, OHP, Bent Over Row
            },
            Sunday: {
                title: "Rest",
                exercises: []
            }
        }
    }
};

const getWorkoutExercises = (exerciseIds, library) => {
    return exerciseIds
        .map(id => library.find(ex => ex.id === id))
        .filter(Boolean);
};

function displayExercises(list) {
    if (!library) return;

    if (!Array.isArray(list) || list.length === 0) {
        library.innerHTML = `
            <div class="text-center py-4 text-muted">
                No exercises found.
            </div>
        `;
        return;
    }

    library.innerHTML = "";

    list.forEach(exercise => {
        library.innerHTML += `
            <section class="exercise-card">
                <div class="card-body">
                    <div class="exercise-info">
                        <h4>${exercise.name}</h4>
                        <p class="muscle-badge ${String(exercise.muscle || "")
                            .toLowerCase()
                            .replace(/\s+/g, "-")}">
                            ${exercise.muscle || ""}
                        </p>
                        <small>
                            ${exercise.equipment || ""}
                            •
                            ${exercise.type || ""}
                            •
                            ${exercise.difficulty || ""}
                        </small>
                        <button
                            class="btn btn-success mt-3 w-100 viewExerciseBtn"
                            type="button"
                            data-id="${exercise.id}">
                            View Exercise
                        </button>
                    </div>
                </div>
            </section>
        `;
    });
}


// ========================================
// IMAGE VIEWER
// ========================================

const imageViewer = document.getElementById("imageViewer");
const imageViewerImg = document.getElementById("imageViewerImg");
const closeImageViewerBtn = document.getElementById("closeImageViewer");

function openImageViewer(src, alt = "Exercise image") {
    if (!imageViewer || !imageViewerImg) {
        console.warn("Image viewer HTML is missing (#imageViewer)");
        return;
    }

    if (!src || src.endsWith("/") || src.includes("library.html")) {
        return;
    }

    imageViewerImg.src = src;
    imageViewerImg.alt = alt;
    imageViewer.classList.remove("d-none");
    document.body.style.overflow = "hidden";
}

function closeImageViewer() {
    if (!imageViewer || !imageViewerImg) return;

    imageViewer.classList.add("d-none");
    imageViewerImg.removeAttribute("src");
    document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
    const img = e.target.closest(
        "#exerciseBody img, #exerciseMuscleImage, .exercise-images img"
    );

    if (!img) return;

    const src = img.currentSrc || img.src;
    if (!src) return;

    e.preventDefault();
    e.stopPropagation();

    openImageViewer(src, img.alt || "Exercise image");
});

if (closeImageViewerBtn) {
    closeImageViewerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeImageViewer();
    });
}

if (imageViewer) {
    imageViewer.addEventListener("click", (e) => {
        if (e.target === imageViewer) {
            closeImageViewer();
        }
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeImageViewer();
    }
});




function showToast(message, type = "success") {
    const toast = document.getElementById("exerciseToast");
    const toastMessage = document.getElementById("toastMessage");

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;

    // Remove every previous toast class
    toast.classList.remove(
        "toast-success",
        "toast-warning",
        "toast-error"
    );

    switch (type) {
        case "warning":
            toast.classList.add("toast-warning");
            break;

        case "error":
            toast.classList.add("toast-error");
            break;

        default:
            toast.classList.add("toast-success");
            break;
    }

    bootstrap.Toast.getOrCreateInstance(toast).show();
}

// ========================================
// Dark Mode & Theme
// ========================================

function updateBrowserTheme() {
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeMeta) return;

    themeMeta.setAttribute(
        "content",
        document.body.classList.contains("dark-mode") ? "#141821" : "#5D8CFF"
    );
}

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}
updateBrowserTheme();

const darkModeSwitch = document.getElementById("darkModeSwitch");
if (darkModeSwitch) {
    darkModeSwitch.checked = localStorage.getItem("darkMode") === "true";

    darkModeSwitch.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
        updateBrowserTheme();
    });
}

// ========================================
// Active Workout Timer
// ========================================

let activeWorkoutTimer = JSON.parse(localStorage.getItem("activeWorkoutTimer")) || null;

function saveActiveWorkoutTimer() {
    if (activeWorkoutTimer) {
        localStorage.setItem("activeWorkoutTimer", JSON.stringify(activeWorkoutTimer));
    } else {
        localStorage.removeItem("activeWorkoutTimer");
    }
}

async function ensureNotificationPermission() {
    if (!("Notification" in window)) return false;
    if (Notification.permission === "granted") return true;
    if (Notification.permission === "denied") return false;
    return (await Notification.requestPermission()) === "granted";
}

function startWorkoutTimer(workout) {
    if (!workout) return;

    activeWorkoutTimer = {
        workoutId: workout.id,
        startTime: Date.now(),
        durationMinutes: Number(workout.duration) || 60,
        alerted: false,
        paused: false,
        pausedAt: null,
        elapsedBeforePause: 0
    };
    saveActiveWorkoutTimer();
    checkWorkoutTimer();
}

function pauseWorkoutTimer() {
    if (!activeWorkoutTimer || activeWorkoutTimer.paused) return;

    activeWorkoutTimer.paused = true;
    activeWorkoutTimer.pausedAt = Date.now();
    activeWorkoutTimer.elapsedBeforePause = Math.floor(
        (Date.now() - activeWorkoutTimer.startTime) / 1000
    );
    saveActiveWorkoutTimer();
}

function resumeWorkoutTimer() {
    if (!activeWorkoutTimer || !activeWorkoutTimer.paused) return;

    const pausedSeconds = Number(activeWorkoutTimer.elapsedBeforePause) || 0;
    activeWorkoutTimer.startTime = Date.now() - (pausedSeconds * 1000);
    activeWorkoutTimer.paused = false;
    activeWorkoutTimer.pausedAt = null;
    saveActiveWorkoutTimer();
}

function stopWorkoutTimer() {
    activeWorkoutTimer = null;
    localStorage.removeItem("activeWorkoutTimer");
}

function getTimerElapsedSeconds() {
    if (!activeWorkoutTimer) return 0;
    if (activeWorkoutTimer.paused) {
        return Number(activeWorkoutTimer.elapsedBeforePause) || 0;
    }
    return Math.floor((Date.now() - activeWorkoutTimer.startTime) / 1000);
}

function checkWorkoutTimer() {
    if (!activeWorkoutTimer || activeWorkoutTimer.paused || activeWorkoutTimer.alerted) return;

    const elapsed = getTimerElapsedSeconds();
    const durationSeconds = (Number(activeWorkoutTimer.durationMinutes) || 60) * 60;

    if (elapsed >= durationSeconds) {
        activeWorkoutTimer.alerted = true;
        saveActiveWorkoutTimer();
        showWorkoutNotification();
    }
}

async function showWorkoutNotification() {
    if (!activeWorkoutTimer) return;

    const workout = workouts.find(w => w.id === activeWorkoutTimer.workoutId);
    const title = "Workout Timer";
    const body = workout
        ? `${workout.name} has reached its time limit.`
        : "Workout timer finished.";

    try {
        workoutTimerAudio.currentTime = 0;
        await workoutTimerAudio.play();
    } catch (e) {}

    if ("vibrate" in navigator) {
        navigator.vibrate([300, 200, 300]);
    }

    if ("Notification" in window) {
        const canNotify = Notification.permission === "granted" || await ensureNotificationPermission();
        if (canNotify) {
            try {
                new Notification(title, {
                    body,
                    icon: "/icons/icon-192.png",
                    badge: "/icons/icon-192.png",
                    tag: "workout-timer"
                });
            } catch (e) {
                console.warn("Notification failed:", e);
            }
        }
    }

    localStorage.setItem("workoutFinished", JSON.stringify({
        workoutId: activeWorkoutTimer.workoutId,
        finished: true,
        time: Date.now(),
        message: body
    }));

    window.dispatchEvent(new StorageEvent("storage", { key: "workoutFinished" }));
    checkWorkoutBanner();
    stopWorkoutTimer();
}

function checkWorkoutBanner() {
    const banner = document.getElementById("globalWorkoutBanner");
    if (!banner) return;

    const finished = JSON.parse(localStorage.getItem("workoutFinished") || "null");
    banner.classList.toggle("hidden", !finished);
}

// ========================================
// Navbar & Footer
// ========================================

async function loadNavbar() {
    const placeholder = document.getElementById("navbar-placeholder");
    if (!placeholder) return;

    try {
        const response = await fetch("/partials/navbar.html");
        if (!response.ok) throw new Error("Navbar could not be loaded.");
        placeholder.innerHTML = await response.text();
        updateNavbarProfile();
        checkWorkoutBanner();
    } catch (error) {
        console.error(error);
    }
}

async function loadFooter() {
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (!footerPlaceholder) return;

    try {
        const response = await fetch("/partials/footer.html");
        if (!response.ok) throw new Error("Failed to load footer.");
        footerPlaceholder.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}

function updateNavbarProfile() {
    const profile = JSON.parse(localStorage.getItem("profile"));
    const headerAvatar = document.getElementById("headerAvatar");
    if (!headerAvatar) return;

    if (profile && profile.name) {
        const initials = profile.name
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

// ========================================
// Date Helpers (FIXED)
// ========================================

function getToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

function getStartOfWeek(date = new Date()) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - d.getDay()); // Sunday = start of week
    return d;
}

function getEndOfWeek(date = new Date()) {
    const end = getStartOfWeek(date);
    end.setDate(end.getDate() + 7);
    return end;
}

function parseLocalDate(dateValue) {
    if (!dateValue) return null;

    if (dateValue instanceof Date) {
        if (isNaN(dateValue.getTime())) return null;
        const result = new Date(dateValue);
        result.setHours(0, 0, 0, 0);
        return result;
    }

    const value = String(dateValue).trim();
    if (!value) return null;

    // YYYY-MM-DD
    const dateOnlyMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateOnlyMatch) {
        const year = Number(dateOnlyMatch[1]);
        const month = Number(dateOnlyMatch[2]) - 1;
        const day = Number(dateOnlyMatch[3]);
        const localDate = new Date(year, month, day);
        localDate.setHours(0, 0, 0, 0);
        return localDate;
    }

    // Full ISO
    const parsed = new Date(value);
    if (isNaN(parsed.getTime())) return null;
    parsed.setHours(0, 0, 0, 0);
    return parsed;
}

function getScheduledDateForDay(dayName, referenceDate = new Date()) {
    if (!dayName) return null;

    // Matches getStartOfWeek (Sunday = 0)
    const dayIndex = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6
    };

    const offset = dayIndex[dayName];
    if (offset === undefined) return null;

    const start = getStartOfWeek(referenceDate);
    const scheduled = new Date(start);
    scheduled.setDate(start.getDate() + offset);
    scheduled.setHours(0, 0, 0, 0);

    const today = getToday();

    // Push to next week if the date is already in the past
    while (scheduled < today) {
        scheduled.setDate(scheduled.getDate() + 7);
    }

    return scheduled;
}

function getWorkoutScheduledDate(workout) {
    if (!workout) return null;

    if (workout.scheduledDate) {
        const date = parseLocalDate(workout.scheduledDate);
        if (date) return date;
    }

    if (workout.day) {
        return getScheduledDateForDay(workout.day);
    }

    return null;
}

function isWorkoutToday(workout) {
    const scheduled = getWorkoutScheduledDate(workout);
    if (!scheduled) return false;
    return scheduled.getTime() === getToday().getTime();
}

function isWorkoutFuture(workout) {
    const scheduled = getWorkoutScheduledDate(workout);
    if (!scheduled) return false;
    return scheduled.getTime() > getToday().getTime();
}

function isWorkoutPast(workout) {
    const scheduled = getWorkoutScheduledDate(workout);
    if (!scheduled) return false;
    return scheduled.getTime() < getToday().getTime();
}

function isThisWeek(dateString) {
    const date = parseLocalDate(dateString);
    if (!date) return false;
    return date >= getStartOfWeek() && date < getEndOfWeek();
}

// ========================================
// Global Event Listeners
// ========================================

document.addEventListener("DOMContentLoaded", async () => {
    await loadNavbar();
    checkWorkoutBanner();
    await loadFooter();
});

document.addEventListener("click", (e) => {
    if (e.target.closest("#profileButton")) {
        window.location.href = "settings.html";
    }

    if (e.target.id === "dismissWorkoutBanner") {
        localStorage.removeItem("workoutFinished");
        checkWorkoutBanner();
    }
});

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 10);
    }
});

window.addEventListener("storage", (e) => {
    if (e.key === "workoutFinished") {
        checkWorkoutBanner();
    }
});

// Poll timer every second
setInterval(checkWorkoutTimer, 1000);