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