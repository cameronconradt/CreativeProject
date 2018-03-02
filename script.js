var app = new Vue({
	el: '#app',
	data: {

	},
	created: function() {
		this.start();
	},
	methods: {
		start: function(){
			fetch('/images/0.txt').then(response => {
			return response.txt();
			}).then(txt => {
				console.log(txt);
			})
		}
	}
});