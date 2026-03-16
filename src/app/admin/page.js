"use client"

import RoleProtected from "../../components/RoleProtected"

export default function AdminPage(){

return(

<RoleProtected allowed={["admin"]}>

<div className="p-10">

<h1 className="text-3xl font-bold">
Admin Dashboard
</h1>

<p className="mt-4">
System control panel
</p>

</div>

</RoleProtected>

)

}