import React, {useEffect, useState} from 'react';
import Recipe from './react/Recipe';
import RecipePicker from './react/RecipePicker';
import Navbar from "./react/Navbar";
import Sidebar from "react-sidebar";
import Footer from "./react/Footer";

const mql = window.matchMedia(`(min-width: 1024px)`);

export default function App() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(0);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [sidebarDocked, setSidebarDocked] = useState(mql.matches);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        mql.addEventListener("change", handleMediaQueryChanged);
        return () => {
            mql.removeEventListener("change", handleMediaQueryChanged);
        }
    }, []);

    useEffect(() => {
        fetchRecipes();
    }, []);

    useEffect(() => {
        const recipe = recipes.find(item => item.id === selectedRecipeId);
        if (recipe)
            setSelectedRecipe(recipe);
    }, [recipes, selectedRecipeId]);

    function handleMediaQueryChanged() {
        setSidebarOpen(false);
        setSidebarDocked(mql.matches);
    }

    function fetchRecipes() {
        fetch("/recipe")
            .then(response => response.json())
            .then(json => {setRecipes(json); setSelectedRecipeId(json[0].id)});
    }

    if (!recipes || recipes.length === 0 || !selectedRecipe) {
        return (<div>Loading...</div>)
    }

    const sidebarStyles = {
        sidebar: {
            background: "#fafafa",
            width: '310px',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflowY: 'none'
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
                        onClickRecipe={setSelectedRecipeId}
                        currentlySelected={selectedRecipeId}
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

            <Navbar recipe={selectedRecipe}
                    sidebarDocked={sidebarDocked}
                    onSetSidebarDocked={setSidebarDocked}
                    sidebarOpen={sidebarOpen}
                    onSetSidebarOpen={setSidebarOpen}
                    user={user}
                    setUser={setUser}
            />

            {/*Route stuff can go here*/}
            <Recipe recipe={selectedRecipe}/>
            {/*More routes*/}

            <Footer/>
        </Sidebar>
    )
}