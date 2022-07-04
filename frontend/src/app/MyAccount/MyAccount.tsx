import React, { useEffect, useState } from 'react';
import Carousel, { ResponsiveType } from 'react-multi-carousel';
import useUser from 'useUser';
import { Container, Hero, T } from 'core-components';
import { IFavorite, IRecipe } from '../../types/types';
import 'react-multi-carousel/lib/styles.css';
import useIsMobile from './useIsMobile';
import MyAccountComponent from './components/MyAccountComponent';
import authFetch from '../../authFetch';

function getResponsive(): ResponsiveType {
  return {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
}

function MyAccount() {
  const [myRecipes, setMyRecipes] = useState<IRecipe[] | undefined>([]);
  const [myFavorites, setMyFavorites] = useState<IRecipe[] | undefined>([]);
  const { user } = useUser();
  const isMobile = useIsMobile();

  useEffect(() => {
    function fetchMyRecipes() {
      authFetch('/api/recipes/user').then(json => setMyRecipes(json));
    }

    function fetchMyFavorites() {
      authFetch('/api/recipes/favorites').then(json => {
        if (json.length > 0) {
          const favs: IFavorite[] = json;
          setMyFavorites(favs.map(it => it.recipe));
        }
      });
    }

    fetchMyRecipes();
    fetchMyFavorites();
  }, []);

  return (
    <>
      <Hero title="Your Profile" subtitle={user?.email} />
      <Container>
        <T>User Info Dump: </T>
        <T className="whitespace-pre">{JSON.stringify(user, null, 2)}</T>
      </Container>
      <Container>
        {isMobile && (
          <Carousel
            swipeable
            draggable
            showDots={false}
            responsive={getResponsive()}
            centerMode={false}
            ssr // means to render carousel on server-side.
            infinite={false}
            autoPlay={false}
            keyBoardControl
            customTransition="transform 400ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={['']}
            deviceType="mobile"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            <div>
              <MyAccountComponent recipes={myRecipes} title="My Recipes" />
            </div>
            <div>
              <MyAccountComponent recipes={myFavorites} title="My Favorites" />
            </div>
            <div>
              <MyAccountComponent recipes={[]} title="My Lists" />
            </div>
          </Carousel>
        )}

        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MyAccountComponent recipes={myRecipes} title="My Recipes" />
            <MyAccountComponent recipes={myFavorites} title="My Favorites" />
            <MyAccountComponent recipes={[]} title="My Lists" />
          </div>
        )}
      </Container>
    </>
  );
}

export default MyAccount;
