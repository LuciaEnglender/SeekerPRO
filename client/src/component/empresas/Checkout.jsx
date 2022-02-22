import { useEffect } from "react";
import { PaperClipIcon } from '@heroicons/react/solid'
import s from "./Checkout.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions";





function Checkout ({ productos, data }) {
    const dispatch = useDispatch()

  const empresa = useSelector((state) => state.rootReducer.business);
  console.log(empresa)
  const { user } = useAuth0();

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);


  useEffect(() => {
    dispatch(getProfile(email2))


    const script = document.createElement("script"); //Crea un elemento html script

    const attr_data_preference = document.createAttribute("data-preference-id"); //Crea un nodo atribute
    attr_data_preference.value = data.id; //Le asigna como valor el id que devuelve MP

    //Agrega atributos al elemento script
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);

    console.log(data);

    //Agrega el script como nodo hijo del elemento form
    document.getElementById("form1").appendChild(script);
    return () => {
      //Elimina el script como nodo hijo del elemento form
      document.getElementById("form1").removeChild(script);
    };

  }, [data]);


  return (
    /* This example requires Tailwind CSS v2.0+ */


    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900"> SeekerPRO Premium Plan</h3>
     
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Administrator name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{empresa[0].name}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"> 
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{email2}</dd>
          </div>
          
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Pack price</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">$120,000</dd>
          </div>
        </dl>
        <div>
      <form id="form1" className="mr=9" >
        {/* <div className={s.gridContainer}>
          {productos.map((producto, i) => {
            return (
              <div className={s.products} key={i}>
                <ul className={s.ul}>
                  <li>{producto.title}</li>
                  <li>{"$" + producto.price}</li>
                  <li>{producto.quantity}</li>
                 
                </ul>
              </div>
            );
          })}
        </div> */}
      </form>
    </div>
        
      </div>
    </div>
  

  );
}

export default Checkout;
