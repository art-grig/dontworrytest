function Token(data) {

    if (data != undefined && data != null) {
        this.UserID = data.UserID || 0;
        this.StaffID = data.StaffID || 0;
        this.ManagerID = data.ManagerID || 0;

        this.OrganizationID = data.OrganizationID || 0;
        this.CustomerID = data.CustomerID || 0;
        this.DebtorID = data.DebtorID || 0;

        this.Login = data.Login || '';
        this.Name = data.Name || '';
        this.Code = data.Code || '';
        this.Expire = new Date(data.Expire);

        this.Roles = data.Roles || [];
        this.Pemissions = data.Pemissions || [];
    }
    else {
        this.UserID = 0;
        this.StaffID = 0;
        this.ManagerID = 0;

        this.OrganizationID = 0;
        this.CustomerID = 0;
        this.DebtorID = 0;

        this.Login = '';
        this.Name = '';
        this.Code = '';
        this.Expire = new Date();

        this.Roles = [];
        this.Pemissions = [];
    }
}

Token.prototype.isAuthenticated = function(){
    return this.Code && this.Code.length > 0 && this.Expire && this.Expire > new Date();
};

Token.prototype.isInRole = function(role){
    if (!this.isAuthenticated())
        return false;

    return this.Roles && this.Roles.length > 0 && this.Roles.indexOf(role) >= 0;
};

Token.prototype.isAdmin = function(){
    return this.isInRole('Administrator') || this.isInRole('Admin');
};
