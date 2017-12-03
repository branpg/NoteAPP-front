angular
    .module('NoteAPP.login')
    .controller('LoginController', LoginController);

function LoginController($auth, $location) {
    var vm = this;

    vm.isValid = true;
    vm.errors = {};
    vm.errors.password = ' ';
    vm.passStrength = 0;

    vm.login = function () {
        $auth.login({
            email: vm.email,
            password: vm.password
        })
            .then(function () {
                $location.path('/home');
            })
            .catch(function (response) {
                swal('', response.data.message, 'error');
                vm.errors.login = response.data.message;
            });

    };

    vm.signup = function () {
        vm.passwordStrength();
        vm.password2Validate();
        vm.nameValidate();
        vm.emailValidate();
        if (!vm.errors.password && !vm.errors.password2 && !vm.errors.name && !vm.errors.email) {
            $auth.signup({
                name: vm.name,
                password: vm.password,
                email: vm.email
            })
                .then(function () {
                    $auth.login({
                        email: vm.email,
                        password: vm.password
                    })
                        .then(function () {
                            $location.path('/home');
                        })
                        .catch(function (err) {
                            swal('', err, 'error');
                        });
                })
                .catch(function (err) {
                    console.log(err);
                    swal('', err.data.message, 'error');
                });
        }
    };

    vm.passwordStrength = function () {

        if (!vm.password) {
            vm.errors.password = 'Este campo es obligatorio';
        } else {
            vm.passStrength = zxcvbn(vm.password).score;
            if (vm.passStrength <= 1){
                vm.errors.password = 'La contraseña ha de ser mas segura';
            } else {
                delete vm.errors.password;
            }
        }
    };

    vm.password2Validate = function () {
        if (!vm.password) {
            vm.errors.password2 = ' ';
        }else if(vm.password !== vm.password2){
            vm.errors.password2 = 'Las contraseñas no coinciden';
        } else {
            delete vm.errors.password2;
        }
    };

    vm.nameValidate = function () {
        if (!vm.name) {
            vm.errors.name = 'El nombre es obligatorio'
        } else {
            delete vm.errors.name;
        }
    };

    vm.emailValidate = function () {
        if (!vm.email) {
            vm.errors.email = 'El correo electronico es obligatorio'
        } else {
            delete vm.errors.email;
        }
    };
}