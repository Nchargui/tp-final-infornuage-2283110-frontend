import { useEffect, useState } from "react";
import './AdminCustomerCard.css';

// kristina
function AdminCustomerList() {
    const VITE_API_URL = import.meta.env.VITE_API_URL || ""
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await fetch(`${VITE_API_URL}/api/Customer/listCustomers`);
                if (res.ok) {
                    const data = await res.json();
                    setCustomers(data);
                } else {
                    console.error("Failed to fetch customers");
                }
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <div className="adminCustomerList">
            <div className="customerCardGrid">
                {customers.map((customer) => (
                    <div className="customerCard" key={customer.id}>
                        <div className="customerCardUserCircle">
                            <img className="customerCardUserPicture" src="/user.png" alt="User Picture" />
                        </div>
                        <div className="customerCardCredentials">
                            <p className="customerCardFullName">{customer.fname} {customer.lname}</p>
                            <p className="customerCardPersonalInfo">{customer.email}</p>
                            <p className="customerCardPersonalInfo">{customer.phone}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminCustomerList;
