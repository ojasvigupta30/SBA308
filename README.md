# JavaScript Learner Data Processing

## Overview

This project is designed to process learner submissions for assignments in a JavaScript course, calculating each learner's weighted average score for the assignments that are due. It also handles late submissions, deducting 10% of the total points if an assignment is submitted after its due date.

The final output is an array of objects where each object contains:
- The learner's ID.
- Their weighted average score.
- Their scores for each assignment in percentage form.

## Features

- **Assignment Due Date Check**: Only includes assignments that are past their due date.
- **Late Submission Handling**: Deducts 10% from the learner's score for assignments submitted after the due date.
- **Weighted Average Calculation**: Calculates the weighted average score based on the possible points for each assignment.
- **Error Handling**: Throws an error if the assignment data doesn't match the course.
- **Flexible Structure**: The code handles any number of learners, assignments, and courses with easy-to-understand logic.

## Technologies Used

- **JavaScript (ES6)**: The core language used in this project.
- **Node.js**: For running the script in a JavaScript runtime environment.



