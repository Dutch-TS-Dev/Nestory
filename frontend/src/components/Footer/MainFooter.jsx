import React from "react";
import { Link } from "react-router-dom";

export default function MainFooter() {
  return (
    <div>
      <>
        <footer>
          <div className="pb-8 w-[75%] mx-auto mb-20 md:mb-[-8rem] text-center md:text-left text-colorPrimary">
            <div className="TWO justify-around w-full lg:flex md:gap-1">
              <div className="left w-full md:basis-[48%]">
                <h1 className="text-center lg:text-start pt-16 text-[1.5rem] lg:text-[2.8rem] lg:pl-10 xl:text-[3rem] font-semibold">
                  Spaces that improve your quality of life - Request an estimate
                </h1>
                <div className="flex flex-col justify-center text-center lg:flex-row lg:pl-10 items-center lg:justify-start md:gap-3">
                  <div className="text-center w-[30rem] flex flex-col lg:items-start ">
                    <p className=" pt-4 text-[1.5rem] xl:text-[1.8rem]  ">
                      Phone
                    </p>
                    <p className="text-[1.2rem] xl:text-[1.5rem]">
                      <Link>+49(40)88799</Link>
                    </p>
                  </div>

                                    <div className="w-[30rem] flex flex-col lg:items-start">
                                        <p className="pt-4 text-[1.5rem] xl:text-[1.8rem]">
                                            Mail
                                        </p>
                                        <p className="text-[1.2rem] xl:text-[1.5rem] ">
                                            <Link to="https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=ee272b19-4411-433f-8f28-5c13cb6fd407&redirect_uri=https%3A%2F%2Fsupport.microsoft.com%2Fsignin-oidc&response_type=code%20id_token&scope=openid%20profile%20offline_access&response_mode=form_post&nonce=638658020109283406.MzJmODBmZmMtZWVkMy00NDdlLTgwZTItOWI2NDNhZDVkMDhiNjAxNmJlNmUtNjQ0Ny00ZWNlLTg3Y2UtMjRkZGJmZWFkMTZi&nopa=2&state=CfDJ8C0ohqf0LPdLoRrMGwogAwwSEv6mdcEFmX7U9jsOkPgWe8NDPgOF1yCi9uVofFSWvD9yMU16TQ-lBVTC4V3ZAEclp_WRM1yqTAp05_FFzqdnnTqz9wTtXmOngyB2H0ejAtjYDc2fkJkSHvevPcQ7DZbnnlJoCQKXbaqTQ_NKAGpVU8KO51krks1UQbJnEJpj0ugtqj39L1WjVtDz5bKn2v2ZUrM0fmCZ9NjIcc4IweNuI5J9Dna35sAlBUf8gYVhHAVEYqk2NunDEpfN-VTpM1FV5IgpVEkvqL3hj5kBkE42VfXYnxiWXdGOc_qIXWIZo2vc0EaU_GyfrCkKLG_qAfH-cXEP6OnIxOYgDQDGr7N8iul4nmPnHkXCkfVygPJ1mdcBpq6VFJpdL2LnSnMkr2s&x-client-SKU=ID_NET6_0&x-client-ver=8.0.2.0">
                                                neSTory-furniture@hotmail.com
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="right pl-4 pr-0 flex justify-center items-start text-start gap-[8rem] md:gap-[6rem] lg:gap-64 xl:gap-72 text-[1.5rem] py-16 font-medium ">
                                <ul className="space-y-8">
                                    {[
                                        "SHOP",
                                        "PROJECTS",
                                        "FAQ",
                                        "SERVICES",
                                        "ABOUT US",
                                        "CONTACT",
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center"
                                        >
                                            <span>-</span>
                                            <Link>{item}</Link>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="space-y-8">
                                    {[
                                        "SOFAS",
                                        "CHAIRS",
                                        "TABLES",
                                        "BEDS",
                                        "DESKS",
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center"
                                        >
                                            <span>-</span>
                                            <Link>{item}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="icons flex justify-center pb-8">
                            <Link to="https://www.paypal.com/de/digital-wallet/send-receive-money?kid=p79723554003&gclid=Cj0KCQjwj4K5BhDYARIsAD1Ly2oibhjoC_gTjsxjBgXXjbfBL47gewp8fzA-D2ztlRVx6_hkvuMa8AAaAnhDEALw_wcB&gclsrc=aw.ds">
                                <img
                                    className=" hover:bg-blue-100 hover: hover:rounded-md w-24"
                                    src="https://themes.muffingroup.com/be/furniturestore2/wp-content/themes/betheme/images/payment-methods/PayPal.svg"
                                    alt="paypal"
                                />
                            </Link>
                            <Link to="https://www.visa.de/">
                                <img
                                    className="hover:bg-blue-100 hover:rounded-md w-24"
                                    src="https://themes.muffingroup.com/be/furniturestore2/wp-content/themes/betheme/images/payment-methods/Visa.svg"
                                    alt="visa"
                                />
                            </Link>
                            <Link to="https://www.unzer.com/de/mastercard/?utm_term&utm_campaign=11188183112&utm_campaign=11188183112&utm_source=adwords&utm_source=adwords&utm_medium=ppc&utm_medium=ppc&gad_source=1&gclid=Cj0KCQjwj4K5BhDYARIsAD1Ly2pPLmht4RSx1vkFXmgIzokjkYLoAxGRPqywepcSAtQL1-v311_qZeAaAirvEALw_wcB">
                                <img
                                    className="hover:bg-blue-100 hover:rounded-md w-24"
                                    src="https://themes.muffingroup.com/be/furniturestore2/wp-content/themes/betheme/images/payment-methods/Mastercard.svg"
                                    alt="mastercart"
                                />
                            </Link>
                            <Link to="https://www.priceless.com/celebrity/19354/pay-and-get-germany">
                                <img
                                    className="hover:bg-blue-100 hover:rounded-md w-24"
                                    src="https://themes.muffingroup.com/be/furniturestore2/wp-content/themes/betheme/images/payment-methods/Maestro.svg"
                                    alt=""
                                />
                            </Link>
                            <Link to="https://stripe.com/de?utm_campaign=EMEA_DE_en_Google_Search_Brand_Stripe_EXA-866170064&utm_medium=cpc&utm_source=google&ad_content=276018915073&utm_term=stripe&utm_matchtype=e&utm_adposition=&utm_device=c&gad_source=1&gclid=Cj0KCQjwsoe5BhDiARIsAOXVoUs8n7sUDmGGz9QaBwqXrCwcUgsT-bDZH9AzOxPRuClxSS6HwafyAHkaAoJMEALw_wcB">
                                <img
                                    className="hover:bg-blue-100 hover:rounded-md w-24"
                                    src="https://themes.muffingroup.com/be/furniturestore2/wp-content/themes/betheme/images/payment-methods/Stripe.svg"
                                    alt=""
                                />
                            </Link>
                        </div>
                        {/* unten teil 30/40% */}
                       
                        <div className="w-full md:flex justify-center border-t-2">
                            <div className="pt-8 mb-4 flex justify-center">
                                <p className="text-[1.3rem] xl:text-[1.5rem]">
                                    ©2024 neSTory by{" "}
                                    <Link to="/about" className="hover:underline hover:bg-yellow-200 hover:p-4 rounded-lg font-semibold">
                                        LaLa Group
                                    </Link>{" "}
                                    | All Rights Reserved | Powered by{" "}
                                    <Link className="hover:underline">
                                        {" "}
                                        WordPass
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        </div>
    );
}
