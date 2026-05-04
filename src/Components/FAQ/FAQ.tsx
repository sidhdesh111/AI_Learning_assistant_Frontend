import { Minus, Plus } from 'lucide-react';
import React from 'react'

type faqtype = {
    index: number;
    data: {
        question: string;
        answer: string;
    },
    faqopen: number | null;
    setFaqOpen: (value: React.SetStateAction<number | null>) => void;
}



const FAQ = ({ data, faqopen, setFaqOpen, index }: faqtype) => {
    return (
        <div className='border-y border-slate-200 py-4 transition-all duration-500 ease-in-out'>
            <div onClick={() => setFaqOpen(faqopen === index ? null : index)}

                className={`flex items-center gap-2 justify-between py-2 rounded-xl lg:px-5 cursor-pointer  transition-all duration-500 ease-in-out`}>
                <h2 className='text-lg font-medium'> {data.question}</h2>
                <div className='p-1 lg:p-2 bg-black rounded-full transition-all duration-500 ease-in-out'>
                    {
                        faqopen === index ? <Minus className='w-5 h-5 text-white'  strokeWidth={3}/> :  <Plus className='w-5 h-5 text-white' strokeWidth={3} />
                    }
                   
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                faqopen === index ? 'max-h-96 opacity-100 p-2 lg:py-6 lg:px-6' : 'max-h-0 opacity-0'
            }`}>
                <p className='text-lg text-slate-600 font-normal'>{data.answer}</p>
            </div>

        </div>
    )
}

export default FAQ