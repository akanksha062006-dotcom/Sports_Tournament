
// =====================================
// SPORTS TOURNAMENT MANAGEMENT SYSTEM
// =====================================

// Display notification
function showNotification(message) {
    let notification = document.getElementById("notification");

    if (!notification) {
        notification = document.createElement("div");
        notification.id = "notification";
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #a3ff12;
            color: #101820;
            padding: 15px 22px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 9999;
        `;
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.style.display = "block";

    clearTimeout(window.notificationTimer);

    window.notificationTimer = setTimeout(() => {
        notification.style.display = "none";
    }, 2500);
}

// =====================================
// SPORTS FILTER
// =====================================

function filterSport(sport) {

    const teamContainer =
        document.querySelector(".team-container");

    const teams = sportsData.teams.filter(team =>
        sport === "All" || team.sport === sport
    );

    teamContainer.innerHTML = "";

    teams.forEach(team => {

        const card = document.createElement("div");

        card.className = "team-card";

        const heading = document.createElement("h3");
        heading.textContent = team.name;

        const category = document.createElement("p");
        category.textContent =
            team.sport + " | " + team.players + " players";

        card.appendChild(heading);
        card.appendChild(category);

        teamContainer.appendChild(card);
    });

    showNotification(
        sport === "All"
            ? "Showing all sports teams"
            : "Showing " + sport + " teams"
    );
}

// Make sports cards clickable
document.querySelectorAll(".sport-card").forEach(card => {

    card.style.cursor = "pointer";

    card.addEventListener("click", () => {

        const heading = card.querySelector("h3");

        if (heading) {
            filterSport(heading.textContent.trim());
        }

    });

});

// =====================================
// MATCH DISPLAY
// =====================================

function displayMatches() {

    const matchSection =
        document.querySelector("#matches");

    matchSection.innerHTML = "<h2>Upcoming Matches</h2>";

    sportsData.matches.forEach(match => {

        const card = document.createElement("div");
        card.className = "match-card";

        const details = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent =
            match.team1 + " vs " + match.team2;

        const info = document.createElement("p");
        info.textContent =
            match.sport + " | " + match.time;

        const status = document.createElement("span");
        status.textContent = match.status;

        details.appendChild(title);
        details.appendChild(info);

        card.appendChild(details);
        card.appendChild(status);

        matchSection.appendChild(card);
    });
}

// =====================================
// NAVIGATION ACTIVE STATE
// =====================================

const navigationLinks =
    document.querySelectorAll(".sidebar nav a");

navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        navigationLinks.forEach(item =>
            item.classList.remove("active")
        );

        link.classList.add("active");

    });

});

// =====================================
// INITIALIZE APPLICATION
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    filterSport("All");
    displayMatches();

    console.log(
        "Sports Tournament Management System loaded!"
    );

});
