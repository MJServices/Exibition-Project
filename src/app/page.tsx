"use client"
import Intro from "@/components/Intro"
import { useState } from "react"

const page = () => {
  const [childData, setChildData] = useState(null)

  const handleDataFromChild = (data: any) => {
    setChildData(data)
  }

  return (
    <main>
      <Intro onDataTransfer={handleDataFromChild}/>
      {childData ? "" : ""}
    </main>
  )
}
export default page