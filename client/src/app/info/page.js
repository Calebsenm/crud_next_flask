
"use client"
import Dato from '@/components/userTable';
import { useState, useEffect } from "react";
import url_backend from "../../env";


function Info() {

  const [empresas, setEmpresas] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${url_backend}/empresas`);
      const emp = await res.json();
      setEmpresas(emp);
    };

    fetchData();
    
  }, []);

  return (
    <div>
      {empresas.map(emp => (
        <div key={emp.id}>
          <Dato empresa={emp} />
        </div>
      ))}
    </div>
  );
}

export default Info;