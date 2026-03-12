import SideBarAdmin from "../components/SideBarAdmin";
import HorizontalNavBarAdmin from "../components/HorizontalNavBarAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <SideBarAdmin />
      <div className="contenedor-padre">
        <HorizontalNavBarAdmin />

        {/*Contenido de la pagina*/}
        <div className="content-view">
          {children}
        </div>

      </div>
    </div>
  );
}