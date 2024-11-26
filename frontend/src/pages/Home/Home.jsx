import { Link } from "react-router-dom";

import Hero from "../../components/Hero/Hero";
import HotDeals from "../../components/HotDeals/HotDeals";
import CategoryLists from "../../components/CategoryLists/CategoryLists";
import TopRated from "../../components/TopRated/TopRated";
import Button from "../../components/Button/Button";

const Home = () => {
    return (
        <>
            <main>
                <section>
                    <Hero />
                </section>
                <section>
                    <CategoryLists />
                </section>
                {/* MOBILE */}
                <section className="block sm:hidden w-full">
                    <HotDeals cardWidth={320} visibleCards={1} />
                </section>
                {/* TABLET */}
                <section className="hidden sm:block md:hidden w-full">
                    <HotDeals cardWidth={260} visibleCards={2} />
                </section>
                {/* DESKTOP */}
                <section className="hidden md:block lg:hidden w-full">
                    <HotDeals cardWidth={300} visibleCards={2} />
                </section>
                {/* DESKTOP LARGE */}
                <section className="hidden lg:block xl:hidden w-full">
                    <HotDeals cardWidth={280} visibleCards={3} />
                </section>
                {/* DESKTOP X LARGE */}
                <section className="hidden xl:block w-full">
                    <HotDeals cardWidth={370} visibleCards={3} />
                </section>
                <section>
                    <TopRated />
                </section>
                <section className="hidden md:block mt-48">
                    <Link
                        className="w-full flex justify-center"
                        to="/shop"
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}
                    >
                        <Button
                            text="Go To Shop"
                            width="30%"
                            height="54px"
                            fontSize="22px"
                        />
                    </Link>
                </section>
            </main>
        </>
    );
};

export default Home;
