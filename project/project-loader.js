function getProjectIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

fetch("projects.json")
  .then(response => response.json())
  .then(data => {
    const projectId = getProjectIdFromUrl();
    const project = data[projectId];

    if (!project) {
      document.getElementById("project-title").textContent = "Project Not Found";
      return;
    }

    document.getElementById("project-title").textContent = project.title;
    const contentContainer = document.getElementById("project-content");

    project.content.forEach(block => {
      if (block.type === "text") {
        const paragraph = document.createElement("p");
        // Use innerHTML instead of textContent to parse HTML tags like <br>
        paragraph.innerHTML = block.data;
        contentContainer.appendChild(paragraph);
      } else if (block.type === "image") {
        const img = document.createElement("img");
        img.src = block.data;
        img.alt = project.title;
        contentContainer.appendChild(img);
      }
    });
  })
  .catch(error => {
    console.error("Error loading project data:", error);
  });
