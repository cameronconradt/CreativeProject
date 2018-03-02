var app = new Vue({
	el: '#app',
	data: {
		number: 0,
		current_pos: 0,
		pos: {},
		current: '',
		loading: true,
	},
	created: function() {
		this.start();
	},
	watch: {
		number: function(value, oldvalue){
			this.start();
		},
		current_pos: function(value, oldvalue){
			this.start();
		}
	},
	methods: {
		start: function(){
			if(!(this.number in this.pos))
				Vue.set(this.pos, this.number, 0);
			console.log('http://localhost:8000/' + this.number + '/' + this.pos[this.number] + '.txt');
			fetch('http://localhost:8000/' + this.number + '/' + this.pos[this.number] + '.txt').then(response => {
				console.log(response);
			return response.text();
			}).then(txt => {
				this.loading = false;
				this.current = txt;
			})
		},
		nextPage: function(){
			this.current_pos += 2;
			Vue.set(this.pos, this.number, this.current_pos);
		},
		lastPage: function(){
			this.number = this.number - 2;
		},
	}
});