var http= require('http'),
    url = require('url'),
    Negotiator = require('negotiator');

var creativeWorks = require('./creativeworks.js');
var books=require("./books.js");
var articles=require("./articles.js");
http.createServer(procesa).listen(3000);
console.log("Servidor arrancado");

function procesa(req,resp) {
	resp.setHeader('Access-Control-Allow-Origin', '*');
	resp.setHeader('Access-Control-Request-Method', '*');
	resp.setHeader('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
	resp.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		resp.writeHead(200);
		resp.end();
		return;
	}  


	var urlparsed = url.parse(req.url,true);
	var path=urlparsed.pathname;
	if(path=='/'){
			switch (req.method) {
				case 'GET':
					resp.setHeader('content-type',"application/json"); 
					resp.write(JSON.stringify('[{"nombre":"creativeWork"},{"nombre":"book"},{"nombre":"article"}]'));
					resp.end();
					break;
				default:
					notAllowed("El método no está soportado",resp);
					break;
			}
	}else if(path=='/creativework'){
			switch (req.method) {
				case 'GET': 
					showCreativeWorks(req,resp);
					break;
				case 'POST':
					parseBody(req,resp,crearCreativeWork); 
					break;
				case 'DELETE':
					notAllowed("Intento de borrar todos los Creative Works",resp);
					break;
				case 'PUT':
					notAllowed("Intento de modificar todos los Creative Works",resp);
					break;
				default:
					notAllowed("El método no está soportado",resp);
					break;
			}
	}else if (path.startsWith('/creativework/')){
			let id = path.split('/')[2];
			switch (req.method) {
				case 'GET': 
					listarCreativeWork(id,req,resp);
					break;
				case 'DELETE':
					borrarCreativeWork(id,req,resp);
					break;
				case 'POST':
					notAllowed("No se puede hacer POST sobre un Creative Work concreto",resp);
					break;
				case 'PUT':
					parseBody(req,resp,function (post) {
						modificarCreativeWork(post,id,req,resp);
					});
					break;
				default:
					notAllowed("El método no está soportado",resp);
					break;
				};
	}else if(path=='/book'){
		switch (req.method) {
			case 'GET': 
				showBooks(req,resp);
				break;
			case 'POST':
				parseBody(req,resp,crearBook); 
				break;
			case 'DELETE':
				notAllowed("Intento de borrar todos los Books",resp);
				break;
			case 'PUT':
				notAllowed("Intento de modificar todos los Books",resp);
				break;
			default:
				notAllowed("El método no está soportado",resp);
				break;
		}
	}else if (path.startsWith('/book/')){
			let id = path.split('/')[2];
			switch (req.method) {
				case 'GET': 
					listarBook(id,req,resp);
					break;
				case 'DELETE':
					borrarBook(id,req,resp);
					break;
				case 'POST':
					notAllowed("No se puede hacer POST sobre un Book concreto",resp);
					break;
				case 'PUT':
					parseBody(req,resp,function (post) {
						modificarBook(post,id,req,resp);
					});
					break;
				default:
					notAllowed("El método no está soportado",resp);
					break;
				};
	}else if(path=='/article'){
			switch (req.method) {
				case 'GET': 
					showArticles(req,resp);
					break;
				case 'POST':
					parseBody(req,resp,crearArticle); 
					break;
				case 'DELETE':
					notAllowed("Intento de borrar todos los Articles",resp);
					break;
				case 'PUT':
					notAllowed("Intento de modificar todos los Articles",resp);
					break;
				default:
					notAllowed("El método no está soportado",resp);
					break;
			}
		}else if (path.startsWith('/article/')){
				let id = path.split('/')[2];
				switch (req.method) {
					case 'GET': 
						listarArticle(id,req,resp);
						break;
					case 'DELETE':
						borrarArticle(id,req,resp);
						break;
					case 'POST':
						notAllowed("No se puede hacer POST sobre un Article concreto",resp);
						break;
					case 'PUT':
						parseBody(req,resp,function (post) {
							modificarArticle(post,id,req,resp);
						});
						break;
					default:
						notAllowed("El método no está soportado",resp);
						break;
					};
	}else{
			notAllowed("No existe esa direccion",resp);
	}
}

function isEmpty(query) {
	return Object.keys(query) == 0 ;
}

function listarCreativeWork(id,req,resp) {
	creativeWorks.getCreativeWork(id,function (err,creativeWork) {
		if (err) notAllowed("No se encuentra Creative Work " + id, resp);
		else {
			resp.write(JSON.stringify(creativeWork));
			resp.end();
		}
	});
}

var availableMediaTypes = ['text/html', 'text/plain', 'application/ld+json', 'application/xml'];

function showCreativeWorks(req,resp) {
	var negotiator = new Negotiator(req);
	var mediaType = negotiator.mediaType(availableMediaTypes);
	console.log("Mediatype selected: " + mediaType);
	switch (mediaType) {
	case 'text/plain':
		resp.setHeader('content-type',mediaType);
		resp.end(creativeWorks.toText());
		break;
	case 'application/xml': 
		resp.setHeader('content-type',mediaType);
		resp.end(creativeWorks.toXML());
		break;
	case 'application/ld+json': 
		resp.setHeader('content-type',mediaType);
		resp.end(creativeWorks.toJson());
		break;
	case 'text/html':
	default:
		resp.setHeader('content-type','text/html');
		resp.end(creativeWorks.toHTML());	
	}
}

function borrarCreativeWork(id,req,resp) {
	console.log("Borrando Creative Work " + id);
	creativeWorks.borraCreativeWork(id, function(err,creativeWorks) {
	 if (err) notAllowed("No se puede borrar " + id, resp);
	 else{
		resp.statusCode=200;
		resp.end(); 
	 }
	});
}

function crearCreativeWork(post,req,resp) {
	post=JSON.parse(post);
	let name = post.name,
		 isFamilyFriendly = post.isFamilyFriendly,
		 isAccessibleForFree=post.isAccessibleForFree,
		 copyrightYear=post.copyrightYear,
		 version=post.version;
	console.log("Creando CreativeWork " + name);
    creativeWorks.insertaCreativeWork(name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version, function(err,id) {
    	if (err) notAllowed("No se puede crear Creative Work", resp);
    	else{
			resp.statusCode=200;
			resp.write(id);
			resp.end(); 
		} 
    });
}

function modificarCreativeWork(post,id,req,resp) {
	post=JSON.parse(post);
	let name = post.name,
		 isFamilyFriendly = post.isFamilyFriendly,
		 isAccessibleForFree=post.isAccessibleForFree,
		 copyrightYear=post.copyrightYear,
		 version=post.version;
	creativeWorks.modificaCreativeWork(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,function(err,als) {
		if (err) notAllowed("No se puede modificar Creative Work " + id,resp);
		else{
			resp.statusCode=200;
			resp.end(); 
		}
	});
}








function listarArticle(id,req,resp) {
	articles.getArticle(id,function (err,article) {
		if (err) notAllowed("No se encuentra Article " + id, resp);
		else {
			resp.write(JSON.stringify(article));
			resp.end();
		}
	});
}

var availableMediaTypes = ['text/html', 'text/plain', 'application/ld+json', 'application/xml'];

function showArticles(req,resp) {
	var negotiator = new Negotiator(req);
	var mediaType = negotiator.mediaType(availableMediaTypes);
	console.log("Mediatype selected: " + mediaType);
	switch (mediaType) {
	case 'text/plain':
		resp.setHeader('content-type',mediaType);
		resp.end(articles.toText());
		break;
	case 'application/xml': 
		resp.setHeader('content-type',mediaType);
		resp.end(articles.toXML());
		break;
	case 'application/ld+json': 
		resp.setHeader('content-type',mediaType);
		resp.end(articles.toJson());
		break;
	case 'text/html':
	default:
		resp.setHeader('content-type','text/html');
		resp.end(articles.toHTML());	
	}
}

function borrarArticle(id,req,resp) {
	console.log("Borrando Article " + id);
	articles.borraArticle(id, function(err,articles) {
	 if (err) notAllowed("No se puede borrar " + id, resp);
	 else{
		resp.statusCode=200;
		resp.end(); 
	 } 
	});
}

function crearArticle(post,req,resp) {
	post=JSON.parse(post);
	let name = post.name,
		 id=post.id,
		 isFamilyFriendly = post.isFamilyFriendly,
		 isAccessibleForFree=post.isAccessibleForFree,
		 copyrightYear=post.copyrightYear,
		 version=post.version,
		 articleSection=post.articleSection,
		 pagination=post.pagination,
		 wordCount=post.wordCount;
	console.log("Creando Article " + name);
    articles.insertaArticle(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,articleSection,pagination,wordCount, function(err,id) {
    	if (err) notAllowed("No se puede crear Article", resp);
    	else{
			resp.statusCode=200;
			resp.write(id);
			resp.end();
		}
    });
}

function modificarArticle(post,id,req,resp) {
	post=JSON.parse(post);
	let name = post.name,
		 isFamilyFriendly = post.isFamilyFriendly,
		 isAccessibleForFree=post.isAccessibleForFree,
		 copyrightYear=post.copyrightYear,
		 version=post.version,
		 articleSection=post.articleSection,
		 pagination=post.pagination,
		 wordCount=post.wordCount;
	articles.modificaArticle(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,articleSection,pagination,wordCount,function(err,als) {
		if (err) notAllowed("No se puede modificar Article " + id,resp);
		else {
			resp.statusCode=200;
			resp.end(); 
		}
	});
}









function listarBook(id,req,resp) {
	books.getBook(id,function (err,book) {
		if (err) notAllowed("No se encuentra Book " + id, resp);
		else {
			resp.write(book);
			resp.end();
		}
	});
}

var availableMediaTypes = ['text/html', 'text/plain', 'application/ld+json', 'application/xml'];

function showBooks(req,resp) {
	var negotiator = new Negotiator(req);
	var mediaType = negotiator.mediaType(availableMediaTypes);
	console.log("Mediatype selected: " + mediaType);
	switch (mediaType) {
	case 'text/plain':
		resp.setHeader('content-type',mediaType);
		resp.end(books.toText());
		break;
	case 'application/xml': 
		resp.setHeader('content-type',mediaType);
		resp.end(books.toXML());
		break;
	case 'application/ld+json': 
		resp.setHeader('content-type',mediaType);
		resp.end(books.toJson());
		break;
	case 'text/html':
	default:
		resp.setHeader('content-type','text/html');
		resp.end(books.toHTML());	
	}
}

function borrarBook(id,req,resp) {
	console.log("Borrando Book " + id);
	books.borraBook(id, function(err,books) {
	 if (err) notAllowed("No se puede borrar " + id, resp);
	 else{
		resp.statusCode=200;
		resp.end(); 
	 }
	});
}

function crearBook(post,req,resp) {
	post=JSON.parse(post);
	console.log(post);
	var name = post.name,
		 id=post.id,
		 isFamilyFriendly = post.isFamilyFriendly,
		 isAccessibleForFree=post.isAccessibleForFree,
		 copyrightYear=post.copyrightYear,
		 version=post.version,
		 bookEdition=post.bookEdition,
		 isbn=post.isbn,
		 numberOfPages=post.numberOfPages,
		 abridged=post.abridged;
	console.log("Creando Book " + name);
    books.insertaBook(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,bookEdition,isbn,numberOfPages,abridged, function(err,id) {
    	if (err) notAllowed("No se puede crear Book", resp);
    	else {
			resp.statusCode=200;
			resp.write(id);
			resp.end();
		}
    });
}

function modificarBook(post,id,req,resp) {
	post=JSON.parse(post);
	console.log(post);
	var name = post.name,
		 isFamilyFriendly = post.isFamilyFriendly,
		 isAccessibleForFree=post.isAccessibleForFree,
		 copyrightYear=post.copyrightYear,
		 version=post.version,
		 bookEdition=post.bookEdition,
		 isbn=post.isbn,
		 numberOfPages=post.numberOfPages,
		 abridged=post.abridged;
	books.modificaBook(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,bookEdition,isbn,numberOfPages,abridged,function(err,als) {
		if (err) notAllowed("No se puede modificar Book " + id,resp);
		else {
			resp.statusCode=200;
			resp.end(); 
		}
	});
}

function notAllowed(msg, resp) {
	resp.statusCode = 405;
	resp.write(msg);
	resp.end();
}

function parseBody(req, resp, next) {
	var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6) {
        	console.log("Body too big!");
            req.connection.destroy();
        }
    });
    req.on('end', function () {
		//var post = qs.stringify(body);
		var post=JSON.parse(body);
		
        next(post,req,resp);
    });
}