// Portfolio JavaScript

document.addEventListener("DOMContentLoaded", function () {

    console.log("Portfolio loaded successfully!");

    // Project button
    const projectButton = document.querySelector(".btn");

    if (projectButton) {
        projectButton.addEventListener("click", function () {
            console.log("Projects section opened.");
        });
    }

    // Load projects from backend
    loadProjects();
});


async function loadProjects() {

    const projectsContainer =
        document.getElementById("projects-container");

    if (!projectsContainer) {
        return;
    }

    try {

        /*
         * Replace this URL with your LIVE API URL
         * after we deploy the backend.
         */

        const response = await fetch(
            "YOUR_API_URL/api/projects"
        );

        if (!response.ok) {
            throw new Error("Failed to load projects");
        }

        const projects = await response.json();

        projectsContainer.innerHTML = "";

        projects.forEach(function (project) {

            const card = document.createElement("div");

            card.className = "project-card";

            card.innerHTML = `
                <h3>${project.title}</h3>

                <p>
                    ${project.description}
                </p>
            `;

            projectsContainer.appendChild(card);
        });

    } catch (error) {

        console.error("Unable to load projects:", error);

        /*
         * Keep the existing projects visible if
         * the backend is unavailable.
         */

    }
}
