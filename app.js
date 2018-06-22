const 	express 	= 	require('express'),
	app 		= 	express(),
	mongoose 	=	require('mongoose'),
	bodyParser 	=	require("body-parser"),
	port 		= 	process.env.PORT || 3000,
	ip 		=	process.env.IP || "localhost",
      	dns 		= 	require('dns');

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.json());

//Connection to DB
mongoose.connect('mongodb://localhost:27017/url_shortener_microservice')
.then( () => {
    console.log("connected to mongoDB")
});

//Model
const 	Schema = mongoose.Schema,
	urlSchema = new Schema({
		original_url: String,
		short_url: String,
		id: Number
		}),
	URL = mongoose.model('url', urlSchema);


//Routes
app.get('/', (req, res) => {
	res.render("index")
});

app.post("/api/shorturl/new", (req, res) => {
	const url = req.body.url;
	dns.lookup(url.split("/")[2], (err, address) => {
    	if (address !== null) {
    	let id =  Math.round(Math.random()*10000);
	const 	data 	=	{
				original_url: url,
				short_url: 	"https://fallacious-orange.glitch.me/api/shorturl/" + id,
				id: id
			};
//Save the data => DB
	let toSave = new URL(data);
	toSave.save(function (err) {
		if (err) throw err;
			res.json(data)
		});	
		} else {
			res.json({"error":"invalid URL"})
		}
  	});
});

app.get('/api/shorturl/:id', (req, res) => {
  	URL.findOne({id: req.params.id}, (err, request) => {
    		console.log(request.original_url);
    		res.redirect(request.original_url)
  	})
});

//Server
app.listen(port, ip, () => {
	console.log("server is listening on http://" + ip + ":" + port + "/")
});

