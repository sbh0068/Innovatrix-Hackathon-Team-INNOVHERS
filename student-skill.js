async function submitSkill() {
  const skills = document.getElementById("skills").value.trim();
  const tasks = document.getElementById("tasksCompleted").value.trim();
  const github = document.getElementById("github").value.trim();

  if (!skills || !tasks || !github) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/submit-skill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        skills,
        tasks_completed: tasks,
        github_link: github
      })
    });

    if (res.ok) {
      alert("Skill submitted successfully!");
    } else {
      alert("Submission failed");
    }

  } catch (err) {
    console.error(err);
  }
}