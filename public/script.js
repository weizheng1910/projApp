console.log("working!")

var allButtons = document.querySelectorAll('.done')

console.log(allButtons)



for(let i = 0; i < allButtons.length; i++){

		let id = allButtons[i].getAttribute('id');

		allButtons[i].addEventListener('click', function(evt){
		console.log("Computer can read id! : "+id)

		// what to do when we recieve the request
		var responseHandler = function() {
		  console.log("response text", this.responseText);
		  console.log("status text", this.statusText);
		  console.log("status code", this.status);

		};

			// make a new request
		var request = new XMLHttpRequest();

		// listen for the request response
		request.addEventListener("load", responseHandler);

		// ready the system by calling open, and specifying the url
		var url = "http://localhost:3000/test/"+id;
		request.open("GET", url);

		// send the request
		request.send();
			})
}
