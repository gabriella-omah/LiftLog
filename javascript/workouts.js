// =====================================
// LiftLog
// Workouts Page
// =====================================
// =====================================
// DOM Elements
// =====================================
let workoutToDelete = null;
let currentWorkoutId = null;
let workoutToReplace = null;
let pendingWorkout = null;

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
const workoutHours =
    document.getElementById("workoutHours");
const workoutMinutes =
    document.getElementById("workoutMinutes");
const confirmReplaceWorkout =
 document.getElementById("confirmReplaceWorkout")

// =====================================
// Week Helpers
// =====================================


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

// =====================================
// Today Helpers
// =====================================

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
function getWeekLabel(date) {

    const today = getToday();

    const thisWeek = getStartOfWeek(today);

    const nextWeek = new Date(thisWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const weekAfter = new Date(nextWeek);
    weekAfter.setDate(weekAfter.getDate() + 7);

    const workoutWeek = getStartOfWeek(date);

    if (workoutWeek.getTime() === thisWeek.getTime()) {
        return "This Week";
    }

    if (workoutWeek.getTime() === nextWeek.getTime()) {
        return "Next Week";
    }

    const end = new Date(workoutWeek);
    end.setDate(end.getDate() + 6);

    return `${workoutWeek.toLocaleDateString(undefined,{
        month:"short",
        day:"numeric"
    })} – ${end.toLocaleDateString(undefined,{
        month:"short",
        day:"numeric"
    })}`;

}
function displayWorkouts(list = workouts) {

    if (!workoutList) return;

    workoutList.innerHTML = "";

    const sortedWorkouts = [...list].sort((a, b) => {

        const dateA = getWorkoutScheduledDate(a);
        const dateB = getWorkoutScheduledDate(b);

        if (dateA && dateB) {
            return dateA - dateB;
        }

        return dayOrder.indexOf(a.day) -
               dayOrder.indexOf(b.day);

    });

    if (sortedWorkouts.length === 0) {

        workoutList.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-barbell display-1 text-success"></i>
                <h3 class="mt-4">No workouts yet</h3>
                <p>
                    Create your first workout to begin tracking your progress.
                </p>
            </div>
        `;

        return;
    }

    let currentSection = "";

    sortedWorkouts.forEach(workout => {

        const {
            status,
            statusClass,
            buttonText
        } = getWorkoutStatus(workout);

        const scheduledDate =
            getWorkoutScheduledDate(workout);

        const weekLabel =
            scheduledDate
                ? getWeekLabel(scheduledDate)
                : "Other";

        if (weekLabel !== currentSection) {

            currentSection = weekLabel;

            workoutList.innerHTML += `
                <div class="mt-4 mb-3">
                    <h4 class="fw-bold text-success">
                        ${weekLabel}
                    </h4>
                    <hr>
                </div>
            `;

        }

        const scheduledText =
            scheduledDate
                ? scheduledDate.toLocaleDateString(undefined,{
                    weekday:"short",
                    month:"short",
                    day:"numeric"
                })
                : workout.day;

        const workoutLink = `
            <a
                href="workout.html?id=${workout.id}"
                class="btn btn-success">
                ${buttonText}
            </a>
        `;

        const editButton =
            workout.completed
                ? `
                    <button
                        class="btn btn-outline-secondary"
                        disabled>
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

        const category =
            workout.category || "";

        const categoryClass =
            category.toLowerCase().replace(/\s+/g,"-");

        const exerciseCount =
            Array.isArray(workout.exercises)
                ? workout.exercises.length
                : Number(workout.exerciseCount) || 0;

        workoutList.innerHTML += `

            <section class="card mb-3">

                <div class="card-body">

                    <div class="d-flex justify-content-between align-items-start">

                        <div>

                            <h3 class="workout-title">
                                ${workout.name || "Workout"}
                            </h3>

                            <p class="text-muted mb-0">
                                <i class="bi bi-calendar3"></i>
                                ${scheduledText}
                            </p>

                        </div>

                        <span class="${statusClass}">
                            ${status}
                        </span>

                    </div>

                    <hr>

                    <div class="row text-center">

                        <div class="col">
                            <h5>${exerciseCount}</h5>
                            <small>Exercises</small>
                        </div>

                        <div class="col">
                            <h5>${formatWorkoutDuration(workout.duration)}</h5>
                            <small>Duration</small>
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

function showReplaceWorkoutModal(existingWorkout, newWorkout) {

    workoutToReplace = existingWorkout;

    pendingWorkout = newWorkout;

    document.getElementById(
        "existingWorkoutName"
    ).textContent =
        existingWorkout.name;

    document.getElementById(
        "existingWorkoutDate"
    ).textContent =
        getWorkoutScheduledDate(existingWorkout)
            .toLocaleDateString();

    new bootstrap.Modal(
        document.getElementById(
            "replaceWorkoutModal"
        )
    ).show();

}

function replaceWorkout() {

    if (!workoutToReplace || !pendingWorkout) {
        return;
    }

    workouts =
        workouts.filter(workout =>
            workout.id !== workoutToReplace.id
        );

    const existingIndex =
        workouts.findIndex(workout =>
            workout.id === pendingWorkout.id
        );

    if (existingIndex >= 0) {

        workouts[existingIndex] =
            pendingWorkout;

    } else {

        workouts.push(pendingWorkout);

    }

    workouts.sort((a,b)=>{

        const dateA =
            getWorkoutScheduledDate(a);

        const dateB =
            getWorkoutScheduledDate(b);

        return dateA-dateB;

    });

    saveWorkouts();

    refreshWorkouts();

    const replaceModal =
    bootstrap.Modal.getInstance(
        document.getElementById("replaceWorkoutModal")
    );

if (replaceModal) {
    replaceModal.hide();
}

    const editModal =
        document.getElementById(
            "editWorkoutModal"
        );

    if(editModal){

        const modal =
            bootstrap.Modal.getInstance(editModal);

        if(modal){

            modal.hide();

        }

    }

    const addModal =
        document.getElementById(
            "newWorkoutModal"
        );

    if(addModal){

        const modal =
            bootstrap.Modal.getInstance(addModal);

        if(modal){

            modal.hide();

        }

    }

    workoutToReplace = null;

    pendingWorkout = null;

    showToast(
        "Workout replaced successfully."
    );

}

// =====================================
// Add Workout
// =====================================
function addWorkout() {

    const name = workoutName.value.trim();

    if (name === "") {

        showToast("Please enter a workout name.");
        return;

    }

    const selectedDate = workoutDate.value;

    if (!selectedDate) {

        showToast("Please select a workout date.");
        return;

    }

    const scheduled = parseLocalDate(selectedDate);

    const day =
        scheduled.toLocaleDateString("en-US", {
            weekday: "long"
        });

    const newWorkout = {

        id: Date.now(),

        name,

        day,

        scheduledDate: selectedDate,

        exercises: [],

        exerciseCount: 0,

        duration:
            (Number(workoutHours.value) || 0) * 60 +
            (Number(workoutMinutes.value) || 0),

        category: workoutCategory.value,

        goal: workoutGoal.value,

        difficulty: workoutDifficulty.value,

        completed: false,

        completedDate: null,

        startTime: null

    };

    const existingWorkout =
        workouts.find(workout =>
            workout.scheduledDate &&
            workout.scheduledDate.slice(0, 10) === selectedDate
        );

    if (existingWorkout) {

        showReplaceWorkoutModal(
            existingWorkout,
            newWorkout
        );

        return;

    }

    workouts.push(newWorkout);

    workouts.sort((a, b) => {

        const dateA = getWorkoutScheduledDate(a);
        const dateB = getWorkoutScheduledDate(b);

        return dateA - dateB;

    });

    saveWorkouts();

    refreshWorkouts();

    const newWorkoutModal =
        document.getElementById("newWorkoutModal");

    if (newWorkoutModal) {

        const modal =
            bootstrap.Modal.getInstance(newWorkoutModal);

        if (modal) {
            modal.hide();
        }

    }

    workoutName.value = "";
    workoutDate.value = "";
    workoutHours.value = "";
    workoutMinutes.value = "";
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

function showToast(message) {
    const toastMessage = document.getElementById("toastMessage");
    const toastElement = document.getElementById("exerciseToast");

    if (!toastMessage || !toastElement) {
        alert(message); // fallback
        return;
    }

    toastMessage.textContent = message;

    const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
    toast.show();
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

    if (workout.completed === true) {
        return;
    }

    currentWorkoutId =
        workout.id;

    editWorkoutName.value =
        workout.name || "";

    editWorkoutDay.value =
        workout.scheduledDate
            ? workout.scheduledDate.slice(0, 10)
            : "";

    editWorkoutHours.value =
        Math.floor(
            (workout.duration || 0) / 60
        );

    editWorkoutMinutes.value =
        (workout.duration || 0) % 60;

    

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
                workout.id == currentWorkoutId
        );

    if (!workout) {
        return;
    }

    const newName =
        editWorkoutName.value.trim();

    if (newName) {
        workout.name = newName;
    }

    const selectedDate =
        editWorkoutDay.value;

    if (!selectedDate) {

        showToast("Please select a workout date.");

        return;

    }

    const existingWorkout =
        workouts.find(w =>

            w.id !== workout.id &&

            w.scheduledDate &&

            w.scheduledDate.slice(0,10) === selectedDate

        );

    if (existingWorkout) {

        workoutToReplace = existingWorkout;

        pendingWorkout = {

            ...workout,

            name: workout.name,

            scheduledDate: selectedDate,

            day: new Date(selectedDate)
                .toLocaleDateString(
                    "en-US",
                    {
                        weekday:"long"
                    }
                ),

            duration:
                (Number(editWorkoutHours.value)||0)*60+
                (Number(editWorkoutMinutes.value)||0)

        };

        document.getElementById(
            "existingWorkoutName"
        ).textContent =
            existingWorkout.name;

        document.getElementById(
            "existingWorkoutDate"
        ).textContent =
            getWorkoutScheduledDate(existingWorkout)
                .toLocaleDateString();

        new bootstrap.Modal(
            document.getElementById(
                "replaceWorkoutModal"
            )
        ).show();

        return;

    }

    const previousDate =
        workout.scheduledDate
            ? workout.scheduledDate.slice(0,10)
            : "";

    workout.scheduledDate = selectedDate;

    workout.day =
        new Date(selectedDate)
            .toLocaleDateString(
                "en-US",
                {
                    weekday:"long"
                }
            );

    workout.duration =
        (Number(editWorkoutHours.value)||0)*60+
        (Number(editWorkoutMinutes.value)||0);

    workouts.sort((a,b)=>{

        const dateA =
            getWorkoutScheduledDate(a);

        const dateB =
            getWorkoutScheduledDate(b);

        return dateA-dateB;

    });

    saveWorkouts();

    refreshWorkouts();

    if(previousDate!==selectedDate){

        showToast(
            `Workout moved to ${new Date(selectedDate).toLocaleDateString()}`
        );

    }else{

        showToast(
            "Workout updated successfully."
        );

    }

    const editModal =
        document.getElementById(
            "editWorkoutModal"
        );

    if(editModal){

        const modal =
            bootstrap.Modal.getInstance(editModal);

        if(modal){

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

if (confirmReplaceWorkout) {

    confirmReplaceWorkout.addEventListener("click", () => {

        replaceWorkout();

    });

}