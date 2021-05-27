var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send( generateRostersOfAnimals() );
});

app.listen(3000, function () {
	console.log('Accepting HTTP requests on port 3000.');
});

function generateRostersOfAnimals() {
	var numberOfAnimals = chance.integer({
		min: 0,
		max: 10
	});
	console.log(numberOfAnimals);
	var animals = [];
	var type = chance.pickone(['ocean', 'desert', 'grassland', 'forest', 'farm', 'pet', 'zoo']);
	for (var i = 0; i < numberOfAnimals; i++) {
		var gender = chance.gender();
		var birthYear = chance.year({
			min: 2012,
			max: 2021
		});
		animals.push({
			firstName: chance.first({
				gender: gender
			}),
			species: chance.animal({type: type}),
			type: type,
			gender: gender,
			birthday: chance.birthday({
				year: birthYear
			})
		});
	};
	console.log(animals);
	return animals;
}