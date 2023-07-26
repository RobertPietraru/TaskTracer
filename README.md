# TaskTracer 

TaskTracer is an innovative web application that aims to make task management and completing chores more enjoyable by transforming them into exciting quests and challenging monster battles. This documentation will guide you through the various components and features of the TaskTracer project.

## Requirements

Before running TaskTracer locally, ensure you have the node installed on your system:

## Installation

To set up TaskTracer on your local machine, follow these steps:

1. Clone the repository from GitHub:

```bash
git clone https://github.com/RobertPietraru/TaskTracer.git
```

2. Navigate to the project folder:

```bash
cd TaskTracer
```

3. Install the required dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

### Dashboard

The Dashboard component displays the user profile, task list (including user-created tasks, quests, and monsters), and artifacts list. It shows the user's name, XP, and level. The equipped artifacts are also displayed, providing speed boosts or increased XP for tasks.

### MonsterBoard and QuestBoard

Both the MonsterBoard and the QuestBoard components present a list of available monster tasks. Users can accept tasks and their successful completion results in earning XP and rewards.

## Task Calculation

TaskTracer calculates the XP and completion time for each task based on the user's level and equipped artifacts. The complexity of quests and monsters is dynamically adjusted according to the user's level and artifact bonuses.

## Stack

TaskTracer utilizes Vue.js, Pinia for state management and Tailwind CSS for styling