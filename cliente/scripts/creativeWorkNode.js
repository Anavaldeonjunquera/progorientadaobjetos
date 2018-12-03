let objetos = [];
//eventos del DOM
document.getElementById('getallform').addEventListener('submit',function(e){
    $.ajax({
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Accept","application/ld+json");
        },
        method:'GET',
        url:"http://localhost:3000/creativework",
        success:function(data){
            document.getElementById('getallentity').value=data;
            listadatos=JSON.parse(data);
            for(let i=0;i<listadatos.length;i++){
                let articulo=new CreativeWork();
                articulo.update(listadatos[i].id,listadatos[i].name,listadatos[i].isFamilyFriendly,listadatos[i].isAccessibleForFree,listadatos[i].copyrightYear,listadatos[i].version)
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
        method:'GET',
        url:"http://localhost:3000/creativework/"+idbuscar,
        success:function(data){
            document.getElementById('getidentity').value=data;
            let dato=JSON.parse(data)
            let articulo=new CreativeWork();
            articulo.update(dato.id,dato.name,dato.isFamilyFriendly,dato.isAccessibleForFree,dato.copyrightYear,dato.version)   
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
        url:"http://localhost:3000/creativework/"+idbuscar,
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
    let articulo=new CreativeWork();
    articulo.update(dato.id,dato.name,dato.isFamilyFriendly,dato.isAccessibleForFree,dato.copyrightYear,dato.version)   
    $.ajax({
        method:'POST',
        data:JSON.stringify(datos),
        url:"http://localhost:3000/creativework",
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
    let articulo=new CreativeWork();
    articulo.update(dato.id,dato.name,dato.isFamilyFriendly,dato.isAccessibleForFree,dato.copyrightYear,dato.version)   
    $.ajax({
        method:'PUT',
        data:JSON.stringify(datosput),
        url:"http://localhost:3000/creativework/"+idmodificar,
        success:function(data){
            alert('Modificado');
        }
    }).fail(function(){
        alert('fallo al realizar la peticion')
    });
    e.preventDefault();
});