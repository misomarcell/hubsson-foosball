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
            score: function(player) {
                if (player === this.red.striker || player === this.red.defense) {
                    this.red.score++;
                } else if (player === this.blue.striker || player === this.blue.defense) {
                    this.blue.score++;
                } else {
                    console.error("Cannot determine team for " + player);
                }

                this.history.push({
                    playerName: player.name,
                    dept: player.dept,
                    event: "Goal",
                    isPositive: player.name != "Sanyi"
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
