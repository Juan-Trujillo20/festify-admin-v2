import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { deleteFestival, listFestivals } from "@/services/festivales";


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type FestivalTableItem   = {
    id: string;
    title: string;
    about: string;
    city: string;
    from: string;
    to: string;
    price_from: number;
    price_to: number;
}
export default function Festivales() {
    const [festivales, setFestivales] = useState<FestivalTableItem[]>([]);

    useEffect(() => {
       const loadFestivals = async () => {
            try {
                const festivalsResponse = await listFestivals();
                const result: FestivalTableItem[] = festivalsResponse.map(f => {
                    return {
                        ...f,
                        id: f.id.toString(),
                    }
                })
                setFestivales(result);
            } catch (err) {
                console.error(err);
            }   
        }
        loadFestivals();
    }, []);

    const handleDeleteFestival = (festivalId: string) => {
    deleteFestival(festivalId)
        .then((error) => {
        if (!error.ok) {
            alert(error.detail || "Error al eliminar el festival");
            return;
        } else{
             alert("Festival eliminado correctamente");
            setFestivales((prev) => prev?.filter((festival) => festival.id !== festivalId));
        }

        })
        .catch((err) => {
             console.error(err);
        });
};



        
    return (
        <>
       <Header/>
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                <h1 className="text-2xl font-extrabold">Festivales</h1>
                <p className="text-sm text-neutral-600">Crea y gestiona eventos.</p>
                </div>
                <div className="flex items-center gap-2">
                <input id="search" placeholder="Buscar por nombre/ciudad" className="px-3 py-2 rounded-lg border w-64"/>
                <Link to="/newFestival" className="px-3 py-2 rounded-lg bg-neutral-900 text-white text-sm">Nuevo festival</Link>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                <span className="text-neutral-600">Resultados:</span>
                <span id="result-count" className="font-medium" aria-live="polite">4</span>
                </div>
                <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-neutral-600">Ordenar</label>
                <select id="sort" className="px-2 py-1 rounded border">
                    <option value="title-asc">Título (A–Z)</option>
                    <option value="title-desc">Título (Z–A)</option>
                    <option value="start-asc">Fecha inicio (asc)</option>
                    <option value="start-desc">Fecha inicio (desc)</option>
                    <option value="start-asc">Precio desde (asc)</option>
                    <option value="start-desc">Precio desde (desc)</option>
                </select>
                </div>
            </div>

            <section id="grid" className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {festivales.map((fest) => (
                
              
                <article data-festival data-name="SunWave Fest" data-city="Barcelona" data-start="2025-07-12" data-end="2025-07-14"
                        className="rounded-xl border p-4 hover:shadow-sm transition shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
                <div className="flex items-start justify-between gap-3">
                    <header>
                    <h3 className="text-lg font-semibold">{fest.title}</h3>
                    <p className="mt-1 text-sm text-neutral-600">{fest.about}</p>
                    </header>
                    <span className="inline-flex items-center justify-center text-xs font-semibold px-2 py-1 rounded-full bg-neutral-100 border">
                    {fest.from}
                    </span>
                </div>

                <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                    <dt className="text-neutral-500">🗓️</dt>
                    <dd>{fest.from}— {fest.to}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                    
                    <dt className="text-neutral-500">📍</dt>
                    <dd>{fest.city}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                    <dt className="text-neutral-500">💶</dt>
                    <dd>{fest.price_from} - {fest.price_to}</dd>
                    </div>
                </dl>

                <div className="mt-4 flex items-center justify-end gap-2">
                    <Link to={"/editar-festivales/" + fest.id}
                    className="px-2 py-1 rounded border">Editar</Link>
                    <button className="px-2 py-1 rounded border text-red-700" onClick={(evt) =>{
                        evt.preventDefault();
                        handleDeleteFestival(fest.id)
                    }}>
                        
                        Eliminar</button>
                </div>
                </article>

            ))}
            

           </section>
            
            </main>
        <Footer/>
        </>
    );
}