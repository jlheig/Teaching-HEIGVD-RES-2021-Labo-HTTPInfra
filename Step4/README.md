# Step 4 - Ajax requests with JQuery

> Author : Blanc Jean-Luc
> Date : 30.05.2021

## Description

In this step, we had to edit the static website so he would perform asynchronous requests towards the dynamic website

## Container

First to start we need to create a container for our apache static php server.
To do so we will use this dockerfile : 

```
FROM php:7.2-apache
COPY src/ /var/www/html/
RUN apt-get update && apt-get install -y vim
```

Once we have finished creating our dockerfile, we need to enter those 2 commands so we can build and run our container : 

```
docker build -t res/apache_php_2 .
docker run  res/apache_php_2
```

## JQuery Script

Here is the content of the JQuery script used in order to send requests : 

```
$(function() {
	console.log("Loading animals");
	
	function loadAnimals() {
		$.getJSON( "/api/animals/", function( animals ) {
			console.log(animals);
			var message = "Nothing is here";
			if( animals.length > 0 ) {
				message = animals[0].firstName + " the " + animals[0].species;
			}
			$(".animal").text(message);
		});
	};
	
	loadAnimals();
	setInterval( loadAnimals, 5000 );
});
```

Here is the proof that this script works : 

![image-20210530204834774](/images/image1.png)

On this first screen we can see that after a short time, we have received many arrays, all containing animals : 

![image-20210530204931624](/images/image2.png)

We can also see that they all have the same type, just like we wanted.

Next screen shows how it is displayed on the website : 

![image-20210530204747941](/images/image3.png)





!!! Important note !!! : Don't forget to include JQuery.js in the script folder so your own script can use it, otherwise it won't work, your js folder should contain at least : 

* jquery.js
* yourScript.js

![image-20210530204611718](/images/image4.png)

## Reverse Proxy importance

The reverse proxy is sending requests to both the static and dynamic server. He is responsible for forwarding the right request to the correct server. Without the reverse proxy, the static server wouldn't be able to access the script on the dynamic server since both servers are on different containers.





