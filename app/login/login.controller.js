angular
    .module('NoteAPP.login')
    .controller('LoginController', LoginController);

function LoginController($auth, $location) {
    var vm = this;
    this.login = function () {
        $auth.login({
            name: vm.name,
            password: vm.password
        })
            .then(function () {
                $location.path('/home');
            })
            .catch(function (response) {

            });

    };

    this.signup = function () {
        $auth.signup({
            name: vm.name,
            password: vm.password
        })
            .then(function () {$auth.login({
                name: vm.name,
                password: vm.password
            })
                .then(function () {
                    $location.path('/home');
                })
                .catch(function (response) {

                });
            })
            .catch(function (response) {

            });
    };
}