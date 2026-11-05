
// Get HTML elements
const reportForm = document.querySelector("#report-form");
const reportList = document.querySelector("#reports-list");
const dialog = document.querySelector("#report-dialog");
const openButton = document.querySelector("#open-modal");
const closeButton = document.querySelector("#close-modal");

// Initial reports
let reports = [
    {
        name: "Accessibility Review",
        owner: "Priya",
        status: "Completed"
    },
    {
        name: "UI Component Audit",
        owner: "Team A",
        status: "In progress"
    },
    {
        name: "Monthly Summary",
        owner: "Team B",
        status: "Ready"
    }
];

// Load saved reports
const savedReports = localStorage.getItem("accessboardReports");

if (savedReports !== null) {
    try {
        reports = JSON.parse(savedReports);

        if (!Array.isArray(reports)) {
            reports = [];
        }
    } catch {
        reports = [];
    }
}

// Save reports
function saveReports() {
    localStorage.setItem(
        "accessboardReports",
        JSON.stringify(reports)
    );
}

// Display reports
function displayReports() {

    reportList.innerHTML = "";

    reports.forEach(function(report, index) {

        const row = document.createElement("tr");

        const name = document.createElement("th");
        name.scope = "row";
        name.textContent = report.name;

        const owner = document.createElement("td");
        owner.textContent = report.owner;

        const status = document.createElement("td");
        status.textContent = report.status;

        const action = document.createElement("td");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.type = "button";
        deleteButton.dataset.index = index;

        action.appendChild(deleteButton);

        row.append(name, owner, status, action);

        reportList.appendChild(row);
    });
}

// Open popup
openButton.addEventListener("click", function() {
    dialog.showModal();
});

// Close popup
closeButton.addEventListener("click", function() {
    dialog.close();
});

// Add report
reportForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.querySelector("#report-name").value.trim();
    const owner = document.querySelector("#report-owner").value.trim();
    const status = document.querySelector("#report-status").value;

    if (!name || !owner) return;

    reports.push({
        name: name,
        owner: owner,
        status: status
    });

    saveReports();
    displayReports();

    reportForm.reset();
    dialog.close();
});

// Delete report
reportList.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-btn")) {

        const index = Number(event.target.dataset.index);

        reports.splice(index, 1);

        saveReports();
        displayReports();
    }
});

// Initial display
displayReports();
