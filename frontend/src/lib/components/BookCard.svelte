<script>
    let {id,title, author,genre,publication_date, delay, editar,eliminar} = $props();
    function obtenerClassGenero(genero){
        const clases = {
            Médico: 'medico',
            'Realismo Mágico': 'realismo-magico',
            'Técnico-Programación Informática': 'programacion',
            'Divulgación Científica': 'divulgacion-cientifica',
            'Novela Histórica': 'novela-historica',
            'Novela Psicológica': 'novela-psicologica',
            Fantasía: 'fantasia',
            'Desarrollo De Software': 'desarrollo-software',
            'Novela Y Drama': 'novela-drama'


        };
        return clases[genero] || 'default';

    }
</script>

<article 
    class="book-card"
    style={`animation-delay: ${delay}s`}

>
    <div class="book-content">
        <div class={`book-cover ${obtenerClassGenero(genre)}`}>
            <span class="cover-title">{title}</span>
            <span class="cover-author">{author}</span>
        </div>
        <div class="book-info">
            <h2>{title}</h2>
            <p>{author}</p>

            <div class="book-meta">
                <span>{genre}</span>
                <span>{publication_date}</span>
            </div>
            <div class="book-actions">
                <button class="btn-editar" onclick={()=> editar({
                    id,
                    title,
                    author,
                    genre,
                    publication_date
                })}>
                    🖋️ Editar
                </button>
                <button class="btn-eliminar"
                    onclick={() => eliminar(id)}
                >
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    </div>
</article>

<style>
    .cover-title{
        font-size: 1.6rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .cover-author{
        display: block;
        position: relative;
        margin-top: 14px;
        padding-bottom: 12px;
        font-size: 0.9rem;
        opacity: 0.85;
    }
    .cover-author::after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform:  translateX(-50%);
        width: 100px;
        height: 2px;
        background: rgba(255,255,255,0.7);
    }
    .book-card{
        background: #ffffff;
        border-radius: 16px;
        border: 1px double burlywood;
        padding: 20px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        transition:  transform 1s ease, box-shadow 0.3s ease;
        animation: aparecer 3s ease forwards;
    }
    
    .book-card:hover {
        cursor: pointer;
        /* transform: translateY(-8px); */
        box-shadow: 0 16px 30px rgba(0,0,0,0.18);
    }
    .book-card:hover .book-cover{
        filter: brightness(1.08);
        box-shadow: inset 0 0 0 4px rgba(255,255,255,0.4);
    }
    .book-cover{
        --color1: #1e3a8a;
        --color2: #7c3aed;
        position: relative;
        height: 220px;
        border-radius: 10px;
        background:radial-gradient(
            circle at center,
            rgba(255,255,255,0.18),
            transparent 55%
        ), linear-gradient(135deg, var(--color1),var(--color2));
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: whitesmoke;
        text-align: center;
        padding: 20px;
        box-shadow: inset 0 0 0 4px rgba(255,255,255,0.25);
        transition: filter o.3s ease, box-shadow 0.3s ease;

    }
    .book-cover.fantasia{

        background:radial-gradient(
            circle at center,
            rgba(255,255,255,0.18),
            transparent 55%
        ), linear-gradient(135deg,  #4c1d95,  #c026d3);
    }
    .book-cover.medico{

        background:radial-gradient(
            circle at center,
            rgba(255,255,255,0.18),
            transparent 55%
        ), linear-gradient(135deg,  #065f46,  #10b981);
    }
    .book-cover.realismo-magico{

        background:radial-gradient(
            circle at center,
            rgba(255,255,255,0.18),
            transparent 55%
        ), linear-gradient(135deg,  #7c2d12,  #ea580c);
    }
    .book-cover.programacion{

        background:radial-gradient(
            circle at center,
            rgba(255,255,255,0.18),
            transparent 55%
        ), linear-gradient(135deg,  #0f172a,  #f50404);
    }
    .book-cover.divulgacion-cientifica{

        background:radial-gradient(
            circle at center,
            rgba(255,255,255,0.18),
            transparent 55%
        ), linear-gradient(135deg,  #164e63,  #06b6d4);
    }
    .book-cover.novela-historica{

        background:radial-gradient(
            circle at center,
            rgba(255,255,255,0.18),
            transparent 55%
        ), linear-gradient(135deg,  #78350f,  #d97706);
    }
    .book-cover.novela-psicologica{

        background:radial-gradient(
            circle at center,
            rgba(255,255,255,0.18),
            transparent 55%
        ), linear-gradient(135deg,  #eae707,  #4b4c4d);
    }
    .book-cover.desarrollo-software{

        background:radial-gradient(
            circle at center,
            rgba(255,255,255,0.18),
            transparent 55%
        ), linear-gradient(135deg,  #111827,  #059669);
    }
    .book-cover.novela-drama{

        background:radial-gradient(
            circle at center,
            rgba(255,255,255,0.18),
            transparent 55%
        ), linear-gradient(135deg,  #f1e3e3,  #0e0e0e);
    }
    .book-cover::before{
        content:'✨' ;

        position: absolute;
        top: 20px;
        left: 20px;
        font-size: 1.5rem;
        opacity: 0.6;
    }
    .book-cover::after{
        content:'✨' ;

        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 1.5rem;
        opacity: 0.6;
    }

    .book-cover span {
        font-size: 1.5rem;
        font-weight: bolder;
    }
    .book-info{
        padding-top: 18px;

    }
    .book-info h2{
        margin: 0 0 8px;
        font-size: 1.3rem;
    }
    .book-info p {
        margin:0;
        color: #64748b;
    }
    .book-meta{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
    }
    .book-meta span:first-child{
        background: #ede9fe;
        color:#6d28d9;
        padding:  5px 10px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: bold;
    }
    .book-meta span:last-child{
        color: #64748b;
        font-size: 0.9rem;
    }
    .book-actions{
        display: flex;
        gap: 10px;
        margin-top: 18px;
    }
    .book-actions button{
        flex: 1;
        padding: 9px 12px;
        border: none;
        border-radius: 10px;
        font-size: 0.85rem;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.3s ease, transform 0.3s ease;
    }
    .btn-editar{
        background: #ede9fe;
        color: #7d28d9;

    }
    .btn-editar:hover{
        background: #ddd6fe
    }
    .btn-eliminar{
        background: #fee2e2;
        color: #dc2626;

    }
    .btn-eliminar:hover{
        background: #fecaca;

    }
    .book-actions button:active{
        transform: scale(0.97);
    }
    @keyframes aparecer {
        from{
            opacity:0;
            transform: translateY(20px);
        }
        to{
            opacity: 1;
            transform: translateY(0);
        }
    }

</style>