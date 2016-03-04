'use strict';

(function (window, $) {
  var todoObject = function () {
    var _taskList     = [],
        _removingTask = [],
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
        var listHtml  = '<li id="taskId-' + _unique + '" class="todo-list-li">';
            listHtml += '<div class="checkbox">';
            listHtml += '<label>';
            listHtml += '<input type="checkbox" class="todo-list-checkbox ' + _unique + '"> <span> ' + _newTaskText.value + '</span>';
            listHtml += '</label>';
            listHtml += '<i onclick="return removeTask(\'' + _unique + '\')" class="ion-close-circled icon-remove pull-right"></i>';
            listHtml += '</div>';
            listHtml += '</li>';

        _todoListId.innerHTML += listHtml;
        _taskList.push({
          id      : _unique,
          name    : _newTaskText.value,
          status  : 'todo',
          checked : false 
        });

        _updateDom();
        _emptyInput();
      }
    }

    function _emptyInput () {
      _newTaskText.value = '';
    }

    function _updateDom () {
      _taskCounter.innerHTML = _taskList.length;

    }

    function _clearChecked(Id) {
      var tastLength = _taskList.length,
          _taskHtmlList = document.querySelectorAll('.todo-list-checkbox');
      
      if (Id) {
        document.getElementById('taskId-' + Id).remove();
        _updateDom();
        return;
      } else {
        for(var i = 0; i < tastLength; i++) {
          if (_taskHtmlList[i].checked == true) {
            _removingTask.push(_taskHtmlList[i].className.split(' ')[1]);
          }
        }
      }
      _removeChecked();
    }

    function _removeChecked (element, index) {
      var taskLength = _removingTask.length; 
      for( var i = 0; i < taskLength; i++) {
        // console.log(_removingTask[i])
        if (_taskList[i].id == _removingTask[i]) {
          _taskList[i].checked = true;
          _taskList[i].status  = 'done';
          document.getElementById('taskId-' + _taskList[i].id).className += ' hide';
        }
      }
      // console.log(_taskList)
      _updateDom();
    }

    return {
      init        : _init,
      checkInput  : _checkInput,
      addTask     : _addTask,
      clearChecked: _clearChecked
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
    task.clearChecked(Id);
  }

  window.clearChecked = function () {
    task.clearChecked();
  }
  
})(window, jQuery);
