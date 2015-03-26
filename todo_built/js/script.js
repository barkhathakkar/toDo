 angular.module("ToDoList", [])
     .controller("toDoCtrl", ['$scope',
         function($scope) {

             var editstatus = [];

           
             $scope.appTitle = "Things to do";
             $scope.toDoBox = [];

            

             var app = Built.App('blt88bb2dd31595210c');
             var query = Built.App('blt88bb2dd31595210c').Class('toDo').Query();
            // query = query.ascending('id_num');
             var queryres = query
                /* .toJSON()*/
                 .exec()
                 .then(function(object) {

                    
                     object.map(function(taskData, value) {
                       /*     console.log(taskData.data.text);*/

                         $scope.toDoBox.push({

                             uid: taskData.data.uid,                            
                             done: taskData.data.done,
                             text: taskData.data.text,
                             editing: taskData.data.editing

                         });

                        // console.log($scope.toDoBox);
                         $scope.$apply();
                     });

                 });

             $scope.addToDo = function() {
                
            
                 //save details

                 var toDotxt = $scope.toDoText;
                 var toDoClass = app.Class('toDo').Object;
                 
                 toDoClass({

                     done: 'false',
                     text: toDotxt,
                     editing: 'false'

                 })
                     .save()
                     .then(function(object) {

                         var newToDo = {
                                 uid: object.data.uid,                                
                                 done: false,
                                 text: object.data.text,
                                 editing: false
                                };

                  $scope.toDoBox.push(newToDo);
                  $scope.$apply();
                        console.log($scope.toDoBox);
                           
                         }
                        
                 );

                $scope.toDoText = '';

             };

             $scope.removeToDo = function(start) {
                    

             var query = Built.App('blt88bb2dd31595210c').Class('toDo').Query();

             var queryres = query
                 .toJSON()
                 .exec()
                 .then(function(object) {
                     
                     /* object.map(function(data, value) {*/
                      for(var i=0;i<object.length;i++) {

                          console.log("111..."+$scope.toDoBox[i].uid);
                          console.log(start.uid);
                          console.log("222..."+object[i].uid);

                        if(start.uid===object[i].uid){

                        query = query.containedIn('uid',object[i].uid);
                        query.delete()
                             .then(function(data){

                             console.log("data"+data) // null;
                             console.log("deleted!!") 
                                });

                            }
                         }

                         console.log(start);
                         $scope.toDoBox.splice(start, 1);
                         console.log("scope"+$scope.toDoBox);
                         $scope.$apply();

                  /*   });*/

                 });

                    
                   
  

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
                     /* if last item in list*/
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
                 var query = Built.App('blt88bb2dd31595210c').Class('toDo').Query();
                  query.delete()
                   .then(function(data){
                     console.log("all deleted!!") 

                                });
             };

            $scope.clearCompleted = function() {

                 $scope.toDoBox = $scope.toDoBox.filter( function(input) {
                    
                     
                 var query = Built.App('blt88bb2dd31595210c').Class('toDo').Query();

                 var clearSelect=[input.done];

                 console.log(clearSelect);

                    if(input.done){

                              query = query.containedIn('uid',input.uid);
                              query.delete()
                             .then(function(data){

                             console.log("data"+data) // null;
                             console.log("deleted!!") 

                                });

                            }
                         
                        return !input.done;
                     })
                        
                      
                        
                
                 };

           

             

             $scope.save = function() {
                 localStorage.setItem("My tasks", JSON.stringify($scope.toDoBox));
             };


             $scope.allfalse = function() {

                 for (var i = 0, length = $scope.toDoBox.length; i < length; i++) {
                     $scope.toDoBox[i].editing = false;
                     editstatus[i] = false;
                 }
                 /*console.log(editstatus);*/
             };

             $scope.startEditing = function(toDo) {

                 $scope.editedToDo = toDo;

               
                 $scope.allfalse();



                 for (var i = 0, length = $scope.toDoBox.length; i < length; i++) {


                     console.log($scope.toDoBox[i].uid);
                     console.log(toDo.uid);

                     if ($scope.toDoBox[i].uid === toDo.uid) {


                             alert($scope.toDoBox[i].uid + "same" + toDo.uid);
                             $scope.toDoBox[i].editing = true;
                             console.log($scope.toDoBox[i]);
                             editstatus[i] = true;
                             /*  break;*/


                               
                             }


                 }
                
            //var toDoClass = app.Class('toDo').Object;
                           

               //  console.log(editstatus);
                

             };


             $scope.doneEditing = function(toDo) {
                 toDo.editing = false;
                 $scope.editedToDo = null;
                  var updateTask = Built.App('blt88bb2dd31595210c').Class('toDo').Object;

                        console.log(toDo);
                            updateTask({ uid:toDo.uid,text:toDo.text }) 
                             .save()
                             .then( function(object) { 
                                 console.log($scope.toDoBox);
                                 console.log('updated!!!');
                               });


             };


         }
     ]);


 