export function checkGameStats() {
    const hasSeenPrompt = localStorage.getItem("hasSeenGamePrompt");
    const gameStats = localStorage.getItem("gameStats");

    if (!hasSeenPrompt && gameStats) {
        const resume = window.confirm("Resume or reset?");
        if (!resume) {
            localStorage.removeItem("gameStats");
        }
        localStorage.setItem("hasSeenGamePrompt", "true");
    }
}

export function saveGameStats(stats) {
    localStorage.setItem("gameStats", JSON.stringify(stats));
}
