var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var model = require('./model/index');
var Sidebar = require('./app/sidebar');
var Buttons = require('./app/buttons');
var Dialog = require('./app/dialog');
var IconButtons = require('./app/icon-button');
var DropdownMenu = require('./app/dropdown-menu');
var Toast = require('./app/toast');
// var Tab = require('./app/tab');

require('page')

injectTapEventPlugin();

var App = React.createClass({
  render: function(){
    return (
      <div>
        <Sidebar sidebarData={model.sidebarData} selectedVal={this.props.selectedVal}></Sidebar>
        <div id="main-content" className="main-content">
          {this.props.component}
        </div>
      </div>
    );
  }
});

var renderPage = function(ctx){
  var map = {
    buttons: Buttons,
    dialog: Dialog,
    'icon-button': IconButtons,
    'toast': Toast,
    'dropdown-menu': DropdownMenu
  };
  if(ctx.params.page == 'tab'){
    require.ensure([], function(){
      var Tab = require('./app/tab');
      require('page');
      var async = require('async');
      React.render(
        <App 
          component={Tab}
          selectedVal="tab" />
      , document.getElementById('main-content'))
    }, 'tab-bundle');
  }else{
    React.render(
      <App 
        component={map[ctx.params.page]}
        selectedVal={ctx.params.page} />
    , document.getElementById('main-content'))
  }
};

page('/:page', renderPage);
page();






