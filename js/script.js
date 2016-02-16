'use strict';

(function (window, $) {
  var todoObject = function () {
    var _taskList = [],
        _instance,
        _todoListId = 'todo-list',
        _newTaskText = 'new-task';

    function _addTask () {
      var div     = document.getElementById(_todoListId),
          newTask = document.getElementById(_newTaskText),
          listHtml = '<li>'
                      '<div class="checkbox">'
                        '<label>'
                          '<input type="checkbox"> <span> ' + newTask + '</span>'
                        '</label>'
                      '</div>'
                    '</li>';

      div.innerHTML += listHml;
      // this._taskList.
      console.log('Everything is working fine.')
    }

    return {
      addTask: _addTask
    }
  }

  function addNewTask (event) {
    event.preventDefault();
    var task = todoObject();
    task.addTask();
  }
})(window, jQuery);
