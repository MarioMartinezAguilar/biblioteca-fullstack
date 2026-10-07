<script>
    import { toast } from "svelte-sonner";
    let {cerrar,agregarLibro,libro, actualizarLibro} = $props();
    let id = $state(null);
    let editando = $state(false);
    let titulo = $state('');
    let autor = $state('');
    let genero = $state('');
    let fecha = $state('');
    
    //effect para llenar los campos en el formulario
    $effect(()=>{
        if(libro){
            id = libro.id;
            titulo = libro.title;
            autor = libro.author;
            genero = libro.genre;
            fecha = libro.publication_date;
            editando = true;
        }
    })
    async function AgregarLibro(event){
        event.preventDefault();

       //crear el objeto
       const nuevoLibro = {
            title:titulo,
            author: autor,
            genre: genero,
            publication_date: fecha
       };

       try {
            //petición POST a la API
            const respuesta = await fetch(
                editando
                    ? `http://localhost:3300/books/${id}`
                    : 'http://localhost:3300/books', 
                {
                    method: editando ? 'PUT' : 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    //convertir nuestro objeto javascript en JSON  para mandarlo al backend
                    body: JSON.stringify(nuevoLibro)
            });

            const datos = await respuesta.json();
            //console.log(datos);
            if(respuesta.ok){
                if(editando){
                    toast.success('¡Libro actualizado correctamente!');
                    actualizarLibro(datos)
                }else{
                    toast.success('¡Libro agregado correctamente!')
                    agregarLibro(datos);
                }
                cerrar();
            }else{
                toast.error(datos.message);
            }
            
        } catch (error) {
            toast.error('No se pudo agregar el libro')
        }
    }
</script>

<div class="modal-overlay">
    <div class="modal">
        <button class="btn-cerrar" onclick={cerrar}>❌</button>
        <h2>Nuevo Libro</h2>
        <form onsubmit={AgregarLibro}>
            <div class="campo">
                <label for="tiutlo">Título</label>
                <input id="titulo" type="text" bind:value={titulo}>
            </div>
            <div class="campo">
                <label for="autor">Autor</label>
                <input id="autor"type="text" bind:value={autor}>
            </div>
            <div class="campo">
                <label for="genero">Género</label>
                <input id="genero" type="text" bind:value={genero}>
            </div>
            <div class="campo">
                <label for="fecha">Fecha de publicación</label>
                <input id="fecha" type="text" bind:value={fecha}>
            </div>

            <button type="submit">Agregar Libro</button>
        </form>
    </div>

</div>

<style>
    .modal-overlay{
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(15, 23, 42,0.35);
        backdrop-filter: blur(6px);
    }
    .modal{
        width: min(90%,500px);
        padding: 30px;
        border-radius: 20px;
        background: rgba(255,255,255,0.75);
        backdrop-filter: blur(12px);
        border: 2px solid rgba(255,255,255,0.5);
        box-shadow: 0 20px 50px rgba(10, 0, 0, 0.2);
    }
    .btn-cerrar{
        display:block;
        margin-left: auto;
        border: none;
        background: transparent;
        font-size: 1.3rem;
        color: #647489;
        cursor: pointer;
        
        
        
    }
   
    .modal h2{
        margin: 10px 0 8px;
        font-size: 1.8rem;
        font-weight: 800;
        color:#1e293b
    }
    form{
        margin-top: 25px;
    }
    .campo{
        display: flex;
        flex-direction: column;
        gap:6px;
        margin-bottom: 18px;
    }
    .campo label{
        font-size: 0.9rem;
        font-weight: 600;
        color:#344155;
    }
    .campo input{
        padding: 11px 13px;
        border: 2px solid #cbd5e1;
        border-radius: 15px;
        font-size: 0.95rem;
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .campo input:focus{
        border-color: #7c3aed;
        box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
    }
    form button[type="submit"]{
        width: 100%;
        margin-top: 5px;
        padding: 12px 16px;
        border: none;
        border-radius: 15px;
        background: #7c3aed;
        color: whitesmoke;
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s ease, transform 0.2s ease;
    }
    form button[type="submit"]:hover{
        background: #6d28d9;
    }
    form button[type="submit"]:active{
        transform: scale(0.98);
    }
</style>