const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",

];

const welcomeText =
    document.getElementById("welcomeText");


if (welcomeText) {

    const profile =
        JSON.parse(localStorage.getItem("profile"));

    const hasCompletedWorkout =
        workouts.some(workout => workout.completed);

    if (!hasCompletedWorkout) {

        welcomeText.textContent = "Welcome to LiftLog";

    } else if (profile && profile.name) {

        const firstName =
            profile.name.trim().split(" ")[0];

        const formattedFirstName =
            firstName.charAt(0).toUpperCase() +
            firstName.slice(1).toLowerCase();

        welcomeText.textContent =
            `Welcome back, ${formattedFirstName}`;

    } else {

        welcomeText.textContent = "Welcome back";

    }

}

const homeWorkoutStreak =
    document.getElementById("homeWorkoutStreak");



function displayHomeWorkoutStreak() {

    if (!homeWorkoutStreak) return;

    const streakData =
        getWorkoutStreakData();

    homeWorkoutStreak.textContent =
        streakData.current;

}

const todayWorkout =
    document.getElementById("todayWorkout");

function displayTodayWorkout() {

    if (!todayWorkout) return;

    const today = new Date();
    const todayName = days[today.getDay()];

    const workout = getSortedWorkouts().find(
        workout => workout.day === todayName
    );

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

            <a
                href="workouts.html"
                class="btn btn-success">

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
    /*
     * If today's workout has already been completed,
     * show a completed message instead of
     * "Continue Workout".
     */
    if (workout.completedDate) {

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

                    <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style="width:100%">

                    </div>

                </div>

            </div>

        `;

        return;
    }

    const completedExercises =
        workout.exercises.filter(
            exercise => exercise.completed
        ).length;

    const totalExercises =
        workout.exercises.length;

    const progress =
        totalExercises === 0
            ? 0
            : Math.round(
                (completedExercises / totalExercises) * 100
            );

    let workoutInfo = "";

    if (completedExercises > 0) {

        workoutInfo = `

            <div class="workout-progress-card">

                <div class="workout-progress-header">

                    <span>

                        <i class="bi bi-check-circle-fill"></i>

                        ${completedExercises}/${totalExercises}
                        Exercises Completed

                    </span>

                    <span>

                        <i class="bi bi-clock"></i>

                        ${getWorkoutMinutes(workout)} min

                    </span>

                </div>

                <div class="progress workout-progress-bar">

                    <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style="width:${progress}%">

                    </div>

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

                        ${getWorkoutMinutes(workout)} min

                    </span>

                </div>

                <div class="progress workout-progress-bar">

                    <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style="width:0%">

                    </div>

                </div>

            </div>

        `;

    }

    todayWorkout.innerHTML = `

        <div class="workout-hero">

            <h3>${workout.name} Day</h3>

            <p class="text-muted">

                ${workout.day}

            </p>

        </div>

        ${workoutInfo}

        <a
    href="workout.html?id=${workout.id}"
    class="btn btn-success">

    ${
        workout.startTime || workout.isPaused
            ? "Continue Workout"
            : "Start Workout"
    }

</a>

    `;

}

function getWorkoutMinutes(workout) {

    if (
        workout.startTime &&
        !workout.isPaused &&
        !workout.completed
    ) {

        const elapsedSeconds =
            Math.floor(
                (Date.now() - workout.startTime) / 1000
            );

        return Math.floor(elapsedSeconds / 60);

    }

    return Math.floor(
        (Number(workout.durationSeconds) || 0) / 60
    );

}

const weeklyPlanner =
    document.getElementById("weeklyPlanner");

function displayWeeklyPlanner() {

    if (!weeklyPlanner) return;

    weeklyPlanner.innerHTML = "";

    const weekStart = getStartOfWeek();
    const weekEnd = getEndOfWeek();
    const today = getToday();

    // Only workouts scheduled this week
    const weeklyWorkouts = getSortedWorkouts().filter(workout => {

        const scheduled = getWorkoutScheduledDate(workout);

        if (!scheduled) return false;

        return (
            scheduled >= weekStart &&
            scheduled < weekEnd
        );

    });

    if (weeklyWorkouts.length === 0) {

        weeklyPlanner.innerHTML = `
            <div class="text-center text-muted py-3">
                No workouts scheduled this week.
            </div>
        `;

        return;

    }

    weeklyWorkouts.forEach(workout => {

        const scheduled = getWorkoutScheduledDate(workout);

        let statusClass = "";
        let statusIcon = "";
        let statusText = "";

        if (workout.completed) {

            statusClass = "completed";
            statusIcon = `<i class="bi bi-check-lg"></i>`;
            statusText = "Completed";

        } else if (scheduled.getTime() === today.getTime()) {

            statusClass = "active";
            statusIcon = `<i class="bi bi-lightning-charge-fill"></i>`;
            statusText = "Today";

        } else if (scheduled > today) {

            statusClass = "pending";
            statusIcon = `<i class="bi bi-circle"></i>`;
            statusText = "Upcoming";

        } else {

            statusClass = "missed";
            statusIcon = `<i class="bi bi-x-circle-fill"></i>`;
            statusText = "Missed";

        }

        weeklyPlanner.innerHTML += `

            <div
                class="planner-item ${statusClass}"
                data-id="${workout.id}"
            >

                <div class="planner-day">
                    ${scheduled.toLocaleDateString(undefined,{
                        weekday:"short"
                    }).toUpperCase()}
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
    const activeWorkout =
        weeklyPlanner.querySelector(".planner-item.active");

    if (activeWorkout) {

        activeWorkout.scrollIntoView({

            behavior: "smooth",
            inline: "center",
            block: "nearest"

        });

    }

    // Make planner items clickable
    weeklyPlanner
        .querySelectorAll(".planner-item")
        .forEach(item => {

            item.addEventListener("click", () => {

                const id = item.dataset.id;

                if (!id) return;

                window.location.href =
                    `workout.html?id=${id}`;

            });

        });

}

const motivationText =
    document.getElementById("motivationText");

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

    const startOfYear = new Date(
        today.getFullYear(),
        0,
        0
    );

    const diff =
        today - startOfYear;

    const oneDay =
        1000 * 60 * 60 * 24;

    const dayNumber =
        Math.floor(diff / oneDay);

    const quote =
        quotes[
            dayNumber % quotes.length
        ];

    motivationText.textContent =
        `"${quote}"`;

}

displayDailyQuote();

displayWeeklyPlanner();

displayTodayWorkout();

displayHomeWorkoutStreak();
