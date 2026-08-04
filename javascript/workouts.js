// ========================================
// LiftLog — Workouts Page
// javascript/workouts.js
// ========================================

// ========================================
// DOM Elements
// ========================================

let workoutToDelete = null;
let currentWorkoutId = null;
let workoutToReplace = null;
let pendingWorkout = null;

const workoutList = document.getElementById("workoutList");
const workoutName = document.getElementById("workoutName");
const workoutDay = document.getElementById("workoutDay");
const workoutDate = document.getElementById("workoutDate");
const workoutHours = document.getElementById("workoutHours");
const workoutMinutes = document.getElementById("workoutMinutes");
const workoutCategory = document.getElementById("workoutCategory");
const workoutGoal = document.getElementById("workoutGoal");
const workoutDifficulty = document.getElementById("workoutDifficulty");
const addWorkoutBtn = document.getElementById("addWorkoutBtn");
const searchWorkout = document.getElementById("searchWorkout");
const confirmDeleteWorkout = document.getElementById("confirmDeleteWorkout");
const editWorkoutName = document.getElementById("editWorkoutName");
const editWorkoutDay = document.getElementById("editWorkoutDay");
const editWorkoutHours = document.getElementById("editWorkoutHours");
const editWorkoutMinutes = document.getElementById("editWorkoutMinutes");
const saveWorkoutChanges = document.getElementById("saveWorkoutChanges");
const confirmReplaceWorkout = document.getElementById("confirmReplaceWorkout");

// ========================================
// Helpers
// ========================================

function getDifficultyBadge(difficulty) {
    switch (difficulty) {
        case "Beginner":
            return `<span class="badge bg-success">🟢 Beginner</span>`;
        case "Intermediate":
            return `<span class="badge bg-warning text-dark">🟡 Intermediate</span>`;
        case "Advanced":
            return `<span class="badge bg-danger">🔴 Advanced</span>`;
        default:
            return "";
    }
}

function formatWorkoutDuration(minutes) {
    minutes = Number(minutes) || 0;

    if (minutes >= 60) {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins === 0 ? `${hrs} hr` : `${hrs} hr ${mins} min`;
    }

    return `${minutes} min`;
}

// ========================================
// Workout Status
// ========================================

function getWorkoutStatus(workout) {
    if (workout.completed === true) {
        return {
            status: `<i class="bi bi-check-circle-fill"></i> Completed`,
            statusClass: "status-completed",
            buttonText: "View Workout"
        };
    }

    const scheduled = getWorkoutScheduledDate(workout);

    if (!scheduled) {
        return {
            status: `<i class="bi bi-question-circle"></i> Unscheduled`,
            statusClass: "status-upcoming",
            buttonText: "Open Workout"
        };
    }

    if (isWorkoutToday(workout)) {
        return {
            status: `<i class="bi bi-lightning-charge-fill"></i> Today`,
            statusClass: "status-today",
            buttonText: workout.startTime ? "Continue Workout" : "Open Workout"
        };
    }

    if (isWorkoutFuture(workout)) {
        return {
            status: `<i class="bi bi-calendar-event"></i> Upcoming`,
            statusClass: "status-upcoming",
            buttonText: "View Workout"
        };
    }

    return {
        status: `<i class="bi bi-x-circle-fill"></i> Missed`,
        statusClass: "status-missed",
        buttonText: "Log Previous Workout"
    };
}

// ========================================
// Week Label
// ========================================

function getWeekLabel(date) {
    const today = getToday();
    const thisWeek = getStartOfWeek(today);

    const nextWeek = new Date(thisWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const workoutWeek = getStartOfWeek(date);

    if (workoutWeek.getTime() === thisWeek.getTime()) {
        return "This Week";
    }

    if (workoutWeek.getTime() === nextWeek.getTime()) {
        return "Next Week";
    }

    const end = new Date(workoutWeek);
    end.setDate(end.getDate() + 6);

    return `${workoutWeek.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
    })} – ${end.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
    })}`;
}

// ========================================
// Display Workouts
// ========================================

function displayWorkouts(list = workouts) {
    if (!workoutList) return;

    workoutList.innerHTML = "";

    const sortedWorkouts = [...list].sort((a, b) => {
        const dateA = getWorkoutScheduledDate(a);
        const dateB = getWorkoutScheduledDate(b);

        if (dateA && dateB) return dateA - dateB;
        return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    });

    if (sortedWorkouts.length === 0) {
        workoutList.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-barbell display-1 text-success"></i>
                <h3 class="mt-4">No workouts yet</h3>
                <p>Create your first workout to begin tracking your progress.</p>
            </div>
        `;
        return;
    }

    let currentSection = "";

    sortedWorkouts.forEach(workout => {
        const { status, statusClass, buttonText } = getWorkoutStatus(workout);
        const scheduledDate = getWorkoutScheduledDate(workout);
        const weekLabel = scheduledDate ? getWeekLabel(scheduledDate) : "Other";

        if (weekLabel !== currentSection) {
            currentSection = weekLabel;
            workoutList.innerHTML += `
                <div class="mt-4 mb-3">
                    <h4 class="fw-bold text-success">${weekLabel}</h4>
                    <hr>
                </div>
            `;
        }

        const scheduledText = scheduledDate
            ? scheduledDate.toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric"
              })
            : workout.day;

        const category = workout.category || "";
        const categoryClass = category.toLowerCase().replace(/\s+/g, "-");
        const exerciseCount = Array.isArray(workout.exercises)
            ? workout.exercises.length
            : Number(workout.exerciseCount) || 0;

        const editButton = workout.completed
            ? `<button class="btn btn-outline-secondary" disabled>
                   <i class="bi bi-lock-fill"></i> Edit Workout
               </button>`
            : `<button class="btn btn-outline-success edit-btn" data-id="${workout.id}">
                   <i class="bi bi-pencil"></i> Edit Workout
               </button>`;

        workoutList.innerHTML += `
            <section class="card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h3 class="workout-title">${workout.name || "Workout"}</h3>
                            <p class="text-muted mb-0">
                                <i class="bi bi-calendar3"></i> ${scheduledText}
                            </p>
                        </div>
                        <span class="${statusClass}">${status}</span>
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
                        ${category ? `<span class="workout-category category-${categoryClass}">${category}</span>` : ""}
                        ${workout.goal ? `<span class="workout-goal">${workout.goal}</span>` : ""}
                    </div>

                    <div class="d-grid gap-2">
                        <a href="workout.html?id=${workout.id}" class="btn btn-success">
                            ${buttonText}
                        </a>
                        ${editButton}
                        <button class="btn btn-outline-danger delete-btn" data-id="${workout.id}">
                            <i class="bi bi-trash"></i> Delete Workout
                        </button>
                    </div>
                </div>
            </section>
        `;
    });
}

// ========================================
// Replace Workout
// ========================================

function showReplaceWorkoutModal(existingWorkout, newWorkout) {
    workoutToReplace = existingWorkout;
    pendingWorkout = newWorkout;

    document.getElementById("existingWorkoutName").textContent = existingWorkout.name;
    document.getElementById("existingWorkoutDate").textContent =
        getWorkoutScheduledDate(existingWorkout).toLocaleDateString();

    new bootstrap.Modal(document.getElementById("replaceWorkoutModal")).show();
}

function replaceWorkout() {
    if (!workoutToReplace || !pendingWorkout) return;

    workouts = workouts.filter(w => w.id !== workoutToReplace.id);

    const existingIndex = workouts.findIndex(w => w.id === pendingWorkout.id);

    if (existingIndex >= 0) {
        workouts[existingIndex] = pendingWorkout;
    } else {
        workouts.push(pendingWorkout);
    }

    workouts.sort((a, b) => getWorkoutScheduledDate(a) - getWorkoutScheduledDate(b));

    saveWorkouts();
    refreshWorkouts();

    const replaceModal = bootstrap.Modal.getInstance(document.getElementById("replaceWorkoutModal"));
    if (replaceModal) replaceModal.hide();

    const editModal = document.getElementById("editWorkoutModal");
    if (editModal) {
        const modal = bootstrap.Modal.getInstance(editModal);
        if (modal) modal.hide();
    }

    const addModal = document.getElementById("newWorkoutModal");
    if (addModal) {
        const modal = bootstrap.Modal.getInstance(addModal);
        if (modal) modal.hide();
    }

    workoutToReplace = null;
    pendingWorkout = null;

    showToast("Workout replaced successfully!", "success");
}

// ========================================
// Add Workout
// ========================================

function addWorkout() {
    const name = workoutName.value.trim();
    if (!name) {
        showToast("Please enter a workout name.", "warning");
        return;
    }

    const selectedDate = workoutDate.value;
    if (!selectedDate) {
        showToast("Please select a workout date.", "warning");
        return;
    }

    const scheduled = parseLocalDate(selectedDate);
    const day = scheduled.toLocaleDateString("en-US", { weekday: "long" });

    const newWorkout = {
        id: Date.now(),
        name,
        day,
        scheduledDate: selectedDate,
        exercises: [],
        exerciseCount: 0,
        duration: (Number(workoutHours.value) || 0) * 60 + (Number(workoutMinutes.value) || 0),
        category: workoutCategory.value,
        goal: workoutGoal.value,
        difficulty: workoutDifficulty.value,
        completed: false,
        completedDate: null,
        startTime: null
    };

    const existingWorkout = workouts.find(
        w => w.scheduledDate && w.scheduledDate.slice(0, 10) === selectedDate
    );

    if (existingWorkout) {
        showReplaceWorkoutModal(existingWorkout, newWorkout);
        return;
    }

    workouts.push(newWorkout);
    workouts.sort((a, b) => getWorkoutScheduledDate(a) - getWorkoutScheduledDate(b));

    saveWorkouts();
    refreshWorkouts();

    const newWorkoutModal = document.getElementById("newWorkoutModal");
    if (newWorkoutModal) {
        const modal = bootstrap.Modal.getInstance(newWorkoutModal);
        if (modal) modal.hide();
    }

    // Reset form
    workoutName.value = "";
    workoutDate.value = "";
    workoutHours.value = "";
    workoutMinutes.value = "";
    workoutCategory.selectedIndex = 0;
    workoutGoal.selectedIndex = 0;
    workoutDifficulty.selectedIndex = 0;
}

// ========================================
// Search & Refresh
// ========================================

function searchWorkouts() {
    const filtered = searchData({
        data: workouts,
        query: searchWorkout.value,
        fields: ["name", "category", "goal", "day", "difficulty"]
    });

    displayWorkouts(filtered);
    attachEditEvents();
    attachDeleteEvents();
}

function refreshWorkouts() {
    if (!workoutList) return;

    displayWorkouts();
    attachEditEvents();
    attachDeleteEvents();
    saveWorkouts();

    // Scroll to today's workout
    const todayCard = document.querySelector(".status-today");
    if (todayCard) {
        const card = todayCard.closest(".card");
        if (card) {
            setTimeout(() => {
                card.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
        }
    }
}

// ========================================
// Delete
// ========================================

function attachDeleteEvents() {
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", () => {
            workoutToDelete = Number(button.dataset.id);

            const workout = workouts.find(w => w.id === workoutToDelete);
            if (!workout) return;

            const deleteWorkoutName = document.getElementById("deleteWorkoutName");
            if (deleteWorkoutName) {
                deleteWorkoutName.textContent = workout.name;
            }

            const deleteModal = document.getElementById("deleteWorkoutModal");
            if (deleteModal) {
                new bootstrap.Modal(deleteModal).show();
            }
        });
    });
}

if (confirmDeleteWorkout) {
    confirmDeleteWorkout.addEventListener("click", () => {
        if (workoutToDelete === null) return;

        workouts = workouts.filter(w => w.id !== workoutToDelete);
        workoutToDelete = null;

        saveWorkouts();
        refreshWorkouts();

        const deleteModal = document.getElementById("deleteWorkoutModal");
        if (deleteModal) {
            const modal = bootstrap.Modal.getInstance(deleteModal);
            if (modal) modal.hide();
        }
    });
}

// ========================================
// Edit Workout
// ========================================

function editWorkout(id) {
    const workout = workouts.find(w => w.id == id);
    if (!workout || workout.completed) return;

    currentWorkoutId = workout.id;

    editWorkoutName.value = workout.name || "";
    editWorkoutDay.value = workout.scheduledDate
        ? workout.scheduledDate.slice(0, 10)
        : "";

    editWorkoutHours.value = Math.floor((workout.duration || 0) / 60);
    editWorkoutMinutes.value = (workout.duration || 0) % 60;

    const editModal = document.getElementById("editWorkoutModal");
    if (editModal) {
        new bootstrap.Modal(editModal).show();
    }
}

function saveWorkout() {
    const workout = workouts.find(w => w.id == currentWorkoutId);
    if (!workout) return;

    const newName = editWorkoutName.value.trim();
    if (newName) workout.name = newName;

    const selectedDate = editWorkoutDay.value;
    if (!selectedDate) {
        showToast("Please select a workout date.", "warning");
        return;
    }

    const existingWorkout = workouts.find(
        w =>
            w.id !== workout.id &&
            w.scheduledDate &&
            w.scheduledDate.slice(0, 10) === selectedDate
    );

    if (existingWorkout) {
        workoutToReplace = existingWorkout;
        pendingWorkout = {
            ...workout,
            name: workout.name,
            scheduledDate: selectedDate,
            day: new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" }),
            duration:
                (Number(editWorkoutHours.value) || 0) * 60 +
                (Number(editWorkoutMinutes.value) || 0)
        };

        document.getElementById("existingWorkoutName").textContent = existingWorkout.name;
        document.getElementById("existingWorkoutDate").textContent =
            getWorkoutScheduledDate(existingWorkout).toLocaleDateString();

        new bootstrap.Modal(document.getElementById("replaceWorkoutModal")).show();
        return;
    }

    const previousDate = workout.scheduledDate
        ? workout.scheduledDate.slice(0, 10)
        : "";

    workout.scheduledDate = selectedDate;
    workout.day = new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long"
    });
    workout.duration =
        (Number(editWorkoutHours.value) || 0) * 60 +
        (Number(editWorkoutMinutes.value) || 0);

    workouts.sort((a, b) => getWorkoutScheduledDate(a) - getWorkoutScheduledDate(b));

    saveWorkouts();
    refreshWorkouts();

    if (previousDate !== selectedDate) {
        showToast(`Workout moved to ${new Date(selectedDate).toLocaleDateString()}`, "success");
    } else {
        showToast("Workout updated successfully.", "success");
    }

    const editModal = document.getElementById("editWorkoutModal");
    if (editModal) {
        const modal = bootstrap.Modal.getInstance(editModal);
        if (modal) modal.hide();
    }
}

function attachEditEvents() {
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", () => {
            if (button.disabled) return;
            editWorkout(button.dataset.id);
        });
    });
}

// ========================================
// Remove Stale Recommended Workouts
// ========================================

function removeStaleRecommendedWorkouts() {
    const currentWeekStart = getStartOfWeek();
    const beforeCount = workouts.length;

    workouts = workouts.filter(workout => {
        if (workout.source !== "recommended") return true;
        if (workout.completed === true) return true;

        const scheduledDate = getWorkoutScheduledDate(workout);
        if (!scheduledDate) return false;

        return scheduledDate >= currentWeekStart;
    });

    if (workouts.length !== beforeCount) {
        saveWorkouts();
    }
}

// ========================================
// Event Listeners
// ========================================

if (addWorkoutBtn) {
    addWorkoutBtn.addEventListener("click", addWorkout);
}

if (saveWorkoutChanges) {
    saveWorkoutChanges.addEventListener("click", saveWorkout);
}

if (searchWorkout) {
    searchWorkout.addEventListener("input", searchWorkouts);
}

if (confirmReplaceWorkout) {
    confirmReplaceWorkout.addEventListener("click", replaceWorkout);
}

// ========================================
// Recommended Plan
// ========================================

const recommendedPlanBtn = document.getElementById("recommendedPlanBtn");

if (recommendedPlanBtn) {
    recommendedPlanBtn.addEventListener("click", () => {
        const welcomeModal = document.getElementById("welcomeWorkoutModal");
        if (welcomeModal) {
            const modal = bootstrap.Modal.getInstance(welcomeModal);
            if (modal) modal.hide();
        }

        const goalModal = document.getElementById("goalModal");
        if (goalModal) {
            new bootstrap.Modal(goalModal).show();
        }
    });
}

document.querySelectorAll(".goal-btn").forEach(button => {
    button.addEventListener("click", () => {
        const goal = button.dataset.goal;
        const selectedPlan = workoutPlans[goal];
        if (!selectedPlan) return;

        const today = getToday();

        removeStaleRecommendedWorkouts();

        Object.entries(selectedPlan.days).forEach(([day, plan]) => {
            // Skip rest days
            if (!plan.exercises || plan.exercises.length === 0) return;

            const scheduled = getScheduledDateForDay(day, today);
            if (!scheduled || scheduled < today) return;

            const exercises = getWorkoutExercises(plan.exercises, exerciseLibrary)
                .filter(Boolean)
                .map(exercise => ({
                    ...exercise,
                    sets: exercise.sets || 3,
                    reps: exercise.reps || 10,
                    weight: "",
                    notes: "",
                    completed: false
                }));

            // Prevent duplicates on the same day
            const alreadyExists = workouts.some(workout => {
                if (workout.source !== "recommended") return false;
                const existingDate = getWorkoutScheduledDate(workout);
                return existingDate && existingDate.getTime() === scheduled.getTime();
            });

            if (alreadyExists) return;

            workouts.push({
                id: Date.now() + Math.random(),
                name: plan.title,
                day,
                scheduledDate: scheduled.toLocaleDateString("en-CA"),
                source: "recommended",
                weekStart: getStartOfWeek(today).toISOString(),
                exercises,
                exerciseCount: exercises.length,
                duration: 60,
                category: plan.title,
                goal: selectedPlan.title,
                difficulty: "Intermediate",
                completed: false,
                completedDate: null,
                startTime: null
            });
        });

        saveWorkouts();
        localStorage.setItem("recommendedPlanUsed", "true");

        const goalModal = document.getElementById("goalModal");
        if (goalModal) {
            const modal = bootstrap.Modal.getInstance(goalModal);
            if (modal) modal.hide();
        }

        refreshWorkouts();
    });
});

// ========================================
// Initialize
// ========================================

removeStaleRecommendedWorkouts();
refreshWorkouts();

// Welcome modal for first-time users
if (workouts.length === 0 && !localStorage.getItem("recommendedPlanUsed")) {
    const welcomeModal = document.getElementById("welcomeWorkoutModal");
    if (welcomeModal) {
        new bootstrap.Modal(welcomeModal).show();
    }
}

// Scroll to today's workout after a short delay
setTimeout(() => {
    const todayCard = document.querySelector(".status-today");
    if (todayCard) {
        const card = todayCard.closest(".card");
        if (card) {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
}, 150);