// ========================================
// LiftLog — Home Page
// javascript/index.js
// ========================================

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

// ========================================
// Welcome Text
// ========================================

const welcomeText = document.getElementById("welcomeText");

if (welcomeText) {
    const profile = JSON.parse(localStorage.getItem("profile"));
    const hasCompletedWorkout = workouts.some(workout => workout.completed);

    if (!hasCompletedWorkout) {
        welcomeText.textContent = "Welcome to LiftLog";
    } else if (profile && profile.name) {
        const firstName = profile.name.trim().split(" ")[0];
        const formattedFirstName =
            firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        welcomeText.textContent = `Welcome back, ${formattedFirstName}`;
    } else {
        welcomeText.textContent = "Welcome back";
    }
}

// ========================================
// Workout Streak
// ========================================

const homeWorkoutStreak = document.getElementById("homeWorkoutStreak");

function displayHomeWorkoutStreak() {
    if (!homeWorkoutStreak) return;

    const streakData = getWorkoutStreakData();
    homeWorkoutStreak.textContent = streakData.current;
}

// ========================================
// Today's Workout (FIXED)
// ========================================

const todayWorkout = document.getElementById("todayWorkout");

function displayTodayWorkout() {
    if (!todayWorkout) return;

    const today = getToday();

    // 1. Prefer exact scheduledDate match
    let workout = getSortedWorkouts().find(w => {
        const scheduled = getWorkoutScheduledDate(w);
        return scheduled && scheduled.getTime() === today.getTime();
    });

    // 2. Fallback to day name only if nothing matched by date
    if (!workout) {
        const todayName = days[today.getDay()];
        workout = getSortedWorkouts().find(w => w.day === todayName);
    }

    // No workout found for today
    if (!workout) {
        const hasWorkouts = workouts.length > 0;

        if (!hasWorkouts) {
            todayWorkout.innerHTML = `
                <div class="workout-hero">
                    <h3>No workouts yet</h3>
                    <p class="text-muted">
                        Create your first workout to get started.
                    </p>
                </div>
                <a href="workouts.html" class="btn btn-success">
                    Create Workout
                </a>
            `;
        } else {
            todayWorkout.innerHTML = `
                <div class="workout-hero">
                    <h3>Rest Day</h3>
                    <p class="text-muted">
                        No workout scheduled for today.
                    </p>
                </div>
            `;
        }
        return;
    }

    // Workout already completed today
    if (workout.completed || workout.completedDate) {
        todayWorkout.innerHTML = `
            <div class="workout-hero">
                <h3>${workout.name} Day</h3>
                <p class="text-success">
                    <i class="bi bi-check-circle-fill"></i>
                    Workout completed today
                </p>
            </div>
            <div class="workout-progress-card">
                <div class="workout-progress-header">
                    <span>
                        <i class="bi bi-check-circle-fill"></i>
                        Today's workout is complete
                    </span>
                    <span>
                        <i class="bi bi-check-lg"></i>
                        Done
                    </span>
                </div>
                <div class="progress workout-progress-bar">
                    <div class="progress-bar bg-success" role="progressbar" style="width:100%"></div>
                </div>
            </div>
        `;
        return;
    }

    // Calculate progress
    const completedExercises = workout.exercises.filter(ex => ex.completed).length;
    const totalExercises = workout.exercises.length;
    const progress = totalExercises === 0
        ? 0
        : Math.round((completedExercises / totalExercises) * 100);

    let workoutInfo = "";

    if (completedExercises > 0) {
        workoutInfo = `
            <div class="workout-progress-card">
                <div class="workout-progress-header">
                    <span>
                        <i class="bi bi-check-circle-fill"></i>
                        ${completedExercises}/${totalExercises} Exercises Completed
                    </span>
                    <span>
                        <i class="bi bi-clock"></i>
                        ${getWorkoutMinutes(workout)}
                    </span>
                </div>
                <div class="progress workout-progress-bar">
                    <div class="progress-bar bg-success" role="progressbar" style="width:${progress}%"></div>
                </div>
            </div>
        `;
    } else {
        workoutInfo = `
            <div class="workout-progress-card">
                <div class="workout-progress-header">
                    <span>
                        <i class="bi bi-list-check"></i>
                        ${totalExercises} Exercises
                    </span>
                    <span>
                        <i class="bi bi-clock"></i>
                        ${getWorkoutMinutes(workout)}
                    </span>
                </div>
                <div class="progress workout-progress-bar">
                    <div class="progress-bar bg-success" role="progressbar" style="width:0%"></div>
                </div>
            </div>
        `;
    }

    todayWorkout.innerHTML = `
        <div class="workout-hero">
            <h3>${workout.name} Day</h3>
            <p class="text-muted">${workout.day}</p>
        </div>
        ${workoutInfo}
        <a href="workout.html?id=${workout.id}" class="btn btn-success">
            ${workout.startTime || workout.isPaused ? "Continue Workout" : "Start Workout"}
        </a>
    `;
}

function getWorkoutMinutes(workout) {
    let totalMinutes = 0;

    if (workout.startTime && !workout.isPaused && !workout.completed) {
        const totalSeconds = Math.floor((Date.now() - workout.startTime) / 1000);
        totalMinutes = Math.floor(totalSeconds / 60);
    } else if (workout.durationSeconds) {
        totalMinutes = Math.floor(Number(workout.durationSeconds) / 60);
    } else {
        // duration is already stored in minutes
        totalMinutes = Number(workout.duration) || 0;
    }

    if (totalMinutes < 60) {
        return `${totalMinutes} min`;
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return minutes === 0
        ? `${hours} ${hours === 1 ? "hr" : "hrs"}`
        : `${hours} ${hours === 1 ? "hr" : "hrs"} ${minutes} min`;
}

// ========================================
// Weekly Planner (FIXED - only this week)
// ========================================

const weeklyPlanner = document.getElementById("weeklyPlanner");

function displayWeeklyPlanner() {
    if (!weeklyPlanner) return;

    weeklyPlanner.innerHTML = "";

    const weekStart = getStartOfWeek();
    const weekEnd = getEndOfWeek();
    const today = getToday();

    // Strict filter: only workouts with a real scheduledDate inside this week
    const weeklyWorkouts = getSortedWorkouts().filter(workout => {
        if (!workout.scheduledDate) return false;

        const scheduled = parseLocalDate(workout.scheduledDate);
        if (!scheduled) return false;

        return scheduled >= weekStart && scheduled < weekEnd;
    });

    if (weeklyWorkouts.length === 0) {
        weeklyPlanner.innerHTML = `
            <div class="text-center text-muted py-3">
                No workouts scheduled this week.
            </div>
        `;
        return;
    }

    // Sort by actual date
    weeklyWorkouts.sort((a, b) => {
        return parseLocalDate(a.scheduledDate) - parseLocalDate(b.scheduledDate);
    });

    weeklyWorkouts.forEach(workout => {
        const scheduled = parseLocalDate(workout.scheduledDate);

        let statusClass = "";
        let statusIcon = "";

        if (workout.completed) {
            statusClass = "completed";
            statusIcon = `<i class="bi bi-check-lg"></i>`;
        } else if (scheduled.getTime() === today.getTime()) {
            statusClass = "active";
            statusIcon = `<i class="bi bi-lightning-charge-fill"></i>`;
        } else if (scheduled > today) {
            statusClass = "pending";
            statusIcon = `<i class="bi bi-circle"></i>`;
        } else {
            statusClass = "missed";
            statusIcon = `<i class="bi bi-x-circle-fill"></i>`;
        }

        weeklyPlanner.innerHTML += `
            <div class="planner-item ${statusClass}" data-id="${workout.id}">
                <div class="planner-day">
                    ${scheduled.toLocaleDateString(undefined, { weekday: "short" }).toUpperCase()}
                </div>
                <div class="planner-workout">
                    ${workout.name.toUpperCase()}
                </div>
                <div class="planner-status">
                    ${statusIcon}
                </div>
            </div>
        `;
    });

    // Scroll today's workout into view
    const activeWorkout = weeklyPlanner.querySelector(".planner-item.active");
    if (activeWorkout) {
        activeWorkout.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest"
        });
    }

    // Make planner items clickable
    weeklyPlanner.querySelectorAll(".planner-item").forEach(item => {
        item.addEventListener("click", () => {
            const id = item.dataset.id;
            if (id) window.location.href = `workout.html?id=${id}`;
        });
    });
}

// ========================================
// Daily Motivation Quote
// ========================================

const motivationText = document.getElementById("motivationText");

const quotes = [
    "Consistency beats intensity.",
    "Progress, not perfection.",
    "Strong today. Stronger tomorrow.",
    "Discipline beats motivation.",
    "Every rep counts.",
    "You don't have to be extreme, just consistent.",
    "Success starts with showing up.",
    "Train your mind. Your body will follow.",
    "Small improvements every day add up.",
    "Push yourself because no one else will do it for you.",
    "Dream big. Lift bigger.",
    "Your only competition is yesterday's you.",
    "One workout at a time.",
    "Hard work beats talent when talent doesn't work hard.",
    "Fitness is a journey, not a destination."
];

function displayDailyQuote() {
    if (!motivationText) return;

    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayNumber = Math.floor(diff / oneDay);

    const quote = quotes[dayNumber % quotes.length];
    motivationText.textContent = `${quote}`;
}

// ========================================
// Clean old recommended workouts
// ========================================

function removeStaleRecommendedWorkouts() {
    const currentWeekStart = getStartOfWeek();
    const beforeCount = workouts.length;

    workouts = workouts.filter(workout => {
        // Keep all manually created workouts
        if (workout.source !== "recommended") return true;

        // Keep completed ones
        if (workout.completed === true) return true;

        const scheduled = parseLocalDate(workout.scheduledDate);
        if (!scheduled) return false;

        // Keep only current week and future
        return scheduled >= currentWeekStart;
    });

    if (workouts.length !== beforeCount) {
        saveWorkouts();
    }
}

// ========================================
// Initialize Home Page
// ========================================

removeStaleRecommendedWorkouts();
displayDailyQuote();
displayWeeklyPlanner();
displayTodayWorkout();
displayHomeWorkoutStreak();