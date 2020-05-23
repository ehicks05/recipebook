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
        this.performLogin = this.performLogin.bind(this);
        this.logout = this.logout.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
        this.fetchRecipes = this.fetchRecipes.bind(this);

        this.state = {
            recipes: [],
            selectedRecipeId: 0,
            sidebarDocked: mql.matches,
            sidebarOpen: false,
            user: null
        }

        this.fetchRecipes();
        this.fetchUser();
    }

    fetchRecipes() {
        const self = this;
        fetch("/recipe")
            .then(response => response.json())
            .then(json => {console.log(json); self.setState({recipes: json, selectedRecipeId: json[0].id})});
    }

    fetchUser() {
        const self = this;
        fetch("/user")
            .then(response => response.json())
            .then(json => {console.log(json); self.setState({user: json})});
    }

    logout() {
        fetch("/logout")
            .then(response => response.text())
            .then(text => {console.log(text); this.setState({user: null})});
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

    performLogin() {
        const formData = new FormData(document.getElementById('loginForm'));
        const self = this;
        fetch('/login', {method: 'POST', body: new URLSearchParams(formData)})
            .then(response => response.text())
            .then(text => {console.log(text); self.fetchUser()});

        return false;
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

                    <div className={"container"}>
                        <div style={{width: '300px'}}>
                            {
                                !this.state.user &&
                                <form method="POST" action="/login" id="loginForm">
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="email" placeholder="Your Email" autoFocus="" id="username" name="username" />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="password" placeholder="Your Password" id="password" name="password" />
                                        </div>
                                    </div>
                                    <input type="button" value="Log in" className="button is-block is-primary is-fullwidth" onClick={this.performLogin}/>
                                </form>
                            }
                            {
                                this.state.user &&
                                <button className='button is-danger is-fullwidth' onClick={this.logout}>Logout</button>
                            }
                        </div>
                    </div>

                    <section className={"hero is-info"}>
                        <div className={"hero-body"}>
                            <div className={"container"}>
                                <h1 className='title'>{selectedRecipe.name}</h1>
                                <h3 className='subtitle'>
                                    Cooking Time: {selectedRecipe["cookingTime"]} - Difficulty: {selectedRecipe.difficulty}
                                    <br/>Serves: {selectedRecipe["servings"]}
                                </h3>
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