if (localStorage.getItem("darkMode") === "true") {

    document.body.classList.add("dark-mode");

}

const categoryContainer =
    document.getElementById("exerciseCategories");

const addExerciseBtn =
    document.getElementById("saveExerciseBtn");

// ========================================
// WEIGHT UNIT LABEL
// ========================================

const weightLabel =
    document.getElementById("weightLabel");

function updateWeightUnit(){

    const unit =
        localStorage.getItem("weightUnit") || "kg";

    if(weightLabel){

        weightLabel.textContent = unit;

    }

}

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

            exerciseLibrary.map(

                exercise => exercise.equipment

            )

        )

    ]

};
const muscleGroups = {

    Chest: [

        "Chest"

    ],

    Back: [

        "Back"

    ],

    Legs: [

        "Quadriceps",

        "Hamstrings",

        "Glutes",

        "Calves"

    ],

    Shoulders: [

        "Shoulders"

    ],

    Arms: [

        "Biceps",

        "Triceps"

    ],

    Core: [

        "Core"

    ]

};

let activeFilter = "all";

const mainFilters =
document.querySelectorAll(".library-filter");


mainFilters.forEach(button=>{


button.addEventListener("click",()=>{


mainFilters.forEach(btn=>
btn.classList.remove("active")
);


button.classList.add("active");



const type =
button.dataset.filterType;

activeFilter = type;


const container =
document.getElementById("exerciseCategories");



container.innerHTML="";



if(type==="all"){

    container.innerHTML = "";

displayExercises(exerciseLibrary);

return;

}



container.innerHTML =
filterData[type]
.map(item=>`

<button
class="sub-filter-btn"
data-value="${item}">

${item}

</button>

`).join("");



});


});

document.addEventListener("click", e => {

    if (!e.target.classList.contains("sub-filter-btn"))
        return;

    const value = e.target.dataset.value;

    let filtered = [];

    if (activeFilter === "muscle") {

        filtered = exerciseLibrary.filter(exercise =>

            (muscleGroups[value] || []).includes(exercise.muscle)

        );

    }

    else if (activeFilter === "type") {

        filtered = exerciseLibrary.filter(exercise =>

            exercise.type === value

        );

    }

    else if (activeFilter === "equipment") {

        filtered = exerciseLibrary.filter(exercise =>

            exercise.equipment === value

        );

    }

    displayExercises(filtered);

});


    const library =
    document.getElementById("exerciseLibrary");

    function saveWorkouts() {

    localStorage.setItem(
        "liftlogWorkouts",
        JSON.stringify(workouts)
    );

}


function displayExercises(list) {

    library.innerHTML = "";

    list.forEach(exercise => {

        library.innerHTML += `

<section class="exercise-card">

    <div class="card-body">

<div class="exercise-info">

    <h4>${exercise.name}</h4>

    <p class="muscle-badge ${exercise.muscle
        .toLowerCase()
        .replace(/\s+/g,"-")}">

        ${exercise.muscle}

    </p>

    <small>

        ${exercise.equipment}
        •
        ${exercise.type}
        •
        ${exercise.difficulty}

    </small>

    <button
        class="btn btn-success mt-3 w-100 viewExerciseBtn"
        data-id="${exercise.id}">

        View Exercise

    </button>

</div>

</div>

</section>

`;

    });

}



displayExercises(exerciseLibrary);



const search =
    document.getElementById("exerciseSearch");

search.addEventListener("input", () => {

    const value =
        search.value.toLowerCase();

    const filtered =
        exerciseLibrary.filter(exercise =>

            exercise.name
                .toLowerCase()
                .includes(value)

            ||

            exercise.muscle
                .toLowerCase()
                .includes(value)

            ||

            exercise.equipment
                .toLowerCase()
                .includes(value)

        );

    displayExercises(filtered);

});

let selectedExercise = null;

document.addEventListener("click", e => {

    if (!e.target.classList.contains("viewExerciseBtn"))
        return;


    const id = Number(e.target.dataset.id);


    selectedExercise =
        exerciseLibrary.find(
            exercise => exercise.id === id
        );


    if (!selectedExercise) return;


    // BODY MAP IMAGE

    const bodyImage =
        document.getElementById("exerciseMuscleImage");


    if(bodyImage){

        bodyImage.src =
            selectedExercise.bodyMap;

    }



    // TITLE

    document.getElementById(
        "exerciseTitle"
    ).textContent =
        selectedExercise.name;



    // BODY CONTENT

    document.getElementById(
        "exerciseBody"
    ).innerHTML = `


        <div class="exercise-images mb-3">

            ${
                selectedExercise.images
                ?
                selectedExercise.images.map(image => `

                    <img 
                    src="${image}"
                    class="img-fluid rounded mb-2"
                    >

                `).join("")
                :
                ""
            }

        </div>



        <p>

            <strong>Muscle:</strong>

            ${selectedExercise.muscle}

        </p>



        <p>

            <strong>Equipment:</strong>

            ${selectedExercise.equipment}

        </p>



        <p>

            <strong>Difficulty:</strong>

            ${selectedExercise.difficulty}

        </p>



        <p>

            <strong>Type:</strong>

            ${selectedExercise.type}

        </p>



        <hr>



        <h5>How to Perform</h5>


        <ol>

        ${
            selectedExercise.instructions
            .map(step => `<li>${step}</li>`)
            .join("")
        }

        </ol>



        <h5>Tips</h5>


        <ul>

        ${
            selectedExercise.tips
            .map(tip => `<li>${tip}</li>`)
            .join("")
        }

        </ul>



        <h5>Common Mistakes</h5>


        <ul>

        ${
            selectedExercise.mistakes
            .map(mistake => `<li>${mistake}</li>`)
            .join("")
        }

        </ul>


    `;



    new bootstrap.Modal(

        document.getElementById(
            "exerciseModal"
        )

    ).show();


});

const openAddWorkout =
    document.getElementById("openAddWorkout");

openAddWorkout.addEventListener("click", () => {

    const workoutSelect =
        document.getElementById("workoutSelect");

    workoutSelect.innerHTML = "";

    workouts.forEach(workout => {

        workoutSelect.innerHTML += `

            <option value="${workout.id}">

                ${workout.day} • ${workout.name}

            </option>

        `;

    });

    bootstrap.Modal
        .getInstance(
            document.getElementById("exerciseModal")
        )
        .hide();

    new bootstrap.Modal(

        document.getElementById(
            "addWorkoutModal"
        )

    ).show();

});

addExerciseBtn.addEventListener("click", () => {

    const workoutId = Number(
        document.getElementById("workoutSelect").value
    );

    const workout = workouts.find(
    w => w.id === workoutId
);

if (!workout || !selectedExercise) return;

if (!workout.exercises) {

    workout.exercises = [];

}

if (workout.exercises.some(
    e => e.id === selectedExercise.id
)) {

    document.getElementById("toastMessage").textContent =
        "Exercise already exists in this workout.";

    new bootstrap.Toast(
        document.getElementById("exerciseToast")
    ).show();

    return;

}

    workout.exercises.push({

        ...selectedExercise,

        sets: "",

        reps: "",

        weight: "",

        notes: "",

        completed: false

    });

    workout.exerciseCount =
        workout.exercises.length;

    saveWorkouts();

    // Close modal

    bootstrap.Modal.getInstance(
        document.getElementById("addWorkoutModal")
    ).hide();

    // Toast


 document.getElementById("toastMessage").textContent =
    `${selectedExercise.name} added to ${workout.name}.`;

new bootstrap.Toast(
    document.getElementById("exerciseToast")
).show();

});

updateWeightUnit();