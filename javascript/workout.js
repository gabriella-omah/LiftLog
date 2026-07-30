// ========================================
// LiftLog — Workout Session Page
// javascript/workout.js
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

const params = new URLSearchParams(window.location.search);
const workoutId = Number(params.get("id"));

const exerciseResults = document.getElementById("exerciseResults");
const workoutExercises = document.getElementById("workoutExercises");
const exerciseSearch = document.getElementById("exerciseSearch");

const finishWorkoutBtn = document.getElementById("finishWorkoutBtn");
const workoutTitle = document.getElementById("workoutTitle");
const workoutInfo = document.getElementById("workoutInfo");
const workoutTimer = document.getElementById("workoutTimer");
const editWorkoutBtn = document.getElementById("editWorkoutBtn");
const saveWorkoutBtn = document.getElementById("saveWorkoutBtn");
const pauseResumeBtn = document.getElementById("pauseResumeBtn");
const pauseResumeIcon = document.getElementById("pauseResumeIcon");

/* =========================================================
   TIMER STATE
========================================================= */

let seconds = 0;
let timerInterval = null;
let isRunning = false;
let isPaused = false;

/* =========================================================
   DATE HELPERS (aligned with workouts.js)
========================================================= */

function startOfDay(date) {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}

function getStartOfWeek(date = new Date()) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

/*
  Prefer workout.scheduledDate when present.
  Otherwise map the day name to this week's calendar date.
*/
function getWorkoutScheduledDate(workout) {
    if (workout && workout.scheduledDate) {
        const date = new Date(workout.scheduledDate);
        if (!Number.isNaN(date.getTime())) {
            return startOfDay(date);
        }
    }

    // Fallback: use day name for current week
    if (workout && workout.day) {
        const dayIndex = days.indexOf(workout.day);
        if (dayIndex !== -1) {
            const start = getStartOfWeek();
            const mondayBased = dayIndex === 0 ? 6 : dayIndex - 1;
            const scheduled = new Date(start);
            scheduled.setDate(start.getDate() + mondayBased);
            return startOfDay(scheduled);
        }
    }

    return startOfDay(new Date());
}

function getWorkoutDaysAgo(workout) {
    const today = startOfDay(new Date());
    const scheduledDate = getWorkoutScheduledDate(workout);
    return Math.floor(
        (today.getTime() - scheduledDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );
}

/* =========================================================
   TOAST
========================================================= */

function showToast(message) {
    const toastMessage = document.getElementById("toastMessage");
    const toastElement = document.getElementById("exerciseToast");
    if (!toastMessage || !toastElement) return;

    toastMessage.textContent = message;
    bootstrap.Toast.getOrCreateInstance(toastElement).show();
}

/* =========================================================
   EXERCISE SEARCH / DISPLAY
========================================================= */

function displayExercises(list = exerciseLibrary) {
    if (!exerciseResults) return;

    exerciseResults.innerHTML = "";

    list.forEach(exercise => {
        exerciseResults.innerHTML += `
            <div class="card mb-2 exercise-card" data-id="${exercise.id}" style="cursor:pointer;">
                <div class="card-body">
                    <h5>${exercise.name}</h5>
                    <small>${exercise.muscle} • ${exercise.equipment}</small>
                </div>
            </div>
        `;
    });

    attachExerciseEvents();
}

function searchExercises() {
    if (!exerciseSearch) return;

    const keyword = exerciseSearch.value.toLowerCase().trim();

    const filtered = exerciseLibrary.filter(exercise =>
        exercise.name.toLowerCase().includes(keyword) ||
        exercise.muscle.toLowerCase().includes(keyword) ||
        exercise.equipment.toLowerCase().includes(keyword)
    );

    displayExercises(filtered);
}

/* =========================================================
   ADD EXERCISE
========================================================= */

function attachExerciseEvents() {
    const cards = document.querySelectorAll(".exercise-card");
    const workout = workouts.find(w => w.id === workoutId);

    if (!workout || workout.completed) return;

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const exerciseId = Number(card.dataset.id);
            const currentWorkout = workouts.find(w => w.id === workoutId);

            if (!currentWorkout) {
                showToast("Workout not found.");
                return;
            }

            if (currentWorkout.completed) {
                showToast("This workout has already been completed.");
                return;
            }

            const exercise = exerciseLibrary.find(e => e.id === exerciseId);

            if (!exercise) {
                showToast("Exercise not found.");
                return;
            }

            const alreadyAdded = currentWorkout.exercises.some(
                item => item.id === exercise.id
            );

            if (alreadyAdded) {
                showToast(`${exercise.name} is already in this workout.`);
                return;
            }

            currentWorkout.exercises.push({
                ...exercise,
                sets: "",
                reps: "",
                weight: "",
                notes: "",
                completed: false,
                volume: 0,
                calories: 0
            });

            currentWorkout.exerciseCount = currentWorkout.exercises.length;
            saveWorkouts();
            displayWorkoutExercises();
            updateWorkoutProgress();
            showToast(`${exercise.name} added successfully!`);

            const modalElement = document.getElementById("exerciseModal");
            if (modalElement) {
                bootstrap.Modal.getOrCreateInstance(modalElement).hide();
            }
        });
    });
}

/* =========================================================
   REMOVE EXERCISE
========================================================= */

function attachRemoveExerciseEvents() {
    document.querySelectorAll(".remove-exercise").forEach(button => {
        button.addEventListener("click", () => {
            const workout = workouts.find(w => w.id === workoutId);
            if (!workout) return;

            if (workout.completed) {
                showToast("Completed workouts cannot be edited.");
                return;
            }

            const exerciseId = Number(button.dataset.id);
            const exercise = workout.exercises.find(e => e.id === exerciseId);
            if (!exercise) return;

            openRemoveExerciseModal(workout, exercise);
        });
    });
}

function openRemoveExerciseModal(workout, exercise) {
    const modalElement = document.getElementById("removeExerciseModal");
    const nameElement = document.getElementById("removeExerciseName");
    const confirmButton = document.getElementById("confirmRemoveExerciseBtn");

    if (!modalElement || !nameElement || !confirmButton) return;

    nameElement.textContent = exercise.name;

    confirmButton.onclick = () => {
        if (workout.completed) {
            showToast("Completed workouts cannot be edited.");
            return;
        }

        workout.exercises = workout.exercises.filter(
            item => item.id !== exercise.id
        );
        workout.exerciseCount = workout.exercises.length;

        saveWorkouts();
        displayWorkoutExercises();
        updateWorkoutProgress();

        bootstrap.Modal.getOrCreateInstance(modalElement).hide();
        showToast("Exercise removed.");
    };

    bootstrap.Modal.getOrCreateInstance(modalElement).show();
}

/* =========================================================
   DISPLAY WORKOUT EXERCISES
========================================================= */

function displayWorkoutExercises() {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout || !workoutExercises) return;

    const isLocked = workout.completed;

    if (!Array.isArray(workout.exercises)) {
        workout.exercises = [];
    }

    if (workout.exercises.length === 0) {
        workoutExercises.innerHTML = `
            <div class="alert alert-light text-center">
                No exercises yet.
                <br>
                <span>Click <strong>Add Exercise</strong> to begin.</span>
            </div>
        `;
        return;
    }

    workoutExercises.innerHTML = "";

    workout.exercises.forEach(exercise => {
        workoutExercises.innerHTML += `
            <section class="card mb-3 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="form-check">
                            <input
                                class="form-check-input complete-input"
                                type="checkbox"
                                data-id="${exercise.id}"
                                ${exercise.completed ? "checked" : ""}
                                ${isLocked ? "disabled" : ""}
                            >
                            <label class="form-check-label">
                                <h5>${exercise.name}</h5>
                            </label>
                        </div>
                        <button
                            class="btn btn-outline-danger btn-sm remove-exercise"
                            data-id="${exercise.id}"
                            ${isLocked ? "disabled" : ""}
                        >
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>

                    <small>${exercise.muscle} • ${exercise.equipment}</small>

                    <div class="row mt-3">
                        <div class="col">
                            <label class="form-label">Sets</label>
                            <input
                                type="number"
                                class="form-control sets-input"
                                data-id="${exercise.id}"
                                value="${exercise.sets ?? ""}"
                                ${isLocked ? "disabled" : ""}
                            >
                        </div>
                        <div class="col">
                            <label class="form-label">Reps</label>
                            <input
                                type="text"
                                class="form-control reps-input"
                                data-id="${exercise.id}"
                                value="${exercise.reps ?? ""}"
                                ${isLocked ? "disabled" : ""}
                            >
                        </div>
                        <div class="col">
                            <label class="form-label">Weight</label>
                            <div class="input-group">
                                <input
                                    type="number"
                                    class="form-control weight-input"
                                    data-id="${exercise.id}"
                                    value="${exercise.weight ?? ""}"
                                    placeholder="0"
                                    ${isLocked ? "disabled" : ""}
                                >
                                <span class="input-group-text">${weightUnit}</span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3">
                        <label class="form-label">Notes</label>
                        <textarea
                            class="form-control notes-input"
                            rows="2"
                            data-id="${exercise.id}"
                            placeholder="Exercise notes..."
                            ${isLocked ? "disabled" : ""}
                        >${exercise.notes || ""}</textarea>
                    </div>
                </div>
            </section>
        `;
    });

    attachRemoveExerciseEvents();
    attachExerciseInputEvents();
    attachCompleteEvents();
}

/* =========================================================
   EXERCISE INPUTS
========================================================= */

function attachExerciseInputEvents() {
    document.querySelectorAll(".sets-input").forEach(input => {
        input.addEventListener("change", updateExercise);
    });
    document.querySelectorAll(".reps-input").forEach(input => {
        input.addEventListener("change", updateExercise);
    });
    document.querySelectorAll(".weight-input").forEach(input => {
        input.addEventListener("change", updateExercise);
    });
    document.querySelectorAll(".notes-input").forEach(input => {
        input.addEventListener("change", updateExercise);
    });
}

function updateExercise(event) {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout || workout.completed) return;

    const exercise = workout.exercises.find(
        e => e.id == event.target.dataset.id
    );
    if (!exercise) return;

    if (event.target.classList.contains("sets-input")) {
        exercise.sets = Number(event.target.value) || 0;
    }
    if (event.target.classList.contains("reps-input")) {
        exercise.reps = Number(event.target.value) || 0;
    }
    if (event.target.classList.contains("weight-input")) {
        exercise.weight = Number(event.target.value) || 0;
    }
    if (event.target.classList.contains("notes-input")) {
        exercise.notes = event.target.value.trim();
    }

    exercise.volume =
        (Number(exercise.sets) || 0) *
        (Number(exercise.reps) || 0) *
        (Number(exercise.weight) || 0);

    exercise.calories = Math.round(
        ((Number(exercise.sets) || 0) * (Number(exercise.reps) || 0)) * 0.5
    );

    const currentPR = Number(personalRecordsData[exercise.name]) || 0;
    const currentWeight = Number(exercise.weight) || 0;

    if (currentWeight > currentPR && currentWeight > 0) {
        personalRecordsData[exercise.name] = currentWeight;
        savePersonalRecords();
        showToast(`New PR! ${currentWeight}${weightUnit} on ${exercise.name}`);
    }

    saveWorkouts();
}

/* =========================================================
   EXERCISE COMPLETION
========================================================= */

function attachCompleteEvents() {
    document.querySelectorAll(".complete-input").forEach(input => {
        input.addEventListener("change", () => {
            const workout = workouts.find(w => w.id === workoutId);
            if (!workout || workout.completed) return;

            const exercise = workout.exercises.find(
                ex => ex.id == input.dataset.id
            );
            if (!exercise) return;

            exercise.completed = input.checked;
            saveWorkouts();
            updateWorkoutProgress();
        });
    });
}

/* =========================================================
   WORKOUT PROGRESS
========================================================= */

function updateWorkoutProgress() {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout) return;

    const completed = workout.exercises.filter(e => e.completed).length;
    const total = workout.exercises.length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressText) {
        progressText.textContent =
            `${completed}/${total} Exercises Completed • ${percent}%`;
    }
}

/* =========================================================
   WORKOUT HEADER
========================================================= */

function displayWorkoutHeader() {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout) return;

    if (workoutTitle) workoutTitle.textContent = workout.name;

    if (workoutInfo) {
        workoutInfo.innerHTML = `
            <div class="mb-2"><strong>${workout.day}</strong></div>
            <div class="mb-2">${workout.category} • ${workout.goal}</div>
            <span class="badge bg-success">${workout.difficulty}</span>
        `;
    }
}

/* =========================================================
   TIMER
========================================================= */

function renderTimer() {
    if (!workoutTimer) return;

    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    workoutTimer.textContent = `${hours}:${mins}:${secs}`;
}

function updateTimer() {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout || workout.completed || !isRunning) return;
    if (!workout.startTime) return;

    seconds = Math.floor((Date.now() - workout.startTime) / 1000);
    workout.durationSeconds = seconds;
    renderTimer();
    saveWorkouts();
}

function startWorkout() {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout) return;

    if (workout.completed) {
        showToast("This workout has already been completed.");
        return;
    }

    if (isPaused) {
        workout.startTime = Date.now() - (seconds * 1000);
    } else if (!workout.startTime) {
        workout.startTime = Date.now() - (seconds * 1000);
    }

    workout.isPaused = false;
    saveWorkouts();

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);

    isRunning = true;
    isPaused = false;

    if (pauseResumeIcon) {
        pauseResumeIcon.className = "bi bi-pause-fill";
    }
}

function pauseWorkout() {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout || workout.completed) return;

    clearInterval(timerInterval);
    timerInterval = null;

    if (workout.startTime) {
        seconds = Math.floor((Date.now() - workout.startTime) / 1000);
    }

    workout.durationSeconds = seconds;
    workout.isPaused = true;
    saveWorkouts();

    isRunning = false;
    isPaused = true;
    renderTimer();

    if (pauseResumeIcon) {
        pauseResumeIcon.className = "bi bi-play-fill";
    }
}

function initializeWorkoutTimer() {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout) return;

    seconds = Number(workout.durationSeconds) || 0;

    if (workout.completed) {
        isRunning = false;
        isPaused = false;
        renderTimer();
        return;
    }

    if (workout.isPaused) {
        isRunning = false;
        isPaused = true;
        renderTimer();
        if (pauseResumeIcon) pauseResumeIcon.className = "bi bi-play-fill";
        return;
    }

    if (workout.startTime) {
        seconds = Math.max(
            seconds,
            Math.floor((Date.now() - workout.startTime) / 1000)
        );
        isRunning = true;
        isPaused = false;
        renderTimer();

        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);

        if (pauseResumeIcon) pauseResumeIcon.className = "bi bi-pause-fill";
        return;
    }

    isRunning = false;
    isPaused = false;
    renderTimer();
    if (pauseResumeIcon) pauseResumeIcon.className = "bi bi-play-fill";
}

/* =========================================================
   TIMER BUTTON
========================================================= */

if (pauseResumeBtn) {
    pauseResumeBtn.addEventListener("click", () => {
        const workout = workouts.find(w => w.id === workoutId);
        if (!workout || workout.completed) return;

        if (isRunning) {
            pauseWorkout();
        } else {
            startWorkout();
        }
    });
}

/* =========================================================
   MIGRATE OLD EXERCISES
========================================================= */

function migrateWorkoutExercises() {
    let changed = false;

    workouts.forEach(workout => {
        if (!Array.isArray(workout.exercises)) {
            workout.exercises = [];
        }

        workout.exercises = workout.exercises.map(oldExercise => {
            if (oldExercise.id !== undefined) return oldExercise;

            const libraryExercise = exerciseLibrary.find(
                e => e.name === oldExercise.name
            );
            if (!libraryExercise) return oldExercise;

            changed = true;

            return {
                ...libraryExercise,
                sets: oldExercise.sets ?? "",
                reps: oldExercise.reps ?? "",
                weight: oldExercise.weight ?? "",
                notes: oldExercise.notes ?? "",
                completed: oldExercise.completed || false,
                volume: oldExercise.volume || 0,
                calories: oldExercise.calories || 0
            };
        });

        workout.exerciseCount = workout.exercises.length;
    });

    if (changed) saveWorkouts();
}

/* =========================================================
   WORKOUT SUMMARY
========================================================= */

function displayWorkoutSummary() {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout || !workout.summary) return;

    const card = document.getElementById("workoutSummaryCard");
    const content = document.getElementById("workoutSummaryContent");
    if (!card || !content) return;

    card.classList.remove("d-none");

    content.innerHTML = `
        <div class="row text-center g-4">
            <div class="col-6">
                <h4>${workout.summary.duration}</h4>
                <small>Duration</small>
            </div>
            <div class="col-6">
                <h4>${workout.summary.completedExercises} / ${workout.summary.totalExercises}</h4>
                <small>Exercises</small>
            </div>
            <div class="col-6">
                <h4>${workout.summary.calories}</h4>
                <small>Calories Burned</small>
            </div>
            <div class="col-6">
                <h4>${Number(workout.summary.volume || 0).toLocaleString()} ${weightUnit}</h4>
                <small>Total Volume</small>
            </div>
            <div class="col-6">
                <h4>${workout.summary.prs}</h4>
                <small>New PRs</small>
            </div>
            <div class="col-6">
                <h4>${workout.summary.streak ?? 0}</h4>
                <small>Workout Streak</small>
            </div>
            <div class="col-12">
                <hr>
                <p class="mb-0">
                    Completed<br>
                    <strong>
                        ${new Date(
                            workout.summary.loggedDate ||
                            workout.summary.completedDate
                        ).toLocaleString()}
                    </strong>
                </p>
            </div>
        </div>
    `;
}

/* =========================================================
   LOCK COMPLETED WORKOUT
========================================================= */

function lockCompletedWorkout() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    isPaused = false;

    if (finishWorkoutBtn) {
        finishWorkoutBtn.disabled = true;
        finishWorkoutBtn.textContent = "Workout Completed";
    }
    if (pauseResumeBtn) pauseResumeBtn.disabled = true;
    if (editWorkoutBtn) editWorkoutBtn.disabled = true;
    if (pauseResumeIcon) pauseResumeIcon.className = "bi bi-check-circle-fill";

    document.querySelectorAll(
        ".sets-input, .reps-input, .weight-input, .notes-input, .complete-input, .remove-exercise"
    ).forEach(el => {
        el.disabled = true;
    });

    const addExerciseButton = document.querySelector(
        '[data-bs-target="#exerciseModal"]'
    );
    if (addExerciseButton) {
        addExerciseButton.disabled = true;
        addExerciseButton.classList.add("disabled");
        addExerciseButton.removeAttribute("data-bs-toggle");
        addExerciseButton.removeAttribute("data-bs-target");
    }
}

/* =========================================================
   FINISH / LOG WORKOUT
========================================================= */

function finishWorkout() {
    const workout = workouts.find(w => w.id === workoutId);

    if (!workout) {
        showToast("Workout not found.");
        return;
    }

    if (workout.completed) {
        showToast("This workout has already been completed.");
        lockCompletedWorkout();
        return;
    }

    const today = startOfDay(new Date());
    const scheduledDate = getWorkoutScheduledDate(workout);
    const daysAgo = Math.floor(
        (today.getTime() - scheduledDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const isMissedWorkout = daysAgo > 0;

    if (daysAgo < 0) {
        showToast("This workout is scheduled for a future date.");
        return;
    }

    if (daysAgo > 7) {
        showToast("You can only log workouts from the last 7 days.");
        return;
    }

    // Today's workout must be started first
    if (!isMissedWorkout && !workout.startTime && !isRunning && !isPaused) {
        showToast("Start the workout before finishing it.");
        return;
    }

    clearInterval(timerInterval);
    timerInterval = null;

    if (isMissedWorkout && !workout.startTime) {
        seconds = 0;
    } else if (workout.startTime && !isPaused) {
        seconds = Math.floor((Date.now() - workout.startTime) / 1000);
    }

    isRunning = false;
    isPaused = false;
    workout.durationSeconds = seconds;

    // Calculate totals
    let completedExercises = 0;
    let totalVolume = 0;
    let totalCalories = 0;
    let prCount = 0;

    workout.exercises.forEach(exercise => {
        if (exercise.completed) completedExercises++;

        const sets = Number(exercise.sets) || 0;
        const reps = Number(exercise.reps) || 0;
        const weight = Number(exercise.weight) || 0;

        totalVolume += sets * reps * weight;
        totalCalories += Math.round(sets * reps * 0.5);

        const currentPR = Number(personalRecordsData[exercise.name]) || 0;
        if (weight > currentPR && weight > 0) {
            personalRecordsData[exercise.name] = weight;
            prCount++;
        }
    });

    savePersonalRecords();

    const timerCalories = Math.round((seconds / 60) * 8);
    totalCalories += timerCalories;

    const distance = (seconds / 60) * 0.06;
    const pace = distance > 0 ? ((seconds / 60) / distance).toFixed(1) : 0;

    const now = new Date();

    workout.completed = true;
    workout.scheduledDate = scheduledDate.toISOString();
    workout.loggedDate = now.toISOString();
    workout.completedDate = now.toISOString();
    workout.durationSeconds = seconds;
    workout.startTime = null;
    workout.isPaused = false;

    if (!Array.isArray(workout.completionHistory)) {
        workout.completionHistory = [];
    }

    workout.completionHistory.push({
        scheduledDate: workout.scheduledDate,
        loggedDate: workout.loggedDate,
        durationSeconds: seconds
    });

    localStorage.setItem(
        "caloriesBurned",
        (Number(localStorage.getItem("caloriesBurned")) || 0) + totalCalories
    );
    localStorage.setItem(
        "totalWeight",
        (Number(localStorage.getItem("totalWeight")) || 0) + totalVolume
    );

    const streakValue =
        typeof streak !== "undefined" ? streak : 0;

    workout.summary = {
        duration: workoutTimer ? workoutTimer.textContent : "00:00:00",
        completedExercises,
        totalExercises: workout.exercises.length,
        calories: totalCalories,
        volume: totalVolume,
        prs: prCount,
        distance: distance.toFixed(2),
        pace,
        streak: streakValue,
        scheduledDate: workout.scheduledDate,
        loggedDate: workout.loggedDate,
        completedDate: workout.completedDate
    };

    saveWorkouts();

    displayWorkoutSummary();
    displayWorkoutExercises();
    updateWorkoutProgress();
    updateFinishWorkoutButton();
    lockCompletedWorkout();

    const summaryElement = document.getElementById("workoutSummary");
    if (summaryElement) {
        summaryElement.innerHTML = `
            <h3 class="text-success text-center mb-4">Workout Complete</h3>

            ${
                isMissedWorkout
                    ? `
                        <div class="alert alert-info text-center">
                            <i class="bi bi-calendar-check"></i>
                            Workout logged for
                            <strong>${scheduledDate.toLocaleDateString()}</strong>
                        </div>
                    `
                    : `
                        <div class="alert alert-success text-center">
                            <i class="bi bi-check-circle"></i>
                            Today's workout has been completed.
                        </div>
                    `
            }

            <div class="row text-center g-3">
                <div class="col-6">
                    <h4>${completedExercises}/${workout.exercises.length}</h4>
                    <small>Exercises</small>
                </div>
                <div class="col-6">
                    <h4>${workoutTimer ? workoutTimer.textContent : "00:00:00"}</h4>
                    <small>Duration</small>
                </div>
                <div class="col-6">
                    <h4>${totalCalories}</h4>
                    <small>Calories</small>
                </div>
                <div class="col-6">
                    <h4>${distance.toFixed(2)} km</h4>
                    <small>Distance</small>
                </div>
                <div class="col-6">
                    <h4>${totalVolume.toLocaleString()} ${weightUnit}</h4>
                    <small>Total Volume</small>
                </div>
                <div class="col-6">
                    <h4>${prCount}</h4>
                    <small>New PRs</small>
                </div>
            </div>
            <hr>
            <p class="text-center mt-3">
                Great work! Keep showing up consistently.
            </p>
        `;

        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("finishWorkoutModal")
        ).show();
    }
}

/* =========================================================
   FINISH BUTTON STATE
========================================================= */

function updateFinishWorkoutButton() {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout || !finishWorkoutBtn) return;

    if (workout.completed) {
        finishWorkoutBtn.disabled = true;
        finishWorkoutBtn.textContent = "Workout Completed";
        return;
    }

    const daysAgo = getWorkoutDaysAgo(workout);

    if (daysAgo < 0) {
        finishWorkoutBtn.disabled = true;
        finishWorkoutBtn.textContent = "Workout Scheduled Later";
        return;
    }

    if (daysAgo === 0) {
        finishWorkoutBtn.disabled = false;
        finishWorkoutBtn.textContent = "Finish Workout";
        return;
    }

    if (daysAgo > 0 && daysAgo <= 7) {
        finishWorkoutBtn.disabled = false;
        finishWorkoutBtn.textContent = "Log Previous Workout";
        return;
    }

    finishWorkoutBtn.disabled = true;
    finishWorkoutBtn.textContent = "Workout Too Old";
}

/* =========================================================
   EDIT WORKOUT
========================================================= */

function openEditWorkout() {
    const workout = workouts.find(w => w.id === workoutId);

    if (!workout) {
        showToast("Workout not found.");
        return;
    }

    if (workout.completed) {
        showToast("Completed workouts cannot be edited.");
        return;
    }

    document.getElementById("editWorkoutName").value = workout.name;
    document.getElementById("editWorkoutDay").value = workout.day;
    document.getElementById("editWorkoutCategory").value = workout.category;
    document.getElementById("editWorkoutGoal").value = workout.goal;
    document.getElementById("editWorkoutDifficulty").value = workout.difficulty;

    bootstrap.Modal.getOrCreateInstance(
        document.getElementById("editWorkoutModal")
    ).show();
}

function saveWorkoutChanges() {
    const workout = workouts.find(w => w.id === workoutId);

    if (!workout) {
        showToast("Workout not found.");
        return;
    }

    if (workout.completed) {
        showToast("Completed workouts cannot be edited.");
        return;
    }

    const name = document.getElementById("editWorkoutName").value.trim();

    if (!name) {
        showToast("Workout name cannot be empty.");
        document.getElementById("editWorkoutName").focus();
        return;
    }

    workout.name = name;
    workout.day = document.getElementById("editWorkoutDay").value;
    workout.category = document.getElementById("editWorkoutCategory").value;
    workout.goal = document.getElementById("editWorkoutGoal").value;
    workout.difficulty = document.getElementById("editWorkoutDifficulty").value;

    // Keep scheduledDate in sync with the chosen day
    const dayIndex = days.indexOf(workout.day);
    if (dayIndex !== -1) {
        const start = getStartOfWeek();
        const mondayBased = dayIndex === 0 ? 6 : dayIndex - 1;
        const scheduled = new Date(start);
        scheduled.setDate(start.getDate() + mondayBased);
        workout.scheduledDate = startOfDay(scheduled).toISOString();
    }

    saveWorkouts();
    displayWorkoutHeader();
    updateFinishWorkoutButton();

    bootstrap.Modal.getOrCreateInstance(
        document.getElementById("editWorkoutModal")
    ).hide();

    showToast("Workout updated successfully!");
}

/* =========================================================
   EVENT LISTENERS
========================================================= */

if (exerciseSearch) {
    exerciseSearch.addEventListener("input", searchExercises);
}

if (finishWorkoutBtn) {
    finishWorkoutBtn.addEventListener("click", finishWorkout);
}

if (editWorkoutBtn) {
    editWorkoutBtn.addEventListener("click", openEditWorkout);
}

if (saveWorkoutBtn) {
    saveWorkoutBtn.addEventListener("click", saveWorkoutChanges);
}

window.addEventListener("beforeunload", () => {
    clearInterval(timerInterval);
});

/* =========================================================
   INITIALIZATION
========================================================= */

const workout = workouts.find(w => w.id === workoutId);

if (!workout) {
    showToast("Workout not found.");
}

migrateWorkoutExercises();
displayWorkoutHeader();
displayExercises();
displayWorkoutExercises();
updateWorkoutProgress();

if (workout) {
    initializeWorkoutTimer();
}

if (workout && workout.completed) {
    lockCompletedWorkout();
    displayWorkoutSummary();
}

if (workout) {
    updateFinishWorkoutButton();
}