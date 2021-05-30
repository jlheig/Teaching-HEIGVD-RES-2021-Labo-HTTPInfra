# Step 2 - Dynamic HTTP server with Express

> Author : Blanc Jean-Luc
> Date : 30.05.2021

## Description

In this step, we will simply create and start a Docker container for node xyz so we can use a dynamic website.

## Container

First to start we need to create a container for our node server.
To do so we will use this dockerfile : 

```
FROM node:14.17
COPY src /opt/app
CMD ["node", "/opt/app"]
```

Once we have finished creating our dockerfile, we need to enter those 2 commands so we can build and run our container : 

```
docker build -t res/express_students .
docker run -p 9090:3000 res/express_students
```

## Express.js

Here is the code of the index.js file to generate random animals : 



```javascript
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
```

Here we use the Chancejs generator to create some random animals, we give them names, birthdays, genders and species according to their type.

We have access to only a limited amount of types for our animals : 

* ocean
* desert
* pet
* grassland
* forest
* farm
* zoo

## Result

Here is the result when we try to access the dynamic server : 

![image-20210530195503392](/images/image1.png)

We can see that our script rightfully generated multiple animals, gave them names, genders, birthdays and species according to their type.

Our application received the information correctly, as we can see it displayed on the website

