(function ($) {
    (function () {

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

            insertItem: function (insertingClient) {
                this.clients.push(insertingClient);
            },

            updateItem: function (updatingClient) { },

            deleteItem: function (deletingClient) {
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

        db.products_size = [{
            Name: "",
            Id: 0
        },
        {
            Name: "Nhỏ",
            Id: 1
        },
        {
            Name: "Trung bình",
            Id: 2
        },
        {
            Name: "Lớn",
            Id: 3
        },
        {
            Name: "Rất lớn",
            Id: 4
        }
        ];

        db.products_color = [{
            Name: "",
            Id: 0
        },
        {
            Name: "Xanh",
            Id: 1
        },
        {
            Name: "Xám",
            Id: 2
        },
        {
            Name: "Đen",
            Id: 3
        },
        {
            Name: "Đỏ",
            Id: 4
        }
        ];

        db.products_type = [{
            Name: "",
            Id: 0
        },
        {
            Name: "category 1",
            Id: 1
        },
        {
            Name: "category 2",
            Id: 2
        },
        {
            Name: "category 3",
            Id: 3
        },
        {
            Name: "category 4",
            Id: 4
        }
        ];
        db.products_discount = discount;
        // db.products_discount = [{
        //     Name: "",
        //     Id: 0
        // },
        // {
        //     Name: "5%",
        //     Id: 1
        // },
        // {
        //     Name: "10%",
        //     Id: 2
        // },
        // {
        //     Name: "20%",
        //     Id: 3
        // },
        // {
        //     Name: "30%",
        //     Id: 4
        // },
        // {
        //     Name: "50%",
        //     Id: 5
        // },
        // {
        //     Name: "60%",
        //     Id: 6
        // }
        // ];
       // db.products = products;
        db.products = [
            {
                "name" : "Gấu Teddy",
                "ID" : "1568798201",
                "price" : 150000,
                "category" : 1,
                "discount" : 2,
                "size" : 1,
                "color" : 2,
                "img" : "https://bitly.vn/27in"
            },
            {
                "name" : "Gấu Todos",
                "ID" : "1567878201",
                "price" : 190000,
                "category" : 4,
                "discount" : 5,
                "size" : 1,
                "color" : 2,
                "img" : "https://bitly.vn/27in"
            },
            {
                "name" : "Gấu Soft Todos",
                "ID" : "157478201",
                "price" : 200000,
                "category" : 1,
                "discount" : 1,
                "size" : 1,
                "color" : 2,
                "img" : "https://bitly.vn/27in"
            },
            {
                "name" : "Gấu Soft Teddy",
                "ID" : "156781401",
                "price" : 470000,
                "category" : 3,
                "discount" : 4,
                "size" : 1,
                "color" : 2,
                "img" : "https://bitly.vn/27in"
            },
            {
                "name" : "Gấu Pink bear",
                "ID" : "1747878201",
                "price" : 390000,
                "category" : 3,
                "discount" : 2,
                "size" : 1,
                "color" : 2,
                "img" : "https://bitly.vn/27in"
            },
            {
                "name" : "Gấu Grey Lucky",
                "ID" : "1714235201",
                "price" : 780000,
                "category" : 2,
                "discount" : 2,
                "size" : 1,
                "color" : 2,
                "img" : "https://bitly.vn/27in"
            },
            {
                "name" : "Gấu Mềm Pikachu",
                "ID" : "1814235201",
                "price" : 505000,
                "category" : 3,
                "discount" : 4,
                "size" : 1,
                "color" : 2,
                "img" : "https://bitly.vn/27in"
            },
            {
                "name" : "Gấu Teddy",
                "ID" : "1568798201",
                "price" : 150000,
                "category" : 1,
                "discount" : 2,
                "size" : 1,
                "color" : 2,
                "img" : "https://bitly.vn/27in"
            },
            {
                "name" : "Gấu Todos",
                "ID" : "1567878201",
                "price" : 190000,
                "category" : 4,
                "discount" : 5,
                "size" : 1,
                "color" : 2,
                "img" : "https://bitly.vn/27in"
            },
            {
                "name" : "Gấu Soft Todos",
                "ID" : "157478201",
                "price" : 200000,
                "category" : 1,
                "discount" : 1,
                "size" : 1,
                "color" : 2,
                "img" : "https://bitly.vn/27in"
            },
            {
                "name" : "Gấu Soft Teddy",
                "ID" : "156781401",
                "price" : 470000,
                "category" : 3,
                "discount" : 4,
                "size" : 1,
                "color" : 2,
                "img" : "https://bitly.vn/27in"
            },
            {
                "name" : "Gấu Pink bear",
                "ID" : "1747878201",
                "price" : 390000,
                "category" : 3,
                "discount" : 2,
                "size" : 1,
                "color" : 2,
                "img" : "https://bitly.vn/27in"
            },
            {
                "name" : "Gấu Grey Lucky",
                "ID" : "1714235201",
                "price" : 780000,
                "category" : 2,
                "discount" : 2,
                "size" : 1,
                "color" : 2,
                "img" : "https://bitly.vn/27in"
            },
            {
                "name" : "Gấu Mềm Pikachu",
                "ID" : "1814235201",
                "price" : 505000,
                "category" : 3,
                "discount" : 4,
                "size" : 1,
                "color" : 2,
                "img" : "https://bitly.vn/27in"
            }
        ]
        db.clients = [
            {
                "Họ và tên": "Trần Phú Nguyện",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện1",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện2",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện4",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện5",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện12",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện435",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện13",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện141",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện21",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện343",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện353",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện212",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện212",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện533",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện121",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện564",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện475",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện4",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện75",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện86",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện823",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện78",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện75",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện876",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện65",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện45",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện15",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện28",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            },
            {
                "Họ và tên": "Trần Phú Nguyện5745",
                "Gmail": "tranphunguyen@gmail.com",
                "Số điện thoại": "0365987694",
                "Giới tính": 1,
                "Tuổi": 12
            }

        ];


    }());
})(jQuery);