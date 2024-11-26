import React from 'react'
import { Link } from 'react-router-dom'
export default function DownFooter() {
  return (
    <div>
       <div className="border--2 mx-36 text-center">
                <section className=" md:flex md:justify-evenly">
                    <div className="pt-8 flex justify-center">
                        <p className="text-[1.3rem]">
                            ©2024 neSTory by{" "}
                            <Link to="/" className="hover:underline">
                                LaLa Group
                            </Link>{" "}
                            | All Rights Reserved | Powered by{" "}
                            <Link className="hover:underline"> WordPass</Link>
                        </p>
                    </div>
                    <div className="flex justify-center p-8 ">
                        <Link to="https://www.paypal.com/de/digital-wallet/send-receive-money?kid=p79723554003&gclid=Cj0KCQjwj4K5BhDYARIsAD1Ly2oibhjoC_gTjsxjBgXXjbfBL47gewp8fzA-D2ztlRVx6_hkvuMa8AAaAnhDEALw_wcB&gclsrc=aw.ds">
                            <img
                                className=" hover:bg-blue-100 hover: hover:rounded-md w-28"
                                src="https://themes.muffingroup.com/be/furniturestore2/wp-content/themes/betheme/images/payment-methods/PayPal.svg"
                                alt="paypal"
                            />
                        </Link>
                        <Link to="https://www.visa.de/">
                            <img
                                className="hover:bg-blue-100 hover:rounded-md w-28"
                                src="https://themes.muffingroup.com/be/furniturestore2/wp-content/themes/betheme/images/payment-methods/Visa.svg"
                                alt="visa"
                            />
                        </Link>
                        <Link to="https://www.unzer.com/de/mastercard/?utm_term&utm_campaign=11188183112&utm_campaign=11188183112&utm_source=adwords&utm_source=adwords&utm_medium=ppc&utm_medium=ppc&gad_source=1&gclid=Cj0KCQjwj4K5BhDYARIsAD1Ly2pPLmht4RSx1vkFXmgIzokjkYLoAxGRPqywepcSAtQL1-v311_qZeAaAirvEALw_wcB">
                            <img
                                className="hover:bg-blue-100 hover:rounded-md w-28"
                                src="https://themes.muffingroup.com/be/furniturestore2/wp-content/themes/betheme/images/payment-methods/Mastercard.svg"
                                alt="mastercart"
                            />
                        </Link>
                        <Link to="https://www.priceless.com/celebrity/19354/pay-and-get-germany">
                            <img
                                className="hover:bg-blue-100 hover:rounded-md w-28"
                                src="https://themes.muffingroup.com/be/furniturestore2/wp-content/themes/betheme/images/payment-methods/Maestro.svg"
                                alt=""
                            />
                        </Link>
                        <Link to="https://stripe.com/de?utm_campaign=EMEA_DE_en_Google_Search_Brand_Stripe_EXA-866170064&utm_medium=cpc&utm_source=google&ad_content=276018915073&utm_term=stripe&utm_matchtype=e&utm_adposition=&utm_device=c&gad_source=1&gclid=Cj0KCQjwsoe5BhDiARIsAOXVoUs8n7sUDmGGz9QaBwqXrCwcUgsT-bDZH9AzOxPRuClxSS6HwafyAHkaAoJMEALw_wcB">
                            <img
                                className="hover:bg-blue-100 hover:rounded-md w-28"
                                src="https://themes.muffingroup.com/be/furniturestore2/wp-content/themes/betheme/images/payment-methods/Stripe.svg"
                                alt=""
                            />
                        </Link>
                    </div>
                </section>
            </div>
    </div>
  )
}
