import React from 'react';
import recipeData from './recipes.json';
import Recipe from './components/Recipe';
import RecipePicker from './components/RecipePicker';
import Navbar from "./components/Navbar";
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 1024px)`);

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.handleClickRecipe = this.handleClickRecipe.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.onSetSidebarDocked = this.onSetSidebarDocked.bind(this);
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);

        this.state = {
            recipes: recipeData,
            selectedRecipeId: 1,
            sidebarDocked: mql.matches,
            sidebarOpen: false
        }
    }

    handleClickRecipe(id) {
        this.setState({ selectedRecipeId: id });
    }

    componentDidMount() {
        mql.addEventListener("change", this.mediaQueryChanged);
    }

    componentWillUnmount() {
        mql.removeEventListener("change", this.mediaQueryChanged);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    onSetSidebarDocked(docked) {
        this.setState({ sidebarDocked: docked });
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }

    render() {
        const selectedRecipe = recipeData.find(item => item.id === this.state.selectedRecipeId);

        const sidebarStyles = {
            sidebar: {
                background: "white",
                width: '300px',
            }
        };

        return (
            <>
                <Sidebar
                    sidebar={
                        <>
                            {/* this nav will push the sidebar down so the main nav takes up entire width of screen (on large screens) */}
                            <nav className="navbar" role="navigation" aria-label="main navigation">
                                <a className={'button is-hidden-touch'} onClick={() => this.onSetSidebarDocked(false)}>
                                    <i className="fas fa-times" aria-hidden="true"> </i>
                                </a>
                            </nav>
                            <RecipePicker
                                onClickRecipe={this.handleClickRecipe}
                                currentlySelected={this.state.selectedRecipeId}
                                recipes={recipeData}/>
                        </>
                    }
                    open={this.state.sidebarOpen}
                    docked={this.state.sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}

                    styles={sidebarStyles}
                    touchHandleWidth={40}
                >

                    <Navbar recipe={selectedRecipe} sidebarDocked={this.state.sidebarDocked} onSetSidebarDocked={this.onSetSidebarDocked} />
                    <section className={"hero is-info"}>
                        <div className={"hero-body"}>
                            <div className={"container"}>
                                <h1 className='title'>{selectedRecipe.name}</h1>
                                <h3 className='subtitle'>Cooking Time: {selectedRecipe["Cooking Time"]} - Difficulty: {selectedRecipe.difficulty}</h3>
                            </div>
                        </div>
                    </section>

                    <section className={"section"}>
                        <div className={'container'}>
                            <div className={'columns'}>
                                <Recipe recipe={selectedRecipe} />
                            </div>
                        </div>
                    </section>
                </Sidebar>
            </>
        );
    }
}