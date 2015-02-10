import Dispatcher from '../Dispatcher';
import assign from 'object-assign';

function Actions() {}

export default function createActions(actions) {
  var actionContainer = new Actions();

  if (actions.hasOwnProperty('voidActions')) {
    actions.voidActions.forEach((action) => {
      actions[action] = () => {};
    });

    delete actions.voidActions;
  }

  Object.keys(actions).forEach(function(action) {
    actionContainer[action] = (...args) => {
      var payload = assign({}, {
        type: action
      }, actions[action].apply(actionContainer, args));
      Dispatcher.handleAction(payload);
    };
  });

  return actionContainer;
}
