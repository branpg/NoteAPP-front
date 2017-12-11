'use strict';

angular.module('NoteAPP', [
    'ngRoute',
    'satellizer',
    'NoteAPP.login',
    'NoteAPP.notes',
    'monospaced.elastic',
    'ngTagsInput'
]);