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

    document.querySelectorAll("#current-date").forEach(el => el.innerText = date);
    document.querySelectorAll("#current-day").forEach(el => el.innerText = weekday);
}