import React from 'react'
import ReactDOM from 'react-dom'
import Input from './components/presentationals/Input';
import FormContainer from './components/containers/FormContainer'
import { FETCHRequest } from './lib/FETCHRequest'
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "Default"
        }
        // this.TestFetch = this.TestFetch.bind(this)
        // this.TestFetch2 = this.TestFetch2.bind(this)
    }

    // ArrowFunctionc = ()=>{
    //     return false
    // }

    TestFetch = () => {
        console.log('click done')
        let url = "http://1.55.145.15/api/listcourse.php?userid=30229"
        let init = {
            method: "GET",
            mode: "cors",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/text',
                'Content-Type': 'application/json'
            }
        }
        FETCHRequest(url, init).then(data => {
            console.log("data", data)
            this.setState({
                title: this.state.title === '1' ? "2" : "1"
            })
        }).catch(err => {
            console.log('err', err)
        })
        //fetch("http://")

    }

    TestFetch2() {
        var url = "http://192.168.21.48:8090/user/login"
        var init = {
            method: "POST",
            mode: "cors",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: "admin",
                password: "admin123"
            })
        }

        FETCHRequest(url, init).then(data => {
            console.log('data', data)
        }).catch(err => {
            console.log('err', err)
        })
    }
    render() {
        return (<div className="row mt-5">
            <div className="col-md-4 offset-md-1">
                <p>Create a new article! This is very cool and cool</p>
                <button onClick={this.TestFetch}>click here now</button>
                <div>{this.state.title} </div>
                <button onClick={this.TestFetch2}>click here</button>
                <div>{this.state.title} </div>
                <div id="create-article-form">
                    {/* <FormContainer /> */}
                </div>

            </div>

        </div>
        )
    }
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<App />, wrapper) : false