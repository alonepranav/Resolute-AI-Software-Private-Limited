import { useEffect } from 'react';
import { FormFieldsType } from '../App'

export default function PreviewForm(props: { data: FormFieldsType[], setSection: Function, formName: string, setData: Function }) {

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

    return (
        <div className='fixed top-0 left-0 h-screen w-screen overflow-y-scroll bg-[rgba(0,0,0,0.3)] flex justify-center items-center'>
            <form className="bg-white rounded-lg p-5 w-96">
                <h3 className='text-2xl font-semibold text-center my-3'>{props.formName}</h3>
                {
                    props.data.length == 0 ?
                        <p className='text-center text-lg font-semibold my-20'>No Fields Present In The Form</p>
                        :
                        props.data.map((a, i) => {
                            return <div className='mb-4' key={i}>
                                <label className='mb-1 block capitalize'>{a.title}</label>
                                {
                                    a.type == "textarea" ? <textarea required={a.required} placeholder={a.placeholder} className='px-2 border border-slate-600 rounded w-full py-1.5' rows={3}></textarea>
                                        :
                                        <input type={a.type} required={a.required} placeholder={a.placeholder} name={a.title} className='px-2 border border-slate-600 rounded w-full py-1.5' />
                                }
                            </div>
                        })
                }

                <div className='mb-4 mt-8'>
                    <input type="submit" value={"Submit"} className='bg-sky-500 w-full py-2 text-white font-semibold text-xl rounded hover:bg-rose-500' />
                </div>
            </form>
        </div>
    )
}
