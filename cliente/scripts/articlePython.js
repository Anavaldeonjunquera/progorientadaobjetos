let objetos = [];
//eventos del DOM
document.getElementById('getallform').addEventListener('submit',function(e){
    $.ajax({
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Accept","application/ld+json");
        },
        method:'GET',
        url:"http://156.35.95.97:5000/article",
        success:function(data){
            listadatos=JSON.parse(data);
            for(let i=0;i<listadatos.length;i++){
                let articulo=new Article();
                articulo.update(listadatos[i].id,listadatos[i].name,listadatos[i].isFamilyFriendly,listadatos[i].isAccessibleForFree,listadatos[i].copyrightYear,listadatos[i].version,listadatos[i].articleSection,listadatos[i].pagination,listadatos[i].wordCount)
                objetos.push(articulo)
            }
            document.getElementById('getallentity').value=data;
            
        }
    }).fail(function(){
        alert('fallo al realizar la peticion')
    })
    e.preventDefault();
});

document.getElementById('getidform').addEventListener('submit', function(e){
    let idbuscar=document.getElementById('idget').value;
    
    $.ajax({
        method:'GET',
        url:"http://156.35.95.97:5000/article/"+idbuscar,
        success:function(data){
            let articulo=new Article();
            let dato=JSON.parse(data)
            articulo.update(dato.id,dato.name,dato.isFamilyFriendly,dato.isAccessibleForFree,dato.copyrightYear,dato.version,dato.articleSection,dato.pagination,dato.wordCount)
            document.getElementById('getidentity').value=data;  
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
        url:"http://156.35.95.97:5000/article/"+idbuscar,
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
    let articulo=new Article();
    dato=JSON.parse(datos)
    articulo.update(0,dato.name,dato.isFamilyFriendly,dato.isAccessibleForFree,dato.copyrightYear,dato.version,dato.articleSection,dato.pagination,dato.wordCount)
    $.ajax({
        method:'POST',
        data:datos,
        url:"http://156.35.95.97:5000/article",
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
    let articulo=new Article();
    dato=JSON.parse(datosput)
    articulo.update(idmodificar,dato.name,dato.isFamilyFriendly,dato.isAccessibleForFree,dato.copyrightYear,dato.version,dato.articleSection,dato.pagination,dato.wordCount)
    $.ajax({
        method:'PUT',
        data:datosput,
        url:"http://156.35.95.97:5000/article/"+idmodificar,
        success:function(data){
            alert('Modificado');
        }
    }).fail(function(){
        alert('fallo al realizar la peticion')
    });
    e.preventDefault();
});