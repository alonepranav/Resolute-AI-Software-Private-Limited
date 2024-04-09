import { useEffect, useState } from "react"
import AddFormFields from "./components/AddFormFields"
import { createPortal } from "react-dom"
import ShowFormFields from "./components/ShowFormFields"
import PreviewForm from "./components/PreviewForm"

export interface FormFieldsType {
  type: "text" | "password" | "email" | "textarea" | "number" | "",
  placeholder: string,
  title: string,
  required: boolean,
}

export default function App() {

  const [section, setSection] = useState<null | "preview" | "show" | "add">(null)
  const [data, setData] = useState<FormFieldsType[]>([])
  const [formName, setFormName] = useState<string>("")

  useEffect(() => {
    const a = prompt("Enter the title of form : ");
    setFormName(a + "")
  }, [])

  return (
    <div>
      <br />
      <h1 className="text-4xl text-center font-semibold">Form Creation App</h1>

      <div className="flex justify-center mt-40 gap-10">
        <button onClick={() => {
          setSection("show")
        }} className="px-5 py-1.5 rounded-md font-semibold text-lg bg-blue-600 text-white">Show Form Fields</button>
        <button onClick={() => {
          setSection("add")
        }} className="px-5 py-1.5 rounded-md font-semibold text-lg bg-blue-600 text-white">Add Form Fields</button>
      </div>

      <div className="flex justify-center mt-10 gap-10">
        <button onClick={() => {
          setSection("preview")
        }} className="px-5 py-1.5 rounded-md font-semibold text-lg bg-black text-white">Preview Form</button>
      </div>

      {
        section == "add" && createPortal(<AddFormFields {...{ data, setSection, setData }} />, document.getElementById("modal")!)
      }

      {
        section == "preview" && createPortal(<PreviewForm  {...{ data, setSection, setData, formName }} />, document.getElementById("modal")!)
      }

      {
        section == "show" && createPortal(<ShowFormFields  {...{ data, setSection, setData }} />, document.getElementById("modal")!)
      }

    </div>
  )
}