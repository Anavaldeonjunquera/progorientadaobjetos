
const {CreativeWork} = require("./creativework.js");
var Type = require('type-of-is');
var idBook=1;
class Book extends CreativeWork{
  update(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,bookEdition,isbn,numberOfPages,abridged){
    super.update(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version);
    this.bookEdition=bookEdition;
    this.isbn=isbn;
    this.numberOfPages=numberOfPages;
    this.abridged=abridged;
  }
}
let books = [];
let book=new Book();
book.update(0,"Viajeros",true,false,1980,3,"Tercera","asdf123",450,false);
let book2=new Book();
book2.update(1,"Viajeros2",false,false,1983,3,"Tercera","asdf1232",890,true);
books.push(book);
books.push(book2);
// Funciones que se exportan
// Utilizan patrón callback,
// invocándose con una función next(error, valor) que se llama al terminar


exports.getBook = function(id,next) {
  console.log(`Buscando Book ${id} Books:`);
  let encontrado=false;
  for(let i=0;i<books.length;i++){
    if(books[i].id==id){
      encontrado=true;
      let myBook = JSON.stringify({"@context":"http://schema.org","@type":"Book","id":books[i].id,"name":books[i].name,"isFamilyFriendly":books[i].isFamilyFriendly,"isAccessibleForFree":books[i].isAccessibleForFree,"copyrightYear":books[i].copyrightYear,"version":books[i].version,"bookEdition":books[i].bookEdition,"isbn":books[i].isbn,"numberOfPages":books[i].numberOfPages,"abridged":books[i].abridged}); 
      next(null,myBook);
    }
  }
  if (!encontrado)
    next(new Error("Cannot find record with id " + id));
  
};

exports.insertaBook = function (id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,bookEdition,isbn,numberOfPages,abridged,next) {
  if(name == null) next("Campo name es obligatorio");
  else if (copyrightYear == null) next("Campo copyrightYear es obligatorio");
  else if (version == null) next("Campo version es obligatorio");
  else if (isFamilyFriendly == null) next("Campo isFamilyFriendly es obligatorio");
  else if (isAccessibleForFree == null) next("Campo isAccessibleForFree es obligatorio");
  else if (bookEdition == null) next("Campo bookEdition es obligatorio");
  else if (isbn == null) next("Campo isbn es obligatorio");
  else if (numberOfPages == null) next("Campo numberOfPages es obligatorio");
  else if (abridged == null) next("Campo abridged es obligatorio");
  else if(!Type.is(name,String)) next("Campo name debe ser string");
	else if(!Number.isInteger(copyrightYear)) next("Campo copyrightYear debe ser numerico");
	else if(!Number.isInteger(version)) next("Campo version debe ser numerico");
	else if(!Type.is(isFamilyFriendly,Boolean)) next("Campo isFamilyFriendly debe ser boolean");
	else if(!Type.is(isAccessibleForFree,Boolean)) next("Campo isAccessibleForFree debe ser boolean");
  else if(!Type.is(bookEdition,String)) next("Campo bookEdition debe ser string");
  else if(!Type.is(isbn,String)) next ("campo isbn debe ser string");
  else if(!Number.isInteger(numberOfPages)) next ("campo numberOfPages debe ser numerico");
  else if(!Type.is(abridged,Boolean)) next ("campo abridged debe ser boolean");
	else {
    idBook++;
    var record = new Book();
    record.update(idBook,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,bookEdition,isbn,numberOfPages,abridged);
    books.push(record);
		next(null,idBook+"");
	}
};

exports.borraBook = function (id,next) {
  let encontrado=false;
  for(let i=0;i<books.length;i++){
    if(books[i].id==id){
      encontrado=true;
      books.splice(books.indexOf(books[i]),1);
      next(null,books);
    }
  }
  if(!encontrado)
    next(new Error("No existe Book con id " + id));
};

exports.modificaBook = function(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,bookEdition,isbn,numberOfPages,abridged,next) {
  if(id==null) next("Campo id es obligatorio");
  else if(name == null) next("Campo name es obligatorio");
  else if (copyrightYear == null) next("Campo copyrightYear es obligatorio");
  else if (version == null) next("Campo version es obligatorio");
  else if (isFamilyFriendly == null) next("Campo isFamilyFriendly es obligatorio");
  else if (isAccessibleForFree == null) next("Campo isAccessibleForFree es obligatorio");
  else if (bookEdition == null) next("Campo bookEdition es obligatorio");
  else if (isbn == null) next("Campo isbn es obligatorio");
  else if (numberOfPages == null) next("Campo numberOfPages es obligatorio");
  else if (abridged == null) next("Campo abridged es obligatorio");
  else if(!Type.is(name,String)) next("Campo name debe ser string");
	else if(!Number.isInteger(copyrightYear)) next("Campo copyrightYear debe ser numerico");
	else if(!Number.isInteger(version)) next("Campo version debe ser numerico");
	else if(!Type.is(isFamilyFriendly,Boolean)) next("Campo isFamilyFriendly debe ser boolean");
	else if(!Type.is(isAccessibleForFree,Boolean)) next("Campo isAccessibleForFree debe ser boolean");
  else if(!Type.is(bookEdition,String)) next("Campo bookEdition debe ser string");
  else if(!Type.is(isbn,String)) next ("campo isbn debe ser string");
  else if(!Number.isInteger(numberOfPages)) next ("campo numberOfPages debe ser numerico");
  else if(!Type.is(abridged,Boolean)) next ("campo abridged debe ser boolean");
	else {
    let encontrado=false;
    for(let i=0;i<books.length;i++){
      if(books[i].id==id){
        encontrado=true;
        var record = new Book();
        record.update(books[i].id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,bookEdition,isbn,numberOfPages,abridged);  
        books[i] = record;
        next(null,books);
      }
    }
    if (!encontrado)
      next(new Error("No se puede modificar Creative Work que no existe. id = " + id)) ; 
  }
};

exports.toHTML = function() {
 return '<ul>' + books.map(function(book,i){
    return '<li>' +book.id+' '+ book.name + ' ' + book.isFamilyFriendly + ' ' + book.isAccessibleForFree + ' ' + book.copyrightYear + ' ' + book.version+ ' ' + book.bookEdition+ ' ' + book.isbn+ ' ' + book.numberOfPages+ ' ' + book.abridged + '</li>';
 }).join('') + '</ul>' ;
}; 


exports.toText = function() {
 return books.map(function(book,i){
	return ' - ' +book.id+' '+ book.name + ' ' + book.isFamilyFriendly + ' ' + book.isAccessibleForFree + ' ' + book.copyrightYear + ' ' + book.version+ ' '+ book.bookEdition+ ' ' + book.isbn+ ' ' + book.numberOfPages+ ' ' + book.abridged + '\n';
  }).join('');	
};

exports.toJson = function() {
  let envio=[];
	for(let i=0;i<books.length;i++){
		let jsonaenviar={"@context":"http://schema.org","@type":"Book","id":books[i].id,"name":books[i].name,"isFamilyFriendly":books[i].isFamilyFriendly,"isAccessibleForFree":books[i].isAccessibleForFree,"copyrightYear":books[i].copyrightYear,"version":books[i].version,"bookEdition":books[i].bookEdition,"isbn":books[i].isbn,"numberOfPages":books[i].numberOfPages,"abridged":books[i].abridged};
		envio.push(jsonaenviar);
	}
	return JSON.stringify(JSON.stringify(envio));
};

exports.toXML = function() {
  return '<books>' + books.map(function(book,i){
     return '<book id =' + book.id + '>' +
                '<name>'+book.name+'</name>'+
                '<isFamilyFriendly>' + book.isFamilyFriendly + '</isFamilyFriendly>' +
                '<isAccessibleForFree>' + book.isAccessibleForFree + '</isAccessibleForFree>' +
                '<copyrightYear>' + book.copyrightYear + '</copyrightYear>' +
                '<version>' + book.version + '</version>' +
                '<bookEdition>'+book.bookEdition+'</bookEdition>'+
                '<isbn>'+book.isbn+'</isbn>'+
                '<numberOfPages>'+book.numberOfPages+'</numberOfPages>'+
                '<abridged>'+book.abridged+'</abridged>'+
		      '</book>';
   }).join('') +
	   '</books>';
};