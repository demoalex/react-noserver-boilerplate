/** @jsx React.DOM */

var React = require('react'),
    GMailAuth = require('./GMailAuth.react'),
    GMailLabels = require('./GMailLabels.react');

var CLIENT_ID = 'CLIENT_ID';
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

function auth(immediate, cb){
    gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': immediate
        }, cb);
}

module.exports = GMailApp = React.createClass({
    handleAuthResult: function(authResult) {
        if (authResult && !authResult.error) {
            this.setState({authorized: true});
        } else {
            this.setState({authorized: false});
        }
    },

    // Called directly after component rendering, only on client
    componentDidMount: function(){
        auth(true, this.handleAuthResult);
    },

    //// Set the initial component state
    getInitialState: function(props){

        var state = (typeof localStorage.state === 'undefined' ? false : JSON.parse(localStorage.state))
            || {
                labels: [
                    'Lb1',
                    'Lb2',
                    'Lb3'
                ]
            };

        props = props || this.props;


        // Set initial application state using props
        return {
            labels: state.labels,
            count: 0,
            authorized: props.authorized ? false : true
        };

    },

    componentWillReceiveProps: function(newProps, oldProps){
        this.setState(this.getInitialState(newProps));
    },

    // Render the component
    render: function(){
        return (
            <div>
                <h1>GMail labels list</h1>
                <GMailLabels labels={this.state.labels} hidden={!this.state.authorized} />
                <GMailAuth hidden={this.state.authorized} auth={auth} authHandle={this.handleAuthResult} />
            </div>
        )
    }

});

