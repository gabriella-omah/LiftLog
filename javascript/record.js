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

{
    id: 60,
    name: "Dumbbell Pullover",
    muscle: "Chest",
    equipment: "Dumbbell",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/pullover1.jpg", "images/pullover2.jpg"],
    bodyMap: "image/chest.png",
    instructions: [
        "Lie on a bench holding one dumbbell over your chest.",
        "Keep a slight bend in your elbows.",
        "Lower the weight in an arc behind your head.",
        "Pull the dumbbell back over your chest."
    ],
    tips: [
        "Keep hips down on the bench.",
        "Move through a full stretch without pain.",
        "Control the eccentric."
    ],
    mistakes: [
        "Bending elbows too much.",
        "Arching the lower back.",
        "Using too heavy a weight."
    ]
},
{
    id: 61,
    name: "Machine Chest Press",
    muscle: "Chest",
    equipment: "Machine",
    difficulty: "Beginner",
    type: "Compound",
    images: ["images/chestpress1.jpg", "images/chestpress2.jpg"],
    bodyMap: "image/chest.png",
    instructions: [
        "Sit with back against the pad and handles at mid-chest.",
        "Press the handles forward until arms are extended.",
        "Squeeze the chest at the top.",
        "Return with control."
    ],
    tips: [
        "Keep shoulder blades against the pad.",
        "Avoid locking elbows hard.",
        "Use a full range of motion."
    ],
    mistakes: [
        "Shrugging shoulders.",
        "Partial reps.",
        "Bouncing the weight."
    ]
},
{
    id: 62,
    name: "Floor Press",
    muscle: "Chest",
    equipment: "Barbell",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/floorpress1.jpg", "images/floorpress2.jpg"],
    bodyMap: "image/chest.png",
    instructions: [
        "Lie on the floor with knees bent.",
        "Unrack the bar above your chest.",
        "Lower until upper arms touch the floor.",
        "Press back to lockout."
    ],
    tips: [
        "Pause briefly on the floor.",
        "Keep wrists stacked over elbows.",
        "Great for lockout strength."
    ],
    mistakes: [
        "Bouncing elbows off the floor.",
        "Flaring elbows too wide.",
        "Losing bar path control."
    ]
},
{
    id: 63,
    name: "Svend Press",
    muscle: "Chest",
    equipment: "Plate",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/svend1.jpg", "images/svend2.jpg"],
    bodyMap: "image/chest.png",
    instructions: [
        "Press two plates together at chest height.",
        "Extend arms forward while squeezing plates.",
        "Hold the squeeze briefly.",
        "Return to the chest."
    ],
    tips: [
        "Squeeze plates hard the whole time.",
        "Keep elbows slightly soft.",
        "Focus on the inner chest."
    ],
    mistakes: [
        "Losing plate pressure.",
        "Using momentum.",
        "Shrugging shoulders."
    ]
},
{
    id: 64,
    name: "Landmine Press",
    muscle: "Shoulders",
    equipment: "Barbell",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/landminepress1.jpg", "images/landminepress2.jpg"],
    bodyMap: "image/shoulder.png",
    instructions: [
        "Hold the end of a landmine barbell at shoulder height.",
        "Press the bar up and slightly forward.",
        "Lock out overhead in the arc of the bar.",
        "Lower with control."
    ],
    tips: [
        "Brace your core.",
        "Keep ribs down.",
        "Press in a natural arc."
    ],
    mistakes: [
        "Excessive lower-back arch.",
        "Twisting the torso.",
        "Partial lockout."
    ]
},
{
    id: 65,
    name: "Arnold Press",
    muscle: "Shoulders",
    equipment: "Dumbbell",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/arnoldpress1.jpg", "images/arnoldpress2.jpg"],
    bodyMap: "image/shoulder.png",
    instructions: [
        "Start with palms facing you at shoulder height.",
        "Rotate palms outward as you press up.",
        "Finish with arms extended overhead.",
        "Reverse the motion on the way down."
    ],
    tips: [
        "Smooth rotation under control.",
        "Keep core tight.",
        "Use moderate weight."
    ],
    mistakes: [
        "Rushing the rotation.",
        "Arching the back.",
        "Too much weight."
    ]
},
{
    id: 66,
    name: "Cable Lateral Raise",
    muscle: "Shoulders",
    equipment: "Cable",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/cablelateral1.jpg", "images/cablelateral2.jpg"],
    bodyMap: "image/shoulder.png",
    instructions: [
        "Stand beside a low cable with handle in far hand.",
        "Raise the arm out to the side to shoulder height.",
        "Pause briefly.",
        "Lower slowly."
    ],
    tips: [
        "Lead with the elbow.",
        "Slight lean away from the stack.",
        "Constant tension from the cable."
    ],
    mistakes: [
        "Swinging the body.",
        "Raising above the ear aggressively.",
        "Shrugging the trap."
    ]
},
{
    id: 67,
    name: "Barbell Shrug",
    muscle: "Shoulders",
    equipment: "Barbell",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/shrug1.jpg", "images/shrug2.jpg"],
    bodyMap: "image/shoulder.png",
    instructions: [
        "Hold a barbell at your sides or in front.",
        "Shrug shoulders straight up toward the ears.",
        "Squeeze traps at the top.",
        "Lower under control."
    ],
    tips: [
        "Move vertically, not roll forward.",
        "Pause at the top.",
        "Keep arms straight."
    ],
    mistakes: [
        "Rolling the shoulders.",
        "Bending the elbows.",
        "Using momentum."
    ]
},
{
    id: 68,
    name: "Chin Up",
    muscle: "Back",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/chinup1.jpg", "images/chinup2.jpg"],
    bodyMap: "image/back.png",
    instructions: [
        "Hang from a bar with an underhand grip.",
        "Pull your chest toward the bar.",
        "Clear the bar with your chin.",
        "Lower with control to a full hang."
    ],
    tips: [
        "Drive elbows down.",
        "Engage lats and biceps.",
        "Avoid kipping."
    ],
    mistakes: [
        "Partial range of motion.",
        "Swinging the body.",
        "Shrugging into the neck."
    ]
},
{
    id: 69,
    name: "Neutral Grip Pull Up",
    muscle: "Back",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/neutralpullup1.jpg", "images/neutralpullup2.jpg"],
    bodyMap: "image/back.png",
    instructions: [
        "Hang from parallel handles with palms facing each other.",
        "Pull up until chest reaches handle height.",
        "Squeeze the back at the top.",
        "Lower fully."
    ],
    tips: [
        "Shoulder-friendly variation.",
        "Keep core tight.",
        "Full hang between reps."
    ],
    mistakes: [
        "Short range.",
        "Using momentum.",
        "Tucking chin excessively."
    ]
},
{
    id: 70,
    name: "Pendlay Row",
    muscle: "Back",
    equipment: "Barbell",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/pendlay1.jpg", "images/pendlay2.jpg"],
    bodyMap: "image/back.png",
    instructions: [
        "Hinge until torso is near parallel to the floor.",
        "Pull the bar explosively from the floor to the lower chest.",
        "Lower the bar fully to the floor each rep.",
        "Reset posture before the next pull."
    ],
    tips: [
        "Keep back flat.",
        "Pull to the lower chest/upper abs.",
        "Pause on the floor."
    ],
    mistakes: [
        "Rounding the back.",
        "Not resetting each rep.",
        "Turning it into a cheat row."
    ]
},
{
    id: 71,
    name: "Meadows Row",
    muscle: "Back",
    equipment: "Barbell",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/meadows1.jpg", "images/meadows2.jpg"],
    bodyMap: "image/back.png",
    instructions: [
        "Stand beside a landmine barbell and hinge slightly.",
        "Grip the thick end with one hand.",
        "Row the bar toward your hip.",
        "Lower under control and switch sides."
    ],
    tips: [
        "Keep hips square.",
        "Pull with the elbow, not the wrist.",
        "Feel the lat stretch at the bottom."
    ],
    mistakes: [
        "Rotating the torso too much.",
        "Using too much arm only.",
        "Rounding the spine."
    ]
},
{
    id: 72,
    name: "Straight Arm Pulldown",
    muscle: "Back",
    equipment: "Cable",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/straightarm1.jpg", "images/straightarm2.jpg"],
    bodyMap: "image/back.png",
    instructions: [
        "Stand facing a high cable with a straight bar or rope.",
        "Keep arms nearly straight.",
        "Pull the bar down to the thighs in an arc.",
        "Return with control."
    ],
    tips: [
        "Slight hinge at the hips.",
        "Focus on lat stretch and squeeze.",
        "Keep elbows soft, not locked hard."
    ],
    mistakes: [
        "Turning it into a tricep pushdown.",
        "Rounding the upper back.",
        "Using momentum."
    ]
},
{
    id: 73,
    name: "Chest Supported Row",
    muscle: "Back",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    type: "Compound",
    images: ["images/chestsupported1.jpg", "images/chestsupported2.jpg"],
    bodyMap: "image/back.png",
    instructions: [
        "Lie chest-down on an incline bench.",
        "Hold dumbbells with arms hanging.",
        "Row the weights toward your hips.",
        "Lower fully between reps."
    ],
    tips: [
        "Removes lower-back stress.",
        "Squeeze shoulder blades together.",
        "Control the negative."
    ],
    mistakes: [
        "Shrugging the traps only.",
        "Short range of motion.",
        "Lifting the chest off the pad."
    ]
},
{
    id: 74,
    name: "Inverted Row",
    muscle: "Back",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    type: "Compound",
    images: ["images/invertedrow1.jpg", "images/invertedrow2.jpg"],
    bodyMap: "image/back.png",
    instructions: [
        "Hang under a bar with body straight.",
        "Pull chest to the bar.",
        "Squeeze the back at the top.",
        "Lower under control."
    ],
    tips: [
        "Keep hips up in a straight line.",
        "Easier than pull-ups for beginners.",
        "Feet closer = harder."
    ],
    mistakes: [
        "Sagging hips.",
        "Only pulling with arms.",
        "Incomplete range."
    ]
},
{
    id: 75,
    name: "Front Squat",
    muscle: "Quadriceps",
    equipment: "Barbell",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/frontsquat1.jpg", "images/frontsquat2.jpg"],
    bodyMap: "image/quads.png",
    instructions: [
        "Rest the bar on the front delts with elbows high.",
        "Sit down between the heels.",
        "Keep torso upright.",
        "Drive up through mid-foot."
    ],
    tips: [
        "Elbows stay high.",
        "Core braced hard.",
        "Depth as mobility allows."
    ],
    mistakes: [
        "Elbows dropping.",
        "Rounding the upper back.",
        "Heels lifting."
    ]
},
{
    id: 76,
    name: "Goblet Squat",
    muscle: "Quadriceps",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    type: "Compound",
    images: ["images/gobletsquat1.jpg", "images/gobletsquat2.jpg"],
    bodyMap: "image/quads.png",
    instructions: [
        "Hold a dumbbell or kettlebell at the chest.",
        "Squat down between the feet.",
        "Keep chest tall.",
        "Stand by driving through the heels."
    ],
    tips: [
        "Great teaching squat.",
        "Elbows inside the knees at the bottom.",
        "Control the descent."
    ],
    mistakes: [
        "Rounding the upper back.",
        "Knees caving in.",
        "Rushing the bottom."
    ]
},
{
    id: 77,
    name: "Box Squat",
    muscle: "Quadriceps",
    equipment: "Barbell",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/boxsquat1.jpg", "images/boxsquat2.jpg"],
    bodyMap: "image/quads.png",
    instructions: [
        "Set a box behind you at parallel or slightly above.",
        "Sit back onto the box with control.",
        "Pause briefly without fully relaxing.",
        "Drive up explosively."
    ],
    tips: [
        "Sit back more than straight down.",
        "Stay braced on the box.",
        "Useful for power and depth control."
    ],
    mistakes: [
        "Collapsing on the box.",
        "Rocking forward to stand.",
        "Losing upper-back tightness."
    ]
},
{
    id: 78,
    name: "Walking Lunge",
    muscle: "Quadriceps",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    type: "Compound",
    images: ["images/walkinglunge1.jpg", "images/walkinglunge2.jpg"],
    bodyMap: "image/quads.png",
    instructions: [
        "Step forward into a long lunge.",
        "Lower until both knees are about 90°.",
        "Push through the front heel and step through.",
        "Continue alternating legs."
    ],
    tips: [
        "Keep torso upright.",
        "Short steps reduce balance demand.",
        "Control each landing."
    ],
    mistakes: [
        "Front knee collapsing inward.",
        "Tiny steps.",
        "Leaning too far forward."
    ]
},
{
    id: 79,
    name: "Single-Leg Romanian Deadlift",
    muscle: "Hamstrings",
    equipment: "Dumbbell",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/slrdl1.jpg", "images/slrdl2.jpg"],
    bodyMap: "image/hamstring.png",
    instructions: [
        "Stand on one leg holding a dumbbell.",
        "Hinge at the hip and reach the weight toward the floor.",
        "Keep hips square and back flat.",
        "Return to standing and switch sides."
    ],
    tips: [
        "Soft bend in the standing knee.",
        "Move slow for balance.",
        "Feel the hamstring stretch."
    ],
    mistakes: [
        "Rounding the back.",
        "Rotating the hips open.",
        "Touching the free foot down too early."
    ]
},
{
    id: 80,
    name: "Good Morning",
    muscle: "Hamstrings",
    equipment: "Barbell",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/goodmorning1.jpg", "images/goodmorning2.jpg"],
    bodyMap: "image/hamstring.png",
    instructions: [
        "Place a light barbell across the upper back.",
        "Hinge at the hips with a soft knee bend.",
        "Lower the torso until you feel a hamstring stretch.",
        "Drive the hips forward to stand."
    ],
    tips: [
        "Start light.",
        "Keep the back flat.",
        "Brace the core."
    ],
    mistakes: [
        "Rounding the spine.",
        "Too much knee bend.",
        "Using heavy loads too soon."
    ]
},
{
    id: 81,
    name: "Nordic Hamstring Curl",
    muscle: "Hamstrings",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    type: "Isolation",
    images: ["images/nordic1.jpg", "images/nordic2.jpg"],
    bodyMap: "image/hamstring.png",
    instructions: [
        "Kneel with ankles secured.",
        "Lower your torso forward slowly while resisting with hamstrings.",
        "Catch yourself with the hands if needed.",
        "Pull yourself back up using the hamstrings."
    ],
    tips: [
        "Control the eccentric first.",
        "Keep hips extended.",
        "Progress gradually."
    ],
    mistakes: [
        "Collapsing at the hips.",
        "Dropping too fast.",
        "Not securing the ankles well."
    ]
},
{
    id: 82,
    name: "Hip Abduction Machine",
    muscle: "Glutes",
    equipment: "Machine",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/abduction1.jpg", "images/abduction2.jpg"],
    bodyMap: "image/glute.png",
    instructions: [
        "Sit in the abduction machine with pads on the outer thighs.",
        "Push the legs outward against the pads.",
        "Squeeze the glutes at the end range.",
        "Return slowly."
    ],
    tips: [
        "Lean slightly forward for more glute focus.",
        "Pause at the outer range.",
        "Controlled tempo."
    ],
    mistakes: [
        "Using momentum.",
        "Partial range.",
        "Too much weight."
    ]
},
{
    id: 83,
    name: "Hip Adduction Machine",
    muscle: "Legs",
    equipment: "Machine",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/adduction1.jpg", "images/adduction2.jpg"],
    bodyMap: "image/quads.png",
    instructions: [
        "Sit with pads on the inner thighs.",
        "Bring the legs together against resistance.",
        "Squeeze the inner thighs.",
        "Return with control."
    ],
    tips: [
        "Keep torso stable.",
        "Full range of motion.",
        "Useful accessory for adductors."
    ],
    mistakes: [
        "Jerking the weight.",
        "Short range.",
        "Holding breath."
    ]
},
{
    id: 84,
    name: "Cable Pull-Through",
    muscle: "Glutes",
    equipment: "Cable",
    difficulty: "Beginner",
    type: "Compound",
    images: ["images/pullthrough1.jpg", "images/pullthrough2.jpg"],
    bodyMap: "image/glute.png",
    instructions: [
        "Face away from a low cable holding a rope between the legs.",
        "Hinge at the hips and let the rope travel back.",
        "Drive the hips forward and squeeze the glutes.",
        "Repeat with control."
    ],
    tips: [
        "Keep arms relaxed.",
        "Movement comes from the hips.",
        "Great glute hinge pattern."
    ],
    mistakes: [
        "Squatting instead of hinging.",
        "Pulling with the arms.",
        "Overarching the low back."
    ]
},
{
    id: 85,
    name: "Frog Pump",
    muscle: "Glutes",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/frogpump1.jpg", "images/frogpump2.jpg"],
    bodyMap: "image/glute.png",
    instructions: [
        "Lie on your back with the soles of the feet together.",
        "Knees fall outward.",
        "Drive hips up and squeeze the glutes.",
        "Lower and repeat for higher reps."
    ],
    tips: [
        "Focus on a hard glute squeeze.",
        "Keep chin tucked.",
        "Great activation drill."
    ],
    mistakes: [
        "Pushing through the lower back.",
        "Feet too far from the hips.",
        "Rushing reps."
    ]
},
{
    id: 86,
    name: "Preacher Curl",
    muscle: "Biceps",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/preacher1.jpg", "images/preacher2.jpg"],
    bodyMap: "image/bicep.png",
    instructions: [
        "Rest the upper arms on a preacher pad.",
        "Curl the weight toward the shoulders.",
        "Squeeze at the top.",
        "Lower slowly to full extension."
    ],
    tips: [
        "Keeps form strict.",
        "Full stretch at the bottom.",
        "Moderate weight."
    ],
    mistakes: [
        "Lifting the arms off the pad.",
        "Swinging the weight.",
        "Incomplete extension."
    ]
},
{
    id: 87,
    name: "Incline Dumbbell Curl",
    muscle: "Biceps",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/inclinecurl1.jpg", "images/inclinecurl2.jpg"],
    bodyMap: "image/bicep.png",
    instructions: [
        "Sit on an incline bench with arms hanging.",
        "Curl the dumbbells without swinging.",
        "Squeeze the biceps at the top.",
        "Lower fully for a stretch."
    ],
    tips: [
        "Excellent long-head stretch.",
        "Keep upper arms still.",
        "Control the eccentric."
    ],
    mistakes: [
        "Swinging the torso.",
        "Elbows drifting forward.",
        "Partial range."
    ]
},
{
    id: 88,
    name: "Cable Bicep Curl",
    muscle: "Biceps",
    equipment: "Cable",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/cablecurl1.jpg", "images/cablecurl2.jpg"],
    bodyMap: "image/bicep.png",
    instructions: [
        "Stand facing a low cable with a straight bar or EZ bar.",
        "Curl the bar toward the shoulders.",
        "Squeeze at the top.",
        "Lower under constant tension."
    ],
    tips: [
        "Cables keep continuous tension.",
        "Elbows stay close to the sides.",
        "Smooth tempo."
    ],
    mistakes: [
        "Leaning back.",
        "Using momentum.",
        "Elbows flaring."
    ]
},
{
    id: 89,
    name: "Close-Grip Bench Press",
    muscle: "Triceps",
    equipment: "Barbell",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/closegrip1.jpg", "images/closegrip2.jpg"],
    bodyMap: "image/tricep.png",
    instructions: [
        "Lie on a bench with a narrower than normal grip.",
        "Lower the bar to the lower chest.",
        "Keep elbows closer to the body.",
        "Press to lockout."
    ],
    tips: [
        "Grip only slightly inside shoulder width.",
        "Great tricep mass builder.",
        "Control the descent."
    ],
    mistakes: [
        "Grip too narrow (wrist stress).",
        "Flaring elbows wide.",
        "Bouncing the bar."
    ]
},
{
    id: 90,
    name: "Tricep Kickback",
    muscle: "Triceps",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/kickback1.jpg", "images/kickback2.jpg"],
    bodyMap: "image/tricep.png",
    instructions: [
        "Hinge forward with upper arm parallel to the torso.",
        "Extend the elbow until the arm is straight.",
        "Squeeze the tricep.",
        "Return with control."
    ],
    tips: [
        "Keep the upper arm still.",
        "Use lighter weight.",
        "Pause at full extension."
    ],
    mistakes: [
        "Swinging the arm.",
        "Dropping the elbow.",
        "Too heavy a load."
    ]
},
{
    id: 91,
    name: "JM Press",
    muscle: "Triceps",
    equipment: "Barbell",
    difficulty: "Advanced",
    type: "Compound",
    images: ["images/jmpress1.jpg", "images/jmpress2.jpg"],
    bodyMap: "image/tricep.png",
    instructions: [
        "Lie on a bench holding a barbell above the chest.",
        "Lower the bar toward the upper chest/neck with elbows forward.",
        "Press back up in a short powerful path.",
        "Keep the movement controlled."
    ],
    tips: [
        "Hybrid of close-grip bench and skull crusher.",
        "Start light to learn the groove.",
        "Elbows stay relatively fixed."
    ],
    mistakes: [
        "Letting the bar drift too far.",
        "Excessive elbow flare.",
        "Ego loading."
    ]
},
{
    id: 92,
    name: "Farmer's Walk",
    muscle: "Core",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    type: "Compound",
    images: ["images/farmers1.jpg", "images/farmers2.jpg"],
    bodyMap: "image/core.png",
    instructions: [
        "Pick up a heavy dumbbell or kettlebell in each hand.",
        "Stand tall and walk a set distance.",
        "Keep core braced and shoulders packed.",
        "Set the weights down with control."
    ],
    tips: [
        "Great grip and core finisher.",
        "Short, quick steps.",
        "Stay tall — no leaning."
    ],
    mistakes: [
        "Rounding the upper back.",
        "Shuffling with poor posture.",
        "Dropping weights carelessly."
    ]
},
{
    id: 93,
    name: "Dead Bug",
    muscle: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/deadbug1.jpg", "images/deadbug2.jpg"],
    bodyMap: "image/core.png",
    instructions: [
        "Lie on your back with arms up and knees bent at 90°.",
        "Extend opposite arm and leg while keeping the low back down.",
        "Return to start.",
        "Alternate sides."
    ],
    tips: [
        "Press the lower back into the floor.",
        "Move slowly.",
        "Exhale on the extension."
    ],
    mistakes: [
        "Arching the lower back.",
        "Moving too fast.",
        "Holding the breath."
    ]
},
{
    id: 94,
    name: "Bird Dog",
    muscle: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/birddog1.jpg", "images/birddog2.jpg"],
    bodyMap: "image/core.png",
    instructions: [
        "Start on all fours.",
        "Extend opposite arm and leg.",
        "Hold briefly with a stable torso.",
        "Return and switch sides."
    ],
    tips: [
        "Keep hips level.",
        "Reach long through fingers and heel.",
        "Great for stability."
    ],
    mistakes: [
        "Rotating the hips.",
        "Sagging the low back.",
        "Rushing reps."
    ]
},
{
    id: 95,
    name: "Hanging Knee Raise",
    muscle: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/kneeraise1.jpg", "images/kneeraise2.jpg"],
    bodyMap: "image/core.png",
    instructions: [
        "Hang from a pull-up bar.",
        "Raise the knees toward the chest.",
        "Lower with control without swinging.",
        "Repeat."
    ],
    tips: [
        "Easier than full leg raises.",
        "Minimize swing.",
        "Squeeze the abs at the top."
    ],
    mistakes: [
        "Using momentum.",
        "Incomplete range.",
        "Shrugging into the neck."
    ]
},
{
    id: 96,
    name: "Woodchop",
    muscle: "Core",
    equipment: "Cable",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/woodchop1.jpg", "images/woodchop2.jpg"],
    bodyMap: "image/core.png",
    instructions: [
        "Set a cable high and stand sideways to the stack.",
        "Pull the handle down and across the body in a chopping motion.",
        "Rotate through the torso, not just the arms.",
        "Return with control and switch sides."
    ],
    tips: [
        "Rotate from the core.",
        "Feet stay planted.",
        "Useful rotational strength work."
    ],
    mistakes: [
        "Only using the arms.",
        "Twisting the knees excessively.",
        "Using too much weight."
    ]
},
{
    id: 97,
    name: "Pallof Press",
    muscle: "Core",
    equipment: "Cable",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/pallof1.jpg", "images/pallof2.jpg"],
    bodyMap: "image/core.png",
    instructions: [
        "Stand sideways to a cable set at mid-torso.",
        "Hold the handle at the chest.",
        "Press the arms straight out and resist rotation.",
        "Bring the handle back and repeat, then switch sides."
    ],
    tips: [
        "Anti-rotation core staple.",
        "Brace hard before pressing out.",
        "Start with light load."
    ],
    mistakes: [
        "Letting the cable twist you.",
        "Leaning toward the stack.",
        "Pressing too quickly."
    ]
},
{
    id: 98,
    name: "Kettlebell Swing",
    muscle: "Glutes",
    equipment: "Kettlebell",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/kbswing1.jpg", "images/kbswing2.jpg"],
    bodyMap: "image/glute.png",
    instructions: [
        "Hinge at the hips and swing the kettlebell back between the legs.",
        "Snap the hips forward to swing the bell to chest height.",
        "Let the bell float, then hinge again.",
        "Repeat in a rhythmic pattern."
    ],
    tips: [
        "Power comes from the hips, not the arms.",
        "Keep the back flat.",
        "Pack the shoulders."
    ],
    mistakes: [
        "Squatting the swing.",
        "Lifting with the arms.",
        "Rounding the back."
    ]
},
{
    id: 99,
    name: "Thruster",
    muscle: "Legs",
    equipment: "Dumbbell",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/thruster1.jpg", "images/thruster2.jpg"],
    bodyMap: "image/quads.png",
    instructions: [
        "Hold dumbbells at the shoulders.",
        "Squat down, then drive up.",
        "Use the leg drive to press the weights overhead.",
        "Lower the weights back to the shoulders and repeat."
    ],
    tips: [
        "One fluid squat-to-press motion.",
        "Brace the core.",
        "Great conditioning move."
    ],
    mistakes: [
        "Pausing too long between squat and press.",
        "Pressing with a soft core.",
        "Heels lifting in the squat."
    ]
},
{
    id: 100,
    name: "Box Jump",
    muscle: "Legs",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/boxjump1.jpg", "images/boxjump2.jpg"],
    bodyMap: "image/quads.png",
    instructions: [
        "Stand facing a sturdy box.",
        "Dip slightly and jump onto the box.",
        "Land soft with knees tracking over toes.",
        "Step down and reset."
    ],
    tips: [
        "Choose a realistic box height.",
        "Land quietly.",
        "Step down rather than jumping down when fatigued."
    ],
    mistakes: [
        "Landing stiff-legged.",
        "Box too high.",
        "Poor knee tracking on landing."
    ]
},
{
    id: 101,
    name: "Battle Ropes",
    muscle: "Cardio",
    equipment: "Battle Ropes",
    difficulty: "Intermediate",
    type: "Cardio",
    images: ["images/battleropes1.jpg", "images/battleropes2.jpg"],
    bodyMap: "image/cardio.png",
    instructions: [
        "Hold a rope end in each hand in an athletic stance.",
        "Create alternating or double waves.",
        "Keep a steady rhythm for the work interval.",
        "Rest and repeat."
    ],
    tips: [
        "Use the whole body, not just the arms.",
        "Stay light on the feet.",
        "Great HIIT finisher."
    ],
    mistakes: [
        "Standing too upright and rigid.",
        "Tiny ineffective waves.",
        "Holding the breath."
    ]
},
{
    id: 102,
    name: "Assault Bike",
    muscle: "Cardio",
    equipment: "Bike",
    difficulty: "Intermediate",
    type: "Cardio",
    images: ["images/assaultbike1.jpg", "images/assaultbike2.jpg"],
    bodyMap: "image/cardio.png",
    instructions: [
        "Sit on the air bike and grip the handles.",
        "Pedal and push/pull the arms together.",
        "Build to the target intensity.",
        "Maintain form through the interval."
    ],
    tips: [
        "Full-body cardio tool.",
        "Start easier than you think.",
        "Smooth circular pedal stroke."
    ],
    mistakes: [
        "Only using the legs.",
        "Going all-out with no pacing.",
        "Slouching on the seat."
    ]
},
{
    id: 103,
    name: "Sled Push",
    muscle: "Legs",
    equipment: "Sled",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/sledpush1.jpg", "images/sledpush2.jpg"],
    bodyMap: "image/quads.png",
    instructions: [
        "Load a sled and take a strong forward lean.",
        "Drive through the legs in short powerful steps.",
        "Keep arms extended on the poles.",
        "Push for the set distance."
    ],
    tips: [
        "Low body angle for power.",
        "Drive knees forward.",
        "Excellent conditioning and leg strength work."
    ],
    mistakes: [
        "Standing too upright.",
        "Tiny ineffective steps.",
        "Losing tension in the core."
    ]
},
{
    id: 104,
    name: "Sled Pull",
    muscle: "Back",
    equipment: "Sled",
    difficulty: "Intermediate",
    type: "Compound",
    images: ["images/sledpull1.jpg", "images/sledpull2.jpg"],
    bodyMap: "image/back.png",
    instructions: [
        "Attach a rope or harness to a sled.",
        "Walk backward or hand-over-hand pull the sled toward you.",
        "Keep posture tall and core tight.",
        "Repeat for distance or time."
    ],
    tips: [
        "Great posterior chain and conditioning work.",
        "Use controlled steps.",
        "Stay upright when walking backward."
    ],
    mistakes: [
        "Rounding the back.",
        "Jerky pulls.",
        "Overloading too soon."
    ]
},
{
    id: 105,
    name: "Medicine Ball Slam",
    muscle: "Core",
    equipment: "Medicine Ball",
    difficulty: "Beginner",
    type: "Compound",
    images: ["images/medballslam1.jpg", "images/medballslam2.jpg"],
    bodyMap: "image/core.png",
    instructions: [
        "Hold a medicine ball overhead.",
        "Slam it into the floor by driving the core and arms down.",
        "Pick the ball up and repeat.",
        "Stay athletic in the stance."
    ],
    tips: [
        "Use the whole body.",
        "Exhale on the slam.",
        "Great power and stress-relief move."
    ],
    mistakes: [
        "Only using the arms.",
        "Rounding the back on pickup.",
        "Standing too narrow."
    ]
},
{
    id: 106,
    name: "Turkish Get-Up",
    muscle: "Core",
    equipment: "Kettlebell",
    difficulty: "Advanced",
    type: "Compound",
    images: ["images/tgu1.jpg", "images/tgu2.jpg"],
    bodyMap: "image/core.png",
    instructions: [
        "Lie on your back holding a kettlebell locked out overhead.",
        "Move through the get-up sequence to standing.",
        "Keep eyes on the weight.",
        "Reverse the steps back to the floor."
    ],
    tips: [
        "Learn the steps unloaded first.",
        "Slow and deliberate.",
        "Total-body stability skill."
    ],
    mistakes: [
        "Rushing the sequence.",
        "Bending the locked-out arm.",
        "Losing eye contact with the weight."
    ]
},
{
    id: 107,
    name: "Face-Down Snow Angel",
    muscle: "Shoulders",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/snowangel1.jpg", "images/snowangel2.jpg"],
    bodyMap: "image/shoulder.png",
    instructions: [
        "Lie face down with arms at your sides.",
        "Lift the chest slightly and sweep the arms overhead like a snow angel.",
        "Keep thumbs up if possible.",
        "Return to the start with control."
    ],
    tips: [
        "Great for rear delts and posture.",
        "Small range is fine at first.",
        "Squeeze the upper back."
    ],
    mistakes: [
        "Using momentum.",
        "Cranking the neck up.",
        "Letting the arms drop to the floor each rep."
    ]
},
{
    id: 108,
    name: "Y-Raise",
    muscle: "Shoulders",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/yraise1.jpg", "images/yraise2.jpg"],
    bodyMap: "image/shoulder.png",
    instructions: [
        "Lie chest-down on an incline bench or bend at the hips.",
        "Raise light dumbbells into a Y shape overhead.",
        "Squeeze the upper back.",
        "Lower slowly."
    ],
    tips: [
        "Use very light weights.",
        "Thumbs point up.",
        "Excellent for shoulder health."
    ],
    mistakes: [
        "Too much weight.",
        "Shrugging the traps hard.",
        "Swinging the arms."
    ]
},
{
    id: 109,
    name: "Wrist Curl",
    muscle: "Arms",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    type: "Isolation",
    images: ["images/wristcurl1.jpg", "images/wristcurl2.jpg"],
    bodyMap: "image/bicep.png",
    instructions: [
        "Sit with forearms on the thighs and wrists hanging off the knees.",
        "Curl the weight upward using only the wrists.",
        "Squeeze the forearm.",
        "Lower under control."
    ],
    tips: [
        "Small range is normal.",
        "Use light weight and higher reps.",
        "Works grip and forearm flexors."
    ],
    mistakes: [
        "Moving the elbows.",
        "Using momentum.",
        "Too heavy a load."
    ]
}
];