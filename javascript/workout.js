// ========================================
// LiftLog — Workout Session Page
// javascript/workout.js
// ========================================

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
let isRunning = false;
let isPaused = false;
let timerInterval = null;
let userHasInteracted = false;

document.addEventListener("pointerdown", () => {
    userHasInteracted = true;
}, { once: true });

document.addEventListener("keydown", () => {
    userHasInteracted = true;
}, { once: true });

/* =========================================================
   HELPERS
========================================================= */

function getWorkoutDaysAgo(workout) {
    const today = getToday();
    const scheduledDate = getWorkoutScheduledDate(workout);
    if (!scheduledDate) return 0;

    return Math.floor(
        (today.getTime() - scheduledDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );
}

function showToast(message) {
    const toastMessage = document.getElementById("toastMessage");
    const toastElement = document.getElementById("exerciseToast");
    if (!toastMessage || !toastElement) return;

    toastMessage.textContent = message;
    bootstrap.Toast.getOrCreateInstance(toastElement).show();
}

/* =========================================================
   EXERCISE INFORMATION MODAL
========================================================= */

function openExerciseInfo(exerciseId) {
    const exercise = exerciseLibrary.find(e => e.id === Number(exerciseId));
    if (!exercise) {
        showToast("Exercise not found.");
        return;
    }

    const modalBody = document.getElementById("exerciseInfoContent") ||
                      document.getElementById("exerciseInfoBody");

    if (!modalBody) return;

    modalBody.innerHTML = `
        <h3 class="mb-3">${exercise.name}</h3>

        <div class="row mb-3">
            <div class="col-md-6">
                <strong>Muscle</strong><br>
                ${exercise.muscle}
            </div>
            <div class="col-md-6">
                <strong>Body Part</strong><br>
                ${
                    exercise.bodyMap
                        ? `<img src="${exercise.bodyMap}" class="img-fluid rounded border mt-2" style="max-height:220px;">`
                        : "N/A"
                }
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-md-4">
                <strong>Type</strong><br>
                ${exercise.type}
            </div>
            <div class="col-md-4">
                <strong>Difficulty</strong><br>
                ${exercise.difficulty}
            </div>
            <div class="col-md-4">
                <strong>Equipment</strong><br>
                ${exercise.equipment}
            </div>
        </div>

        ${
            exercise.images?.length
                ? `
                <hr>
                <h5 class="mb-3">Exercise Movement</h5>
                <div class="d-flex justify-content-center align-items-center gap-3 flex-wrap">
                    <img src="${exercise.images[0]}" class="img-fluid rounded border" style="max-height:220px;">
                    ${exercise.images.length > 1 ? `<i class="bi bi-arrow-right fs-1"></i>` : ""}
                    ${exercise.images[1] ? `<img src="${exercise.images[1]}" class="img-fluid rounded border" style="max-height:220px;">` : ""}
                </div>
                `
                : ""
        }

        <hr>
        <h5>How to Perform</h5>
        <ol>
            ${(exercise.instructions || []).map(step => `<li>${step}</li>`).join("")}
        </ol>

        <hr>
        <h5>Tips</h5>
        <ul>
            ${(exercise.tips || []).map(tip => `<li>${tip}</li>`).join("")}
        </ul>

        <hr>
        <h5>Common Mistakes</h5>
        <ul>
            ${(exercise.mistakes || []).map(item => `<li>${item}</li>`).join("")}
        </ul>
    `;

    const modalEl = document.getElementById("exerciseInfoModal");
    if (modalEl) {
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
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
   ADD / REMOVE EXERCISE
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

            const alreadyAdded = currentWorkout.exercises.some(item => item.id === exercise.id);
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

        workout.exercises = workout.exercises.filter(item => item.id !== exercise.id);
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
                No exercises yet.<br>
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
                    <div class="text-end">
                        <button class="btn btn-link exercise-info-btn" data-id="${exercise.id}" title="Exercise information">
                            <i class="bi bi-info-circle fs-5"></i>
                        </button>
                    </div>

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
                            <input type="number" class="form-control sets-input" data-id="${exercise.id}"
                                value="${exercise.sets ?? ""}" ${isLocked ? "disabled" : ""}>
                        </div>
                        <div class="col">
                            <label class="form-label">Reps</label>
                            <input type="text" class="form-control reps-input" data-id="${exercise.id}"
                                value="${exercise.reps ?? ""}" ${isLocked ? "disabled" : ""}>
                        </div>
                        <div class="col">
                            <label class="form-label">Weight</label>
                            <div class="input-group">
                                <input type="number" class="form-control weight-input" data-id="${exercise.id}"
                                    value="${exercise.weight ?? ""}" placeholder="0" ${isLocked ? "disabled" : ""}>
                                <span class="input-group-text">${weightUnit}</span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3">
                        <label class="form-label">Notes</label>
                        <textarea class="form-control notes-input" rows="2" data-id="${exercise.id}"
                            placeholder="Exercise notes..." ${isLocked ? "disabled" : ""}>${exercise.notes || ""}</textarea>
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
   EXERCISE INPUTS & COMPLETION
========================================================= */

function attachExerciseInputEvents() {
    document.querySelectorAll(".sets-input, .reps-input, .weight-input, .notes-input")
        .forEach(input => input.addEventListener("change", updateExercise));
}

function updateExercise(event) {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout || workout.completed) return;

    const exercise = workout.exercises.find(e => e.id == event.target.dataset.id);
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

function attachCompleteEvents() {
    document.querySelectorAll(".complete-input").forEach(input => {
        input.addEventListener("change", () => {
            const workout = workouts.find(w => w.id === workoutId);
            if (!workout || workout.completed) return;

            const exercise = workout.exercises.find(ex => ex.id == input.dataset.id);
            if (!exercise) return;

            exercise.completed = input.checked;
            saveWorkouts();
            updateWorkoutProgress();
        });
    });
}

/* =========================================================
   WORKOUT PROGRESS & HEADER
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
        progressText.textContent = `${completed}/${total} Exercises Completed • ${percent}%`;
    }
}

function displayWorkoutHeader() {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout) return;

    if (workoutTitle) workoutTitle.textContent = workout.name;

    let difficultyClass = "text-secondary";
    switch ((workout.difficulty || "").toLowerCase()) {
        case "beginner": difficultyClass = "text-success"; break;
        case "intermediate": difficultyClass = "text-warning"; break;
        case "advanced": difficultyClass = "text-danger"; break;
    }

    if (workoutInfo) {
        workoutInfo.innerHTML = `
            <div class="mb-2"><strong>${workout.day}</strong></div>
            <div class="mb-2">${workout.category || ""} • ${workout.goal || ""}</div>
            <span class="badge ${difficultyClass}">${workout.difficulty || ""}</span>
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
    if (!workout || workout.completed || !isRunning || !workout.startTime) return;

    const targetSeconds = (workout.duration || 0) * 60;

    if (targetSeconds > 0 && seconds >= targetSeconds && !workout.overtimeToastShown) {
        workout.overtimeToastShown = true;
        saveWorkouts();
        showToast("You've reached your planned workout duration.");

        if (userHasInteracted) {
            const beep = document.getElementById("timerBeep");
            if (beep) {
                beep.currentTime = 0;
                beep.play().catch(() => {});
            }
        }
    }

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

    const daysAgo = getWorkoutDaysAgo(workout);

    // Block future workouts
    if (daysAgo < 0) {
        showToast("You cannot start a workout scheduled for a future date.");
        return;
    }

    if (workout.overtimeToastShown === undefined) {
        workout.overtimeToastShown = false;
    }

    if (isPaused) {
        workout.startTime = Date.now() - (seconds * 1000);
        if (typeof resumeWorkoutTimer === "function") resumeWorkoutTimer();
    } else if (!workout.startTime) {
        workout.startTime = Date.now() - (seconds * 1000);

        if (typeof startWorkoutTimer === "function") {
            startWorkoutTimer(workout);
        }
        if (typeof ensureNotificationPermission === "function") {
            ensureNotificationPermission();
        }
    }

    workout.isPaused = false;
    saveWorkouts();

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);

    isRunning = true;
    isPaused = false;

    if (pauseResumeIcon) pauseResumeIcon.className = "bi bi-pause-fill";
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

    if (typeof pauseWorkoutTimer === "function") pauseWorkoutTimer();

    isRunning = false;
    isPaused = true;
    renderTimer();

    if (pauseResumeIcon) pauseResumeIcon.className = "bi bi-play-fill";
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
   FINISH / LOG WORKOUT
========================================================= */

function completeWorkout() {
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

    const daysAgo = getWorkoutDaysAgo(workout);

    if (daysAgo < 0) {
        showToast("This workout is scheduled for a future date.");
        return;
    }

    if (daysAgo > 7) {
        showToast("You can only log workouts from the last 7 days.");
        return;
    }

    clearInterval(timerInterval);
    timerInterval = null;

    const isMissedWorkout = daysAgo > 0;

    if (isMissedWorkout && !workout.startTime) {
        seconds = 0;
    } else if (workout.startTime && !isPaused) {
        seconds = Math.floor((Date.now() - workout.startTime) / 1000);
    }

    isRunning = false;
    isPaused = false;
    workout.durationSeconds = seconds;

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

    totalCalories += Math.round((seconds / 60) * 8);

    const distance = (seconds / 60) * 0.06;
    const pace = distance > 0 ? ((seconds / 60) / distance).toFixed(1) : 0;

    const now = new Date();

    workout.completed = true;
    workout.loggedDate = now.toISOString();
    workout.completedDate = now.toISOString();
    workout.startTime = null;
    workout.isPaused = false;
    delete workout.overtimeToastShown;

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

    workout.summary = {
        duration: workoutTimer ? workoutTimer.textContent : "00:00:00",
        completedExercises,
        totalExercises: workout.exercises.length,
        calories: totalCalories,
        volume: totalVolume,
        prs: prCount,
        distance: distance.toFixed(2),
        pace,
        streak: typeof streak !== "undefined" ? streak : 0,
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

    // Optional finish modal content
    const summaryElement = document.getElementById("workoutSummary");
    if (summaryElement) {
        const scheduledDate = getWorkoutScheduledDate(workout);

        summaryElement.innerHTML = `
            <h3 class="text-success text-center mb-4">Workout Complete</h3>

            ${
                isMissedWorkout
                    ? `<div class="alert alert-info text-center">
                           <i class="bi bi-calendar-check"></i>
                           Workout logged for <strong>${scheduledDate.toLocaleDateString()}</strong>
                       </div>`
                    : `<div class="alert alert-success text-center">
                           <i class="bi bi-check-circle"></i>
                           Today's workout has been completed.
                       </div>`
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
            <p class="text-center mt-3">Great work! Keep showing up consistently.</p>
        `;

        const finishModal = document.getElementById("finishWorkoutModal");
        if (finishModal) {
            bootstrap.Modal.getOrCreateInstance(finishModal).show();
        }
    }
}

function finishWorkout() {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout) {
        showToast("Workout not found.");
        return;
    }

    const daysAgo = getWorkoutDaysAgo(workout);
    const isMissedWorkout = daysAgo > 0;

    if (!isMissedWorkout && !workout.startTime && !isRunning && !isPaused) {
        const warningModal = document.getElementById("timerWarningModal");
        if (warningModal) {
            bootstrap.Modal.getOrCreateInstance(warningModal).show();
        }
        return;
    }

    completeWorkout();
}

function updateFinishWorkoutButton() {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout || !finishWorkoutBtn) return;

    // Also control the timer button
    if (pauseResumeBtn) {
        pauseResumeBtn.disabled = false;
    }

    if (workout.completed) {
        finishWorkoutBtn.disabled = true;
        finishWorkoutBtn.textContent = "Workout Completed";
        if (pauseResumeBtn) pauseResumeBtn.disabled = true;
        return;
    }

    const daysAgo = getWorkoutDaysAgo(workout);

    if (daysAgo < 0) {
        // Future workout
        finishWorkoutBtn.disabled = true;
        finishWorkoutBtn.textContent = "Workout Scheduled Later";
        if (pauseResumeBtn) pauseResumeBtn.disabled = true;
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
    if (pauseResumeBtn) pauseResumeBtn.disabled = true;
}

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
    ).forEach(el => el.disabled = true);

    const addExerciseButton = document.querySelector('[data-bs-target="#exerciseModal"]');
    if (addExerciseButton) {
        addExerciseButton.disabled = true;
        addExerciseButton.classList.add("disabled");
        addExerciseButton.removeAttribute("data-bs-toggle");
        addExerciseButton.removeAttribute("data-bs-target");
    }
}

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
                        ${new Date(workout.summary.loggedDate || workout.summary.completedDate).toLocaleString()}
                    </strong>
                </p>
            </div>
        </div>
    `;
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

    document.getElementById("editWorkoutName").value = workout.name || "";
    document.getElementById("editWorkoutCategory").value = workout.category || "";
    document.getElementById("editWorkoutGoal").value = workout.goal || "";
    document.getElementById("editWorkoutDifficulty").value = workout.difficulty || "";

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
    workout.category = document.getElementById("editWorkoutCategory").value;
    workout.goal = document.getElementById("editWorkoutGoal").value;
    workout.difficulty = document.getElementById("editWorkoutDifficulty").value;

    // Keep scheduledDate in sync using the correct Sunday-based helper
    const scheduled = getScheduledDateForDay(workout.day);
    if (scheduled) {
        workout.scheduledDate = scheduled.toLocaleDateString("en-CA"); // YYYY-MM-DD
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

            const libraryExercise = exerciseLibrary.find(e => e.name === oldExercise.name);
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

window.addEventListener("beforeunload", () => {
    clearInterval(timerInterval);
});

const startTimerInstead = document.getElementById("startTimerInstead");
const finishWithoutTimer = document.getElementById("finishWithoutTimer");

if (startTimerInstead) {
    startTimerInstead.addEventListener("click", () => {
        const modal = document.getElementById("timerWarningModal");
        if (modal) bootstrap.Modal.getOrCreateInstance(modal).hide();
        startWorkout();
    });
}

if (finishWithoutTimer) {
    finishWithoutTimer.addEventListener("click", () => {
        const modal = document.getElementById("timerWarningModal");
        if (modal) bootstrap.Modal.getOrCreateInstance(modal).hide();
        completeWorkout();
    });
}

document.addEventListener("click", event => {
    const button = event.target.closest(".exercise-info-btn");
    if (button) {
        openExerciseInfo(button.dataset.id);
    }
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
    updateFinishWorkoutButton();

    if (workout.completed) {
        lockCompletedWorkout();
        displayWorkoutSummary();
    }
}