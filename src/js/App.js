import React from 'react'
import ReactDOM from 'react-dom'
import Input from './components/presentationals/Input';
import FormContainer from './components/containers/FormContainer';
export default class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<div class="row mt-5">
            <div class="col-md-4 offset-md-1">
                <p>Create a new article! This is very cool</p>
                <div id="create-article-form">
                    <FormContainer />
                </div>

            </div>

        </div>
        )
    }
}

const wrapper = document.getElementById("root");
wrapper? ReactDOM.render(<App/>, wrapper) : false