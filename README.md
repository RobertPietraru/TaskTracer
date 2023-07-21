# Task tracer

The hero starts at level 1 with 0 XP and an empty task list.
The hero can view the Quest Board and choose a quest to accept. Accepting a
quest adds it to their active tasks.
The hero can view the Monster Arena and add monster-related tasks to their
active tasks to prepare for the battle.
The hero can manage their tasks and mark them as completed to gain XP.
Completing tasks, quests, and defeating monsters grants XP and moves the hero
closer to defeating the evil sorcerer.

Hero Dashboard: Display the hero's profile with their name, level, and current
experience points (XP). Also, show the list of active tasks the hero needs to
complete.

Quest Board: List quests that the hero can take on to gain XP. Each quest has a
task description, due date, and XP reward. The hero can choose to accept a
quest, which will add it to their active tasks.

Artifacts Inventory: Allow the hero to gather powerful artifacts during their
quests. Artifacts provide **bonus XP** or reduce **task completion time**.

Monster Arena: Display menacing monsters the hero needs to defeat. Each
monster has a task description, due date (time until the monster attacks the
kingdom), and XP reward. The hero can add monster-related tasks to their active
tasks and defeat monsters by completing these tasks.

Task Management: The hero can add, edit, and delete tasks from their active
tasks. They can also mark tasks as completed.

Level Up: As the hero gains XP, their level increases. Higher levels unlock new
quests and artifacts.


# Pages
## Hero dashboard
1. Profile 
    - name
    - level
    - XP
2. Tasks
Left side profile (avatar on top, information below). Layout is |   "NAME" • level
                                                                |1 -----------10xp---2
                                                                | Inventory
                                                                | [item] [item] [item]
                                                                | [item] [item] [item]
                                                                | [item] [item] [item]
Right side tasks (list). Layout is 
                                   | Quest board        [Explore quests]
                                   | quest 1 [complete] [give up]
                                   | quest 2 [complete] [give up]
                                   | task 3    [complete] [edit]  [delete]

## Quest Board
A list of all the possible quests based on the level

## Monster arena

Monster(Task):
- task description
- due date 
- xp reward