import React, {useEffect, useState} from 'react';
import Recipe from './react/Recipe';
import RecipePicker from './react/RecipePicker';
import Navbar from "./react/Navbar";
import Sidebar from "react-sidebar";
import Footer from "./react/Footer";
import {Link, Route} from "react-router-dom";
import RecipeForm from "./react/RecipeForm";

const mql = window.matchMedia(`(min-width: 1024px)`);

export default function App() {
    const [recipes, setRecipes] = useState([]);
    const [sidebarDocked, setSidebarDocked] = useState(mql.matches);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    useEffect(() => {
        mql.addEventListener("change", handleMediaQueryChanged);
        return () => {
            mql.removeEventListener("change", handleMediaQueryChanged);
        }
    }, []);

    function handleMediaQueryChanged() {
        setSidebarOpen(false);
        setSidebarDocked(mql.matches);
    }

    function fetchRecipes() {
        fetch("/recipe")
            .then(response => response.json())
            .then(json => {setRecipes(json)});
    }

    if (!recipes || recipes.length === 0) {
        return (<div>Loading...</div>)
    }

    const sidebarStyles = {
        sidebar: {
            background: "#fafafa",
            width: '310px',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflowY: 'none',
            zIndex: '100'
        }
    };
    return (
        <Sidebar
            sidebar={
                <>
                    {/* this nav will push the sidebar down so the main nav takes up entire width of screen (on large screens) */}
                    <nav className="navbar" role="navigation" aria-label="main navigation" style={{
                        flex: '0 1 auto',
                        backgroundColor: '#fafafa'
                    }}>
                        <button className={'button bigger-burger has-text-grey is-hidden-touch'} style={{
                            border: 'none',
                            backgroundColor: '#fafafa'
                        }} onClick={() => setSidebarDocked(false)}>
                            <i className="icon-arrow-left" aria-hidden="true"> </i>
                        </button>
                    </nav>
                    <RecipePicker
                        recipes={recipes}
                        mql={mql}
                        onSetSidebarOpen={setSidebarOpen}/>
                </>
            }
            open={sidebarOpen}
            docked={sidebarDocked}
            onSetOpen={setSidebarOpen}

            styles={sidebarStyles}
            touchHandleWidth={40}
        >

            <Navbar sidebarDocked={sidebarDocked}
                    onSetSidebarDocked={setSidebarDocked}
                    sidebarOpen={sidebarOpen}
                    onSetSidebarOpen={setSidebarOpen}
                    user={user}
                    setUser={setUser}
            />

            <Route exact path='/'>
                <Home />
            </Route>

            <Route path='/recipe/:id'>
                <Recipe recipes={recipes}/>
            </Route>
            <Route path='/create-recipe'>
                <RecipeForm />
            </Route>

            <Footer/>
        </Sidebar>
    )
}

function Home(props) {
    return (
        <>
            <section className={"hero is-info"}>
                <div className={"hero-body"}>
                    <div className={"container"}>
                        <h1 className='title'>Welcome to the Home Page!</h1>
                    </div>
                </div>
            </section>
            <section className='section'>
                <div className={"container"}>
                    <Link to='/create-recipe'>
                        <button className='button is-success is-light'>Create Recipe!</button>
                    </Link>
                </div>
            </section>
        </>
    );
}