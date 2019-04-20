(function($) {
    (function() {

        var db = {

            // loadData: function(filter) {
            //     return $.grep(this.clients, function(client) {
            //         return (!filter.Name || client.Name.indexOf(filter.Name) > -1) &&
            //             (filter.Age === undefined || client.Age === filter.Age) &&
            //             (!filter.Address || client.Address.indexOf(filter.Address) > -1) &&
            //             (!filter.Country || client.Country === filter.Country) &&
            //             (filter.Married === undefined || client.Married === filter.Married);
            //     });
            // },

            insertItem: function(insertingClient) {
                this.clients.push(insertingClient);
            },

            updateItem: function(updatingClient) {},

            deleteItem: function(deletingClient) {
                var clientIndex = $.inArray(deletingClient, this.clients);
                this.clients.splice(clientIndex, 1);
            }

        };

        window.db = db;


        db.countries = [{
                Name: "",
                Id: 0
            },
            {
                Name: "Nam",
                Id: 1
            },
            {
                Name: "Nữ",
                Id: 2
            }
        ];

        db.clients = [
            {
                "Họ và tên": "Trần Phú Nguyện",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện1",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện2",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện4",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện5",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện12",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện435",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện13",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện141",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện21",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện343",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện353",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện212",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện212",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện533",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện121",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện564",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện475",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện4",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện75",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện86",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện823",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện78",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện75",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện876",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện65",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện45",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện15",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện28",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            },
            {
                "Họ và tên": "Trần Phú Nguyện5745",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694" ,
                "Giới tính": 1,
                "Tuổi":12
            }

        ];

      
    }());
})(jQuery);