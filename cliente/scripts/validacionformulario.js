document.getElementById('contact-form')
    .addEventListener('submit', function (e) {
        const name = document.getElementById('name').value,
                surname = document.getElementById('surname').value,
                mail = document.getElementById('mail').value,
                tfno=document.getElementById('tfno').value+"";
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if (name === ''){
            alert("campo nombre vacío");
            e.preventDefault();
        }else if (surname === ''){
            alert("campo apellidos vacío");
            e.preventDefault();
        }else if (mail === ''){
            alert("campo mail vacío");
            e.preventDefault();
        }else if (tfno===''){
            alert("campo telefono vacío");
            e.preventDefault();
        }else if(tfno.length!=9){
            alert("el tfno consta de 9 dígitos");
            e.preventDefault();
        }else if(!re.test(mail.toLowerCase())){
            alert("el mail no tiene el formato correcto");
            e.preventDefault();
        }
        
});