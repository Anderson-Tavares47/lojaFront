'use client'
import AdminForm from "../../components/AdminForm"
import Header from "../../components/HeaderDetails"

export default function AdminPage() {
  return (
    <>
    <Header/>
    <div className="flex flex-col gap-4 max-w-[600px] min-h-[705px] w-full mx-auto p-4">
      <h1 className="text-2xl font-bold">Painel Admin</h1>
      {/* <AdminForm /> */}
    </div>
    </>
  )
}
