import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
);

//importamos de .env, NO FUNCIONAN CUANDO SE EMPLEA VITE
//import dotenv from 'dotenv';
//dotenv.config();

//- En Vite, las variables de entorno deben tener el prefijo VITE_ para ser accesibles desde el frontend.
//- Además, no se usa dotenv directamente en el frontend: Vite ya carga las variables automáticamente desde .env.
// el dotenv es importante ya que:
//- Carga automaticamente de variables en process.env.
//- es compatible con múltiples entornos (.env.development, .env.production, etc.).
//- Permite mantener seguridad y separación de configuración sin hardcodear valores sensibles.
//- Muy útil en proyectos con Supabase, PostgreSQL, autenticación, etc., donde manejás claves y URIs.