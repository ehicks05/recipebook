import React from 'react';
import Recipe from './react/Recipe';
import RecipePicker from './react/RecipePicker';
import Navbar from "./react/Navbar";
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
            recipes: [],
            selectedRecipeId: 1,
            sidebarDocked: mql.matches,
            sidebarOpen: false
        }

        const self = this;
        fetch("/recipe")
            .then(response => response.json())
            .then(json => {console.log(json); self.setState({recipes: json})});
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

        if (!this.state.recipes || this.state.recipes.length === 0) {
            return (<div>Loading...</div>)
        }

        const selectedRecipe = this.state.recipes.find(item => item.id === this.state.selectedRecipeId);

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
            <>
                <Sidebar
                    sidebar={
                        <>
                            {/* this nav will push the sidebar down so the main nav takes up entire width of screen (on large screens) */}
                            <nav className="navbar" role="navigation" aria-label="main navigation" style={{flex: '0 1 auto', backgroundColor: '#fafafa'}}>
                                <button className={'button bigger-burger has-text-grey is-hidden-touch'} style={{border: 'none', backgroundColor: '#fafafa'}} onClick={() => this.onSetSidebarDocked(false)}>
                                    <i className="icon-arrow-left" aria-hidden="true"> </i>
                                </button>
                            </nav>
                            <RecipePicker
                                onClickRecipe={this.handleClickRecipe}
                                currentlySelected={this.state.selectedRecipeId}
                                recipes={this.state.recipes}
                                mql={mql}
                                onSetSidebarOpen={this.onSetSidebarOpen} />
                        </>
                    }
                    open={this.state.sidebarOpen}
                    docked={this.state.sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}

                    styles={sidebarStyles}
                    touchHandleWidth={40}
                >

                    <Navbar recipe={selectedRecipe}
                            sidebarDocked={this.state.sidebarDocked}
                            onSetSidebarDocked={this.onSetSidebarDocked}
                            sidebarOpen={this.state.sidebarOpen}
                            onSetSidebarOpen={this.onSetSidebarOpen} />
                    <section className={"hero is-info"}>
                        <div className={"hero-body"}>
                            <div className={"container"}>
                                <h1 className='title'>{selectedRecipe.name}</h1>
                                <h3 className='subtitle'>Cooking Time: {selectedRecipe["cookingTime"]} - Difficulty: {selectedRecipe.difficulty}</h3>
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