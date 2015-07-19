var React = require('react'),
    GMailApp = require('./GMailApp.react');

window.renderApp = function(id){
    React.render(
        <GMailApp />,
        document.getElementById(id)
    );
}
