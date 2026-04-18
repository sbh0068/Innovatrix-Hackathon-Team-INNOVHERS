// SEARCH TASKS

async function searchTasks() {
  const query = document.getElementById("searchInput").value.trim();

  try {
    const res = await fetch(`http://127.0.0.1:8000/tasks?search=${query}`);
    const data = await res.json();

    const container = document.getElementById("tasksContainer");
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p>No tasks found.</p>";
      return;
    }

    data.forEach(task => {
      const div = document.createElement("div");
      div.className = "task-card";

      div.innerHTML = `
        <h3>${task.title}</h3>
        <p>MSME: ${task.company}</p>
        <p>Skill: ${task.skill}</p>
        <p>₹${task.budget}</p>
        <button class="btn" onclick="applyTask('${task.id}')">Apply</button>
        <button class="btn alt" onclick="tryTask('${task.id}')">Try Task</button>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}


// FETCH PROGRESS

async function fetchProgress() {
  try {
    const res = await fetch("http://127.0.0.1:8000/progress");
    const data = await res.json();

    const container = document.getElementById("progressContainer");
    container.innerHTML = "";

    container.innerHTML = `
      <div class="progress-box">Tasks Completed: ${data.tasks}</div>
      <div class="progress-box">Applications: ${data.applications}</div>
      <div class="progress-box">Shortlisted: ${data.shortlisted}</div>
    `;
  } catch (error) {
    console.error("Error fetching progress:", error);
  }
}


// FETCH APPLICATIONS

async function fetchApplications() {
  try {
    const res = await fetch("http://127.0.0.1:8000/applications");
    const data = await res.json();

    const container = document.getElementById("applicationsContainer");
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p>No applications yet.</p>";
      return;
    }

    data.forEach(app => {
      const div = document.createElement("div");
      div.className = "application-card";

      div.innerHTML = `
        <p>${app.company} - ${app.status}</p>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error("Error fetching applications:", error);
  }
}


// APPLY TASK

async function applyTask(taskId) {
  try {
    await fetch(`http://127.0.0.1:8000/apply/${taskId}`, {
      method: "POST"
    });

    alert("Applied successfully!");
    fetchApplications();

  } catch (error) {
    console.error("Error applying:", error);
  }
}


// TRY TASK

function tryTask(taskId) {
  alert("Task started! (You can later connect this to submission flow)");
}


//AUTO SEARCH 

document.getElementById("searchInput")
  .addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      searchTasks();
    }
  });


// INITIAL LOAD

window.onload = function () {
  fetchProgress();
  fetchApplications();
};