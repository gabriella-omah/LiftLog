// ========================================
// LiftLog — Exercise Library
// javascript/library.js
// ========================================

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

const categoryContainer =
    document.getElementById("exerciseCategories");

const addExerciseBtn =
    document.getElementById("saveExerciseBtn");

const existingWorkoutContainer =
    document.getElementById("existingWorkoutContainer");

const newWorkoutContainer =
    document.getElementById("newWorkoutContainer");

const existingWorkoutName =
    document.getElementById("existingWorkoutName");

const newWorkoutName =
    document.getElementById("newWorkoutName");

const library =
    document.getElementById("exerciseLibrary");

const search =
    document.getElementById("exerciseSearch");

const weightLabel =
    document.getElementById("weightLabel");

const workoutDateSelect =
    document.getElementById("workoutDateSelect");

const openAddWorkoutBtn =
    document.getElementById("openAddWorkout");

// ========================================
// HELPERS
// ========================================

function showLibraryToast(message) {
    if (typeof showToast === "function") {
        showToast(message);
        return;
    }

    const toastMessage = document.getElementById("toastMessage");
    const toastElement = document.getElementById("exerciseToast");

    if (!toastMessage || !toastElement) return;

    toastMessage.textContent = message;
    bootstrap.Toast.getOrCreateInstance(toastElement).show();
}

function updateWeightUnit() {
    const unit = localStorage.getItem("weightUnit") || "kg";
    if (weightLabel) {
        weightLabel.textContent = unit;
    }
}

function saveWorkouts() {
    localStorage.setItem(
        "liftlogWorkouts",
        JSON.stringify(workouts)
    );
}

// ========================================
// FILTER DATA
// ========================================

const filterData = {
    muscle: [
        "Chest",
        "Back",
        "Legs",
        "Shoulders",
        "Arms",
        "Core"
    ],
    type: [
        "Compound",
        "Isolation",
        "Cardio"
    ],
    equipment: [
        ...new Set(
            (typeof exerciseLibrary !== "undefined"
                ? exerciseLibrary
                : []
            ).map(exercise => exercise.equipment)
        )
    ]
};

const muscleGroups = {
    Chest: ["Chest"],
    Back: ["Back"],
    Legs: ["Quadriceps", "Hamstrings", "Glutes", "Calves"],
    Shoulders: ["Shoulders"],
    Arms: ["Biceps", "Triceps"],
    Core: ["Core"]
};

let activeFilter = "all";
let selectedExercise = null;
let selectedWorkout = null;

// ========================================
// DISPLAY EXERCISES
// ========================================

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
// MAIN FILTERS
// ========================================

const mainFilters = document.querySelectorAll(".library-filter");

mainFilters.forEach(button => {
    button.addEventListener("click", () => {
        mainFilters.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const type = button.dataset.filterType;
        activeFilter = type;

        if (!categoryContainer) return;

        categoryContainer.innerHTML = "";

        if (type === "all") {
            displayExercises(exerciseLibrary);
            return;
        }

        const options = filterData[type] || [];

        categoryContainer.innerHTML = options
            .map(item => `
                <button
                    type="button"
                    class="sub-filter-btn"
                    data-value="${item}">
                    ${item}
                </button>
            `)
            .join("");
    });
});

// ========================================
// SUB FILTERS
// ========================================

document.addEventListener("click", e => {
    const subBtn = e.target.closest(".sub-filter-btn");
    if (!subBtn) return;

    document
        .querySelectorAll(".sub-filter-btn")
        .forEach(btn => btn.classList.remove("active"));

    subBtn.classList.add("active");

    const value = subBtn.dataset.value;
    let filtered = [];

    if (activeFilter === "muscle") {
        filtered = exerciseLibrary.filter(exercise =>
            (muscleGroups[value] || []).includes(exercise.muscle)
        );
    } else if (activeFilter === "type") {
        filtered = exerciseLibrary.filter(exercise =>
            exercise.type === value
        );
    } else if (activeFilter === "equipment") {
        filtered = exerciseLibrary.filter(exercise =>
            exercise.equipment === value
        );
    }

    displayExercises(filtered);
});

// ========================================
// SEARCH
// ========================================

if (search) {
    search.addEventListener("input", () => {
        const value = search.value.toLowerCase().trim();

        const filtered = exerciseLibrary.filter(exercise =>
            String(exercise.name || "").toLowerCase().includes(value) ||
            String(exercise.muscle || "").toLowerCase().includes(value) ||
            String(exercise.equipment || "").toLowerCase().includes(value)
        );

        displayExercises(filtered);
    });
}

// ========================================
// VIEW EXERCISE
// ========================================

document.addEventListener("click", e => {
    const btn = e.target.closest(".viewExerciseBtn");
    if (!btn) return;

    const id = Number(btn.dataset.id);

    selectedExercise = exerciseLibrary.find(
        exercise => exercise.id === id
    );

    if (!selectedExercise) return;

    const bodyImage = document.getElementById("exerciseMuscleImage");
    if (bodyImage) {
        bodyImage.src = selectedExercise.bodyMap || "";
        bodyImage.alt = selectedExercise.name || "Target muscle";
    }

    const titleEl = document.getElementById("exerciseTitle");
    if (titleEl) {
        titleEl.textContent = selectedExercise.name;
    }

    const bodyEl = document.getElementById("exerciseBody");
    if (bodyEl) {
        bodyEl.innerHTML = `
            <hr>
            <p><strong>Muscle:</strong> ${selectedExercise.muscle || ""}</p>
            <p><strong>Equipment:</strong> ${selectedExercise.equipment || ""}</p>
            <p><strong>Difficulty:</strong> ${selectedExercise.difficulty || ""}</p>
            <p><strong>Type:</strong> ${selectedExercise.type || ""}</p>
            <hr>

            <div class="exercise-images mb-3">
                ${
                    Array.isArray(selectedExercise.images)
                        ? selectedExercise.images.map(image => `
                            <img src="${image}" class="img-fluid rounded mb-2" alt="">
                          `).join("")
                        : ""
                }
            </div>

            <h5>How to Perform</h5>
            <ol>
                ${(selectedExercise.instructions || [])
                    .map(step => `<li>${step}</li>`)
                    .join("")}
            </ol>

            <h5>Tips</h5>
            <ul>
                ${(selectedExercise.tips || [])
                    .map(tip => `<li>${tip}</li>`)
                    .join("")}
            </ul>

            <h5>Common Mistakes</h5>
            <ul>
                ${(selectedExercise.mistakes || [])
                    .map(mistake => `<li>${mistake}</li>`)
                    .join("")}
            </ul>
        `;
    }

    // Reset add-to-workout state
    selectedWorkout = null;

    if (workoutDateSelect) {
        workoutDateSelect.value = "";
        checkWorkoutDate();
    }

    const modalEl = document.getElementById("exerciseModal");
    if (modalEl) {
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
});

// ========================================
// OPEN ADD-TO-WORKOUT MODAL
// ========================================

if (openAddWorkoutBtn) {
    openAddWorkoutBtn.addEventListener("click", () => {
        if (!selectedExercise) {
            showLibraryToast("Please select an exercise first.");
            return;
        }

        updateWeightUnit();

        const exerciseModal = document.getElementById("exerciseModal");
        if (exerciseModal) {
            bootstrap.Modal.getOrCreateInstance(exerciseModal).hide();
        }

        const addModal = document.getElementById("addWorkoutModal");
        if (addModal) {
            bootstrap.Modal.getOrCreateInstance(addModal).show();
        }
    });
}

// ========================================
// WORKOUT DATE CHECK
// ========================================

function checkWorkoutDate() {
    if (!workoutDateSelect) return;

    const date = workoutDateSelect.value;

    if (!date) {
        selectedWorkout = null;

        if (existingWorkoutContainer) {
            existingWorkoutContainer.classList.add("d-none");
        }
        if (newWorkoutContainer) {
            newWorkoutContainer.classList.add("d-none");
        }
        return;
    }

    selectedWorkout = workouts.find(workout => {
        if (!workout.scheduledDate) return false;

        // Compare date part only (YYYY-MM-DD)
        const scheduled = String(workout.scheduledDate).slice(0, 10);
        return scheduled === date;
    });

    if (selectedWorkout) {
        if (existingWorkoutContainer) {
            existingWorkoutContainer.classList.remove("d-none");
        }
        if (newWorkoutContainer) {
            newWorkoutContainer.classList.add("d-none");
        }
        if (existingWorkoutName) {
            existingWorkoutName.textContent =
                `${selectedWorkout.day} • ${selectedWorkout.name}`;
        }
        if (addExerciseBtn) {
            addExerciseBtn.textContent = "Add Exercise";
        }
    } else {
        if (existingWorkoutContainer) {
            existingWorkoutContainer.classList.add("d-none");
        }
        if (newWorkoutContainer) {
            newWorkoutContainer.classList.remove("d-none");
        }

        const nameInput = document.getElementById("newWorkoutName");
        const categoryInput = document.getElementById("newWorkoutCategory");
        const goalInput = document.getElementById("newWorkoutGoal");
        const difficultyInput = document.getElementById("newWorkoutDifficulty");

        if (nameInput) nameInput.value = "";
        if (categoryInput) categoryInput.value = "Strength";
        if (goalInput) goalInput.value = "Build Muscle";
        if (difficultyInput) difficultyInput.value = "Beginner";

        if (addExerciseBtn) {
            addExerciseBtn.textContent = "Create Workout & Add Exercise";
        }
    }
}

if (workoutDateSelect) {
    workoutDateSelect.addEventListener("change", checkWorkoutDate);
}

// ========================================
// ADD EXERCISE TO WORKOUT
// ========================================

if (addExerciseBtn) {
    addExerciseBtn.addEventListener("click", () => {
        if (!selectedExercise) {
            showLibraryToast("Please select an exercise first.");
            return;
        }

        let workout = selectedWorkout;

        // Create workout if none exists for that date
        if (!workout) {
            if (!workoutDateSelect || !workoutDateSelect.value) {
                showLibraryToast("Please choose a workout date.");
                return;
            }

            const nameInput = document.getElementById("newWorkoutName");
            const workoutName = nameInput
                ? nameInput.value.trim()
                : "";

            if (!workoutName) {
                showLibraryToast("Workout name is required.");
                return;
            }

            const dateValue = workoutDateSelect.value;

            workout = {
                id: Date.now(),
                name: workoutName,
                day: new Date(dateValue + "T00:00:00").toLocaleDateString(
                    "en-US",
                    { weekday: "long" }
                ),
                scheduledDate: dateValue,
                category:
                    document.getElementById("newWorkoutCategory")?.value ||
                    "Strength",
                goal:
                    document.getElementById("newWorkoutGoal")?.value ||
                    "Build Muscle",
                difficulty:
                    document.getElementById("newWorkoutDifficulty")?.value ||
                    "Beginner",
                duration: 60,
                exercises: [],
                exerciseCount: 0,
                completed: false,
                completedDate: null,
                startTime: null
            };

            workouts.push(workout);
        }

        if (!Array.isArray(workout.exercises)) {
            workout.exercises = [];
        }

        if (
            workout.exercises.some(
                exercise => exercise.id === selectedExercise.id
            )
        ) {
            showLibraryToast(
                "Exercise already exists in this workout."
            );
            return;
        }

        const setsInput = document.getElementById("exerciseSets");
        const repsInput = document.getElementById("exerciseReps");
        const weightInput = document.getElementById("exerciseWeight");
        const notesInput = document.getElementById("exerciseNotes");

        workout.exercises.push({
            ...selectedExercise,
            sets: Number(setsInput?.value) || 3,
            reps: Number(repsInput?.value) || 10,
            weight: weightInput?.value || "",
            notes: notesInput?.value || "",
            completed: false,
            volume: 0,
            calories: 0
        });

        workout.exerciseCount = workout.exercises.length;
        selectedWorkout = workout;

        saveWorkouts();

        const addModal = document.getElementById("addWorkoutModal");
        if (addModal) {
            const instance = bootstrap.Modal.getInstance(addModal);
            if (instance) instance.hide();
        }

        showLibraryToast(
            `${selectedExercise.name} added to ${workout.name}.`
        );
    });
}

// ========================================
// INIT
// ========================================

updateWeightUnit();
displayExercises(
    typeof exerciseLibrary !== "undefined" ? exerciseLibrary : []
);