const exerciseLibrary = [
    {
        id: 1,
        name: "Bench Press",
        muscle: "Chest",
        equipment: "Barbell",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/benchpress1.jpg",
        "images/benchpress2.jpg"
        ],
        bodyMap: "image/chest.png",

        instructions: [
            "Lie flat on the bench with feet planted on the floor.",
            "Grip the bar slightly wider than shoulder-width.",
            "Lower the bar slowly to your mid-chest.",
            "Press the bar back up to full extension."
        ],
        tips: [
            "Keep feet planted and core braced.",
            "Control the descent for better tension.",
            "Squeeze your chest at the top."
        ],
        mistakes: [
            "Bouncing the bar off your chest.",
            "Flaring elbows excessively.",
            "Lifting hips off the bench."
        ]
    },
    {
        id: 2,
        name: "Incline Dumbbell Press",
        muscle: "Chest",
        equipment: "Dumbbell",
        difficulty: "Beginner",
        type: "Compound",

        images:[
        "images/inclinepress1.jpg",
        "images/inclinepress2.jpg"
        ],
        bodyMap: "image/chest.png",

        instructions: [
            "Set bench to 30-45° incline and sit back.",
            "Hold dumbbells at shoulder level.",
            "Press weights straight up until arms are extended.",
            "Lower dumbbells with control."
        ],
        tips: [
            "Keep shoulder blades retracted.",
            "Focus on upper chest stretch at bottom.",
            "Maintain neutral wrists."
        ],
        mistakes: [
            "Using momentum to swing weights.",
            "Letting dumbbells drift forward.",
            "Arching back excessively."
        ]
    },
    {
        id: 3,
        name: "Chest Fly",
        muscle: "Chest",
        equipment: "Machine",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/chestfly1.jpg",
        "images/chestfly2.jpg"
        ],
        bodyMap: "image/chest.png",

        instructions: [
            "Sit on the machine with back against pad.",
            "Grab handles and bring them together in front of chest.",
            "Squeeze chest at the peak.",
            "Return slowly to starting position."
        ],
        tips: [
            "Keep slight bend in elbows.",
            "Focus on chest stretch at bottom.",
            "Avoid using momentum."
        ],
        mistakes: [
            "Rounding shoulders forward.",
            "Using too much weight.",
            "Shortening the range of motion."
        ]
    },
    {
        id: 4,
        name: "Cable Fly",
        muscle: "Chest",
        equipment: "Cable",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/cablyfly1.jpg",
        "images/cablefly2.jpg"
        ],
        bodyMap: "image/chest.png",
        
        
        instructions: [
            "Set pulleys high and stand in center.",
            "Grab handles and bring hands together in front of chest.",
            "Squeeze chest muscles hard.",
            "Return arms out with control."
        ],
        tips: [
            "Keep slight elbow bend.",
            "Maintain tall posture.",
            "Feel the stretch across chest."
        ],
        mistakes: [
            "Leaning forward with momentum.",
            "Crossing hands too far.",
            "Letting shoulders roll forward."
        ]
    },
    {
        id: 5,
        name: "Push Up",
        muscle: "Chest",
        equipment: "Bodyweight",
        difficulty: "Beginner",
        type: "Compound",

        images:[
        "images/pushup1.jpg",
        "images/pushup2.jpg"
        ],
        bodyMap: "image/chest.png",
        
        
        instructions: [
            "Start in high plank with hands wider than shoulders.",
            "Lower chest toward floor by bending elbows.",
            "Push back up to starting position.",
            "Keep body in straight line."
        ],
        tips: [
            "Engage core to prevent sagging.",
            "Keep elbows at 45° angle.",
            "Use full range of motion."
        ],
        mistakes: [
            "Letting hips sag or pike up.",
            "Flaring elbows out wide.",
            "Only doing partial reps."
        ]
    },
    {
        id: 6,
        name: "Hip Thrust",
        muscle: "Glutes",
        equipment: "Barbell",
        difficulty: "Beginner",
        type: "Compound",

        images:[
        "images/hiptrust1.jpg",
        "images/hiptrust2.jpg"
        ],
        bodyMap: "image/glute.png",
        
        
        instructions: [
            "Position upper back on bench with bar over hips.",
            "Plant feet flat on floor.",
            "Drive hips up by squeezing glutes.",
            "Lower with control."
        ],
        tips: [
            "Keep chin tucked.",
            "Fully extend hips at top.",
            "Drive through heels."
        ],
        mistakes: [
            "Hyperextending lower back.",
            "Pushing through toes.",
            "Using momentum instead of glutes."
        ]
    },
    {
        id: 7,
        name: "Romanian Deadlift",
        muscle: "Hamstrings",
        equipment: "Barbell",
        difficulty: "Intermediate",

        images:[
        "images/rdl1.jpg",
        "images/rdl2.jpg"
        ],
        bodyMap: "image/hamstring.png",
        
        
        type: "Compound",
        instructions: [
            "Stand with feet hip-width holding barbell.",
            "Hinge at hips with slight knee bend.",
            "Lower bar along thighs until stretch is felt.",
            "Drive hips forward to stand."
        ],
        tips: [
            "Keep back flat and core tight.",
            "Keep bar close to body.",
            "Focus on hamstring stretch."
        ],
        mistakes: [
            "Rounding the lower back.",
            "Bending knees too much.",
            "Jerking the movement."
        ]
    },
    {
        id: 8,
        name: "Cable Kickback",
        muscle: "Glutes",
        equipment: "Cable",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/cable-kickback1.jpg",
        "images/cable-kickback2.jpg"
        ],
        bodyMap: "image/glute.png",
        
        
        instructions: [
            "Attach ankle strap and face cable machine.",
            "Kick one leg straight back.",
            "Squeeze glute at top.",
            "Return with control."
        ],
        tips: [
            "Keep core braced.",
            "Avoid swinging leg.",
            "Focus on glute activation."
        ],
        mistakes: [
            "Arching lower back.",
            "Using momentum.",
            "Moving too fast."
        ]
    },
    {
        id: 9,
        name: "Bulgarian Split Squat",
        muscle: "Quadriceps",
        equipment: "Dumbbell",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/bulgarian1.jpg",
        "images/exercises/bulgarian2.jpg"
        ],
        bodyMap: "image/quads.png",
        
        
        instructions: [
            "Stand in lunge position with rear foot elevated.",
            "Lower until front thigh is parallel to floor.",
            "Drive through front heel to stand.",
            "Complete reps then switch legs."
        ],
        tips: [
            "Keep torso upright.",
            "Control the descent.",
            "Keep front knee tracking over toes."
        ],
        mistakes: [
            "Letting front knee cave in.",
            "Leaning too far forward.",
            "Short steps."
        ]
    },
    {
        id: 10,
        name: "Leg Press",
        muscle: "Quadriceps",
        equipment: "Machine",
        difficulty: "Beginner",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/quads.png",
        
        
        instructions: [
            "Sit in leg press machine with feet shoulder-width.",
            "Lower sled by bending knees.",
            "Press through heels to extend legs.",
            "Avoid locking knees at top."
        ],
        tips: [
            "Keep lower back pressed into pad.",
            "Use full range of motion.",
            "Control both directions."
        ],
        mistakes: [
            "Lifting hips off seat.",
            "Locking knees at top.",
            "Using too much weight."
        ]
    },
    {
        id: 11,
        name: "Back Squat",
        muscle: "Quadriceps",
        equipment: "Barbell",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/quads.png",
        
        
        instructions: [
            "Place bar across upper back and unrack.",
            "Feet shoulder-width with toes slightly out.",
            "Squat down until hips are below knees.",
            "Drive through heels to stand."
        ],
        tips: [
            "Keep chest up and core tight.",
            "Track knees over toes.",
            "Maintain neutral spine."
        ],
        mistakes: [
            "Rounding lower back.",
            "Knees caving inward.",
            "Heels lifting off floor."
        ]
    },
    {
        id: 12,
        name: "Deadlift",
        muscle: "Hamstrings",
        equipment: "Barbell",
        difficulty: "Advanced",
        type: "Compound",

        images:[
        "images/deadlift1.jpg",
        "images/deadlift2.jpg"
        ],
        bodyMap: "image/hamstring.png",
        
        
        instructions: [
            "Stand with mid-foot under barbell.",
            "Bend at hips and knees to grip bar.",
            "Drive through heels and extend hips.",
            "Lower bar with control."
        ],
        tips: [
            "Keep back flat.",
            "Pull bar close to body.",
            "Brace core before lifting."
        ],
        mistakes: [
            "Rounding back during lift.",
            "Jerking the bar off floor.",
            "Not using legs enough."
        ]
    },
    {
        id: 13,
        name: "Lunges",
        muscle: "Quadriceps",
        equipment: "Dumbbell",
        difficulty: "Beginner",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/quads.png",
        
        
        instructions: [
            "Stand tall holding dumbbells.",
            "Step forward and lower until both knees are at 90°.",
            "Push off front foot to return.",
            "Alternate legs."
        ],
        tips: [
            "Keep torso upright.",
            "Step far enough forward.",
            "Control the lowering phase."
        ],
        mistakes: [
            "Knee going past toes.",
            "Leaning forward too much.",
            "Short steps."
        ]
    },
    {
        id: 14,
        name: "Leg Extension",
        muscle: "Quadriceps",
        equipment: "Machine",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/quads.png",
        
        
        instructions: [
            "Sit on machine and adjust pad to shins.",
            "Extend legs to straighten knees.",
            "Pause at top contraction.",
            "Lower with control."
        ],
        tips: [
            "Point toes slightly.",
            "Squeeze quads at top.",
            "Avoid swinging weight."
        ],
        mistakes: [
            "Using momentum.",
            "Lifting hips off seat.",
            "Partial range of motion."
        ]
    },
    {
        id: 15,
        name: "Leg Curl",
        muscle: "Hamstrings",
        equipment: "Machine",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/hamstring.png",
        
        
        instructions: [
            "Lie face down on machine with pad on calves.",
            "Curl legs toward glutes.",
            "Squeeze hamstrings at top.",
            "Lower slowly."
        ],
        tips: [
            "Keep hips down.",
            "Focus on hamstring squeeze.",
            "Use full range."
        ],
        mistakes: [
            "Lifting hips off pad.",
            "Swinging the weight.",
            "Rushing the movement."
        ]
    },
    {
        id: 16,
        name: "Calf Raise",
        muscle: "Calves",
        equipment: "Machine",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/calfraise1.jpg",
        "images/calfraise2.jpg"
        ],
        bodyMap: "image/calf.png",
        
        
        instructions: [
            "Stand on calf raise machine with balls of feet on platform.",
            "Rise up onto toes.",
            "Pause at top.",
            "Lower heels below platform."
        ],
        tips: [
            "Go through full range.",
            "Pause at the top squeeze.",
            "Keep knees slightly bent."
        ],
        mistakes: [
            "Short range of motion.",
            "Bouncing at bottom.",
            "Using too much weight."
        ]
    },
    {
        id: 17,
        name: "Glute Bridge",
        muscle: "Glutes",
        equipment: "Bodyweight",
        difficulty: "Beginner",
        type: "Compound",

        images:[
        "images/glute-bridge1.jpg",
        "images/glute-bridge2.jpg"
        ],
        bodyMap: "image/glute.png",
        
        
        instructions: [
            "Lie on back with knees bent and feet flat.",
            "Drive hips up toward ceiling.",
            "Squeeze glutes at top.",
            "Lower with control."
        ],
        tips: [
            "Keep core tight.",
            "Drive through heels.",
            "Hold squeeze at top."
        ],
        mistakes: [
            "Arching lower back.",
            "Not fully extending hips.",
            "Rushing reps."
        ]
    },
    {
        id: 18,
        name: "Pull Up",
        muscle: "Back",
        equipment: "Bodyweight",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/pullup1.jpg",
        "images/pullup2.jpg"
        ],
        bodyMap: "image/back.png",
        
        
        instructions: [
            "Hang from bar with overhand grip.",
            "Pull body up until chin clears bar.",
            "Lower with control.",
            "Repeat."
        ],
        tips: [
            "Retract shoulder blades.",
            "Engage core.",
            "Avoid swinging."
        ],
        mistakes: [
            "Kipping or swinging.",
            "Partial range of motion.",
            "Shrugging shoulders."
        ]
    },
    {
        id: 19,
        name: "Lat Pulldown",
        muscle: "Back",
        equipment: "Cable",
        difficulty: "Beginner",
        type: "Compound",

        images:[
        "images/latpull1.jpg",
        "images/latpull2.jpg"
        ],
        bodyMap: "image/back.png",
        
        
        instructions: [
            "Sit at lat pulldown machine and grip bar wide.",
            "Pull bar down to upper chest.",
            "Squeeze shoulder blades.",
            "Return slowly."
        ],
        tips: [
            "Lean back slightly.",
            "Focus on lats.",
            "Control the negative."
        ],
        mistakes: [
            "Pulling behind neck.",
            "Using momentum.",
            "Leaning back too far."
        ]
    },
    {
        id: 20,
        name: "Bent Over Row",
        muscle: "Back",
        equipment: "Barbell",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/back.png",
        
        
        instructions: [
            "Hinge at hips with slight knee bend.",
            "Pull barbell toward lower chest.",
            "Squeeze shoulder blades.",
            "Lower with control."
        ],
        tips: [
            "Keep back flat.",
            "Pull to lower abs.",
            "Retract scapula."
        ],
        mistakes: [
            "Rounding back.",
            "Using momentum.",
            "Shrugging shoulders."
        ]
    },
    {
        id: 21,
        name: "Seated Cable Row",
        muscle: "Back",
        equipment: "Cable",
        difficulty: "Beginner",
        type: "Compound",

        images:[
        "images/seatedcablerow1.jpg",
        "images/seatedcablerow2.jpg"
        ],
        bodyMap: "image/back.png",
        
        
        instructions: [
            "Sit at cable row with feet braced.",
            "Pull handle to lower chest.",
            "Squeeze back muscles.",
            "Extend arms fully."
        ],
        tips: [
            "Keep torso still.",
            "Focus on scapular retraction.",
            "Control both phases."
        ],
        mistakes: [
            "Rounding back.",
            "Using upper body swing.",
            "Short reps."
        ]
    },
    {
        id: 22,
        name: "Face Pull",
        muscle: "Back",
        equipment: "Cable",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/facepull1.jpg",
        "images/facepull2.jpg"
        ],
        bodyMap: "image/back.png",
        
        
        instructions: [
            "Set cable at face height with rope.",
            "Pull rope toward face.",
            "Lead with elbows high.",
            "Return slowly."
        ],
        tips: [
            "Squeeze rear delts.",
            "Keep elbows high.",
            "Focus on external rotation."
        ],
        mistakes: [
            "Pulling too low.",
            "Using momentum.",
            "Shrugging shoulders."
        ]
    },
    {
        id: 23,
        name: "Dumbbell Row",
        muscle: "Back",
        equipment: "Dumbbell",
        difficulty: "Beginner",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/back.png",
        
        
        instructions: [
            "Place one knee and hand on bench.",
            "Row dumbbell toward hip.",
            "Squeeze back at top.",
            "Lower with control."
        ],
        tips: [
            "Keep back flat.",
            "Pull elbow high.",
            "Avoid rotating torso."
        ],
        mistakes: [
            "Twisting torso.",
            "Using momentum.",
            "Dropping shoulder."
        ]
    },
    {
        id: 24,
        name: "T-Bar Row",
        muscle: "Back",
        equipment: "Barbell",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/back.png",
        
        
        instructions: [
            "Straddle T-bar with knees slightly bent.",
            "Pull handle to chest.",
            "Squeeze shoulder blades.",
            "Lower slowly."
        ],
        tips: [
            "Keep chest up.",
            "Pull to lower chest.",
            "Maintain flat back."
        ],
        mistakes: [
            "Rounding back.",
            "Jerking the weight.",
            "Partial range."
        ]
    },
    {
        id: 25,
        name: "Overhead Press",
        muscle: "Shoulders",
        equipment: "Barbell",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/overheadpress1.jpg",
        "images/ovearheadpress2.jpg"
        ],
        bodyMap: "image/shoulder.png",
        
        
        instructions: [
            "Stand with bar at shoulder level.",
            "Press bar overhead until arms are locked.",
            "Lower bar to shoulders with control.",
            "Repeat."
        ],
        tips: [
            "Brace core tightly.",
            "Keep elbows forward.",
            "Avoid arching back."
        ],
        mistakes: [
            "Leaning back excessively.",
            "Flaring elbows out.",
            "Using leg drive."
        ]
    },
    {
        id: 26,
        name: "Dumbbell Shoulder Press",
        muscle: "Shoulders",
        equipment: "Dumbbell",
        difficulty: "Beginner",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/shoulder.png",
        
        
        instructions: [
            "Sit or stand with dumbbells at shoulder height.",
            "Press weights overhead.",
            "Lower with control.",
            "Avoid locking elbows."
        ],
        tips: [
            "Keep core engaged.",
            "Neutral grip option available.",
            "Full range of motion."
        ],
        mistakes: [
            "Arching lower back.",
            "Swinging weights up.",
            "Shrugging shoulders."
        ]
    },
    {
        id: 27,
        name: "Lateral Raise",
        muscle: "Shoulders",
        equipment: "Dumbbell",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "lateralraise1.jpg",
        "lateralraise2.jpg"
        ],
        bodyMap: "image/shoulder.png",
        
        
        instructions: [
            "Hold light dumbbells at sides.",
            "Raise arms out to sides until parallel to floor.",
            "Lower slowly.",
            "Keep slight elbow bend."
        ],
        tips: [
            "Lead with elbows.",
            "Use light weight.",
            "Pause at top."
        ],
        mistakes: [
            "Swinging momentum.",
            "Raising too high.",
            "Shrugging shoulders."
        ]
    },
    {
        id: 28,
        name: "Front Raise",
        muscle: "Shoulders",
        equipment: "Dumbbell",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/frontraise1.jpg",
        "images/frontraise2.jpg"
        ],
        bodyMap: "image/shoulder.png",
        
        
        instructions: [
            "Hold dumbbells in front of thighs.",
            "Raise arms straight forward to shoulder height.",
            "Lower with control.",
            "Avoid swinging."
        ],
        tips: [
            "Keep slight elbow bend.",
            "Focus on front delts.",
            "Controlled tempo."
        ],
        mistakes: [
            "Using momentum.",
            "Raising arms too high.",
            "Leaning back."
        ]
    },
    {
        id: 29,
        name: "Rear Delt Fly",
        muscle: "Shoulders",
        equipment: "Machine",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/shoulder.png",
        
        
        instructions: [
            "Sit on rear delt fly machine.",
            "Pull handles back in wide arc.",
            "Squeeze rear delts.",
            "Return slowly."
        ],
        tips: [
            "Keep chest against pad.",
            "Focus on rear shoulder squeeze.",
            "Slight elbow bend."
        ],
        mistakes: [
            "Using momentum.",
            "Shrugging shoulders.",
            "Partial reps."
        ]
    },
    {
        id: 30,
        name: "Upright Row",
        muscle: "Shoulders",
        equipment: "Barbell",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/shoulder.png",
        
        
        instructions: [
            "Hold bar with close grip.",
            "Pull bar up to chest level.",
            "Lead with elbows.",
            "Lower slowly."
        ],
        tips: [
            "Keep bar close to body.",
            "Elbows higher than hands.",
            "Controlled movement."
        ],
        mistakes: [
            "Pulling too high.",
            "Rolling shoulders forward.",
            "Using too much weight."
        ]
    },
    {
        id: 31,
        name: "Bicep Curl",
        muscle: "Biceps",
        equipment: "Dumbbell",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/bicepcurl1.jpg",
        "images/bicepcurl2.jpg"
        ],
        bodyMap: "image/bicep.png",
        
        
        instructions: [
            "Stand with dumbbells at sides.",
            "Curl weights toward shoulders.",
            "Squeeze biceps at top.",
            "Lower slowly."
        ],
        tips: [
            "Keep elbows fixed.",
            "Avoid swinging.",
            "Full range of motion."
        ],
        mistakes: [
            "Swinging body.",
            "Moving elbows forward.",
            "Partial reps."
        ]
    },
    {
        id: 32,
        name: "Hammer Curl",
        muscle: "Biceps",
        equipment: "Dumbbell",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/hammercurl1.jpg",
        "images/hammercurl2.jpg"
        ],
        bodyMap: "image/bicep.png",
        
        
        instructions: [
            "Hold dumbbells with neutral grip.",
            "Curl weights to shoulders.",
            "Lower with control.",
            "Keep palms facing in."
        ],
        tips: [
            "Keep elbows tucked.",
            "Focus on brachialis.",
            "Controlled tempo."
        ],
        mistakes: [
            "Swinging weights.",
            "Moving elbows.",
            "Using momentum."
        ]
    },
    {
        id: 33,
        name: "Tricep Pushdown",
        muscle: "Triceps",
        equipment: "Cable",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/tricep.png",
        
        
        instructions: [
            "Attach straight bar to high pulley.",
            "Push bar down until arms are straight.",
            "Squeeze triceps.",
            "Return slowly."
        ],
        tips: [
            "Keep elbows fixed.",
            "Lean slightly forward.",
            "Full extension."
        ],
        mistakes: [
            "Flaring elbows out.",
            "Using body weight.",
            "Partial range."
        ]
    },
    {
        id: 34,
        name: "Overhead Tricep Extension",
        muscle: "Triceps",
        equipment: "Dumbbell",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/tricepextention1.jpg",
        "images/tricepextention2.jpg"
        ],
        bodyMap: "image/tricep.png",
        
        
        instructions: [
            "Hold dumbbell overhead with both hands.",
            "Lower weight behind head.",
            "Extend arms to starting position.",
            "Keep elbows pointed up."
        ],
        tips: [
            "Keep upper arms still.",
            "Controlled descent.",
            "Squeeze at top."
        ],
        mistakes: [
            "Flaring elbows.",
            "Arching lower back.",
            "Using momentum."
        ]
    },
    {
        id: 35,
        name: "Dips",
        muscle: "Triceps",
        equipment: "Bodyweight",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "images/body/chest.png",
        
        
        instructions: [
            "Grab parallel bars and lift body.",
            "Lower until shoulders are below elbows.",
            "Push back up to start.",
            "Keep torso upright."
        ],
        tips: [
            "Keep elbows close.",
            "Control descent.",
            "Lean slightly forward for chest emphasis."
        ],
        mistakes: [
            "Flaring elbows wide.",
            "Partial range.",
            "Swinging body."
        ]
    },
    {
        id: 36,
        name: "Concentration Curl",
        muscle: "Biceps",
        equipment: "Dumbbell",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/bicep.png",
        
        
        instructions: [
            "Sit on bench with elbow on inner thigh.",
            "Curl dumbbell to shoulder.",
            "Squeeze bicep.",
            "Lower slowly."
        ],
        tips: [
            "Isolate the bicep.",
            "Keep upper arm still.",
            "Full contraction."
        ],
        mistakes: [
            "Swinging arm.",
            "Moving elbow.",
            "Rushing reps."
        ]
    },
    {
        id: 37,
        name: "Skull Crushers",
        muscle: "Triceps",
        equipment: "Barbell",
        difficulty: "Intermediate",
        type: "Isolation",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/tricep.png",
        
        
        instructions: [
            "Lie on bench holding bar above chest.",
            "Lower bar toward forehead.",
            "Extend arms back to start.",
            "Keep elbows fixed."
        ],
        tips: [
            "Elbows pointed up.",
            "Controlled lowering.",
            "Squeeze triceps."
        ],
        mistakes: [
            "Flaring elbows.",
            "Bouncing bar off head.",
            "Using momentum."
        ]
    },
    {
        id: 38,
        name: "Plank",
        muscle: "Core",
        equipment: "Bodyweight",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/core.png",
        
        
        instructions: [
            "Hold forearm plank position.",
            "Keep body in straight line.",
            "Engage core and glutes.",
            "Hold for desired time."
        ],
        tips: [
            "Breathe steadily.",
            "Avoid hip sag.",
            "Full body tension."
        ],
        mistakes: [
            "Letting hips drop.",
            "Raising hips too high.",
            "Holding breath."
        ]
    },
    {
        id: 39,
        name: "Russian Twist",
        muscle: "Core",
        equipment: "Bodyweight",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/russian-twist1.jpg",
        "images/=/russian-twist2.jpg"
        ],
        bodyMap: "image/core.png",
        
        
        instructions: [
            "Sit with knees bent and lean back slightly.",
            "Rotate torso side to side.",
            "Keep feet off floor for challenge.",
            "Control the movement."
        ],
        tips: [
            "Engage core fully.",
            "Keep back straight.",
            "Focus on rotation."
        ],
        mistakes: [
            "Rounding back.",
            "Using momentum.",
            "Moving too fast."
        ]
    },
    {
        id: 40,
        name: "Hanging Leg Raise",
        muscle: "Core",
        equipment: "Bodyweight",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/core.png",
        
        
        instructions: [
            "Hang from pull-up bar.",
            "Raise legs toward chest.",
            "Lower with control.",
            "Avoid swinging."
        ],
        tips: [
            "Engage core.",
            "Controlled movement.",
            "Focus on lower abs."
        ],
        mistakes: [
            "Swinging body.",
            "Partial range.",
            "Using momentum."
        ]
    },
    {
        id: 41,
        name: "Cable Crunch",
        muscle: "Core",
        equipment: "Cable",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/core.png",
        
        
        instructions: [
            "Kneel facing cable machine with rope attachment.",
            "Crunch down squeezing abs.",
            "Return slowly.",
            "Keep tension on abs."
        ],
        tips: [
            "Round upper back.",
            "Focus on abs only.",
            "Controlled reps."
        ],
        mistakes: [
            "Pulling with arms.",
            "Using momentum.",
            "Not rounding spine."
        ]
    },
    {
        id: 42,
        name: "Ab Wheel Rollout",
        muscle: "Core",
        equipment: "Ab Wheel",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/core.png",
        
        
        instructions: [
            "Kneel and hold ab wheel.",
            "Roll forward extending body.",
            "Roll back to start.",
            "Keep core tight."
        ],
        tips: [
            "Brace core strongly.",
            "Go as far as form allows.",
            "Controlled movement."
        ],
        mistakes: [
            "Arching lower back.",
            "Going too far too soon.",
            "Using hips."
        ]
    },
    {
        id: 43,
        name: "Decline Bench Press",
        muscle: "Chest",
        equipment: "Barbell",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/chest.png",
        
        
        instructions: [
            "Lie on decline bench.",
            "Grip bar wider than shoulders.",
            "Lower to chest.",
            "Press back up."
        ],
        tips: [
            "Keep feet secure.",
            "Control lowering.",
            "Focus on lower chest."
        ],
        mistakes: [
            "Bouncing bar.",
            "Flaring elbows.",
            "Lifting hips."
        ]
    },
    {
        id: 44,
        name: "Incline Bench Press",
        muscle: "Chest",
        equipment: "Barbell",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "images/chest.png",
        
        
        instructions: [
            "Lie on incline bench.",
            "Grip bar slightly wider than shoulders.",
            "Lower to upper chest.",
            "Press up powerfully."
        ],
        tips: [
            "Retract shoulder blades.",
            "Control descent.",
            "Focus on upper chest."
        ],
        mistakes: [
            "Bouncing bar.",
            "Arching excessively.",
            "Flaring elbows."
        ]
    },
    {
        id: 45,
        name: "Pec Deck Fly",
        muscle: "Chest",
        equipment: "Machine",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/chest.png",
        
        
        instructions: [
            "Sit on pec deck machine.",
            "Bring handles together in front.",
            "Squeeze chest.",
            "Return slowly."
        ],
        tips: [
            "Slight elbow bend.",
            "Focus on stretch.",
            "Constant tension."
        ],
        mistakes: [
            "Rounding shoulders.",
            "Using momentum.",
            "Too much weight."
        ]
    },
    {
        id: 46,
        name: "Diamond Push Up",
        muscle: "Chest",
        equipment: "Bodyweight",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/chest.png",
        
        
        instructions: [
            "Form diamond shape with hands.",
            "Lower chest to hands.",
            "Push back up.",
            "Keep body straight."
        ],
        tips: [
            "Keep elbows close.",
            "Engage core.",
            "Full range."
        ],
        mistakes: [
            "Flaring elbows.",
            "Sagging hips.",
            "Partial reps."
        ]
    },
    {
        id: 47,
        name: "Hack Squat",
        muscle: "Quadriceps",
        equipment: "Machine",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/hacksquat1.jpg",
        "images/hacksquat2.jpg"
        ],
        bodyMap: "image/quads.png",
        
        
        instructions: [
            "Position shoulders under pads.",
            "Lower sled by bending knees.",
            "Drive through heels to stand.",
            "Control descent."
        ],
        tips: [
            "Keep back against pad.",
            "Knees track over toes.",
            "Full range of motion."
        ],
        mistakes: [
            "Lifting heels.",
            "Rounding lower back.",
            "Locking knees."
        ]
    },
    {
        id: 48,
        name: "Sumo Deadlift",
        muscle: "Glutes",
        equipment: "Barbell",
        difficulty: "Intermediate",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image.glute.png",
        
        
        instructions: [
            "Wide stance with toes out.",
            "Grip bar inside knees.",
            "Drive hips up to stand.",
            "Lower with control."
        ],
        tips: [
            "Keep chest up.",
            "Push knees out.",
            "Brace core."
        ],
        mistakes: [
            "Rounding back.",
            "Jerking bar.",
            "Not engaging legs."
        ]
    },
    {
        id: 49,
        name: "Step Up",
        muscle: "Quadriceps",
        equipment: "Dumbbell",
        difficulty: "Beginner",
        type: "Compound",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/quads.png",
        
        
        instructions: [
            "Step onto box with one foot.",
            "Drive through heel to stand.",
            "Step down with control.",
            "Alternate legs."
        ],
        tips: [
            "Keep torso upright.",
            "Drive through heel.",
            "Control descent."
        ],
        mistakes: [
            "Pushing off back leg.",
            "Leaning forward.",
            "Using momentum."
        ]
    },
    {
        id: 50,
        name: "Seated Calf Raise",
        muscle: "Calves",
        equipment: "Machine",
        difficulty: "Beginner",
        type: "Isolation",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/calf.png",
        
        
        instructions: [
            "Sit in calf raise machine.",
            "Raise heels by contracting calves.",
            "Pause at top.",
            "Lower heels fully."
        ],
        tips: [
            "Full stretch at bottom.",
            "Pause squeeze at top.",
            "Controlled movement."
        ],
        mistakes: [
            "Short range.",
            "Bouncing.",
            "Too much weight."
        ]
    },
    {
    id: 51,
    name: "Treadmill Walk",
    muscle: "Cardio",
    equipment: "Treadmill",
    difficulty: "Beginner",
    type: "Cardio",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/cardio.png",
        
        
    instructions: [
        "Step onto the treadmill and start at a comfortable walking speed.",
        "Maintain an upright posture.",
        "Swing your arms naturally.",
        "Walk for the desired duration."
    ],
    tips: [
        "Keep your head up.",
        "Walk with a natural stride.",
        "Increase incline for a greater challenge."
    ],
    mistakes: [
        "Holding onto the rails constantly.",
        "Looking down at your feet.",
        "Taking overly long strides."
    ]
},
{
    id: 52,
    name: "Jog",
    muscle: "Cardio",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    type: "Cardio",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/cardio.png",
        
        
    instructions: [
        "Begin at a comfortable jogging pace.",
        "Maintain a steady rhythm.",
        "Land softly on each step.",
        "Continue for the planned duration."
    ],
    tips: [
        "Keep shoulders relaxed.",
        "Breathe rhythmically.",
        "Maintain an even pace."
    ],
    mistakes: [
        "Overstriding.",
        "Tensing the shoulders.",
        "Starting too fast."
    ]
},
{
    id: 53,
    name: "Sprint Intervals",
    muscle: "Cardio",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    type: "Cardio",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/cardio.png",
        
        
    instructions: [
        "Warm up thoroughly.",
        "Sprint at maximum effort.",
        "Recover by walking or slow jogging.",
        "Repeat for planned rounds."
    ],
    tips: [
        "Maintain proper running form.",
        "Recover fully between sprints.",
        "Explode off the ground."
    ],
    mistakes: [
        "Skipping the warm-up.",
        "Starting every sprint too aggressively.",
        "Poor recovery."
    ]
},
{
    id: 54,
    name: "Stationary Bike",
    muscle: "Cardio",
    equipment: "Bike",
    difficulty: "Beginner",
    type: "Cardio",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/cardio.png",
        
        
    instructions: [
        "Adjust seat height.",
        "Begin pedaling at an easy pace.",
        "Maintain a consistent cadence.",
        "Increase resistance if needed."
    ],
    tips: [
        "Keep knees aligned.",
        "Sit tall.",
        "Pedal smoothly."
    ],
    mistakes: [
        "Seat too high or low.",
        "Leaning heavily on handlebars.",
        "Pedaling too slowly."
    ]
},
{
    id: 55,
    name: "Rowing Machine",
    muscle: "Cardio",
    equipment: "Rowing Machine",
    difficulty: "Intermediate",
    type: "Cardio",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/cardio.png",
        
        
    instructions: [
        "Push with your legs first.",
        "Lean back slightly.",
        "Pull the handle to your chest.",
        "Return under control."
    ],
    tips: [
        "Drive with your legs.",
        "Keep your back straight.",
        "Use smooth strokes."
    ],
    mistakes: [
        "Pulling only with the arms.",
        "Rounding the back.",
        "Rushing the recovery."
    ]
},
{
    id: 56,
    name: "StairMaster",
    muscle: "Cardio",
    equipment: "StairMaster",
    difficulty: "Intermediate",
    type: "Cardio",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/cardio.png",
        
        
    instructions: [
        "Step naturally onto each stair.",
        "Maintain an upright posture.",
        "Keep a steady rhythm.",
        "Continue for the planned duration."
    ],
    tips: [
        "Use minimal hand support.",
        "Drive through your legs.",
        "Keep a consistent pace."
    ],
    mistakes: [
        "Leaning on the handles.",
        "Skipping steps.",
        "Looking down constantly."
    ]
},
{
    id: 57,
    name: "Jump Rope",
    muscle: "Cardio",
    equipment: "Jump Rope",
    difficulty: "Intermediate",
    type: "Cardio",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/cardio.png",
        
        
    instructions: [
        "Hold the rope handles comfortably.",
        "Jump lightly on the balls of your feet.",
        "Rotate the rope with your wrists.",
        "Maintain a steady rhythm."
    ],
    tips: [
        "Keep jumps low.",
        "Relax your shoulders.",
        "Use your wrists, not your arms."
    ],
    mistakes: [
        "Jumping too high.",
        "Swinging with the shoulders.",
        "Landing heavily."
    ]
},
{
    id: 58,
    name: "Burpees",
    muscle: "Cardio",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    type: "Cardio",

        images:[
        "images/exercises/bench-press-1.png",
        "images/exercises/bench-press-2.png"
        ],
        bodyMap: "image/cardio.png",
        
        
    instructions: [
        "Squat down and place your hands on the floor.",
        "Jump your feet back into a plank.",
        "Perform a push-up if desired.",
        "Jump forward and explode upward."
    ],
    tips: [
        "Land softly.",
        "Keep your core engaged.",
        "Maintain a consistent rhythm."
    ],
    mistakes: [
        "Sagging hips.",
        "Skipping full extension.",
        "Rushing with poor form."
    ]
},
{
    id: 59,
    name: "Mountain Climbers",
    muscle: "Cardio",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    type: "Cardio",

        images:[
        "images/mountainclimb1.jpg",
        "images/mountainclimb2.jpg"
        ],
        bodyMap: "image/cardio.png",
        
        
    instructions: [
        "Start in a high plank.",
        "Drive one knee toward your chest.",
        "Switch legs quickly.",
        "Maintain a flat back."
    ],
    tips: [
        "Keep your core tight.",
        "Move quickly with control.",
        "Keep shoulders over hands."
    ],
    mistakes: [
        "Hips too high.",
        "Bouncing excessively.",
        "Short range of motion."
    ]
}, 
];