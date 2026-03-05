import React from "react";
import Filter from "../users/filter";
import PaymentStatus from "./paymentStatus";
import PaymentHeader from "./paymenHeader";
import PaymentHistory from "./paymentHistory";


function PaymentsBody(){

    const status = [{title:"Total Revinue", amount:"$1,250,000"},{title:"Pending Payouts", amount:"$25,000"}]

    const paymentHistory=["Transaction","Client","Freelancer","Amount","Date","Status"]

    const getTransaction = [
    {
      id: "TXN12345",
      sender: "Ava Harper",
      receiver: "Ethan Bennett",
      amount: 5000,
      currency: "USD",
      date: "2023-08-15",
      status: "Completed"
    },
    {
      id: "TXN12346",
      sender: "Liam Johnson",
      receiver: "Olivia Smith",
      amount: 3200,
      currency: "USD",
      date: "2023-08-16",
      status: "Pending"
    },
    {
      id: "TXN12347",
      sender: "Noah Williams",
      receiver: "Emma Brown",
      amount: 1500,
      currency: "USD",
      date: "2023-08-17",
      status: "Failed"
    },
    {
      id: "TXN12348",
      sender: "Sophia Davis",
      receiver: "James Miller",
      amount: 2750,
      currency: "USD",
      date: "2023-08-18",
      status: "Completed"
    },
    {
      id: "TXN12349",
      sender: "Benjamin Wilson",
      receiver: "Mia Moore",
      amount: 4200,
      currency: "USD",
      date: "2023-08-19",
      status: "Pending"
    },
    {
      id: "TXN12350",
      sender: "Charlotte Taylor",
      receiver: "Lucas Anderson",
      amount: 890,
      currency: "USD",
      date: "2023-08-20",
      status: "Completed"
    },
    {
      id: "TXN12351",
      sender: "Amelia Thomas",
      receiver: "Henry Jackson",
      amount: 6400,
      currency: "USD",
      date: "2023-08-21",
      status: "Failed"
    },
    {
      id: "TXN12352",
      sender: "Elijah White",
      receiver: "Harper Martin",
      amount: 2100,
      currency: "USD",
      date: "2023-08-22",
      status: "Completed"
    },
    {
      id: "TXN12353",
      sender: "Evelyn Thompson",
      receiver: "Daniel Garcia",
      amount: 5300,
      currency: "USD",
      date: "2023-08-23",
      status: "Pending"
    },
    {
      id: "TXN12354",
      sender: "Michael Martinez",
      receiver: "Abigail Robinson",
      amount: 7600,
      currency: "USD",
      date: "2023-08-24",
      status: "Completed"
    }
  ];

    return (
        <div className="h-100% w-full flex flex-wrap justify-center">
            <div className="h-100% w-[70%] mb-10">
                <div className="">
                <h1 className="font-bold text-2xl mt-5 mb-5">User Management</h1>
                <input type="text" placeholder="enter the value" className="h-10 w-full bg-gray-200 rounded-md p-5"/>
                </div>
                <div className="h-100% w-full mt-5">
                    <Filter/>
                </div>
                <div className="flex flex-wrap gap-8.5 mt-5">
                    {status.map((elem,idx)=>{
                        return <PaymentStatus key={idx} title={elem.title} amt={elem.amount}/>
                    })}
                </div>
                <div className="h-10 w-full mt-5  flex flex-wrap items-center border rounded-t-2xl gap-20">
                    {paymentHistory.map((elem,idx)=>{
                        return <PaymentHeader key={idx} header={elem}/>
                    })}
                </div>
                <div className=" w-full  flex flex-wrap items-center">
                    {getTransaction.map((elem,idx)=>{
                        return <PaymentHistory key={idx} id={elem.id} client={elem.sender} freelancer={elem.receiver} amount={elem.amount} cur={elem.currency} date={elem.date} status={elem.status}/>
                    })}
                </div>

            </div>
            
        </div>
    )
}

export default PaymentsBody;