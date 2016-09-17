'use strict';
angular.module('app')
    .directive('anketFactoring', [function () {
        return {
            restrict: 'AE',
            scope: {
            },
            templateUrl: '/Content/app/components/ankets/factoring/anket-factoring.partial.html',
            require: ['ngModel'],
            controllerAs: 'vm',
            controller: ['$scope', 'anketService',
                function ($scope, anketService) {

                    this.errors = new Errors();

                    this.isSended = false;

                    this.reload = function () {
                        this.anket = {
                            Organization: '',
                            Person: '',
                            Phone: '',
                            Email: ''
                        };

                        this.isSended = false;

                        if ($scope.factoringRequestForm) {
                            $scope.factoringRequestForm.$setPristine();
                            $scope.factoringRequestForm.$setUntouched();
                        }
                    };

                    this.reload();

                    this.validateAnket = function () {
                        if (!this.anket)
                            this.errors.setError('anket', 'Ошибка заполнения анкеты');
                        else this.errors.setError('anket', null);

                        if (!this.anket.Organization)
                            this.errors.setError('organization', 'Укажите наименование Вашей компании');
                        else this.errors.setError('organization', null);

                        if (!this.anket.Person)
                            this.errors.setError('person', 'Укажите Ваше Имя');
                        else this.errors.setError('person', null);

                        if (!this.anket.Phone)
                            this.errors.setError('phone', 'Укажите Ваш контактный телефон');
                        else this.errors.setError('phone', null);

                        if (!this.anket.Email)
                            this.errors.setError('email', 'Укажите Ваш контактный e-mail');
                        else this.errors.setError('email', null);

                        return this.errors.isValid();
                    };

                    this.showerror = function (field) {
                        if (field == null || field == undefined)
                            return false;

                        return !field.$valid && (field.$touched || this.isSended);
                    };

                    this.submitAnket = function () {
                        this.isSended = true;

                        if (this.validateAnket()) {

                            anketService.send('Factoring', this.anket)
                                .success(function (data) {
                                    $.msg.success('Спасибо, Ваша Заявка была успешно отправлена в Банк <br/>и скоро с Вами свяжется менеджер.');
                                    this.reload();
                                }.bind(this))
                                .error(function () {
                                    $.msg.error('Произошла ошибка при отправке Заявки!');
                                }.bind(this))
                                .finally(function () {
                                    $('#modal-factoring-request').modal('hide');
                                }.bind(this));
                        }
                        else {
                            $.msg.error('Пожалуйста,<br /> исправьте ошибки в Заявке!');
                        }
                    };
                }]
        };
    }]);