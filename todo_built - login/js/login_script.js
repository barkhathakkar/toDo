var app = Built.App('blt88bb2dd31595210c').persistSessionWith(Built.Session.LOCAL_STORAGE);
var appUser = app.User();


function toggleInput() {

    document.getElementById('btnSearch2').style.display = "block";
    document.getElementById('btnSearch').style.display = "none";
    document.getElementById('msg').innerHTML = "";
    document.getElementById('msg2').style.display = "none";

}
/* custom class saving value*/



function signup() {

    var un = document.myform.username.value;
    var pw = document.myform.password.value;
    //save details
    appUser.register(un, pw, pw)
        .then(function(app) {
                // do something here

                console.log("entered");
                document.getElementById('msg').innerHTML = "Your account is ready to go!";
                document.getElementById('msg').style.display = "block";
                document.getElementById('username').value = "";
                document.getElementById('password').value = "";
                document.getElementById('btnSearch2').style.display = "none";
                document.getElementById('btnSearch').style.display = "block";
                document.getElementById('msg2').style.display = "block";

                console.log("Registration Successfull!!!");

            }, function(err) {

                console.log("error!!!!");
                document.getElementById('msg').style.display = "block";
                document.getElementById('msg').innerHTML = "Please fill the fields!";
            }

    );

}


//fetch data from built.io

function login() {

    var un = document.myform.username.value;
    var pw = document.myform.password.value;
    console.log('login');
    console.log(un + " " + pw);

    appUser.login(un, pw)
        .then(function(result) {

            var newUser = result.toJSON();

            console.log("success");
            console.log(result);

            console.log('Logged In!!');
            console.log(app.User.isAuthenticated());

            console.log(newUser);
            window.location = 'index.html';

        }, function(err) {

            console.log("error!!!!");
            //console.log(result);        
            document.getElementById('msg').innerHTML = "Invalid!!..Please try again";
            document.getElementById('msg').style.display = "block";
            document.getElementById('username').value = "";
            document.getElementById('password').value = "";
            //  window.location='error.html';

        });


}
angular.module("demo", [])
    .controller("login", ['$scope',




    ]);