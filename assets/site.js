const projects = Array.isArray(window.AI_SHOWCASE_PROJECTS)
    ? window.AI_SHOWCASE_PROJECTS.filter((project) => project.path)
    : [];

const projectList = document.getElementById("project-list");

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#39;");
}

if (projectList) {
    projectList.innerHTML = projects.map((project) => `
        <li>
            <a href="${escapeHtml(project.path)}">${escapeHtml(project.title)}</a>
        </li>
    `).join("");
}
