async function fetchSubmissions() {
    try {
        const res = await fetch("http://127.0.0.1:8000/submissions");
        const data = await res.json();

        const container = document.getElementById("submissionsContainer");
        container.innerHTML = "";

        if (data.length === 0) {
            container.innerHTML = "<p>No submissions yet.</p>";
            return;
        }

        data.forEach(item => {
            const div = document.createElement("div");
            div.className = "applicant-card";

            div.innerHTML = `
        <h3>${item.name}</h3>
        <p>Skills: ${item.skills}</p>
        <p>Tasks Completed: ${item.tasks_completed}</p>
        <a href="${item.github_link}" target="_blank">View Work</a>
      `;

            container.appendChild(div);
        });

    } catch (err) {
        console.error(err);
    }
}

window.onload = function () {
    fetchSubmissions();
    fetchStudents();
};



// fetch students
async function fetchStudents() {
    try {
        const res = await fetch("http://127.0.0.1:8000/applied-students");
        const data = await res.json();

        const dropdown = document.getElementById("studentsDropdown");
        dropdown.innerHTML = '<option value="">View Applied Students</option>';

        data.forEach(student => {
            const option = document.createElement("option");
            option.value = student.id;
            option.textContent = student.name;

            dropdown.appendChild(option);
        });

    } catch (err) {
        console.error("Error fetching students:", err);
    }
}


// Submit challenge
async function submitChallenge() {
    const jobPost = document.getElementById("jobPost").value.trim();
    const task = document.getElementById("taskInput").value.trim();
    const studentId = document.getElementById("studentsDropdown").value;

    if (!jobPost || !task || !studentId) {
        alert("Please fill all fields!");
        return;
    }

    try {
        const res = await fetch("http://127.0.0.1:8000/create-challenge", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                job_post: jobPost,
                task: task,
                student_id: studentId
            })
        });

        if (res.ok) {
            alert("Challenge created successfully!");
        } else {
            alert("Failed to create challenge");
        }

    } catch (err) {
        console.error("Error submitting challenge:", err);
    }
}