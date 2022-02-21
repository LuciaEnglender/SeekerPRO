import React from "react";
import { Link } from "react-router-dom";
import NavHomeE from "./modules/NavHomeE";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getProfile } from "../../redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";

const CompraPlan = () => {
  const { user } = useAuth0();

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  const dispatch = useDispatch();

  return (
    <div className="min-h-full">
      {/* NAVEGACION */}
      <NavHomeE />
      {/* BODY */}

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Home</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div class="bg-white">
                <div class="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
                  <div>
                    <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Go Premium</h2>
                    <p class="mt-4 text-gray-500">In today's marketplace, growing companies are facing serious challenges in finding the right talent. So, it’s more important than ever for companies to understand the opportunity a global recruitment strategy can provide. SeekerPRO provides companies with a competitive advantage through a unified customer experience. Organizations can now easily manage their entire HR process, from recruitment and onboarding to compliant payroll setup and offboarding — all with one platform.</p>


                    <dl class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                      <div class="border-t border-gray-200 pt-4">
                        <dt class="font-medium text-gray-900">Reach out your our Technical support team by WathsApp</dt>
                        <dd class="mt-2 text-sm text-gray-500">You will be available to reach out the team via WhatsApp at any tima and for any question. </dd>
                      </div>

                      <div class="border-t border-gray-200 pt-4">
                        <dt class="font-medium text-gray-900">Metrics</dt>
                        <dd class="mt-2 text-sm text-gray-500">Obtain metrics of the results of your recruitment process. Obtain the statistical detail of the technologies requested in the vacancies as well as in the personal data of the candidates.</dd>
                      </div>

                      <div class="border-t border-gray-200 pt-4">
                        <dt class="font-medium text-gray-900">Buy our premium pack and get started</dt>
                        <dd class="mt-2 text-sm text-gray-500">The pack will be all yours for a full year. Our payment method is through Mercado Pago.</dd>
                      </div>

                      <div class="border-t border-gray-200 pt-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-8 px-16 rounded">
                        <Link to="/homee/mercado">Let's get started!</Link>
                        </button>
                      </div>

                      {/*<div class="border-t border-gray-200 pt-4">
                        <dt class="font-medium text-gray-900">Includes</dt>
                        <dd class="mt-2 text-sm text-gray-500">Wood card tray and 3 refill packs</dd>
                      </div>

                      <div class="border-t border-gray-200 pt-4">
                        <dt class="font-medium text-gray-900">Considerations</dt>
                        <dd class="mt-2 text-sm text-gray-500">Made from natural materials. Grain and color vary with each item.</dd>
                      </div> */}
                    </dl>
                  </div>
                  <div class="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                    <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg" alt="Walnut card tray with white powder coated steel divider and 3 punchout holes." class="bg-gray-100 rounded-lg"/>
                    <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg" alt="Top down view of walnut card tray with embedded magnets and card groove." class="bg-gray-100 rounded-lg"/>
                    <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg" alt="Side of walnut card tray with card groove and recessed card area." class="bg-gray-100 rounded-lg"/>
                    <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg" alt="Walnut card tray filled with cards and card angled in dedicated groove." class="bg-gray-100 rounded-lg"/>
                  </div>
                </div>
              </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
};

export default CompraPlan;
