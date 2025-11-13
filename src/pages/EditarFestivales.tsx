import { getFestival, updateFestival } from "@/services/festivales";
import type { APIResult } from "@/types/Errors";
import type { Festival, FestivalRequest } from "@/types/festival";
import { useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate, useParams, type ErrorResponse } from "react-router-dom";



type FestivalForm = {
    id: string;
    title: string;
    about: string;
    city: string;   
    from: string;
    to: string;
    price_from: number;
    price_to: number;
}

const defaultFestivalForm:FestivalForm = {
    id: "",
    title: "",
    about: "",
    city: "",
    from: "", 
    to: "",
    price_from: 0,
    price_to: 0,
}

export default function EditarFestivales(){

    const [form,setForm] =  useState<FestivalForm>(defaultFestivalForm);
    const {id}=useParams();
    const navigate = useNavigate();
    const [error, setError] = useState<string>();

    const [isValid, setValid] = useState<boolean>(false);
        useEffect(()=>{
                setValid(
                    form.title.trim().length>2);
    },[form])

    useEffect(()=>{
        
        if (id){
            getFestival(id).then((res:APIResult<Festival>)=>{
                if ( res.ok){
                    
                    setForm({
                        id: res.data.id.toString(),
                        title: res.data.title,
                        about:res.data.about,
                        city:res.data.city,
                        from: res.data.from,
                        to: res.data.to,
                        price_from: res.data.price_from,
                        price_to: res.data.price_to,
                    })
                }else{
                    
                    setError(res.error.detail);
                }
            }).catch((err)=>{
                setError(err?.message ?? "Error cargando el festival");
            });
        }
    },[])
    



    const handleTitlleChange = (evt : ChangeEvent<HTMLInputElement>) =>{
        const {value} = evt.target;
        setForm({
            ...form,
            title: value
        });
    }

    const handleAboutChange=(evt :ChangeEvent<HTMLTextAreaElement>)=>{
        const {value}= evt.target;
        setForm({
            ...form,
            about: value
        })
    }

    const handleGuardarFestival=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!id){
            return;
        }
        const request:FestivalRequest={
            title: form.title,
            about: form.about,
            city: form.city,
            from: form.from,
            to: form.to,
            price_from: form.price_from,
            price_to: form.price_to,
        }
        try{
            const response= await updateFestival(id, request);
            if("id" in response){
                const festival:Festival=response as Festival;
                alert(`Artista con id: ${festival.id} ha sido actualizado correctamente`);
                navigate("/festivales");
            }else{
                const error:ErrorResponse=response as ErrorResponse;
                alert(error.detail);
                
            }   
        }catch(err:any){
            console.log(err)
            alert("Error desconocido: "+ (err?.message ?? ""));
        }

    }
    const btnSaveClassnames = "px-4 py-2 rounded-lg text-white "+(isValid?"bg-green-900":"bg-gray-400");
    return(
        <>
        <main className="max-w-5xl mx-auto px-4 py-8">
            <Link to="/festivales" className="text-sm px-3 py-2 rounded-lg border">Volver</Link>
                <div className="max-w-5xl mx-auto h-16 px-4 flex items-center justify-center"><h1 className="font-semibold">Guardar festival</h1></div>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <input type="text" value={form.title} onChange={handleTitlleChange} placeholder="Nombre" className="px-3 py-2 rounded-lg border"/>
                <input placeholder="Ciudad" className="px-3 py-2 rounded-lg border"/>
                <input type="date" className="px-3 py-2 rounded-lg border"/>
                <input type="date" className="px-3 py-2 rounded-lg border"/>
                <input placeholder="Precio desde (€)" className="px-3 py-2 rounded-lg border"/>
                <select className="px-3 py-2 rounded-lg border"><option>Estado: Borrador</option><option>Publicado</option></select>
                <div className="sm:col-span-2">
                <label    className="block text-neutral-600 mb-1">Descripción</label>
                <textarea value={form.about} onChange={handleAboutChange} rows={4} className="w-full px-3 py-2 rounded-lg border"></textarea>
                </div>
                
            </form>
           
                <div className="sm:col-span-2 flex items-center gap-3 mt-2">
                    <button disabled={!isValid}  className={btnSaveClassnames} onClick={handleGuardarFestival}>Guardar</button>
                </div>
        </main>
        
        </>
    );
}

