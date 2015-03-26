 angular.module("ToDoList", [])
     .controller("toDoCtrl", ['$scope',
         function($scope) {

         	var editstatus = [];
            var idvar=0;
             $scope.appTitle = "Things to do";

            /* $scope.toDoBox = [{
                 id:0,
                 done: false,
                 text: 'first task',
                 editing: false
             }, {
                 id:++idvar,
                 done: false,
                 text: 'second task',
                 editing: false
             }];*/

    $scope.toDoBox =JSON.parse( localStorage.getItem("My tasks")||'[]' );
           /*  var data = localStorage.getItem("My tasks");*/
            // console.log(data);
          
          /*  console.log(editstatus);*/

             $scope.addToDo = function() {
                 
                 var newToDo = {                   
                     id:++idvar,
                     done: false,
                     text: $scope.toDoText,
                     editing: false
                 };
                 $scope.toDoBox.push(newToDo);
                 $scope.toDoText = '';
             };

         
             $scope.removeToDo = function(start) {
                 $scope.toDoBox.splice(start, 1);
             };

             $scope.move = function(index, direction) {
                 //move up
                 if (direction === 'up') {
                     if (index === 0) {
                         return;
                     } //if first item do nothing


                     index = index - 1
                 }
                 //move down
                 if (direction === 'down') {
                     /*	if last item in list*/
                     if (index === $scope.toDoBox.length - 1) {
                         return;
                     }
                 }

                 var toDo = $scope.toDoBox[index];
                 $scope.toDoBox.splice(index + 2, 0, toDo); //copy to index +2
                 $scope.toDoBox.splice(index, 1); //delete at position


             };

             $scope.clearAll = function() {
                 $scope.toDoBox = [];
             }

             $scope.clearCompleted = function() {
                 $scope.toDoBox = $scope.toDoBox.filter(function(input) {
                     return !input.done;
                 })
             };

             $scope.save = function() {
                 localStorage.setItem("My tasks", JSON.stringify($scope.toDoBox));
             };


             $scope.allfalse = function() {

                for(var i=0,length=$scope.toDoBox.length;i<length;i++) {
                   $scope.toDoBox[i].editing = false;
                editstatus[i] =  false;
                }
                /*console.log(editstatus);*/
              };

             $scope.startEditing = function(toDo) {
            
                 $scope.editedToDo = toDo;
               
           /*      toggleCustom();*/
                  $scope.allfalse();

                  

            for(var i=0,length=$scope.toDoBox.length;i<length;i++) {
             

              console.log($scope.toDoBox[i].id);
                  console.log(toDo.id);

             if($scope.toDoBox[i].id === toDo.id){
                    

                        alert($scope.toDoBox[i].id+"same"+toDo.id);
                          $scope.toDoBox[i].editing = true;
                           console.log($scope.toDoBox[i]);

                        
                              editstatus[i] =  true;
                      /*  break;*/
                    }
                     
                }
               console.log(editstatus);
             /*   console.log(editstatus[i]);
                console.log(toDo);*/
               
            }
             

             $scope.doneEditing = function(toDo) {
                 toDo.editing = false;
                 $scope.editedToDo = null;

             }


         }
     ]);


/*

 //Credit for ngBlur and ngFocus to https://github.com/addyosmani/todomvc/blob/master/architecture-examples/angularjs/js/directives/
 editer.directive('ngBlur', function() {
     return function(scope, elem, attrs) {
         elem.bind('blur', function() {
             scope.$apply(attrs.ngBlur);
         });
     };
 });

 editer.directive('ngFocus', function($timeout) {
     return function(scope, elem, attrs) {
         scope.$watch(attrs.ngFocus, function(newval) {
             if (newval) {
                 $timeout(function() {
                     elem[0].focus();
                 }, 0, false);
             }
         });
     };*/

/* });*/