import express from "express";
import axios from "axios";

const app = express();
const PORT = 5000;
const heroesUrl = `http://localhost:4000`;

app.use(express.json());

const putMessage = async (url, body) => {
    return await axios({
        url: url,
        method: "put",
        headers: {
            Accept: "application/json",
        },
        data: body,
    });
};

const threats = [
    {
        id: 1,
        displayName: "Pisa tower is about to collapse.",
        necessaryPowers: ["flying"],
        img: "tower.jpg",
        assignedHero: 0,
    },
    {
        id: 2,
        displayName: "Engineer is going to clean up server-room.",
        necessaryPowers: ["teleporting"],
        img: "mess.jpg",
        assignedHero: 0,
    },
    {
        id: 3,
        displayName: "John will not understand the joke",
        necessaryPowers: ["clairvoyance"],
        img: "joke.jpg",
        assignedHero: 0,
    },
];

app.get("/threats", (req, res) => {
    console.log("Returning threats list");
    res.status(200).json(threats);
});

app.post("/assignment", async (req, res) => {
    const { heroId, threatId } = req.body;

    let url = `${heroesUrl}/heroes/${heroId}`;
    const data = await putMessage(url, req.body);
    if (!data) {
        res.status(404).json({ message: "Issues dey here" });
    }

    let threat = threats.find((threat) => threat.id === Number(threatId));
    threat.assignedHero = Number(heroId);
    res.status(200).json(threat);
});

app.listen(PORT, console.log(`Threats Service is running on port ${PORT}`));
