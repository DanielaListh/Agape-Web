import SideBarAdmin from "../components/SideBarAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <SideBarAdmin/>
      <main className="admin-content">{ children}</main>
    </div>
  );
}