function updateGreeting() {
    const hours = new Date().getHours();
    let greeting;
    let emoji;
    if (hours >= 5 && hours < 12) {
        greeting = "good morning!";
        emoji = "🌄"
    } else if (hours >= 12 && hours < 18) {
        greeting = "good afternoon!";
        emoji = "⛅"
    } else {
        greeting = "good evening!";
        emoji = "🌆";
    }
    document.getElementById("js-greeting").textContent = greeting;
    document.getElementById("js-emoji").textContent = emoji;
}
updateGreeting();
