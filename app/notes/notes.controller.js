angular
    .module('NoteAPP.notes')
    .controller('NotesController', NotesController);

function NotesController($auth, $location, NotesService) {
    var vm = this;
    if (!$auth.isAuthenticated()) {
        $location.path('/login');
    }

    vm.refresh = function () {
        var query = {};
        if (vm.search) {
            query.search = vm.search;
        }
        query.sticky = true;
        NotesService.query(query, function (data) {
            vm.stickyNotes = data;
        });
        query.sticky = false;
        NotesService.query(query, function (data) {
            vm.notes = data;
        });
    };

    vm.updateNote = function (note) {
        NotesService.update({idN: note._id} ,note, function (data) {
            console.log(data);
        });
    };

    vm.createNote = function (note) {
        NotesService.update(note, function (data) {
            console.log(data);
            vm.newNote = undefined;
            vm.refresh();
        });
    };
    vm.deleteNote = function (note) {
        NotesService.delete({idN: note._id}, {}, function (data) {
            console.log(data);
            vm.refresh();
        });
    };

    vm.stickyNote = function (note) {
        note.sticky = !note.sticky;
        NotesService.update({idN: note._id} ,note, function (data) {
            console.log(data);
            vm.refresh();
        });
    };

    vm.changeNoteColor = function (note, color) {
        note.color = color;
        NotesService.update({idN: note._id} ,note, function (data) {
            console.log(data);
            vm.refresh();
        });
    };

    vm.logout = function () {
        $auth.logout()
            .then(function () {
                $location.path('/login');
            });
    };

    vm.refresh();
}