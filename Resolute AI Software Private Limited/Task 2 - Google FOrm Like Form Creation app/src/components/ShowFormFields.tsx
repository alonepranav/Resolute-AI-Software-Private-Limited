import { useEffect } from 'react';
import { FormFieldsType } from '../App'

export default function ShowFormFields(props: { data: FormFieldsType[], setSection: Function, setData: Function }) {

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


    const handleDelete = (a: number) => {
        props.setData((w: FormFieldsType[]) => [
            ...w.filter((e, i) => i != a)
        ])
    }

    return (
        <div className='fixed top-0 left-0 h-screen w-screen overflow-y-scroll bg-[rgba(0,0,0,0.3)] flex justify-center items-center'>

            <div>
                <div className="bg-white rounded-lg p-5 w-96">
                    <h3 className='text-2xl font-semibold text-center my-3'>Form Fields Preview</h3>

                    <br />
                    <br />
                    <div className="">
                        {
                            props.data.map((a, i) => {

                                return <div className='flex justify-between gap-3 mb-5' key={i}>
                                    <p className='h-9 bg-slate-200 w-9 text-lg flex rounded-md justify-center items-center'>{i + 1}</p>
                                    <div className="">

                                        {
                                            (a.title != "") && <p>Title : {a.title}</p>
                                        }
                                        {
                                            (a.type != "") && <p>Type : {a.type}</p>
                                        }
                                        {
                                            (a.placeholder != "") && <p>Placeholder : {a.placeholder}</p>
                                        }
                                        {
                                            <p>required : {a.required ? "True" : "False"}</p>
                                        }
                                    </div>
                                    <p
                                        onClick={() => {
                                            handleDelete(i)
                                        }}
                                        className=' bg-rose-500 text-white p-2 h-fit text-sm font-semibold flex rounded-md justify-center items-center'>Delete</p>
                                </div>

                            })
                        }


                    </div>
                </div>

            </div>
        </div>
    )
}
