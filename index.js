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
        computed: {
            players: function() {
                return [
                    this.red.striker,
                    this.red.defense,
                    this.blue.striker,
                    this.blue.defense
                ].filter(p => p != null);
            }
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
                    event: player.name !== "Sanyi" ? "Goal • 2:1" : "Own Goal",
                    isPositive: player.name !== "Sanyi",
                    isRed: color === "red",
                    timestamp: moment().format("HH:mm:ss")
                });
            },
            setPlayer: function (team, position) {
                if (team === "red" && position === "defense") {
                    this.red.defense = { name: "Sanyi", dept: "Puli", fullName: "Sandor Koncz" };
                } else if (team === "red" && position === "striker") {
                    this.red.striker = { name: "Józsi", dept: "Puli", fullName: "Jozsef Sipos" };
                } else if (team === "blue" && position === "defense") {
                    this.blue.defense = { name: "Marci", dept: "Comms", fullName: "Marcell Miso" };
                } else if (team === "blue" && position === "striker") {
                    this.blue.striker = { name: "Rudi", dept: "Comms", fullName: "Rudolf Serfozo" };
                } else {
                    console.error("Invalid team and/or position: [" + team + "], [" + position + "]");
                }

            },
            removeHistoryItem: function (item) {
                var index = this.history.indexOf(item);
                if (index > -1) {
                    this.history.splice(index, 1);
                }
            }
        }
    });
}
