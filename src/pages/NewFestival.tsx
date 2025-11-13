import Header from "@/components/Header";
import { createFestival } from "@/services/festivales";
import type { Festival, FestivalRequest } from "@/types/festival";

import React, { useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate, type ErrorResponse } from "react-router-dom";


type FestivalForm = {
    title: string;
    about: string;  
    city: string;

    from: string;
    to: string;
    price_from: number;
    price_to: number;
}

const defaultFestivalForm:FestivalForm = {
    title: "",
    about: "",
    city: "",
    from: "", 
    to: "",
    price_from: 0,
    price_to: 0,
}



export default function NewFestivaL(){
    const [form, setForm]= useState<FestivalForm>(defaultFestivalForm);
    const navigate = useNavigate();
    const [isValid, setValid] = useState<boolean>(false);

    useEffect(()=>{
        setValid(
            form.title.trim().length>2);
    },[form])
    
    const handleTitleOnChange =(evt :ChangeEvent<HTMLInputElement>)=>{
      const {value} = evt.target;
      setForm({
        ...form,
        title: value,
        
      })
    }

      const handleAboutOnChange =(evt :ChangeEvent<HTMLInputElement>)=>{
        const {value} = evt.target;
        setForm({
          ...form,
          about: value,
        })
      }

      const handleCityOnChange =(evt :ChangeEvent<HTMLInputElement>)=>{
        const {value} = evt.target;
        setForm({
          ...form,
          city: value,
        })


    }

    const handleSubmitFormFestival=async (evt:React.FormEvent<HTMLFormElement>)=>{
      debugger;
      evt.preventDefault();
      const request:FestivalRequest={
        ...form,
      }
   
        try {
            const response = await createFestival(request);

            if ("id" in response) {
              const festival: Festival = response as Festival;
              alert(`Festival con id ${festival.id} ha sido creado con éxito.`);
              navigate("/festivales");
            } else {
              const error: ErrorResponse = response as ErrorResponse;
              alert(error.detail);
            }
          } catch (err: any) {
            console.error(err);
            alert(err?.message ?? "Error desconocido");
          }
};

    return <>

      <Header />
        <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
    
    <div className="flex items-center justify-between mb-6">
      <Link to="./festivales" className="text-sm px-3 py-2 rounded-lg border">Volver</Link>
      <h1 className="font-semibold text-xl">Nuevo festival</h1>
      <span></span>
    </div>

    
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      
      <div >
        <label className="block text-neutral-700 mb-1">Nombre</label>
        <input type="text" value={form.title}  onChange={handleTitleOnChange} placeholder="Nombre del festival" className="w-full px-3 py-2 rounded-lg border"/>
      </div>
      <div>
        <label className="block text-neutral-700 mb-1">Ciudad</label>
        <input type="text" value={form.city} onChange={handleCityOnChange} placeholder="Ciudad" className="w-full px-3 py-2 rounded-lg border"/>
      </div>


      
      <div>
        <label className="block text-neutral-700 mb-1">Breve descripción</label>
        <input type="text" value={form.about} onChange={handleAboutOnChange}  placeholder="Descripción" className="w-full px-3 py-2 rounded-lg border"/>
      </div>
    
      <div>
        <label className="block text-neutral-700 mb-1">Precio (€)</label>
        <input placeholder="Precio desde (€)" className="w-8.5  px-3 py-2 rounded-lg border"/>
        <input placeholder="Precio hasta (€)" className="w-8.5 px-3 py-2 rounded-lg border"/>
      </div>
    
      <div>
        <label className="block text-neutral-700 mb-1">Fecha inicio</label>
        <input type="date" className="w-full px-3 py-2 rounded-lg border"/>
      </div>
      <div>
        <label className="block text-neutral-700 mb-1">Fecha fin</label>
        <input type="date" className="w-full px-3 py-2 rounded-lg border"/>
      </div>






      
      <div className="sm:col-span-2 flex items-center gap-3 mt-2">
        <button disabled={!isValid} onClick={handleSubmitFormFestival} className="px-4 py-2 rounded-lg bg-neutral-900 text-white">Guardar</button>
        <button type="reset" className="px-4 py-2 rounded-lg border">Limpiar</button>
      </div>
    </form>
  </main>

  </>

}
      
