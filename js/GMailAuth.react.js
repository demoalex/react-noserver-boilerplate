/** @jsx React.DOM */

var React = require('react');

module.exports = GMailAuth = React.createClass({

    handleAuthClick: function(event){
        this.props.auth(false, this.props.authHandle);

        event.stopPropagation();
    },

    render: function(){
        var component = <div></div>;
        if(!this.props.hidden){
            component =
                <div>
                    <label>Authorize access to Gmail API</label>&nbsp;

                    <button className="btn btn-default" onClick={this.handleAuthClick}>
                        Authorize
                    </button>
                </div>
        }

        return component;
    }
});
