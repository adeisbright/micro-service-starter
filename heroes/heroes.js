import express from "express";
const PORT = 4000;
const app = express();

//Available powers for our heroes
const powers = [
    { id: 1, name: "Flying" },
    { id: 2, name: "Teleporting" },
    { id: 3, name: "Super Strength" },
    { id: 4, name: "Clairvoyance" },
    { id: 5, name: "Mind Reading" },
];

//Heroes and their superpowers
const heroes = [
    {
        id: 1,
        type: "spider-dog",
        displayName: "Cooper",
        powers: [1, 4],
        img: "cooper.jpg",
        busy: false,
    },
    {
        id: 2,
        type: "flying-dogs",
        displayName: "Jack & Buddy",
        powers: [2, 5],
        img: "jack_buddy.jpg",
        busy: false,
    },
    {
        id: 3,
        type: "dark-light-side",
        displayName: "Max & Charlie",
        powers: [3, 2],
        img: "max_charlie.jpg",
        busy: false,
    },
    {
        id: 4,
        type: "captain-dog",
        displayName: "Rocky",
        powers: [1, 5],
        img: "rocky.jpg",
        busy: false,
    },
];

app.use(express.json());

app.get("/heroes", async (req, res) => {
    res.status(200).json(heroes);
});

app.get("/powers", async (req, res) => {
    res.status(200).json(powers);
});

//Update  attributes of a particular hero
app.put("/heroes/:id", (req, res) => {
    const heroId = Number(req.params.id);

    const foundHero = heroes.find((hero) => hero.id === heroId);

    if (!foundHero) {
        res.status(404).json({ message: "Hero Not Found" });
    }

    for (let key of Object.keys(foundHero)) {
        if (foundHero.hasOwnProperty(key) && req.body[key]) {
            foundHero[key] = req.body[key];
            console.log(`Set ${key} to ${req.body[key]} in hero: ${heroId}`);
        }
    }
    res.status(202)
        .header({
            Location: `http://localhost:${PORT}/hero/${foundHero.id}`,
        })
        .json(foundHero);
});

app.listen(PORT, () =>
    console.log(`Heroes Service is running on port ${PORT}`)
);
