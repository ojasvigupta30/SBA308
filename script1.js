//Input Data
const CourseInfo = {
    id: 451,
    name: "Introduction to Javascript",
  };
  
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451, // CourseInfo id
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ],
  };
  
  const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
          submitted_at: "2023-01-25",
          score: 47
      }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
          submitted_at: "2023-02-12",
          score: 150
        }
      },
      {
        learner_id: 125,
        assignment_id: 3,
        submission: {
          submitted_at: "2023-01-25",
          score: 400
        }
      },
      {
        learner_id: 132,
        assignment_id: 1,
        submission: {
          submitted_at: "2023-01-24",
          score: 39
        }
      },
      {
        learner_id: 132,
        assignment_id: 2,
        submission: {
          submitted_at: "2023-03-07",
          score: 140
        }
      }
  ];



  
  function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
    let results = []; //output expected as an array
  
    //Check if assigment group's course id matches the course id in course info
    if (assignmentGroup.course_id !== courseInfo.id) {
      throw new Error("AssignmentGroup does not belong to this course!"); //if not throw error
    }
  
    //Create an object to store values for individual learners
    let learners = {};
  
    // Organize submissions by learner
    for (let i = 0; i < learnerSubmissions.length; i++) {
      let submissions = learnerSubmissions[i];
      let assignment;
  
      // Find assignment using a loop
      for (let j = 0; j < assignmentGroup.assignments.length; j++) {
        if (assignmentGroup.assignments[j].id === submissions.assignment_id) { //Cheack if assignment ID matches the submitted assigment's ID
          assignment = assignmentGroup.assignments[j];
          break;
        }
      }
  
      if (!assignment) { //if no assigment found, continue to the next object
        continue;
    }
  
      let isLate = new Date(submissions.submission.submitted_at) > new Date(assignment.due_at); //check the dates of submisson to the due date
      let score = submissions.submission.score; //store the scores received

      let currentDate = new Date(); //check current date
      let dueDate = new Date(assignment.due_at); 
      if (currentDate < dueDate) { //if current date < due date, skip the assignment submitted
        continue; 
      }

      // Deduct 10% if late
      if (isLate) {
        score -= assignment.points_possible * 0.1;
      }

      
  
      // Initialize learner data if not present
      if (!learners[submissions.learner_id]) {
        learners[submissions.learner_id] = {
          id: submissions.learner_id,
          avg: 0,
          totalScore: 0,          // For tracking total score
          totalPossiblePoints: 0  // For tracking total possible points
        };
      }
  
      
      learners[submissions.learner_id][assignment.id] = score / assignment.points_possible;
      

    
      
      // Update total score and possible points for average calculation
      learners[submissions.learner_id].totalScore += score;
      learners[submissions.learner_id].totalPossiblePoints += assignment.points_possible;


      
    }
  
    // Calculate average for each learner and prepare the final result
    for (let learnerId in learners) {
      let learner = learners[learnerId];
      learner.avg = learner.totalScore / learner.totalPossiblePoints;
  
      // Delete stuff not needed in output
      delete learner.totalScore;
      delete learner.totalPossiblePoints;
    
  
      results.push(learner); //push learners calculated ouptput object into final result array
    }
  
    return results;
  }
  


  try {
    let result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    console.log(result);
  } 
  catch (error) {
    console.error("Error: ", error.message);
  }







//   expected output

//   const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];