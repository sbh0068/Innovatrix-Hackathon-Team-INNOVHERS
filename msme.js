// FETCH APPLICANTS

async function fetchApplicants() {
  try {
    const res = await fetch("http://127.0.0.1:8000/applicants");
    const data = await res.json();

    const container = document.getElementById("applicantsContainer");
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p>No applicants yet.</p>";
      return;
    }

    data.forEach(applicant => {
      const card = document.createElement("div");
      card.className = "applicant-card";

      card.innerHTML = `
        <div>
          <h3>${applicant.name}</h3>
          <p>Skills: ${applicant.skills}</p>
          <p>⭐ ${applicant.rating}</p>
        </div>
        <div class="actions">
          <button class="btn" onclick="shortlist('${applicant.id}')">Shortlist</button>
          <button class="btn alt" onclick="reject('${applicant.id}')">Reject</button>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error fetching applicants:", error);
  }
}


// POST TASK

async function postTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const description = document.getElementById("taskDescription").value.trim();
  const skills = document.getElementById("taskSkills").value.trim();
  const budget = document.getElementById("taskBudget").value.trim();

  if (!title || !description || !skills || !budget) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: description,
        skills: skills,
        budget: budget
      })
    });

    if (res.ok) {
      alert("Task posted successfully!");

      // clear fields
      document.getElementById("taskTitle").value = "";
      document.getElementById("taskDescription").value = "";
      document.getElementById("taskSkills").value = "";
      document.getElementById("taskBudget").value = "";

    } else {
      alert("Failed to post task");
    }

  } catch (error) {
    console.error("Error posting task:", error);
  }
}


// SHORTLIST

async function shortlist(id) {
  try {
    await fetch(`http://127.0.0.1:8000/shortlist/${id}`, {
      method: "POST"
    });

    alert("Candidate shortlisted!");
    fetchApplicants(); 

  } catch (error) {
    console.error("Error shortlisting:", error);
  }
}


// REJECT 

async function reject(id) {
  try {
    await fetch(`http://127.0.0.1:8000/reject/${id}`, {
      method: "POST"
    });

    alert("Candidate rejected!");
    fetchApplicants(); 

  } catch (error) {
    console.error("Error rejecting:", error);
  }
}


// INITIAL LOAD

window.onload = function () {
  fetchApplicants();
};