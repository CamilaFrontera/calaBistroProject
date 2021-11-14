
const URLGET = "https://jsonplaceholder.typicode.com/posts/1/comments"
//Agregamos un botón con jQuery

//Escuchamos el evento click del botón agregado
$("#showComments").click(() => { 
    $.get(URLGET, function (response, status) {
          if(status === "success"){
            let comments = response;
            for (const comment of comments ) {
              $(".products1").prepend(`
            
            <div class="item">
                <div class="item-container">
                    <div class="desc">
                        <h2>${comment.name}</h2>
                        <p>
                        ${comment.body}
                        </p>
                    </div>
                    
                </div>
            </div>`);
            }  
            
          }
    });
});
