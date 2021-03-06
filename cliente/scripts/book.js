let objetos = []
//eventos del DOM
document.getElementById('getallform').addEventListener('submit',function(e){
    $.ajax({
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Accept","application/ld+json");
        },
        method:'GET',
        url:"http://156.35.95.97:8000/ejemplos/ServidorPHP.php/book",
        success:function(data){
            document.getElementById('getallentity').value=data;
            listadatos=JSON.parse(data);
            for(let i=0;i<listadatos.length;i++){
                let articulo=new Book();
                articulo.update(listadatos[i].id,listadatos[i].name,listadatos[i].isFamilyFriendly,listadatos[i].isAccessibleForFree,listadatos[i].copyrightYear,listadatos[i].version,listadatos[i].bookEdition,listadatos[i].isbn,listadatos[i].numberOfPages,listadatos[i].abridged)
                objetos.push(articulo) 
                console.log(articulo.name)
            }
            
        }
    }).fail(function(){
        alert('fallo al realizar la peticion')
    })
    e.preventDefault();
});

document.getElementById('getidform').addEventListener('submit', function(e){
    let idbuscar=document.getElementById('idget').value;
    console.log(idbuscar);
    
    $.ajax({
        method:'GET',
        url:"http://156.35.95.97:8000/ejemplos/ServidorPHP.php/book/"+idbuscar,
        success:function(data){
            document.getElementById('getidentity').value=data;
            let dato=JSON.parse(data)
            let articulo=new Book();
            articulo.update(dato.id,dato.name,dato.isFamilyFriendly,dato.isAccessibleForFree,dato.copyrightYear,dato.version,dato.bookEdition,dato.isbn,dato.numberOfPages,dato.abridged)   
            console.log(articulo.name)
        }
    }).fail(function(){
        alert('fallo al realizar la peticion')
    });
    
    e.preventDefault();
});

document.getElementById('deleteidform').addEventListener('submit',function(e){
    let idbuscar=document.getElementById('iddelete').value;
    console.log(idbuscar);
    $.ajax({
        method:'DELETE',
        url:"http://156.35.95.97:8000/ejemplos/ServidorPHP.php/book/"+idbuscar,
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
    console.log(articulo.name)
    $.ajax({
        method:'POST',
        data:datos,
        url:"http://156.35.95.97:8000/ejemplos/ServidorPHP.php/book",
        success:function(data){
            alert('Añadido');
            console.log(data);
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
    console.log(articulo.name)
    $.ajax({
        method:'PUT',
        data:datosput,
        url:"http://156.35.95.97:8000/ejemplos/ServidorPHP.php/book/"+idmodificar,
        success:function(data){
            alert('Modificado');
        }
    }).fail(function(){
        alert('fallo al realizar la peticion')
    });
    e.preventDefault();
});