// Node
function obtenerentidades(){

    $.ajax({
        
        method:'GET',
        url:"http://156.35.95.97:3000",
        success:function(entidades){
            let misentidades=JSON.parse(entidades)
            for(let i=0;i<misentidades.length;i++){
                document.getElementById("selector").options.add(new Option(""+misentidades[i].nombre+"",""+misentidades[i].nombre+".html"));
            }
        }

    }).fail(function(){
        alert('Fallo al realizar la peticion')
    });
    
}
