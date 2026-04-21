export function updateDateTime() {
    const now = new Date();

    const date = now.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    });

    const weekday = now.toLocaleDateString("en-US", {
        weekday: "long"
    });

    document.getElementById("current-date").innerText = date;
    document.getElementById("current-day").innerText = weekday;
}