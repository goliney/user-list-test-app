angular.module('templates-app', ['home-page/home-page.tpl.html', 'user/modal-edit/modal.tpl.html']);

angular.module("home-page/home-page.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home-page/home-page.tpl.html",
    "<div class=\"container\" infinite-scroll=\"vm.infiniteScroll()\">\n" +
    "    <div class=\"header\">\n" +
    "        <h3 class=\"text-muted\">User list</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-12 opearations-menu\">\n" +
    "            <div class=\"pull-left\">\n" +
    "                <div class=\"btn-group\">\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"vm.paginationType\" btn-radio=\"'Classical'\" uncheckable>Classical pagination</label>\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"vm.paginationType\" btn-radio=\"'Infinite'\" uncheckable>Infinite scroll</label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"pull-right\">\n" +
    "                <button class=\"btn btn-danger\" ng-disabled=\"!vm.selection.length\" ng-click=\"vm.remove()\">Remove</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "            <div class=\"table-responsive\">\n" +
    "                <table class=\"table table-bordered table-striped\" selectable=\"usersShown\" select-target=\"selection\">\n" +
    "                    <thead>\n" +
    "                    <tr>\n" +
    "                        <th><input type=\"checkbox\" ng-model=\"selectAll\"/></th>\n" +
    "                        <th>\n" +
    "                            <a href=\"#\" ng-click=\"vm.orderBy('FirstName')\"> First Name </a>\n" +
    "                            <span class=\"order-direction\" ng-show=\"vm.order == 'FirstName'\">^</span>\n" +
    "                            <span class=\"order-direction\" ng-show=\"vm.order == '-FirstName'\">v</span>\n" +
    "                        </th>\n" +
    "                        <th>\n" +
    "                            <a href=\"#\" ng-click=\"vm.orderBy('LastName')\"> Last Name </a>\n" +
    "                            <span class=\"order-direction\" ng-show=\"vm.order == 'LastName'\">^</span>\n" +
    "                            <span class=\"order-direction\" ng-show=\"vm.order == '-LastName'\">v</span>\n" +
    "                        </th>\n" +
    "                        <th>\n" +
    "                            <a href=\"#\" ng-click=\"vm.orderBy('Email')\"> Email </a>\n" +
    "                            <span class=\"order-direction\" ng-show=\"vm.order == 'Email'\">^</span>\n" +
    "                            <span class=\"order-direction\" ng-show=\"vm.order == '-Email'\">v</span>\n" +
    "                        </th>\n" +
    "                        <th>\n" +
    "                            <a href=\"#\" ng-click=\"vm.orderBy('Age')\"> Age </a>\n" +
    "                            <span class=\"order-direction\" ng-show=\"vm.order == 'Age'\">^</span>\n" +
    "                            <span class=\"order-direction\" ng-show=\"vm.order == '-Age'\">v</span>\n" +
    "                        </th>\n" +
    "                        <th></th>\n" +
    "                    </tr>\n" +
    "                    </thead>\n" +
    "                    <tbody>\n" +
    "                    <tr class=\"filters\">\n" +
    "                        <td></td>\n" +
    "                        <td>\n" +
    "                            <input type=\"text\" ng-model=\"vm.search.FirstName\" ng-change=\"vm.filterBy()\"/>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <input type=\"text\" ng-model=\"vm.search.LastName\" ng-change=\"vm.filterBy()\"/>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <input type=\"text\" ng-model=\"vm.search.Email\" ng-change=\"vm.filterBy()\"/>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <select ng-model=\"vm.ageRange\" ng-options=\"age as age.name for age in vm.ageRanges\" ng-change=\"vm.filterBy()\">\n" +
    "                                <option value=\"\">All ages</option>\n" +
    "                            </select>\n" +
    "                        </td>\n" +
    "                        <td></td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-repeat=\"user in vm.usersShown\" class=\"user\" ng-class=\"{'edit': user._underEdition === true}\">\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"selectedHash[user.id]\"/></td>\n" +
    "                        <td>\n" +
    "                            <span class=\"text\">{{ user.FirstName }}</span>\n" +
    "                            <input type=\"text\" ng-model=\"user.FirstName\"/>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <span class=\"text\">{{ user.LastName }}</span>\n" +
    "                            <input type=\"text\" ng-model=\"user.LastName\"/>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <span class=\"text\">{{ user.Email }}</span>\n" +
    "                            <input type=\"email\" ng-model=\"user.Email\"/>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <span class=\"text\">{{ user.Age }}</span>\n" +
    "                            <input type=\"number\" min=\"10\" max=\"90\" ng-model=\"user.Age\"/>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <button class=\"btn btn-default btn-xs\" ng-click=\"vm.editInPlace(user)\">\n" +
    "                                <span class=\"edit-btn\">Edit</span>\n" +
    "                                <span class=\"save-btn\">Ok</span>\n" +
    "                            </button>\n" +
    "                            <button class=\"btn btn-default btn-xs\" ng-click=\"vm.editInModal(user)\">Modal</button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show=\"vm.paginationType == 'Classical'\">\n" +
    "                <pagination total-items=\"vm.totalItems\" ng-model=\"vm.currentPage\" ng-change=\"vm.paginate()\"></pagination>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <footer class=\"footer\">\n" +
    "        <p>Sergey Goliney</p>\n" +
    "    </footer>\n" +
    "\n" +
    "</div> <!-- /container -->\n" +
    "");
}]);

angular.module("user/modal-edit/modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("user/modal-edit/modal.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">Edit user #{{ user.id }}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <form class=\"form-horizontal\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"usr-modal-first-name\" class=\"col-sm-3 control-label\">First name</label>\n" +
    "            <div class=\"col-sm-9\">\n" +
    "                <input ng-model=\"user.FirstName\" type=\"text\" class=\"form-control\" id=\"usr-modal-first-name\" placeholder=\"First name\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"usr-modal-last-name\" class=\"col-sm-3 control-label\">Last name</label>\n" +
    "            <div class=\"col-sm-9\">\n" +
    "                <input ng-model=\"user.LastName\" type=\"text\" class=\"form-control\" id=\"usr-modal-last-name\" placeholder=\"Last name\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"usr-modal-email-name\" class=\"col-sm-3 control-label\">Email</label>\n" +
    "            <div class=\"col-sm-9\">\n" +
    "                <input ng-model=\"user.Email\" type=\"email\" class=\"form-control\" id=\"usr-modal-email-name\" placeholder=\"Email\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"usr-modal-age-name\" class=\"col-sm-3 control-label\">Age</label>\n" +
    "            <div class=\"col-sm-9\">\n" +
    "                <input ng-model=\"user.Age\" type=\"number\" min=\"10\" max=\"90\" class=\"form-control\" id=\"usr-modal-age-name\" placeholder=\"Age\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"ok()\">Save</button>\n" +
    "    <button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button>\n" +
    "</div>");
}]);
