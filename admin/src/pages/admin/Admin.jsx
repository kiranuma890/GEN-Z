import { Route, Routes } from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar"
import "./admin.css"
import AddProduct from "../../components/AddProduct/AddProduct"
import ListProduct from "../../components/ListProduct.jsx/ListProduct"

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path="/addproduct" element={<AddProduct/>}/>
            <Route path="/listproduct" element={<ListProduct/>}/>
        </Routes>
    </div>
  )
}

export default Admin