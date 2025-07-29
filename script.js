const habitForm = document.getElementById('habit-form');
const habitsContainer = document.getElementById('habits-container');

let habits =[];

habitForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const habitName = document.getElementById('habit-name').value.trim();
    const habitDuration = parseInt(document.getElementById("habit-duration").value);

    if (!habitName || isNaN(habitDuration) || habitDuration < 1) {
        alert("Please enter a valid habit name and duration.");
        return;
    }

    const habit = {
        name: habitName,
        days: Array(habitDuration).fill(false),
    };

    habits.push(habit);
    document.getElementById('habit-name').value = '';
    document.getElementById('habit-duration').value = '';
    renderHabits();
});


function renderHabits() {
    habitsContainer.innerHTML ='';
    habits.forEach((habit, index) => {
        const habitDiv = document.createElement('div');
        habitDiv.classList.add('habit');

        const habitName = document.createElement('span');
        habitName.classList.add('habit-name');
        habitName.textContent = habit.name;


        const habitDays = document.createElement('div');
        habitDays.classList.add('habit-days');

        habit.days.forEach((day, dayIndex) => {
            const dayCircle = document.createElement('div');
            dayCircle.textContent = dayIndex + 1;
            if (day) dayCircle.classList.add('completed');

            dayCircle.addEventListener('click', () => {
                habit.days[dayIndex] = !habit.days[dayIndex];
                renderHabits();
            });

            habitDays.appendChild(dayCircle);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-habit");
        deleteButton.addEventListener("click", () => {
            habits.splice(index, 1); 
            renderHabits();
        });


        habitDiv.appendChild(habitName);
        habitDiv.appendChild(habitDays);
        habitDiv.appendChild(deleteButton);
        habitsContainer.appendChild(habitDiv); 
    });
}

