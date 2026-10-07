<script>
    import { onMount } from "svelte";
    import BookCard from "#lib/components/BookCard.svelte";
    import BookModal from "#lib/components/BookModal.svelte";
    import {toast} from 'svelte-sonner';
    let libros = $state([]);
    let error = $state(false);
    let cargando = $state(true);
    let mostrarModal = $state(false);
    let libroSeleccionado = $state(null);
    //función para actualizar un el libro en el DOM
    function actualizarLibro(libroActualizado){
        
        libros = libros.map((libro) =>
            libro._id === libroActualizado._id
                ? libroActualizado
                : libro
        )
    };
    //función para eliminar un libro 
   async function eliminarLibro(id){
        try {
            const respuesta = await fetch(`https://biblioteca-fullstack-0kjh.onrender.com/books/${id}`,{
                method:'DELETE'

            });
            const datos = await respuesta.json();
            //console.log(datos);
            if(respuesta.ok){
                libros = libros.filter((libro) => libro._id !== id);
                toast.success(datos.message);
            }
            
        } catch (error) {
            console.log(error);
            
        }
        
    }
  onMount( async () => {
    try {
        const respuesta = await fetch('https://biblioteca-fullstack-0kjh.onrender.com/books');
        const datos = await respuesta.json();
        
        libros = datos;
        //cargando = false;
    } catch (err) {
        console.log(err);
        error = true;
        //cargando = false;
        
    } finally{
       
        cargando = false;
    }
  });
</script>



<header class="library-header">
    <h1>Mi Biblioteca 📚</h1>
    <p>Una Colección de historias para descubrir</p>
</header>

<button class="btn-agregar" onclick={()=>{libroSeleccionado = null; mostrarModal = true}}>
    Agrega Tu Libro Favorito
</button>

{#if mostrarModal}
    <BookModal cerrar={()=> mostrarModal = false}
        agregarLibro={(libro) => libros = [...libros, libro]}
        libro={libroSeleccionado}
        actualizarLibro={actualizarLibro}
    />
    
{/if}





{#if cargando}
    <p class="estado estado-cargando">⏳ Cargando Libros...</p>
{:else if error}
    <p class="estado estado-error">❌ No Se pudieron Cargar Los Libros</p>
{/if}


<div class="books-grid">
    {#each libros as libro, i }
        <!-- <article>
            <h2>{libro.titulo}</h2>
            <p>{libro.autor}</p>
        </article> -->
        <BookCard
            id={libro._id}
            title={libro.title}
            author={libro.author}
            genre={libro.genre}
            publication_date={libro.publication_date}
            delay={i * 0.25}
            editar={(libro) =>{ libroSeleccionado = libro; mostrarModal= true} }
            eliminar={eliminarLibro}
        />
    {/each}
</div>

<style>
    .library-header{
        text-align:center;
        margin-bottom: 40px;

    }
    .library-header h1{
        margin: 0;
        font-size: 2.8rem;
        font-weight: 800;
        letter-spacing: -1px;
    }
    .library-header p{
        margin: 10px 0 0;
        color: #64748b;
        font-size: 1.05rem;
    }
    .library-header p::after{
        content: '';
        display: block;
        width: 80px;
        height: 3px;
        margin: 15px auto 0;
        border-radius: 3px;
        background: #7c3aed;

    }
    .btn-agregar{
        display: block;
        margin: 0 auto 35px;
        padding: 12px 20px;
        border: none;
        border-radius: 10px;
        background: #7c3aed;
        color: whitesmoke;
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 6px 15px rgba(124,58,237,0.25);
        transition: background 0.2s ease, transform 0.2s ease,box-shadow 0.2s ease;
        
    }
    .btn-agregar:hover{
        background: #6d28d9;
        transform: translateY(-2px);
        box-shadow: 0 8px 18px rgba(124,58,237, 0.3);
    }
    .btn-agregar:active{
        transform: scale(1);
    }
    .books-grid{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        perspective: 1000px;
    }
    .estado{
        text-align:  center;
        padding: 20px;
        margin-bottom: 30px;
        border-radius: 10px;
        font-weight: 600;
    }
    .estado-cargando{
        color: #475569;
        background: #f1f5f9;
    }
    .estado-error{
        color: #b91c1c;
        background: #fee2e295;
    }
    

    @media (max-width: 600px){
        .books-grid {
            grid-template-columns: 1fr;
        }
    }
</style>


