const cors = require("cors");

const fruits = require("./fruits.json");

const express = require("express");
const app = express();

// const logger = require("./logger"); gonna develop middleware called logger
// app.use(logger);


app.use('/fruits', express.json()); //only will work with fruits section rather than whole site/app?
// app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Hello, this is the Fruit API home page. ");
})

app.get("/fruits", (req, res) => {
    res.send(fruits); // returns the whole json file.
})

app.get("/fruits/:name", (req, res) => {
    //res.send(`Return a fruit with name of ${req.params.name}`);
    const name = req.params.name.toLowerCase();
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === name);
    if (fruit === undefined) {
        res.status(404).send();

    } else {
        res.send(fruit);
    }

})

app.post('/fruits', (req, res) => {
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === req.body.name.toLowerCase());
    if (fruit != undefined) {
        res.status(409).send();

    }else {
        //Add fruit to JSON file.
        fruits.push(req.body);
        res.status(201).send(req.body);

    }
})

app.delete('/fruits/:name', (req, res) => {
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === req.params.name.toLowerCase());
    if (fruit === undefined) {
        res.status(404).send();

    }else {
        const indexToDelete = fruits.indexOf(fruit);
        fruits.splice(indexToDelete, 1);
        res.status(204).send();

    }
})


module.exports = app








//generic post request - 

// app.post("/fruits", (req, res) => {
//     const fruit = req.body;
//     console.log(req.body);

//     //Add the fruit

    

//     res.send("New fruit created.")
// })