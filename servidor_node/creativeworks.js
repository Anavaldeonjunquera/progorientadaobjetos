const {CreativeWork} = require("./creativework.js");
var idCreativework=1;
var Type = require('type-of-is');
// Internamente se representan como una sola lista
let creativeWorks = [];
let creativeWork=new CreativeWork();
creativeWork.update(0,"Mona Lisa",true,false,1540,3);
let creativeWork2=new CreativeWork();
creativeWork2.update(1,"El comic de Venancio",false,false,1980,2);
// Se inicializan un par de valores
creativeWorks.push(creativeWork);
creativeWorks.push(creativeWork2);

// Funciones que se exportan
// Utilizan patrón callback,
// invocándose con una función next(error, valor) que se llama al terminar


exports.getCreativeWork = function(id,next) {
  console.log(`Buscando Creative Work ${id} CreativeWorks:`);
  console.log(creativeWorks);
  let encontrado=false;
  for(let i=0;i<creativeWorks.length;i++){
	  if (creativeWorks[i].id==id){
		let creativeWork ={"@context":"http://schema.org","@type":"CreativeWork","id":creativeWorks[i].id,"name":creativeWorks[i].name,"isFamilyFriendly":creativeWorks[i].isFamilyFriendly,"isAccessibleForFree":creativeWorks[i].isAccessibleForFree,"copyrightYear":creativeWorks[i].copyrightYear,"version":creativeWorks[i].version}; 
		encontrado=true;
		next(null,creativeWork);
	  }
  }
  if(!encontrado)
  	next(new Error("Cannot find record with id " + id));
  
};

exports.insertaCreativeWork = function (name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,next) {
	
	if (name == null) next("Campo name es obligatorio");
    else if (copyrightYear == null) next("Campo copyrightYear es obligatorio");
    else if (version == null) next("Campo version es obligatorio");
    else if (isFamilyFriendly == null) next("Campo isFamilyFriendly es obligatorio");
    else if (isAccessibleForFree == null) next("Campo isAccessibleForFree es obligatorio");
	else if(!Type.is(name,String)) next("Campo name debe ser string");
	else if(!Number.isInteger(copyrightYear)) next("Campo copyrightYear debe ser numerico");
	else if(!Number.isInteger(version)) next("Campo version debe ser numerico");
	else if(!Type.is(isFamilyFriendly,Boolean)) next("Campo isFamilyFriendly debe ser boolean");
	else if(!Type.is(isAccessibleForFree,Boolean)) next("Campo isAccessibleForFree debe ser boolean");
	else {
		
		idCreativework++;
		let creativeWork=new CreativeWork();
		creativeWork.update(idCreativework,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version);
		creativeWorks.push(creativeWork);
		next(null,idCreativework+"");
	}
};

exports.borraCreativeWork = function (id,next) {
	let encontrado=false;
	for(let i=0;i<creativeWorks.length;i++){
		if(creativeWorks[i].id==id){
			creativeWorks.splice(creativeWorks.indexOf(creativeWorks[i]),1);
			encontrado=true;
			next(null,creativeWorks);
		}
	}
	if (!encontrado) 
		next(new Error("No existe Creative Work con id " + id));
};

exports.modificaCreativeWork = function(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,next) {
	if (name == null) next("Campo name es obligatorio");
    else if (copyrightYear == null) next("Campo copyrightYear es obligatorio");
    else if (version == null) next("Campo version es obligatorio");
    else if (isFamilyFriendly == null) next("Campo isFamilyFriendly es obligatorio");
    else if (isAccessibleForFree == null) next("Campo isAccessibleForFree es obligatorio");
	else if(!Type.is(name,String)) next("Campo name debe ser string");
	else if(!Number.isInteger(copyrightYear)) next("Campo copyrightYear debe ser numerico");
	else if(!Number.isInteger(version)) next("Campo version debe ser numerico");
	else if(!Type.is(isFamilyFriendly,Boolean)) next("Campo isFamilyFriendly debe ser boolean");
	else if(!Type.is(isAccessibleForFree,Boolean)) next("Campo isAccessibleForFree debe ser boolean");
	else {
		let encontrado=false;
		for(let i=0;i<creativeWorks.length;i++){
			if(creativeWorks[i].id==id){
				let creativeWork=new CreativeWork();
				creativeWork.update(creativeWorks[i].id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version);
				creativeWorks[i] = creativeWork;
				encontrado=true;
				next(null,creativeWorks);
			}
		}
		if(!encontrado)
			next(new Error("No se puede modificar Creative Work que no existe. id = " + id)) ;
	} 
};

exports.toHTML = function() {
 return '<ul>' + creativeWorks.map(function(creativeWork,i){
    return '<li>' + creativeWork.id +' '+creativeWork.name + ' ' + creativeWork.isFamilyFriendly + ' ' + creativeWork.isAccessibleForFree + ' ' + creativeWork.copyrightYear + ' ' + creativeWork.version + '</li>';
 }).join('') + '</ul>' ;
}; 


exports.toText = function() {
 return creativeWorks.map(function(creativeWork,i){
	return ' - ' + creativeWork.id +' '+ creativeWork.name + ' ' + creativeWork.isFamilyFriendly + ' ' + creativeWork.isAccessibleForFree + ' ' + creativeWork.copyrightYear + ' ' + creativeWork.version + '\n';
  }).join('');	
};

exports.toJson = function() {
	let envio=[];
	for(let i=0;i<creativeWorks.length;i++){
		let jsonaenviar={"@context":"http://schema.org","@type":"CreativeWork","id":creativeWorks[i].id,"name":creativeWorks[i].name,"isFamilyFriendly":creativeWorks[i].isFamilyFriendly,"isAccessibleForFree":creativeWorks[i].isAccessibleForFree,"copyrightYear":creativeWorks[i].copyrightYear,"version":creativeWorks[i].version};
		envio.push(jsonaenviar);
	}
	return JSON.stringify(JSON.stringify(envio));
};

exports.toXML = function() {
  return '<creativeWorks>' + creativeWorks.map(function(creativeWork,i){
	   return '<creativeWork id =' + creativeWork.id + '>' +
	   			'<name>'+creativeWork.name+ '</name>'+
                '<isFamilyFriendly>' + creativeWork.isFamilyFriendly + '</isFamilyFriendly>' +
                '<isAccessibleForFree>' + creativeWork.isAccessibleForFree + '</isAccessibleForFree>' +
                '<copyrightYear>' + creativeWork.copyrightYear + '</copyrightYear>' +
                '<version>' + creativeWork.version + '</version>' +
		      '</creativeWork>';
   }).join('') +
	   '</creativeWorks>';
};