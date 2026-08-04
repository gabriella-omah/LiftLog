// ========================================
// LiftLog — Progress Page
// javascript/progress.js
// ========================================

const personalRecords =
    JSON.parse(localStorage.getItem("liftlogRecords")) || {};

const totalWorkouts = document.getElementById("totalWorkouts");
const totalExercises = document.getElementById("totalExercises");
const completionRate = document.getElementById("completionRate");
const workoutHistory = document.getElementById("workoutHistory");
const personalRecordsContainer = document.getElementById("personalRecords");
const achievements = document.getElementById("achievements");
const calendar = document.getElementById("calendar");
const exportBtn = document.getElementById("exportBtn");
const longestStreak = document.getElementById("longestStreak");
const strength = document.getElementById("displayStrength");
const strengthExercise = document.getElementById("displayStrengthExercise");
const caloriesBurned = document.getElementById("caloriesBurned");
const totalTrainingTime = document.getElementById("totalTrainingTime");
const workoutStreak = document.getElementById("workoutStreak");
const exportWorkoutBtn = document.getElementById("exportWorkoutBtn");

let weeklyChart;
let totalSeconds = 0;

// ========================================
// PROGRESS STATS
// ========================================

function displayProgress() {
    const completed = workouts.filter(workout => workout.completedDate).length;

    if (totalWorkouts) totalWorkouts.textContent = completed;

    let exercises = 0;
    totalSeconds = 0;

    workouts.forEach(workout => {
        if (workout.completedDate) {
            exercises += (workout.exercises || []).length;
            totalSeconds += workout.durationSeconds || 0;
        }
    });

    if (totalExercises) totalExercises.textContent = exercises;

    const rate =
        workouts.length === 0
            ? 0
            : Math.round((completed / workouts.length) * 100);

    if (completionRate) completionRate.textContent = rate + "%";

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (totalTrainingTime) {
        totalTrainingTime.textContent =
            hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
    }
}

// ========================================
// WEEK HELPERS
// ========================================

function getStartOfWeek(date = new Date()) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

function getEndOfWeek(date = new Date()) {
    const end = getStartOfWeek(date);
    end.setDate(end.getDate() + 7);
    return end;
}

function isThisWeek(dateString) {
    if (!dateString) return false;
    const workoutDate = new Date(dateString);
    return workoutDate >= getStartOfWeek() && workoutDate < getEndOfWeek();
}

function isWorkoutCompletedThisWeek(workout) {
    return workout.completedDate && isThisWeek(workout.completedDate);
}

// ========================================
// WORKOUT HISTORY
// ========================================

function buildHistoryCard(workout) {
    const date = new Date(workout.completedDate);

    const formattedDate = date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    const exerciseCount = (workout.exercises || []).length;

    let duration = "Not recorded";

    if (workout.durationSeconds) {
        const totalMinutes = Math.floor(workout.durationSeconds / 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        duration =
            hours > 0
                ? `${hours} hr ${minutes} min`
                : `${minutes} min`;
    }

    return `
        <div class="history-card">
            <div class="history-top">
                <div>
                    <h4>${workout.name}</h4>
                    <span class="history-date">
                        <i class="bi bi-calendar3"></i>
                        ${formattedDate}
                    </span>
                </div>
                <span class="history-status">
                    <i class="bi bi-check-circle-fill"></i>
                    Completed
                </span>
            </div>
            <div class="history-meta">
                <span>
                    <i class="bi bi-list-check"></i>
                    ${exerciseCount} Exercises
                </span>
                <span>
                    <i class="bi bi-stopwatch"></i>
                    ${duration}
                </span>
            </div>
        </div>
    `;
}

function displayWorkoutHistory() {
    if (!workoutHistory) return;

    workoutHistory.innerHTML = "";

    const completed = workouts
        .filter(workout => workout.completedDate)
        .sort(
            (a, b) =>
                new Date(b.completedDate) - new Date(a.completedDate)
        );

    if (completed.length === 0) {
        workoutHistory.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-clock-history"></i>
                <h4>No workout history</h4>
                <p>
                    Complete your first workout to start building your history.
                </p>
            </div>
        `;
        return;
    }

    const workoutsToShow = completed.slice(0, 5);
    workoutsToShow.forEach(workout => {
        workoutHistory.innerHTML += buildHistoryCard(workout);
    });

    if (completed.length > 5) {
        workoutHistory.innerHTML += `
            <button
                id="loadHistoryBtn"
                class="btn btn-outline-success w-100 mt-3"
                type="button">
                <i class="bi bi-clock-history"></i>
                Load More Workouts (${completed.length - 5})
            </button>
        `;

        const loadBtn = document.getElementById("loadHistoryBtn");
        if (loadBtn) {
            loadBtn.addEventListener("click", () => {
                workoutHistory.innerHTML = "";
                completed.forEach(workout => {
                    workoutHistory.innerHTML += buildHistoryCard(workout);
                });
            });
        }
    }
}

// ========================================
// STREAK
// ========================================

function getLocalDateKey(date) {
    const d = new Date(date);
    return [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, "0"),
        String(d.getDate()).padStart(2, "0")
    ].join("-");
}

function displayWorkoutStreak() {
    if (!workoutStreak) return;

    if (typeof getWorkoutStreakData === "function") {
        const streakData = getWorkoutStreakData();
        workoutStreak.textContent = streakData.current;

        if (longestStreak) {
            longestStreak.textContent = streakData.longest;
        }
        return;
    }

    workoutStreak.textContent = "0";
    if (longestStreak) longestStreak.textContent = "0";
}

// ========================================
// PERSONAL RECORDS
// ========================================

function displayPersonalRecords() {
    if (!personalRecordsContainer) return;

    personalRecordsContainer.innerHTML = "";

    const records = Object.entries(personalRecords);

    if (records.length === 0) {
        personalRecordsContainer.innerHTML = `
            <p class="personal-text">
                No personal records yet.
            </p>
        `;
        return;
    }

    records.forEach(([exercise, weight]) => {
        personalRecordsContainer.innerHTML += `
            <div class="pr-item">
                <div class="pr-left">
                    <div class="pr-icon">
                        <i class="bi bi-trophy-fill"></i>
                    </div>
                    <div class="pr-name">
                        ${exercise}
                    </div>
                </div>
                <div class="pr-weight">
                    ${typeof formatWeight === "function"
                        ? formatWeight(weight)
                        : weight}
                    ${typeof weightUnit !== "undefined" ? weightUnit : "kg"}
                </div>
            </div>
        `;
    });
}

// ========================================
// ACHIEVEMENTS
// ========================================

function displayAchievements() {
    if (!achievements) return;

    achievements.innerHTML = "";

    const completed = workouts.filter(w => w.completedDate).length;
    const totalHours = totalSeconds / 3600;
    const totalPRs = Object.keys(personalRecords).length;

    const groups = [
        {
            title: "Workout Milestones",
            icon: "bi bi-flag-fill",
            items: [
                { title: "First Workout", unlocked: completed >= 1 },
                { title: "20 Workouts", unlocked: completed >= 20 },
                { title: "50 Workouts", unlocked: completed >= 50 },
                { title: "100 Workouts", unlocked: completed >= 100 },
                { title: "250 Workouts", unlocked: completed >= 250 },
                { title: "500 Workouts", unlocked: completed >= 500 }
            ]
        },
        {
            title: "Personal Records",
            icon: "bi bi-trophy",
            items: [
                { title: "First Personal Record", unlocked: totalPRs >= 1 },
                { title: "10 Personal Records", unlocked: totalPRs >= 10 },
                { title: "25 Personal Records", unlocked: totalPRs >= 25 },
                { title: "50 Personal Records", unlocked: totalPRs >= 50 }
            ]
        },
        {
            title: "Training Time",
            icon: "bi bi-stopwatch",
            items: [
                { title: "20 Hours Trained", unlocked: totalHours >= 20 },
                { title: "50 Hours Trained", unlocked: totalHours >= 50 },
                { title: "100 Hours Trained", unlocked: totalHours >= 100 },
                { title: "250 Hours Trained", unlocked: totalHours >= 250 }
            ]
        }
    ];

    groups.forEach(group => {
        achievements.innerHTML += `
            <div class="achievement-group">
                <div class="achievement-group-header">
                    <i class="${group.icon}"></i>
                    <h4>${group.title}</h4>
                </div>
                <div class="achievement-list">
                    ${group.items.map(item => `
                        <div class="achievement-row ${item.unlocked ? "unlocked" : "locked"}">
                            <span>${item.title}</span>
                            <i class="bi ${item.unlocked ? "bi-check-circle-fill" : "bi-lock-fill"}"></i>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    });
}

// ========================================
// CALENDAR
// ========================================

let calendarDate = new Date();

let liftlogStartDate = localStorage.getItem("liftlogStartDate");

if (!liftlogStartDate) {
    liftlogStartDate = calendarDateKey(new Date());
    localStorage.setItem("liftlogStartDate", liftlogStartDate);
}

const calendarMonth = document.getElementById("calendarMonth");
const previousMonthBtn = document.getElementById("previousMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const calendarWorkoutModal = document.getElementById("calendarWorkoutModal");
const calendarModalDate = document.getElementById("calendarModalDate");
const calendarModalStatus = document.getElementById("calendarModalStatus");
const calendarModalBody = document.getElementById("calendarModalBody");

function calendarDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function isSameCalendarDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

function isDateInPast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const comparison = new Date(date);
    comparison.setHours(0, 0, 0, 0);

    return comparison < today;
}

function getCompletedWorkoutsForDate(date) {
    return workouts.filter(workout => {
        if (!workout.completedDate) return false;
        const completedDate = new Date(workout.completedDate);
        return isSameCalendarDay(completedDate, date);
    });
}

function getScheduledWorkoutsForDate(date) {
    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const dayName = dayNames[date.getDay()];
    const key = calendarDateKey(date);

    return workouts.filter(workout => {
        if (workout.scheduledDate) {
            return String(workout.scheduledDate).slice(0, 10) === key;
        }
        return workout.day === dayName;
    });
}

function getCalendarDayStatus(date) {
    const startDate = new Date(liftlogStartDate);
    startDate.setHours(0, 0, 0, 0);

    const calendarDay = new Date(date);
    calendarDay.setHours(0, 0, 0, 0);

    if (calendarDay < startDate) {
        return "not-tracked";
    }

    const completedWorkouts = getCompletedWorkoutsForDate(date);
    const scheduledWorkouts = getScheduledWorkoutsForDate(date);

    if (completedWorkouts.length > 0) {
        return "completed";
    }

    if (!isDateInPast(date)) {
        if (scheduledWorkouts.length > 0) return "upcoming";
        return "rest";
    }

    if (scheduledWorkouts.length > 0) {
        return "missed";
    }

    return "rest";
}

function displayCalendar() {
    if (!calendar) return;

    calendar.innerHTML = "";

    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    if (calendarMonth) {
        calendarMonth.textContent = calendarDate.toLocaleDateString(undefined, {
            month: "long",
            year: "numeric"
        });
    }

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.className = "calendar-day empty";
        calendar.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const status = getCalendarDayStatus(date);

        const dayElement = document.createElement("button");
        dayElement.type = "button";
        dayElement.className = "calendar-day";
        dayElement.classList.add(status);

        if (isSameCalendarDay(date, new Date())) {
            dayElement.classList.add("today");
        }

        const number = document.createElement("span");
        number.className = "calendar-day-number";
        number.textContent = day;
        dayElement.appendChild(number);

        const indicator = document.createElement("span");
        indicator.className = "calendar-day-indicator";

        if (status === "completed") {
            indicator.innerHTML = '<i class="bi bi-check-lg"></i>';
        } else if (status === "missed") {
            indicator.innerHTML = '<i class="bi bi-x-lg"></i>';
        }

        dayElement.appendChild(indicator);

        dayElement.addEventListener("click", () => {
            openCalendarDay(date, status);
        });

        calendar.appendChild(dayElement);
    }

    const currentCells = calendar.children.length;
    const remaining = 42 - currentCells;

    for (let i = 0; i < remaining; i++) {
        const empty = document.createElement("div");
        empty.className = "calendar-day empty";
        calendar.appendChild(empty);
    }
}

function openCalendarDay(date, status) {
    if (!calendarWorkoutModal) return;

    const completedWorkouts = getCompletedWorkoutsForDate(date);
    const scheduledWorkouts = getScheduledWorkoutsForDate(date);

    if (calendarModalDate) {
        calendarModalDate.textContent = date.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    }

    if (status === "completed") {
        if (calendarModalStatus) {
            calendarModalStatus.textContent = "Workout Completed";
            calendarModalStatus.className =
                "calendar-modal-status completed-text";
        }
        if (calendarModalBody) {
            calendarModalBody.innerHTML =
                buildCompletedWorkoutDetails(completedWorkouts);
        }
    } else if (status === "missed") {
        if (calendarModalStatus) {
            calendarModalStatus.textContent = "Workout Missed";
            calendarModalStatus.className =
                "calendar-modal-status missed-text";
        }
        if (calendarModalBody) {
            calendarModalBody.innerHTML =
                buildMissedWorkoutDetails(scheduledWorkouts);
        }
    } else if (status === "upcoming") {
        if (calendarModalStatus) {
            calendarModalStatus.textContent = "Upcoming";
            calendarModalStatus.className =
                "calendar-modal-status upcoming-text";
        }
        if (calendarModalBody) {
            calendarModalBody.innerHTML =
                buildUpcomingWorkoutDetails(scheduledWorkouts);
        }
    } else {
        if (calendarModalStatus) {
            calendarModalStatus.textContent = "Rest Day";
            calendarModalStatus.className =
                "calendar-modal-status rest-text";
        }
        if (calendarModalBody) {
            calendarModalBody.innerHTML = `
                <div class="calendar-empty-state">
                    <div class="calendar-status-icon rest-icon">
                        <i class="bi bi-moon-stars-fill"></i>
                    </div>
                    <h4>Rest Day</h4>
                    <p>No workout was scheduled for this day.</p>
                </div>
            `;
        }
    }

    bootstrap.Modal.getOrCreateInstance(calendarWorkoutModal).show();
}

function formatWorkoutDuration(seconds) {
    const total = Number(seconds) || 0;
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);

    if (hours > 0) return `${hours} hr ${minutes} min`;
    return `${minutes} min`;
}

function buildCompletedWorkoutDetails(completedWorkouts) {
    if (completedWorkouts.length === 0) {
        return `<p>Workout completed.</p>`;
    }

    const unit = typeof weightUnit !== "undefined" ? weightUnit : "kg";

    return completedWorkouts.map(workout => {
        const summary = workout.summary || {};

        const duration = workout.durationSeconds
            ? formatWorkoutDuration(workout.durationSeconds)
            : "--";

        const calories =
            summary.calories ||
            (workout.exercises || []).reduce((total, exercise) => {
                return (
                    total +
                    Math.round(
                        (Number(exercise.sets) || 0) *
                        (Number(exercise.reps) || 0) *
                        0.5
                    )
                );
            }, 0);

        const volume = (workout.exercises || []).reduce((total, exercise) => {
            return (
                total +
                (Number(exercise.sets) || 0) *
                (Number(exercise.reps) || 0) *
                (Number(exercise.weight) || 0)
            );
        }, 0);

        const completedExercises = (workout.exercises || []).filter(
            e => e.completed
        ).length;

        return `
            <div class="calendar-workout-detail">
                <div class="calendar-detail-header">
                    <div>
                        <h3>${workout.name}</h3>
                        <span>${workout.category || "Workout"}</span>
                    </div>
                    <div class="calendar-success-icon">
                        <i class="bi bi-check-lg"></i>
                    </div>
                </div>

                <div class="calendar-stat-grid">
                    <div>
                        <strong>${duration}</strong>
                        <span>Duration</span>
                    </div>
                    <div>
                        <strong>${completedExercises}/${(workout.exercises || []).length}</strong>
                        <span>Exercises</span>
                    </div>
                    <div>
                        <strong>${Number(calories).toLocaleString()}</strong>
                        <span>Calories</span>
                    </div>
                    <div>
                        <strong>${Number(volume).toLocaleString()} ${unit}</strong>
                        <span>Volume</span>
                    </div>
                </div>

                <hr>
                <h5 class="mb-3">Exercises</h5>

                <div class="calendar-exercise-list">
                    ${
                        (workout.exercises || []).length === 0
                            ? `<p class="text-muted">No exercises recorded.</p>`
                            : (workout.exercises || []).map(exercise => {
                                const sets = Number(exercise.sets) || 0;
                                const reps = Number(exercise.reps) || 0;
                                const weight = Number(exercise.weight) || 0;

                                return `
                                    <div class="calendar-exercise-row">
                                        <div>
                                            <strong>${exercise.name}</strong>
                                            <small>${exercise.muscle || ""}</small>
                                        </div>
                                        <div class="calendar-exercise-values">
                                            ${sets} × ${reps}
                                            ${weight > 0 ? ` • ${weight}${unit}` : ""}
                                        </div>
                                    </div>
                                `;
                            }).join("")
                    }
                </div>
            </div>
        `;
    }).join("<hr>");
}

function buildMissedWorkoutDetails(scheduledWorkouts) {
    if (scheduledWorkouts.length === 0) {
        return `
            <div class="calendar-empty-state">
                <div class="calendar-status-icon missed-icon">
                    <i class="bi bi-x-lg"></i>
                </div>
                <h4>Workout Missed</h4>
                <p>A scheduled workout was not completed.</p>
            </div>
        `;
    }

    return `
        <div class="calendar-empty-state">
            <div class="calendar-status-icon missed-icon">
                <i class="bi bi-x-lg"></i>
            </div>
            <h4>Workout Missed</h4>
            <p>
                You had a workout scheduled for this day,
                but it was not completed.
            </p>
        </div>
        <div class="scheduled-workouts">
            <h5>Scheduled Workout</h5>
            ${scheduledWorkouts.map(workout => `
                <div class="scheduled-workout-item">
                    <i class="bi bi-calendar-x"></i>
                    <div>
                        <strong>${workout.name}</strong>
                        <small>${workout.category || "Workout"}</small>
                    </div>
                </div>
            `).join("")}
        </div>
    `;
}

function buildUpcomingWorkoutDetails(scheduledWorkouts) {
    if (scheduledWorkouts.length === 0) {
        return `
            <div class="calendar-empty-state">
                <div class="calendar-status-icon upcoming-icon">
                    <i class="bi bi-calendar-event"></i>
                </div>
                <h4>Upcoming Day</h4>
                <p>No workout is currently scheduled for this day.</p>
            </div>
        `;
    }

    return `
        <div class="calendar-empty-state">
            <div class="calendar-status-icon upcoming-icon">
                <i class="bi bi-calendar-event"></i>
            </div>
            <h4>Upcoming Workout</h4>
            <p>You have a workout scheduled for this day.</p>
        </div>
        <div class="scheduled-workouts">
            ${scheduledWorkouts.map(workout => `
                <div class="scheduled-workout-item">
                    <i class="bi bi-calendar-check"></i>
                    <div>
                        <strong>${workout.name}</strong>
                        <small>${workout.category || "Workout"}</small>
                    </div>
                </div>
            `).join("")}
        </div>
    `;
}

if (previousMonthBtn) {
    previousMonthBtn.addEventListener("click", () => {
        calendarDate.setMonth(calendarDate.getMonth() - 1);
        displayCalendar();
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener("click", () => {
        calendarDate.setMonth(calendarDate.getMonth() + 1);
        displayCalendar();
    });
}

// ========================================
// WEEKLY CHART
// ========================================

function displayWeeklyChart() {
    const canvas = document.getElementById("weeklyChart");
    if (!canvas || typeof Chart === "undefined") return;

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const workoutCounts = [0, 0, 0, 0, 0, 0, 0];

    workouts.forEach(workout => {
        if (!isWorkoutCompletedThisWeek(workout)) return;
        const day = new Date(workout.completedDate).getDay();
        workoutCounts[day]++;
    });

    const ctx = canvas.getContext("2d");

    if (weeklyChart) {
        weeklyChart.destroy();
    }

    weeklyChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: days,
            datasets: [{
                label: "Completed Workouts",
                data: workoutCounts,
                backgroundColor: "#198754",
                borderRadius: 12,
                borderSkipped: false,
                maxBarThickness: 36
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: "#6b7280",
                        font: { weight: "600" }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: "#eef2f6" },
                    ticks: {
                        precision: 0,
                        color: "#6b7280"
                    }
                }
            }
        }
    });
}

// ========================================
// STRENGTH / CALORIES
// ========================================

function displayStrength() {
    if (!strength) return;

    const records = Object.entries(personalRecords);
    const unit = typeof weightUnit !== "undefined" ? weightUnit : "kg";

    if (records.length === 0) {
        strength.textContent = "0";
        if (strengthExercise) strengthExercise.textContent = "--";
        return;
    }

    let strongestExercise = "";
    let strongestWeight = 0;

    records.forEach(([exercise, weight]) => {
        if (Number(weight) > strongestWeight) {
            strongestWeight = Number(weight);
            strongestExercise = exercise;
        }
    });

    strength.textContent =
        `${typeof formatWeight === "function"
            ? formatWeight(strongestWeight)
            : strongestWeight} ${unit}`;

    if (strengthExercise) {
        strengthExercise.textContent = strongestExercise;
    }
}

function displayCalories() {
    if (!caloriesBurned) return;

    caloriesBurned.textContent = Number(
        localStorage.getItem("caloriesBurned") || 0
    ).toLocaleString();
}

// ========================================
// EXPORT JSON
// ========================================

function exportWorkouts() {
    const data = JSON.stringify(workouts, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "liftlog-workouts.json";
    link.click();

    URL.revokeObjectURL(url);
}

if (exportBtn) {
    exportBtn.addEventListener("click", exportWorkouts);
}

// ========================================
// EXPORT PDF (CDN jspdf — no Node import)
// ========================================

function exportWorkoutPDF(workoutsList, unit = "kg") {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert("PDF library failed to load. Check your internet connection.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("LiftLog Workout Export", 14, 18);

    doc.setFontSize(10);
    doc.text(`Exported: ${new Date().toLocaleString()}`, 14, 26);

    let y = 36;

    const completed = (workoutsList || []).filter(w => w.completedDate);

    if (completed.length === 0) {
        doc.text("No completed workouts to export.", 14, y);
        doc.save("liftlog-workouts.pdf");
        return;
    }

    completed.forEach((workout, index) => {
        if (y > 270) {
            doc.addPage();
            y = 20;
        }

        doc.setFontSize(12);
        doc.text(`${index + 1}. ${workout.name}`, 14, y);
        y += 6;

        doc.setFontSize(10);
        doc.text(
            `Date: ${new Date(workout.completedDate).toLocaleDateString()}`,
            14,
            y
        );
        y += 5;

        doc.text(
            `Category: ${workout.category || "-"} | Goal: ${workout.goal || "-"}`,
            14,
            y
        );
        y += 5;

        const durationSec = Number(workout.durationSeconds) || 0;
        const mins = Math.floor(durationSec / 60);
        doc.text(`Duration: ${mins} min`, 14, y);
        y += 8;

        (workout.exercises || []).forEach(ex => {
            if (y > 280) {
                doc.addPage();
                y = 20;
            }

            const sets = Number(ex.sets) || 0;
            const reps = Number(ex.reps) || 0;
            const weight = Number(ex.weight) || 0;

            doc.text(
                `• ${ex.name}: ${sets} x ${reps}` +
                (weight ? ` @ ${weight}${unit}` : ""),
                18,
                y
            );
            y += 5;
        });

        y += 6;
    });

    doc.save("liftlog-workouts.pdf");
}

if (exportWorkoutBtn) {
    exportWorkoutBtn.addEventListener("click", () => {
        const unit = typeof weightUnit !== "undefined" ? weightUnit : "kg";
        exportWorkoutPDF(workouts, unit);
    });
}

// ========================================
// INIT
// ========================================

displayProgress();
displayWorkoutHistory();
displayPersonalRecords();
displayWorkoutStreak();
displayWeeklyChart();
displayCalendar();
displayAchievements();
displayStrength();
displayCalories();