const projects = Array.isArray(window.AI_SHOWCASE_PROJECTS) ? window.AI_SHOWCASE_PROJECTS : [];

const projectGrid = document.getElementById("project-grid");
const previewFrame = document.getElementById("preview-frame");
const previewEmpty = document.getElementById("preview-empty");
const detailTitle = document.getElementById("detail-title");
const detailLink = document.getElementById("detail-link");
const projectDetail = document.getElementById("project-detail");
const metricTotal = document.getElementById("metric-total");
const metricReady = document.getElementById("metric-ready");
const metricFuture = document.getElementById("metric-future");

let selectedId = null;

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#39;");
}

function getSelectedProject() {
    return projects.find((project) => project.id === selectedId) || projects[0];
}

function renderMetrics() {
    const readyCount = projects.filter((project) => Boolean(project.path)).length;
    metricTotal.textContent = String(projects.length);
    metricReady.textContent = String(readyCount);
    metricFuture.textContent = String(projects.length - readyCount);
}

function renderCards() {
    projectGrid.innerHTML = projects.map((project) => {
        const activeClass = project.id === selectedId ? "is-active" : "";
        const tags = project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");

        return `
            <button class="project-card ${activeClass}" type="button" data-project-id="${escapeHtml(project.id)}"
                style="--card-accent: ${escapeHtml(project.accent)};">
                <div class="project-top">
                    <span class="project-label">
                        <span class="project-dot"></span>
                        ${escapeHtml(project.label)}
                    </span>
                    <span class="project-status">${escapeHtml(project.status)}</span>
                </div>
                <h3>${escapeHtml(project.title)}</h3>
                <p>${escapeHtml(project.description)}</p>
                <div class="tag-row">${tags}</div>
            </button>
        `;
    }).join("");

    document.querySelectorAll("[data-project-id]").forEach((button) => {
        button.addEventListener("click", () => {
            selectProject(button.getAttribute("data-project-id"));
        });
    });
}

function renderDetail(project) {
    detailTitle.textContent = project.title;
    projectDetail.innerHTML = `
        <p class="detail-subtitle">${escapeHtml(project.label)}</p>
        <p class="detail-description">${escapeHtml(project.longDescription || project.description)}</p>
        <div class="detail-meta">
            ${project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <ul class="detail-list">
            ${project.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}
        </ul>
    `;
}

function renderPreview(project) {
    document.documentElement.style.setProperty("--accent", project.accent);

    if (project.path) {
        detailLink.removeAttribute("aria-disabled");
        detailLink.href = project.path;
        detailLink.textContent = "打开页面";
        previewEmpty.hidden = true;
        previewFrame.hidden = false;

        if (previewFrame.getAttribute("src") !== project.path) {
            previewFrame.setAttribute("src", project.path);
        }
        return;
    }

    detailLink.href = "#project-grid";
    detailLink.textContent = "等待新页面";
    detailLink.setAttribute("aria-disabled", "true");
    previewFrame.hidden = true;
    previewFrame.removeAttribute("src");
    previewEmpty.hidden = false;
}

function selectProject(id) {
    selectedId = projects.some((project) => project.id === id) ? id : projects[0]?.id;
    const project = getSelectedProject();

    if (!project) {
        return;
    }

    if (window.location.hash !== `#${project.id}`) {
        history.replaceState(null, "", `#${project.id}`);
    }

    renderCards();
    renderDetail(project);
    renderPreview(project);
}

function init() {
    if (!projects.length) {
        projectGrid.innerHTML = "<p>暂无项目数据。</p>";
        return;
    }

    renderMetrics();

    const hashId = window.location.hash.replace("#", "");
    selectedId = projects.some((project) => project.id === hashId) ? hashId : projects[0].id;
    selectProject(selectedId);
}

window.addEventListener("hashchange", () => {
    const hashId = window.location.hash.replace("#", "");
    if (hashId && hashId !== selectedId) {
        selectProject(hashId);
    }
});

init();
