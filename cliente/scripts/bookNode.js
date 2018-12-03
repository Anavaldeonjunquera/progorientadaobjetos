let objetos = [];
//eventos del DOM
document.getElementById('getallform').addEventListener('submit',function(e){
    $.ajax({
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Accept","application/ld+json");
        },
        method:'GET',
        url:"http://156.35.95.97:3000/book",
        success:function(data){
            document.getElementById('getallentity').value=data;
            listadatos=JSON.parse(data);
            for(let i=0;i<listadatos.length;i++){
                let articulo=new Book();
                articulo.update(listadatos[i].id,listadatos[i].name,listadatos[i].isFamilyFriendly,listadatos[i].isAccessibleForFree,listadatos[i].copyrightYear,listadatos[i].version,listadatos[i].bookEdition,listadatos[i].isbn,listadatos[i].numberOfPages,listadatos[i].abridged)
                objetos.push(articulo) 
            }
            
        }
    }).fail(function(){
        alert('fallo al realizar la peticion')
    })
    e.preventDefault();
});

document.getElementById('getidform').addEventListener('submit', function(e){
    let idbuscar=document.getElementById('idget').value;
    
    $.ajax({
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Accept","application/ld+json");
        },
        method:'GET',
        url:"http://156.35.95.97:3000/book/"+idbuscar,
        success:function(data){
            document.getElementById('getidentity').value=data;
            let dato=JSON.parse(data)
            let articulo=new Book();
            articulo.update(dato.id,dato.name,dato.isFamilyFriendly,dato.isAccessibleForFree,dato.copyrightYear,dato.version,dato.bookEdition,dato.isbn,dato.numberOfPages,dato.abridged)   
        }
    }).fail(function(){
        alert('fallo al realizar la peticion')
    });
    
    e.preventDefault();
});

document.getElementById('deleteidform').addEventListener('submit',function(e){
    let idbuscar=document.getElementById('iddelete').value;
    $.ajax({
        method:'DELETE',
        url:"http://156.35.95.97:3000/book/"+idbuscar,
        success:function(data){
            alert('Eliminado')
            
        }
    }).fail(function(){
        alert('fallo al realizar la peticion')
    });
    e.preventDefault();
});
document.getElementById('postform').addEventListener('submit',function(e){
    let datos=document.getElementById('postentity').value;
    let dato=JSON.parse(datos)
    let articulo=new Book();
    articulo.update(dato.id,dato.name,dato.isFamilyFriendly,dato.isAccessibleForFree,dato.copyrightYear,dato.version,dato.bookEdition,dato.isbn,dato.numberOfPages,dato.abridged)       
    $.ajax({
        method:'POST',
        data:JSON.stringify(datos),
        url:"http://156.35.95.97:3000/book",
        success:function(data){
            alert('Añadido');
        }
    }).fail(function(){
        alert('fallo al realizar la peticion')
    });
    e.preventDefault();
});
document.getElementById('putidform').addEventListener('submit',function(e){
    let idmodificar=document.getElementById('idput').value;
    let datosput=document.getElementById('datosput').value;
    let dato=JSON.parse(datosput)
    let articulo=new Book();
    articulo.update(dato.id,dato.name,dato.isFamilyFriendly,dato.isAccessibleForFree,dato.copyrightYear,dato.version,dato.bookEdition,dato.isbn,dato.numberOfPages,dato.abridged)   
    $.ajax({
        method:'PUT',
        data:JSON.stringify(datosput),
        url:"http://156.35.95.97:3000/book/"+idmodificar,
        success:function(data){
            alert('Modificado');
        }
    }).fail(function(){
        alert('fallo al realizar la peticion')
    });
    e.preventDefault();
});