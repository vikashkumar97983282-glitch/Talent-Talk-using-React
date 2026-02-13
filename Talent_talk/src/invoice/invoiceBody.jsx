import React from "react";
import InvoiceContainer from "./invoiceContainer";

function InvoiceBody(){

    const container = [1,2,3,4,5,6,7];

    return (
        <div className="h-100% w-full flex flex-wrap justify-center">
            <div className="h-100% w-[70%] mb-10">
                
                <div className="flex flex-wrap justify-between mt-5 mb-5">
                    <h1 className="font-bold text-2xl">Invoices</h1>
                    <button className="bg-gray-200 h-8 w-32 rounded-2xl">
                        create invoice
                    </button>
                </div>

                {/* 👇 Map here */}
                <div className="flex flex-wrap gap-5">
                    {container.map((item, index) => (
                        <InvoiceContainer 
                            key={index}
                            number={item}   // passing prop
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default InvoiceBody;
