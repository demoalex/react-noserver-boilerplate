/** @jsx React.DOM */

var React = require('react');


module.exports = GMailLabels = React.createClass({

    loadData: function(){
        var self = this;

        gapi.client.load('gmail', 'v1', function () {

            var request = gapi.client.gmail.users.labels.list({
                'userId': 'me'
            });

            request.execute(function (resp) {
                var labels = resp.labels;

                if (labels && labels.length > 0) {
                    self.setState({labels: labels.map(function(a){return a.name;})});
                } else if (resp.error) {
                    self.setState({labels: [resp.error.message]});
                } else {
                    self.setState({labels: ['No Labels found.']});
                }
            });
        });
    },

    getInitialState: function(props) {
        props = props || this.props;

        return {
            labels: props.labels,
        }
    },

    componentWillReceiveProps: function(newProps, oldProps){
        if(!newProps.hidden){
            this.loadData();
        } else {
            this.setState(this.getInitialState(newProps));
        }
    },

    render: function() {
        var content = this.state.labels.map(function (label) {
            return (label + "\n")
        });

        var component = <div></div>;
        if (!this.props.hidden) {
            component =
                <div>
                    <pre>{content}</pre>
                    <button className="btn btn-default" type="submit" onClick={this.loadData}>Load</button>
                </div>
        }

        return component;
    }
});

