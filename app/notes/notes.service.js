'use strict';

// Define the `core.phone` module
angular.module('NoteAPP.notes.service', ['ngResource'])
.factory('NotesService',
    function($resource) {
        return $resource('http://localhost:3000/api/note/:idN', '@data', {
            query: {
                method: 'GET',
                isArray: true
            },
            get: {
                method: 'GET',
                isArray: false
            },
            new: {
                method: 'POST'
            },
            update: {
                method: 'POST'
            },
            delete: {
                method: 'DELETE'
            }
        });
    }
);