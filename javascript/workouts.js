// =====================================
// LiftLog
// Workouts Page
// =====================================
// =====================================
// DOM Elements
// =====================================
let workoutToDelete = null;
let currentWorkoutId = null;
const workoutList =
    document.getElementById("workoutList");
const workoutName =
    document.getElementById("workoutName");
const workoutDay =
    document.getElementById("workoutDay");
const workoutDuration =
    document.getElementById("workoutDuration");
const workoutCategory =
    document.getElementById("workoutCategory");
const workoutGoal =
    document.getElementById("workoutGoal");
const workoutDifficulty =
    document.getElementById("workoutDifficulty");
const addWorkoutBtn =
    document.getElementById("addWorkoutBtn");
const searchWorkout =
    document.getElementById("searchWorkout");
const confirmDeleteWorkout =
    document.getElementById("confirmDeleteWorkout");
const editWorkoutName =
    document.getElementById("editWorkoutName");
const editWorkoutDay =
    document.getElementById("editWorkoutDay");
const editWorkoutExercises =
    document.getElementById("editWorkoutExercises");
const editWorkoutDuration =
    document.getElementById("editWorkoutDuration");
const saveWorkoutChanges =
    document.getElementById("saveWorkoutChanges");
// =====================================
// Week Helpers
// =====================================
function getStartOfWeek(date = new Date()) {
    const d = new Date(date);
    const day = d.getDay();
    const diff =
        day === 0
            ? -6
            : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}
function getEndOfWeek(date = new Date()) {
    const end = getStartOfWeek(date);
    end.setDate(end.getDate() + 7);
    end.setHours(0, 0, 0, 0);
    return end;
}
// =====================================
// SAFE LOCAL DATE PARSER
// =====================================
//
// Important:
// new Date("2026-07-29") is interpreted as
// UTC midnight by JavaScript.
//
// In Lagos, that becomes 11 PM on July 28.
//
// So date-only strings must be parsed manually
// as local dates.
//
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
    const start =
        getStartOfWeek(referenceDate);
    // IMPORTANT:
    // dayOrder comes from data.js:
    //
    // Sunday
    // Monday
    // Tuesday
    // Wednesday
    // Thursday
    // Friday
    // Saturday
    //
    // But our week starts Monday.
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
// =====================================
// Today Helpers
// =====================================
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
// =====================================
// Helpers
// =====================================
function getDifficultyBadge(difficulty) {
    switch (difficulty) {
        case "Beginner":
            return `
                <span class="badge bg-success">
                    🟢 Beginner
                </span>
            `;
        case "Intermediate":
            return `
                <span class="badge bg-warning text-dark">
                    🟡 Intermediate
                </span>
            `;
        case "Advanced":
            return `
                <span class="badge bg-danger">
                    🔴 Advanced
                </span>
            `;
        default:
            return "";
    }
}
function formatWorkoutDuration(minutes) {
    minutes =
        Number(minutes) || 0;
    if (minutes >= 60) {
        const hrs =
            Math.floor(minutes / 60);
        const mins =
            minutes % 60;
        if (mins === 0) {
            return `${hrs} hr`;
        }
        return `${hrs} hr ${mins} min`;
    }
    return `${minutes} min`;
}
// =====================================
// Workout Status
// =====================================
function getWorkoutStatus(workout) {
    // ---------------------------------
    // COMPLETED ALWAYS WINS
    // ---------------------------------
    if (workout.completed === true) {
        return {
            status: `
                <i class="bi bi-check-circle-fill"></i>
                Completed
            `,
            statusClass:
                "status-completed",
            buttonText:
                "View Workout"
        };
    }
    // ---------------------------------
    // GET SCHEDULED DATE
    // ---------------------------------
    const scheduled =
        getWorkoutScheduledDate(workout);
    if (!scheduled) {
        return {
            status: `
                <i class="bi bi-question-circle"></i>
                Unscheduled
            `,
            statusClass:
                "status-upcoming",
            buttonText:
                "Open Workout"
        };
    }
    // ---------------------------------
    // TODAY
    // ---------------------------------
    if (isWorkoutToday(workout)) {
        return {
            status: `
                <i class="bi bi-lightning-charge-fill"></i>
                Today
            `,
            statusClass:
                "status-today",
            buttonText:
                workout.startTime
                    ? "Continue Workout"
                    : "Open Workout"
        };
    }
    // ---------------------------------
    // FUTURE
    // ---------------------------------
    if (isWorkoutFuture(workout)) {
        return {
            status: `
                <i class="bi bi-calendar-event"></i>
                Upcoming
            `,
            statusClass:
                "status-upcoming",
            buttonText:
                "View Workout"
        };
    }
    // ---------------------------------
    // PAST
    // ---------------------------------
    return {
        status: `
            <i class="bi bi-x-circle-fill"></i>
            Missed
        `,
        statusClass:
            "status-missed",
        buttonText:
            "Log Previous Workout"
    };
}
// =====================================
// Display Workouts
// =====================================
function displayWorkouts(list = workouts) {
    if (!workoutList) {
        return;
    }
    const sortedWorkouts =
        [...list].sort((a, b) => {
            const dateA =
                getWorkoutScheduledDate(a);
            const dateB =
                getWorkoutScheduledDate(b);
            if (
                dateA &&
                dateB
            ) {
                return (
                    dateA.getTime() -
                    dateB.getTime()
                );
            }
            return (
                dayOrder.indexOf(a.day) -
                dayOrder.indexOf(b.day)
            );
        });
    workoutList.innerHTML = "";
    // ---------------------------------
    // EMPTY STATE
    // ---------------------------------
    if (sortedWorkouts.length === 0) {
        workoutList.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-barbell display-1 text-success"></i>
                <h3 class="mt-4">
                    No workouts yet
                </h3>
                <p>
                    Create your first workout to begin tracking
                    your progress, or choose one of our workout
                    templates to get started.
                </p>
                <button
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#newWorkoutModal">
                    <i class="bi bi-plus-circle"></i>
                    Create Workout
                </button>
            </div>
        `;
        return;
    }
    // ---------------------------------
    // WORKOUT CARDS
    // ---------------------------------
    sortedWorkouts.forEach(workout => {
        const {
            status,
            statusClass,
            buttonText
        } =
            getWorkoutStatus(workout);
        const futureWorkout =
            isWorkoutFuture(workout);
        const scheduledDate =
            getWorkoutScheduledDate(workout);
        const scheduledText =
            scheduledDate
                ? scheduledDate.toLocaleDateString()
                : "";
        // ---------------------------------
        // MAIN WORKOUT BUTTON
        // ---------------------------------
        //
        // IMPORTANT:
        // Future workouts are NOT disabled.
        //
        // The user can still VIEW tomorrow's
        // workout.
        //
        const workoutLink =
            `
                <a
                    href="workout.html?id=${workout.id}"
                    class="btn btn-success">
                    ${buttonText}
                </a>
            `;
        // ---------------------------------
        // EDIT BUTTON
        // ---------------------------------
        //
        // Only the EDIT button is disabled
        // for future workouts.
        //
        // The workout itself remains accessible.
        //
        const editButton =
            futureWorkout
                ? `
                    <button
                        class="btn btn-outline-secondary edit-btn"
                        data-id="${workout.id}"
                        disabled
                        title="Future workouts cannot be edited yet">
                        <i class="bi bi-lock-fill"></i>
                        Edit Workout
                    </button>
                `
                : `
                    <button
                        class="btn btn-outline-success edit-btn"
                        data-id="${workout.id}">
                        <i class="bi bi-pencil"></i>
                        Edit Workout
                    </button>
                `;
        // ---------------------------------
        // DAY DISPLAY
        // ---------------------------------
        const shortDay =
            workout.day
                ? workout.day.slice(0, 3)
                : "";
        // ---------------------------------
        // CATEGORY CLASS
        // ---------------------------------
        const category =
            workout.category || "";
        const categoryClass =
            category
                .toLowerCase()
                .replace(/\s+/g, "-");
        // ---------------------------------
        // EXERCISE COUNT
        // ---------------------------------
        const exerciseCount =
            Array.isArray(workout.exercises)
                ? workout.exercises.length
                : Number(workout.exerciseCount) || 0;
        workoutList.innerHTML += `
            <section class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h3 class="workout-title">
                                ${workout.name || "Workout"}
                            </h3>
                            <p class="shortday">
                                ${shortDay}
                            </p>
                        </div>
                        <span class="${statusClass}">
                            ${status}
                        </span>
                    </div>
                    <hr>
                    <div class="row text-center">
                        <div class="col">
                            <h5>
                                ${exerciseCount}
                            </h5>
                            <small>
                                Exercises
                            </small>
                        </div>
                        <div class="col">
                            <h5>
                                ${formatWorkoutDuration(
                                    workout.duration
                                )}
                            </h5>
                            <small>
                                Duration
                            </small>
                        </div>
                    </div>
                    <div class="d-flex flex-wrap gap-2 mb-4">
                        ${
                            category
                                ? `
                                    <span class="workout-category category-${categoryClass}">
                                        ${category}
                                    </span>
                                `
                                : ""
                        }
                        ${
                            workout.goal
                                ? `
                                    <span class="workout-goal">
                                        ${workout.goal}
                                    </span>
                                `
                                : ""
                        }
                    </div>
                    ${
                        futureWorkout && scheduledText
                            ? `
                                <small class="text-muted d-block mb-2">
                                    <i class="bi bi-calendar3"></i>
                                    Available on ${scheduledText}
                                </small>
                            `
                            : ""
                    }
                    <div class="d-grid gap-2">
                        ${workoutLink}
                        ${editButton}
                        <button
                            class="btn btn-outline-danger delete-btn"
                            data-id="${workout.id}">
                            <i class="bi bi-trash"></i>
                            Delete Workout
                        </button>
                    </div>
                </div>
            </section>
        `;
    });
}
// =====================================
// Add Workout
// =====================================
function addWorkout() {
    const name =
        workoutName.value.trim();
    if (name === "") {
        const toastMessage =
            document.getElementById(
                "toastMessage"
            );
        const exerciseToast =
            document.getElementById(
                "exerciseToast"
            );
        if (toastMessage) {
            toastMessage.textContent =
                "Please enter a workout name.";
        }
        if (exerciseToast) {
            new bootstrap.Toast(
                exerciseToast
            ).show();
        }
        return;
    }
    const day =
        workoutDay.value;
    const scheduled =
        getScheduledDateForDay(day);
    if (!scheduled) {
        return;
    }
    const newWorkout = {
        id: Date.now(),
        name,
        day,
        scheduledDate:
            scheduled.toISOString(),
        exercises: [],
        exerciseCount: 0,
        duration:
            Number(workoutDuration.value) || 0,
        category:
            workoutCategory.value,
        goal:
            workoutGoal.value,
        difficulty:
            workoutDifficulty.value,
        completed:
            false,
        completedDate:
            null,
        startTime:
            null
    };
    newWorkout.exerciseCount =
        newWorkout.exercises.length;
    workouts.push(newWorkout);
    workouts.sort((a, b) => {
        const dateA =
            getWorkoutScheduledDate(a);
        const dateB =
            getWorkoutScheduledDate(b);
        if (dateA && dateB) {
            return (
                dateA.getTime() -
                dateB.getTime()
            );
        }
        return (
            dayOrder.indexOf(a.day) -
            dayOrder.indexOf(b.day)
        );
    });
    saveWorkouts();
    refreshWorkouts();
    const newWorkoutModal =
        document.getElementById(
            "newWorkoutModal"
        );
    if (newWorkoutModal) {
        const modal =
            bootstrap.Modal.getInstance(
                newWorkoutModal
            );
        if (modal) {
            modal.hide();
        }
    }
    // Clear Form
    workoutName.value = "";
    workoutDay.selectedIndex = 0;
    workoutDuration.value = "";
    workoutCategory.selectedIndex = 0;
    workoutGoal.selectedIndex = 0;
    workoutDifficulty.selectedIndex = 0;
}
// =====================================
// Search Workouts
// =====================================
function searchWorkouts() {
    const keyword =
        searchWorkout.value
            .toLowerCase()
            .trim();
    const filtered =
        workouts.filter(workout => {
            const name =
                String(
                    workout.name || ""
                ).toLowerCase();
            return name.includes(keyword);
        });
    displayWorkouts(filtered);
    attachEditEvents();
    attachDeleteEvents();
}
// =====================================
// Refresh Workouts
// =====================================
function refreshWorkouts() {
    if (!workoutList) {
        return;
    }
    displayWorkouts();
    attachEditEvents();
    attachDeleteEvents();
    saveWorkouts();
    // ---------------------------------
    // Scroll to today's workout
    // ---------------------------------
    const todayCard =
        document.querySelector(
            ".status-today"
        );
    if (todayCard) {
        const card =
            todayCard.closest(".card");
        if (card) {
            setTimeout(() => {
                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 100);
        }
    }
}
// =====================================
// Delete Events
// =====================================
function attachDeleteEvents() {
    document
        .querySelectorAll(".delete-btn")
        .forEach(button => {
            button.addEventListener(
                "click",
                () => {
                    workoutToDelete =
                        Number(
                            button.dataset.id
                        );
                    const workout =
                        workouts.find(
                            workout =>
                                workout.id ===
                                workoutToDelete
                        );
                    if (!workout) {
                        return;
                    }
                    const deleteWorkoutName =
                        document.getElementById(
                            "deleteWorkoutName"
                        );
                    if (deleteWorkoutName) {
                        deleteWorkoutName.textContent =
                            workout.name;
                    }
                    const deleteModal =
                        document.getElementById(
                            "deleteWorkoutModal"
                        );
                    if (deleteModal) {
                        new bootstrap.Modal(
                            deleteModal
                        ).show();
                    }
                }
            );
        });
}
// =====================================
// Edit Workout
// =====================================
function editWorkout(id) {
    const workout =
        workouts.find(
            workout =>
                workout.id == id
        );
    if (!workout) {
        return;
    }
    // Completed workouts cannot be edited.
    if (workout.completed === true) {
        return;
    }
    // Future workouts cannot be edited.
    if (isWorkoutFuture(workout)) {
        return;
    }
    currentWorkoutId =
        workout.id;
    editWorkoutName.value =
        workout.name || "";
    editWorkoutDay.value =
        workout.day || "";
    editWorkoutExercises.value =
        workout.exerciseCount ||
        (
            Array.isArray(workout.exercises)
                ? workout.exercises.length
                : 0
        );
    editWorkoutDuration.value =
        workout.duration || "";
    const editModal =
        document.getElementById(
            "editWorkoutModal"
        );
    if (editModal) {
        new bootstrap.Modal(
            editModal
        ).show();
    }
}
// =====================================
// Save Workout Changes
// =====================================
function saveWorkout() {
    const workout =
        workouts.find(
            workout =>
                workout.id ==
                currentWorkoutId
        );
    if (!workout) {
        return;
    }
    // ---------------------------------
    // Name
    // ---------------------------------
    const newName =
        editWorkoutName.value.trim();
    if (newName) {
        workout.name = newName;
    }
    // ---------------------------------
    // Day
    // ---------------------------------
    const newDay =
        editWorkoutDay.value;
    if (newDay) {
        workout.day =
            newDay;
        const scheduled =
            getScheduledDateForDay(
                workout.day
            );
        if (scheduled) {
            workout.scheduledDate =
                scheduled.toISOString();
        }
    }
    // ---------------------------------
    // Exercise Count
    // ---------------------------------
    workout.exerciseCount =
        Number(
            editWorkoutExercises.value
        ) || 0;
    // ---------------------------------
    // Duration
    // ---------------------------------
    workout.duration =
        Number(
            editWorkoutDuration.value
        ) || 0;
    // ---------------------------------
    // Save
    // ---------------------------------
    saveWorkouts();
    refreshWorkouts();
    const editModal =
        document.getElementById(
            "editWorkoutModal"
        );
    if (editModal) {
        const modal =
            bootstrap.Modal.getInstance(
                editModal
            );
        if (modal) {
            modal.hide();
        }
    }
}
// =====================================
// Delete Workout
// =====================================
if (confirmDeleteWorkout) {
    confirmDeleteWorkout.addEventListener(
        "click",
        () => {
            if (workoutToDelete === null) {
                return;
            }
            workouts =
                workouts.filter(
                    workout =>
                        workout.id !==
                        workoutToDelete
                );
            workoutToDelete =
                null;
            saveWorkouts();
            refreshWorkouts();
            const deleteModal =
                document.getElementById(
                    "deleteWorkoutModal"
                );
            if (deleteModal) {
                const modal =
                    bootstrap.Modal.getInstance(
                        deleteModal
                    );
                if (modal) {
                    modal.hide();
                }
            }
        }
    );
}
// =====================================
// Attach Edit Events
// =====================================
function attachEditEvents() {
    document
        .querySelectorAll(".edit-btn")
        .forEach(button => {
            button.addEventListener(
                "click",
                () => {
                    if (
                        button.disabled
                    ) {
                        return;
                    }
                    editWorkout(
                        button.dataset.id
                    );
                }
            );
        });
}
// =====================================
// Remove Stale Recommended Workouts
// =====================================
function removeStaleRecommendedWorkouts() {
    const currentWeekStart =
        getStartOfWeek();
    const beforeCount =
        workouts.length;
    workouts =
        workouts.filter(workout => {
            // Only clean recommended workouts.
            if (
                workout.source !==
                "recommended"
            ) {
                return true;
            }
            // Never remove completed workouts.
            if (
                workout.completed ===
                true
            ) {
                return true;
            }
            const scheduledDate =
                getWorkoutScheduledDate(
                    workout
                );
            if (!scheduledDate) {
                return true;
            }
            // Keep current and future
            // recommended workouts.
            return (
                scheduledDate >=
                currentWeekStart
            );
        });
    return (
        workouts.length !==
        beforeCount
    );
}
// =====================================
// Personal Records
// =====================================
function updatePersonalRecords(
    exercises
) {
    const personalRecords =
        JSON.parse(
            localStorage.getItem(
                "liftlogRecords"
            )
        ) || {};
    exercises.forEach(exercise => {
        const exerciseName =
            exercise.name;
        const weight =
            Number(
                exercise.weight
            );
        if (
            !weight ||
            weight <= 0
        ) {
            return;
        }
        if (
            !personalRecords[
                exerciseName
            ] ||
            weight >
                personalRecords[
                    exerciseName
                ]
        ) {
            personalRecords[
                exerciseName
            ] = weight;
        }
    });
    localStorage.setItem(
        "liftlogRecords",
        JSON.stringify(
            personalRecords
        )
    );
}
// =====================================
// Event Listeners
// =====================================
if (addWorkoutBtn) {
    addWorkoutBtn.addEventListener(
        "click",
        addWorkout
    );
}
if (saveWorkoutChanges) {
    saveWorkoutChanges.addEventListener(
        "click",
        saveWorkout
    );
}
if (searchWorkout) {
    searchWorkout.addEventListener(
        "input",
        searchWorkouts
    );
}
// =====================================
// Initialize Page
// =====================================
refreshWorkouts();
// =====================================
// Welcome Modal
// =====================================
if (
    workouts.length === 0 &&
    !localStorage.getItem(
        "recommendedPlanUsed"
    )
) {
    const welcomeModal =
        document.getElementById(
            "welcomeWorkoutModal"
        );
    if (welcomeModal) {
        new bootstrap.Modal(
            welcomeModal
        ).show();
    }
}
// =====================================
// Recommended Plan
// =====================================
const recommendedPlanBtn =
    document.getElementById(
        "recommendedPlanBtn"
    );
if (recommendedPlanBtn) {
    recommendedPlanBtn.addEventListener(
        "click",
        () => {
            const welcomeModal =
                document.getElementById(
                    "welcomeWorkoutModal"
                );
            if (welcomeModal) {
                const modal =
                    bootstrap.Modal.getInstance(
                        welcomeModal
                    );
                if (modal) {
                    modal.hide();
                }
            }
            const goalModal =
                document.getElementById(
                    "goalModal"
                );
            if (goalModal) {
                new bootstrap.Modal(
                    goalModal
                ).show();
            }
        }
    );
}
// =====================================
// Goal Buttons
// =====================================
document
    .querySelectorAll(".goal-btn")
    .forEach(button => {
        button.addEventListener(
            "click",
            () => {
                const goal =
                    button.dataset.goal;
                const selectedPlan =
                    workoutPlans[goal];
                if (!selectedPlan) {
                    return;
                }
                // ---------------------------------
                // Use today's actual local date.
                // ---------------------------------
                const today =
                    getToday();
                // ---------------------------------
                // Remove stale recommendations.
                // ---------------------------------
                removeStaleRecommendedWorkouts();
                // ---------------------------------
                // Create this week's workouts.
                // ---------------------------------
                Object.entries(
                    selectedPlan.days
                ).forEach(
                    ([day, plan]) => {
                        // Rest days are not created.
                        if (
                            !plan.exercises ||
                            plan.exercises.length === 0
                        ) {
                            return;
                        }
                        // ---------------------------------
                        // Calculate scheduled date using
                        // Monday-based week logic.
                        // ---------------------------------
                        const scheduled =
                            getScheduledDateForDay(
                                day,
                                today
                            );
                        if (!scheduled) {
                            return;
                        }
                        // ---------------------------------
                        // Do not create workouts that are
                        // already in the past.
                        // ---------------------------------
                        if (
                            scheduled <
                            today
                        ) {
                            return;
                        }
                        // ---------------------------------
                        // Get exercise objects.
                        // ---------------------------------
                        const exercises =
                            getWorkoutExercises(
                                plan.exercises,
                                exerciseLibrary
                            )
                            .filter(Boolean)
                            .map(
                                exercise => ({
                                    ...exercise,
                                    sets:
                                        exercise.sets ||
                                        3,
                                    reps:
                                        exercise.reps ||
                                        10,
                                    weight:
                                        "",
                                    notes:
                                        "",
                                    completed:
                                        false
                                })
                            );
                        // ---------------------------------
                        // Prevent duplicate recommended
                        // workouts for the same day.
                        // ---------------------------------
                        const alreadyExists =
                            workouts.some(
                                workout => {
                                    if (
                                        workout.source !==
                                        "recommended"
                                    ) {
                                        return false;
                                    }
                                    const existingDate =
                                        getWorkoutScheduledDate(
                                            workout
                                        );
                                    if (
                                        !existingDate
                                    ) {
                                        return false;
                                    }
                                    return (
                                        existingDate.getTime() ===
                                        scheduled.getTime()
                                    );
                                }
                            );
                        if (
                            alreadyExists
                        ) {
                            return;
                        }
                        // ---------------------------------
                        // Add workout.
                        // ---------------------------------
                        workouts.push({
                            id:
                                Date.now() +
                                Math.random(),
                            name:
                                plan.title,
                            day,
                            scheduledDate:
                                scheduled.toISOString(),
                            source:
                                "recommended",
                            weekStart:
                                getStartOfWeek(
                                    today
                                ).toISOString(),
                            exercises,
                            exerciseCount:
                                exercises.length,
                            duration:
                                60,
                            category:
                                plan.title,
                            goal:
                                selectedPlan.title,
                            difficulty:
                                "Intermediate",
                            completed:
                                false,
                            completedDate:
                                null,
                            startTime:
                                null
                        });
                    }
                );
                // ---------------------------------
                // Save
                // ---------------------------------
                saveWorkouts();
                localStorage.setItem(
                    "recommendedPlanUsed",
                    "true"
                );
                // ---------------------------------
                // Close Goal Modal
                // ---------------------------------
                const goalModal =
                    document.getElementById(
                        "goalModal"
                    );
                if (goalModal) {
                    const modal =
                        bootstrap.Modal.getInstance(
                            goalModal
                        );
                    if (modal) {
                        modal.hide();
                    }
                }
                refreshWorkouts();
            }
        );
    });
// =====================================
// Final Today's Workout Check
// =====================================
setTimeout(() => {
    const todayCard =
        document.querySelector(
            ".status-today"
        );
    if (todayCard) {
        const card =
            todayCard.closest(".card");
        if (card) {
            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }
}, 150);