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

function getSortedWorkouts() {
    return [...workouts].sort((a, b) => {
        return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
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

const getWorkoutExercises = (exerciseIds, library) => {
    return exerciseIds
        .map(id => library.find(exercise => exercise.id === id))
        .filter(Boolean);
};

// ========================================
// BROWSER THEME COLOR
// ========================================

function updateBrowserTheme() {
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeMeta) return;

    if (document.body.classList.contains("dark-mode")) {
        themeMeta.setAttribute("content", "#141821");
    } else {
        themeMeta.setAttribute("content", "#5D8CFF");
    }
}

const darkModeSwitch = document.getElementById("darkModeSwitch");
const darkMode = localStorage.getItem("darkMode") === "true";

if (darkMode) {
    document.body.classList.add("dark-mode");
}

updateBrowserTheme();

if (darkModeSwitch) {
    darkModeSwitch.checked = darkMode;

    darkModeSwitch.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            "darkMode",
            document.body.classList.contains("dark-mode")
        );

        updateBrowserTheme();
    });
}

// ========================================
// ACTIVE WORKOUT TIMER (global)
// ========================================

let activeWorkoutTimer = JSON.parse(
    localStorage.getItem("activeWorkoutTimer")
) || null;

function saveActiveWorkoutTimer() {
    if (activeWorkoutTimer) {
        localStorage.setItem(
            "activeWorkoutTimer",
            JSON.stringify(activeWorkoutTimer)
        );
    } else {
        localStorage.removeItem("activeWorkoutTimer");
    }
}

async function ensureNotificationPermission() {
    if (!("Notification" in window)) return false;
    if (Notification.permission === "granted") return true;
    if (Notification.permission === "denied") return false;

    const result = await Notification.requestPermission();
    return result === "granted";
}

function startWorkoutTimer(workout) {
    if (!workout) return;

    const durationMinutes = Number(workout.duration) || 60;

    activeWorkoutTimer = {
        workoutId: workout.id,
        startTime: Date.now(),
        durationMinutes,
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
    activeWorkoutTimer.elapsedBeforePause =
        Math.floor(
            (Date.now() - activeWorkoutTimer.startTime) / 1000
        );

    saveActiveWorkoutTimer();
}

function resumeWorkoutTimer() {
    if (!activeWorkoutTimer || !activeWorkoutTimer.paused) return;

    const pausedSeconds =
        Number(activeWorkoutTimer.elapsedBeforePause) || 0;

    activeWorkoutTimer.startTime =
        Date.now() - (pausedSeconds * 1000);
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

    return Math.floor(
        (Date.now() - activeWorkoutTimer.startTime) / 1000
    );
}

function checkWorkoutTimer() {
    if (!activeWorkoutTimer) return;
    if (activeWorkoutTimer.paused) return;
    if (activeWorkoutTimer.alerted) return;

    const elapsed = getTimerElapsedSeconds();
    const durationSeconds =
        (Number(activeWorkoutTimer.durationMinutes) || 60) * 60;

    if (elapsed >= durationSeconds) {
        activeWorkoutTimer.alerted = true;
        saveActiveWorkoutTimer();
        showWorkoutNotification();
    }
}

async function showWorkoutNotification() {
    if (!activeWorkoutTimer) return;

    const workout = workouts.find(
        w => w.id === activeWorkoutTimer.workoutId
    );

    const title = "Workout Timer";
    const body = workout
        ? `${workout.name} has reached its time limit.`
        : "Workout timer finished.";

    // Sound
    try {
        workoutTimerAudio.currentTime = 0;
        await workoutTimerAudio.play();
    } catch (e) {
        // Autoplay may be blocked — ignore
    }

    // Vibrate
    if ("vibrate" in navigator) {
        navigator.vibrate([300, 200, 300]);
    }

    // System / PWA notification
    if ("Notification" in window) {
        const canNotify =
            Notification.permission === "granted" ||
            (await ensureNotificationPermission());

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


    // Banner flag
    localStorage.setItem(
        "workoutFinished",
        JSON.stringify({
            workoutId: activeWorkoutTimer.workoutId,
            finished: true,
            time: Date.now(),
            message: body
        })
    );

    window.dispatchEvent(
        new StorageEvent("storage", {
            key: "workoutFinished"
        })
    );

    checkWorkoutBanner();
    stopWorkoutTimer();
}

function checkWorkoutBanner() {
    const banner = document.getElementById("globalWorkoutBanner");
    if (!banner) return;

    const finished = JSON.parse(
        localStorage.getItem("workoutFinished") || "null"
    );

    banner.classList.toggle("hidden", !finished);
}

// ========================================
// NAVBAR / FOOTER
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
    const footerPlaceholder =
        document.getElementById("footer-placeholder");
    if (!footerPlaceholder) return;

    try {
        const response = await fetch("/partials/footer.html");
        if (!response.ok) throw new Error("Failed to load footer.");
        footerPlaceholder.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}

function getStartOfWeek(date = new Date()) {

    const d = new Date(date);

    d.setHours(0,0,0,0);

    d.setDate(
        d.getDate() - d.getDay()
    );

    return d;

}

function getEndOfWeek(date = new Date()) {
    const end = getStartOfWeek(date);
    end.setDate(end.getDate() + 7);
    end.setHours(0, 0, 0, 0);
    return end;
}
function getToday() {
    const today =
        new Date();
    today.setHours(
        0,
        0,
        0,
        0
    );
    return today;
}
function isWorkoutFuture(workout) {
    const scheduledDate =
        getWorkoutScheduledDate(workout);
    if (!scheduledDate) {
        return false;
    }
    return (
        scheduledDate.getTime() >
        getToday().getTime()
    );
}
function isWorkoutToday(workout) {
    const scheduledDate =
        getWorkoutScheduledDate(workout);
    if (!scheduledDate) {
        return false;
    }
    return (
        scheduledDate.getTime() ===
        getToday().getTime()
    );
}
function isWorkoutPast(workout) {
    const scheduledDate =
        getWorkoutScheduledDate(workout);
    if (!scheduledDate) {
        return false;
    }
    return (
        scheduledDate.getTime() <
        getToday().getTime()
    );
}
function parseLocalDate(dateValue) {
    if (!dateValue) {
        return null;
    }
    // Already a Date object
    if (dateValue instanceof Date) {
        if (isNaN(dateValue.getTime())) {
            return null;
        }
        const result = new Date(dateValue);
        result.setHours(0, 0, 0, 0);
        return result;
    }
    const value =
        String(dateValue).trim();
    if (!value) {
        return null;
    }
    // ---------------------------------
    // YYYY-MM-DD
    // ---------------------------------
    const dateOnlyMatch =
        value.match(
            /^(\d{4})-(\d{2})-(\d{2})$/
        );
    if (dateOnlyMatch) {
        const year =
            Number(dateOnlyMatch[1]);
        const month =
            Number(dateOnlyMatch[2]) - 1;
        const day =
            Number(dateOnlyMatch[3]);
        const localDate =
            new Date(
                year,
                month,
                day
            );
        localDate.setHours(
            0,
            0,
            0,
            0
        );
        return localDate;
    }
    // ---------------------------------
    // Full ISO timestamp
    // ---------------------------------
    const parsed =
        new Date(value);
    if (isNaN(parsed.getTime())) {
        return null;
    }
    parsed.setHours(
        0,
        0,
        0,
        0
    );
    return parsed;
}
function isThisWeek(dateString) {
    const date =
        parseLocalDate(dateString);
    if (!date) {
        return false;
    }
    return (
        date >= getStartOfWeek() &&
        date < getEndOfWeek()
    );
}
// =====================================
// Get Scheduled Date For Day
// =====================================
function getScheduledDateForDay(
    dayName,
    referenceDate = new Date()
) {

    if (!dayName) {
        return null;
    }

    const mondayDayIndex = {
        Monday: 0,
        Tuesday: 1,
        Wednesday: 2,
        Thursday: 3,
        Friday: 4,
        Saturday: 5,
        Sunday: 6
    };

    const dayOffset =
        mondayDayIndex[dayName];

    if (dayOffset === undefined) {
        return null;
    }

    const start =
        getStartOfWeek(referenceDate);

    const scheduled =
        new Date(start);

    scheduled.setDate(
        start.getDate() + dayOffset
    );

    scheduled.setHours(
        0,
        0,
        0,
        0
    );

    const today = getToday();

    // Don't schedule into the past.
    while (scheduled < today) {

        scheduled.setDate(
            scheduled.getDate() + 7
        );

    }

    // ---------------------------------
    // Find the next FREE week.
    // ---------------------------------

    while (

        workouts.some(workout => {

            if (!workout.scheduledDate) {
                return false;
            }

            const existing =
                parseLocalDate(
                    workout.scheduledDate
                );

            return (
                existing &&
                existing.getTime() ===
                scheduled.getTime()
            );

        })

    ) {

        scheduled.setDate(
            scheduled.getDate() + 7
        );

    }

    return scheduled;

}
// =====================================
// Get Workout Scheduled Date
// =====================================
function getWorkoutScheduledDate(workout) {
    if (!workout) {
        return null;
    }
    // ---------------------------------
    // Existing scheduled date
    // ---------------------------------
    if (workout.scheduledDate) {
        const date =
            parseLocalDate(
                workout.scheduledDate
            );
        if (date) {
            return date;
        }
    }
    // ---------------------------------
    // Fallback to workout day
    // ---------------------------------
    if (workout.day) {
        return getScheduledDateForDay(
            workout.day
        );
    }
    return null;
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
    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 10);
});

window.addEventListener("storage", (e) => {
    if (e.key === "workoutFinished") {
        checkWorkoutBanner();
    }
});

// Poll global timer every second
setInterval(checkWorkoutTimer, 1000);