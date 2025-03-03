function updateGreeting() {
    const hours = new Date().getHours();
    let greeting;

    if (hours >= 5 && hours < 12) {
        greeting = "good morning!";
    } else if (hours >= 12 && hours < 18) {
        greeting = "good afternoon!";
    } else {
        greeting = "good evening!";
    }

    document.getElementById("js-greeting").textContent = greeting;
}

updateGreeting();
