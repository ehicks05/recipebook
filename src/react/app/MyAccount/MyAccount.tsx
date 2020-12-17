import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import { IRecipe, IUser } from "../../types/types";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useIsMobile from "../../hooks/useIsMobile";
import MyAccountComponent from "./components/MyAccountComponent";
import authFetch from "../../authFetch";

interface IProps {
  user: IUser | undefined;
  recipes: IRecipe[] | undefined;
}

function MyAccount(props: IProps) {
  const [myRecipes, setMyRecipes] = useState<IRecipe[] | undefined>([]);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    function fetchMyRecipes() {
      authFetch("/recipe/user")
          .then(json => setMyRecipes(json));
    }

    fetchMyRecipes();
  }, []);

  function getResponsive(): ResponsiveType {
    return {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    }
  }

  return (
      <>
        <Hero title={"Edit Your Account"} subtitle={props.user?.displayName} />

        {isMobile && (
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={false}
                responsive={getResponsive()}
                centerMode={false}
                ssr={true} // means to render carousel on server-side.
                infinite={false}
                autoPlay={false}
                keyBoardControl={true}
                customTransition="transform 400ms ease-in-out"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={[""]}
                deviceType={'mobile'}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
              <div>
                <MyAccountComponent recipes={myRecipes} title="My Recipes" />
              </div>
              <div>
                <MyAccountComponent recipes={myRecipes} title="My Favorites" />
              </div>
              <div>
                <p className="has-text-centered">
                  My Sneed
                </p>
                {myRecipes?.map((it) => (
                    <div key={it.id}>{it.name}</div>
                    // <SmallRecipeCard recipe={it} />
                ))}
              </div>
            </Carousel>
        )}

        {!isMobile && (
            <section className="section">
              <div className="container">
                <div className="columns is-centered">
                  <div className="column is-one-third">
                    <MyAccountComponent recipes={myRecipes} title="My Recipes" />
                  </div>
                  <div className="column is-one-third">
                    <MyAccountComponent recipes={myRecipes} title="My Favorites" />
                  </div>
                  <div className="column is-one-third">
                    <p className="has-text-centered">
                      My Lists
                    </p>
                  </div>
                </div>
              </div>
            </section>
        )}
      </>
  );
}

export default MyAccount;
