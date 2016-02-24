'use strict';

(function (window, $) {
  var todoObject = function () {
    var _taskList = [],
        _instance,
        _todoListId   = document.getElementById('todo-list'),
        _newTaskText  = document.getElementById('new-task'),
        _taskCounter  = document.getElementById('task-counter');

    function _init () {
      this._todoListId  = _todoListId;
      this._newTaskText = _newTaskText;
    }

    function _uniqueId () {
      return (new Date().getTime()).toString(36);
    }

    function _checkInput () {
      return _newTaskText.value == '';
    }

    function _addTask () {
      var _unique = _uniqueId();
      if (!_checkInput()) {
        var listHtml  = '<li id="taskId-' + _unique + '">';
            listHtml += '<div class="checkbox">';
            listHtml += '<label>';
            listHtml += '<input type="checkbox"> <span> ' + _newTaskText.value + '</span>';
            listHtml += '</label>';
            listHtml += '<i onclick="return removeTask(' + _unique + ')" class="ion-close-circled icon-remove pull-right"></i>';
            listHtml += '</div>';
            listHtml += '</li>';

        _todoListId.innerHTML += listHtml;
        _taskList.push(_newTaskText.value);

        _updateTaskCounter();
        _emptyInput();
      }
    }

    function _emptyInput () {
      _newTaskText.value = '';
    }

    function _updateTaskCounter () {
      _taskCounter.innerHTML = '(' + _taskList.length + ')';
    }

    function _removeTask(Id) {
      console.log(Id)
      // .parentNode.id;
      document.getElementById('taskId-thisone').remove();
    }

    return {
      init        : _init,
      checkInput  : _checkInput,
      addTask     : _addTask,
      removeTask  : _removeTask
    }
  }
  var task = todoObject();

  window.newTaskKeypress = function (event) {
    if(event.charCode == 13) {
      task.addTask(event);
    }
  }

  window.removeTask = function (Id) {
    // event.preventDefault();
    console.log(Id)
    // task.removeTask(Id);
  }
  
})(window, jQuery);
