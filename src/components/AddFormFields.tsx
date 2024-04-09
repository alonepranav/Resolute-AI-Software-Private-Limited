import { FormEvent, useEffect, useState } from 'react';
import { FormFieldsType } from '../App'

export default function AddFormFields(props: { data: FormFieldsType[], setSection: Function, setData: Function }) {
    useEffect(() => {
        window.addEventListener("keydown", Listener);

        function Listener(e: KeyboardEvent) {
            if (e.key == "Escape") {
                props.setSection(null)
            }
        }
        return () => {
            window.removeEventListener("keydown", Listener);
        };
    }, []);

    const [newData, setNewData] = useState<FormFieldsType>({
        placeholder: "",
        required: false,
        title: "",
        type: ""
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        props.setData([...props.data, {
            ...newData
        }])

        props.setSection(null)
    }

    return (
        <div className='fixed top-0 left-0 h-screen w-screen overflow-y-scroll bg-[rgba(0,0,0,0.3)] flex justify-center items-center'>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-5 w-96">
                <h3 className='text-2xl font-semibold text-center my-3'>Add Form Fields</h3>
                <br />
                <br />

                <p className='text-font-semibold mb-1'>Choose Field Type : </p>
                <select required className='w-full py-2 rounded-md px-3' onChange={(e) => setNewData({
                    ...newData,
                    type: e.target.value as "text" | "password" | "email" | "textarea" | "number",
                })}>
                    <option value={"Choose Field"}>Choose Field</option>
                    {
                        ["text", "password", "email", "textarea", "number",].map((a, i) => {
                            return <option value={a} key={i}>{a}</option>
                        })
                    }
                </select>

                {
                    newData.type == "" ? <></> :
                        <div className='mt-5'>
                            <div className="mb-4">
                                <label className='mb-1 block capitalize'>Enter Field Title</label>
                                <input
                                    required
                                    type="text"
                                    onChange={(e) => setNewData({
                                        ...newData,
                                        title: e.target.value
                                    })}
                                    className='px-2 border border-slate-600 rounded w-full py-1.5'
                                />
                            </div>
                            <div className="mb-4">
                                <label className='mb-1 block capitalize'>Enter Field Placeholder</label>
                                <input
                                    required
                                    type={newData.placeholder}
                                    onChange={(e) => setNewData({
                                        ...newData,
                                        placeholder: e.target.value
                                    })}
                                    className='px-2 border border-slate-600 rounded w-full py-1.5'
                                />
                            </div>

                            <label className='mb-1 block capitalize'>Enter is the field is required or not</label>
                            <select
                                required
                                className='mt-1 w-full py-2 rounded-md px-3' onChange={(e) => setNewData({
                                    ...newData,
                                    required: e.target.value == "true" ? true : false,
                                })}>
                                <option value={"false"}>False</option>
                                <option value={"true"}>True</option>
                            </select>


                            <div className="flex justify-center mt-7">
                                <button type='submit' className='px-5 bg-emerald-400 w-full py-1.5 rounded text-white font-semibold text-lg'>Add new Field</button>
                            </div>
                        </div>
                }

            </form>

        </div >
    )
}
