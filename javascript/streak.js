const STREAK_DAY_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

function getStreakDateKey(date) {

    const d = new Date(date);

    return [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, "0"),
        String(d.getDate()).padStart(2, "0")
    ].join("-");
}


function getCompletedWorkoutDates() {

    return new Set(
        workouts
            .filter(workout => workout.completedDate)
            .map(workout =>
                getStreakDateKey(workout.completedDate)
            )
    );

}


function isWorkoutScheduledOnDate(date) {

    const dayName =
        STREAK_DAY_NAMES[date.getDay()];

    return workouts.some(
        workout =>
            workout.day === dayName
    );

}


function calculateCurrentStreak() {

    const completedDates =
        getCompletedWorkoutDates();

    if (completedDates.size === 0) {
        return 0;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    let cursor =
        new Date(today);

    let streak = 0;

    while (true) {

        const dateKey =
            getStreakDateKey(cursor);

        const scheduled =
            isWorkoutScheduledOnDate(cursor);

        /*
         * Today's scheduled workout has not
         * been completed yet.
         *
         * Do not break yesterday's streak.
         */
        if (
            cursor.getTime() === today.getTime() &&
            scheduled &&
            !completedDates.has(dateKey)
        ) {

            cursor.setDate(
                cursor.getDate() - 1
            );

            continue;
        }

        /*
         * Rest days never break a streak.
         */
        if (!scheduled) {

            cursor.setDate(
                cursor.getDate() - 1
            );

            continue;
        }

        /*
         * Scheduled day without a completion
         * breaks the current streak.
         */
        if (!completedDates.has(dateKey)) {
            break;
        }

        streak++;

        cursor.setDate(
            cursor.getDate() - 1
        );

    }

    return streak;

}


function calculateLongestStreak() {

    const completedDates =
        getCompletedWorkoutDates();

    if (completedDates.size === 0) {
        return 0;
    }

    const sortedDates =
        [...completedDates]
            .sort()
            .map(dateKey =>
                new Date(`${dateKey}T00:00:00`)
            );

    let longest = 0;

    /*
     * Find the earliest and latest tracked
     * workout dates.
     */
    const firstDate =
        new Date(sortedDates[0]);

    const lastDate =
        new Date(sortedDates[sortedDates.length - 1]);

    let cursor =
        new Date(firstDate);

    let current = 0;

    while (cursor <= lastDate) {

        const dateKey =
            getStreakDateKey(cursor);

        const scheduled =
            isWorkoutScheduledOnDate(cursor);

        /*
         * Rest days don't affect the streak.
         */
        if (!scheduled) {

            cursor.setDate(
                cursor.getDate() + 1
            );

            continue;
        }

        /*
         * Scheduled + completed.
         */
        if (completedDates.has(dateKey)) {

            current++;

            longest =
                Math.max(
                    longest,
                    current
                );

        }

        /*
         * Scheduled + missed.
         */
        else {

            current = 0;

        }

        cursor.setDate(
            cursor.getDate() + 1
        );

    }

    return longest;

}


function getWorkoutStreakData() {

    const current =
        calculateCurrentStreak();

    const longest =
        Math.max(
            calculateLongestStreak(),
            current
        );

    /*
     * Keep localStorage updated for compatibility
     * with anything else in the application.
     */
    localStorage.setItem(
        "currentStreak",
        current
    );

    localStorage.setItem(
        "longestStreak",
        longest
    );

    return {
        current,
        longest
    };

}