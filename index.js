$('.dropdown').dropdown({
    transition: 'drop'
});

window.onload = function (e) {
    var app = new Vue({
        el: "#app",
        data: {
            red: {
                score: 0,
                striker: null,
                defense: null
            },
            blue: {
                score: 0,
                striker: null,
                defense: null
            },
            history: []
        },
        methods: {
            score: function (player) {
                var color = null;
                if (player === this.red.striker || player === this.red.defense) {
                    this.red.score++;
                    color = "red";
                } else if (player === this.blue.striker || player === this.blue.defense) {
                    this.blue.score++;
                    color = "blue";
                } else {
                    console.error("Cannot determine team for " + player);
                }

                this.history.unshift({
                    playerName: player.name,
                    dept: player.dept,
                    event: player.name !== "Sanyi" ? "Goal" : "Own Goal",
                    isPositive: player.name !== "Sanyi",
                    isRed: color === "red",
                    timestamp: moment().format("HH:mm:ss")
                });
            },
            setPlayer: function(team, position) {
                if (team === "red" && position === "defense") {
                    this.red.defense = { name: "Sanyi", dept: "Puli" };
                } else if (team === "red" && position === "striker") {
                    this.red.striker = { name: "Józsi", dept: "Puli" };
                } else if (team === "blue" && position === "defense") {
                    this.blue.defense = { name: "Marci", dept: "Comms" };
                } else if (team === "blue" && position === "striker") {
                    this.blue.striker = { name: "Rudi", dept: "Comms" };
                } else {
                    console.error("Invalid team and/or position: [" + team + "], [" + position + "]");
                }
            }
        }
    });
}
