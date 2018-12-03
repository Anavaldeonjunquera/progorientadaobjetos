
const {CreativeWork} = require("./creativework.js");
var Type = require('type-of-is');
var idArticle=1;
class Article extends CreativeWork{
  update(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,articleSection,pagination,wordCount){
    super.update(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version);
    this.articleSection=articleSection;
    this.pagination=pagination;
    this.wordCount=wordCount;
  }
}
let articles = [];
let article=new Article();
article.update(0,"Viajeros",true,false,1980,3,"Cultura","7-10",300);
let article2=new Article();
article2.update(1,"Viajeros2",false,false,1983,3,"Sociedad","15-20",500);
articles.push(article);
articles.push(article2);
// Funciones que se exportan
// Utilizan patrón callback,
// invocándose con una función next(error, valor) que se llama al terminar


exports.getArticle = function(id,next) {
  console.log(`Buscando Article ${id} Articles:`);
  console.log(articles);
  let encontrado=false;
  for(let i=0;i<articles.length;i++){
    if(articles[i].id==id){
      encontrado=true;
      let myarticle = {"@context":"http://schema.org","@type":"Article","id":articles[i].id,"name":articles[i].name,"isFamilyFriendly":articles[i].isFamilyFriendly,"isAccessibleForFree":articles[i].isAccessibleForFree,"copyrightYear":articles[i].copyrightYear,"version":articles[i].version,"articleSection":articles[i].articleSection,"pagination":articles[i].pagination,"wordCount":articles[i].wordCount}; 
      next(null,myarticle);
    }
  }
  if(!encontrado)
	  next(new Error("Cannot find record with id " + id));
 
};

exports.insertaArticle = function (id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,articleSection,pagination,wordCount,next) {
  if (name == null) next("Campo name es obligatorio");
  else if (copyrightYear == null) next("Campo copyrightYear es obligatorio");
  else if (version == null) next("Campo version es obligatorio");
  else if (isFamilyFriendly == null) next("Campo isFamilyFriendly es obligatorio");
  else if (isAccessibleForFree == null) next("Campo isAccessibleForFree es obligatorio");
  else if (articleSection == null) next("Campo articleSection es obligatorio");
  else if (pagination == null) next("Campo pagination es obligatorio");
  else if (wordCount == null) next("Campo wordCount es obligatorio");
  else if(!Type.is(name,String)) next("Campo name debe ser string");
	else if(!Number.isInteger(copyrightYear)) next("Campo copyrightYear debe ser numerico");
	else if(!Number.isInteger(version)) next("Campo version debe ser numerico");
	else if(!Type.is(isFamilyFriendly,Boolean)) next("Campo isFamilyFriendly debe ser boolean");
	else if(!Type.is(isAccessibleForFree,Boolean)) next("Campo isAccessibleForFree debe ser boolean");
	else if(!Type.is(articleSection,String)) next("Campo articleSection debe ser string");
  else if(!Type.is(pagination,String)) next("Campo pagination debe ser string");
  else if(!Number.isInteger(wordCount)) next("Campo wordCount debe ser numerico");
  else {
    idArticle++;
    var record = new Article();
    record.update(idArticle,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,articleSection,pagination,wordCount);
    articles.push(record);
    next(null,idArticle+"");
	}
};

exports.borraArticle = function (id,next) {
  let encontrado=false;
  for(let i=0;i<articles.length;i++){
    if(articles[i].id==id){
      encontrado=true;
      articles.splice(articles.indexOf(articles[i]),1);
	    next(null,articles);
    }
  }
  if (!encontrado)
	  next(new Error("No existe Article con id " + id));
};

exports.modificaArticle = function(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,articleSection,pagination,wordCount,next) {
  let encontrado=false;
  if (name == null) next("Campo name es obligatorio");
  else if (copyrightYear == null) next("Campo copyrightYear es obligatorio");
  else if (version == null) next("Campo version es obligatorio");
  else if (isFamilyFriendly == null) next("Campo isFamilyFriendly es obligatorio");
  else if (isAccessibleForFree == null) next("Campo isAccessibleForFree es obligatorio");
  else if (articleSection == null) next("Campo articleSection es obligatorio");
  else if (pagination == null) next("Campo pagination es obligatorio");
  else if (wordCount == null) next("Campo wordCount es obligatorio");
  else if(!Type.is(name,String)) next("Campo name debe ser string");
	else if(!Number.isInteger(copyrightYear)) next("Campo copyrightYear debe ser numerico");
	else if(!Number.isInteger(version)) next("Campo version debe ser numerico");
	else if(!Type.is(isFamilyFriendly,Boolean)) next("Campo isFamilyFriendly debe ser boolean");
	else if(!Type.is(isAccessibleForFree,Boolean)) next("Campo isAccessibleForFree debe ser boolean");
	else if(!Type.is(articleSection,String)) next("Campo articleSection debe ser string");
  else if(!Type.is(pagination,String)) next("Campo pagination debe ser string");
  else if(!Number.isInteger(wordCount)) next("Campo wordCount debe ser numerico");
  else {
    for(let i=0;i<articles.length;i++){
      if(articles[i].id==id){
        encontrado=true;
        var record = new Article();
        record.update(articles[i].id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,articleSection,pagination,wordCount);  
        articles[i] = record;
        next(null,articles);
      }
    }
    if(!encontrado)
      next(new Error("No se puede modificar Article que no existe. id = " + id)) ; 
    }
};

exports.toHTML = function() {
 return '<ul>' + articles.map(function(article,i){
    return '<li>' + article.id+' '+article.name + ' ' + article.isFamilyFriendly + ' ' + article.isAccessibleForFree + ' ' + article.copyrightYear + ' ' + article.version+ ' ' + article.articleSection+ ' ' + article.pagination+ ' ' + article.wordCount + '</li>';
 }).join('') + '</ul>' ;
}; 


exports.toText = function() {
 return articles.map(function(article,i){
	return ' - ' + article.id+' '+article.name + ' ' + article.isFamilyFriendly + ' ' + article.isAccessibleForFree + ' ' + article.copyrightYear + ' ' + article.version+ ' '+ article.articleSection+ ' ' + article.pagination+ ' ' + article.wordCount + '\n';
  }).join('');	
};

exports.toJson = function() {
  let envio=[];
	for(let i=0;i<articles.length;i++){
		let jsonaenviar={"@context":"http://schema.org","@type":"Article","id":articles[i].id,"name":articles[i].name,"isFamilyFriendly":articles[i].isFamilyFriendly,"isAccessibleForFree":articles[i].isAccessibleForFree,"copyrightYear":articles[i].copyrightYear,"version":articles[i].version,"articleSection":articles[i].articleSection,"pagination":articles[i].pagination,"wordCount":articles[i].wordCount};
		envio.push(jsonaenviar);
	}
	return JSON.stringify(JSON.stringify(envio));
};

exports.toXML = function() {
  return '<articles>' + articles.map(function(article,i){
     return '<article id =' + article.id + '>' +
                '<name>' +article.name+ '</article>'+
                '<isFamilyFriendly>' + article.isFamilyFriendly + '</isFamilyFriendly>' +
                '<isAccessibleForFree>' + article.isAccessibleForFree + '</isAccessibleForFree>' +
                '<copyrightYear>' + article.copyrightYear + '</copyrightYear>' +
                '<version>' + article.version + '</version>' +
                '<articleSection>'+article.articleSecion+'</articleSection>'+
                '<pagination>'+article.pagination+'</pagination>'+
                '<wordCount>'+article.wordCount+'</wordCount>'+
		      '</article>';
   }).join('') +
	   '</articles>';
};