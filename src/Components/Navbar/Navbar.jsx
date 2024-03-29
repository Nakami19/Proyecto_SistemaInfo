import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ARTPAGE_URL, HOME_URL, LOGIN_URL, PROFILE_URL, REGISTER_URL, TOURS_URL } from '../../constants/url'
import { useUserContext } from '../../contexts/UserContext';
import { logout } from "../../firebase/auth-service";
import { db } from '../../firebase/config';
import {
    doc,
    onSnapshot ,
  } from 'firebase/firestore';
  import { useState, useEffect } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, isLoadingUser } = useUserContext(); 
    const [imagenFirebase, setImagenFirebase] = useState(null);
    const [nombreusuario, setNombreusuario] = useState(null);
    let isAdmin = false;

    useEffect(() => {
        if (user && user.id) {
          const userDocRef = doc(db, "users", user.id);
      
          const unsubscribe = onSnapshot(userDocRef, (doc) => {
            setImagenFirebase(doc.data().url);
            setNombreusuario(doc.data().name)
          });
      
          return () => unsubscribe();
        }
      }, [user]);

    const handleLogout = async () => {
        await logout(() => navigate(HOME_URL));
      };

    try{
        if(user.usertype == "Administrador"){
            isAdmin = true
        } 
    }catch(error){

    }

    return (
    <div className="navbar bg-[#4E598C] z-10">
        <div className="navbar-start">
            <div className="dropdown z-10">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm font-montserrat dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to={HOME_URL}>
                <h1>Inicio</h1>
                </Link></li>
                <li><Link to={TOURS_URL}>
                    <h1>Tours</h1>
                    </Link></li>
                {user && (
                    <li><Link to={PROFILE_URL}>
                    <h1>Perfil</h1>
                    </Link></li>
                )}

                {isAdmin && (
                    <li><Link to={ARTPAGE_URL}>
                    <h1>Obras</h1>
                    </Link></li>
                )}
                
            </ul>
            </div>
            
            <img src="https://firebasestorage.googleapis.com/v0/b/metro-art-collection.appspot.com/o/proyecto-imagenes%2Fblanquito%20(1).png?alt=media&token=e40fe06a-7de3-4520-8b06-a20b054a9ef8" className='h-12'/>
            <Link to={HOME_URL}>
            <h1 className="btn btn-ghost font-montserrat normal-case text-xl text-white invisible md:visible"> 
            Metro Art Collection</h1>
            </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-white font-montserrat">
            <li>
                <Link to={HOME_URL}>
                <h1>Inicio</h1>
                </Link>
            </li>
                <li>
                    <Link to={TOURS_URL}>
                    <h1>Tours</h1>
                    </Link>
                </li>
                {user && (
                    <li>
                        <Link to={PROFILE_URL}>
                        <h1>Perfil</h1>
                        </Link>
                    </li>
                )}
                {isAdmin && (
                    <li>
                        <Link to={ARTPAGE_URL}>
                        <h1>Obras</h1>
                        </Link>
                    </li>
                )}
                
                
            </ul>
        </div>
        <div className="navbar-end gap-x-2">
            {!user && (
                <>
                <Link to={REGISTER_URL}>
                <h1 className="btn btn-xs md:btn-sm bg-[#FF8C42] normal-case font-montserrat text-white hover:bg-[#a74d15]">Registrarse</h1>
                </Link> 
                <Link to={LOGIN_URL}>
                <h1 className="btn btn-xs whitespace-nowrap md:btn-sm bg-[#FF8C42] normal-case font-montserrat text-white hover:bg-[#a74d15]">Iniciar sesión</h1>
                </Link>
                </>
            )}

            {user && (
                <>
                <h1 className="btn btn-xs md:btn-sm whitespace-nowrap btn-ghost normal-case font-montserrat text-white " onClick={handleLogout}>Cerrar sesión</h1>
                <div className='flex items-center gap-3'>
                    <h1 className='font-montserrat text-white hidden md:flex'>{nombreusuario}</h1>
                    <div className="avatar">
                        <div className="w-8 rounded-full ring ring-offset-base-100 ring-offset-2">
                        {imagenFirebase ? (
                        <img src={imagenFirebase} alt="Profile" />
                        ) : (
                        <img src="https://firebasestorage.googleapis.com/v0/b/metro-art-collection.appspot.com/o/perfil-imagenes%2Fperfil_generico.jpg?alt=media&token=f9f29c3c-7df8-479a-bb3b-3f0e02c6f83b" alt="Profile" />
                        )}
                        </div>
                    </div>
                </div>
                </>
            )}
            
            
        </div>
        </div>
  )
}
