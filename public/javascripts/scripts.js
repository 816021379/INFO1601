Vue.prototype.$http = axios
var input = document.getElementById("screen_name");

var app = new Vue({
  el: '#app',
  data: { screen_name:"",
  users:[],

  },
  methods: {
  	submit:function(){
  		  this.$http.post("/",{
  		screen_name:this.screen_name
	}).then(function(res){
		app.users=res.data
    console.log(res.data)
    console.log(screen_name)
	}).catch(function(error){
		console.log(error) 
	})
  	}
  }
})
