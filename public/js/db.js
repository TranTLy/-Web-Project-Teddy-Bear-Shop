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

        db.products_type = [{
            Name: "",
            Id: 0
        },
        {
            Name: "Loại sản phẩm 1",
            Id: 1
        },
        {
            Name: "Loại sản phẩm 2",
            Id: 2
        },
        {
            Name: "Loại sản phẩm 3",
            Id: 3
        },
        {
            Name: "Loại sản phẩm 4",
            Id: 4
        }
        ];

        db.products_discount = [{
            Name: "",
            Id: 0
        },
        {
            Name: "5% hoặc hơn",
            Id: 1
        },
        {
            Name: "10% hoặc hơn",
            Id: 2
        },
        {
            Name: "20% hoặc hơn",
            Id: 3
        },
        {
            Name: "30% hoặc hơn",
            Id: 4
        },
        {
            Name: "50% hoặc hơn",
            Id: 5
        },
        {
            Name: "60% hoặc hơn",
            Id: 6
        }
        ];
        db.products = [
            {
                "Tên sản phẩm" : "Gấu Teddy",
                "Id sản phẩm" : "1568798201",
                "Giá" : 150000,
                "Loại sản phẩm" : 1,
                "Chiếc khấu" : 2,
                "Link hình" : "https://bitly.vn/27in"
            },
            {
                "Tên sản phẩm" : "Gấu Todos",
                "Id sản phẩm" : "1567878201",
                "Giá" : 190000,
                "Loại sản phẩm" : 4,
                "Chiếc khấu" : 5,
                "Link hình" : "https://bitly.vn/27in"
            },
            {
                "Tên sản phẩm" : "Gấu Soft Todos",
                "Id sản phẩm" : "157478201",
                "Giá" : 200000,
                "Loại sản phẩm" : 1,
                "Chiếc khấu" : 1,
                "Link hình" : "https://bitly.vn/27in"
            },
            {
                "Tên sản phẩm" : "Gấu Soft Teddy",
                "Id sản phẩm" : "156781401",
                "Giá" : 470000,
                "Loại sản phẩm" : 3,
                "Chiếc khấu" : 4,
                "Link hình" : "https://bitly.vn/27in"
            },
            {
                "Tên sản phẩm" : "Gấu Pink bear",
                "Id sản phẩm" : "1747878201",
                "Giá" : 390000,
                "Loại sản phẩm" : 3,
                "Chiếc khấu" : 2,
                "Link hình" : "https://bitly.vn/27in"
            },
            {
                "Tên sản phẩm" : "Gấu Grey Lucky",
                "Id sản phẩm" : "1714235201",
                "Giá" : 780000,
                "Loại sản phẩm" : 2,
                "Chiếc khấu" : 2,
                "Link hình" : "https://bitly.vn/27in"
            },
            {
                "Tên sản phẩm" : "Gấu Mềm Pikachu",
                "Id sản phẩm" : "1814235201",
                "Giá" : 505000,
                "Loại sản phẩm" : 3,
                "Chiếc khấu" : 4,
                "Link hình" : "https://bitly.vn/27in"
            },
            {
                "Tên sản phẩm" : "Gấu Teddy",
                "Id sản phẩm" : "1568798201",
                "Giá" : 150000,
                "Loại sản phẩm" : 1,
                "Chiếc khấu" : 2,
                "Link hình" : "https://bitly.vn/27in"
            },
            {
                "Tên sản phẩm" : "Gấu Todos",
                "Id sản phẩm" : "1567878201",
                "Giá" : 190000,
                "Loại sản phẩm" : 4,
                "Chiếc khấu" : 5,
                "Link hình" : "https://bitly.vn/27in"
            },
            {
                "Tên sản phẩm" : "Gấu Soft Todos",
                "Id sản phẩm" : "157478201",
                "Giá" : 200000,
                "Loại sản phẩm" : 1,
                "Chiếc khấu" : 1,
                "Link hình" : "https://bitly.vn/27in"
            },
            {
                "Tên sản phẩm" : "Gấu Soft Teddy",
                "Id sản phẩm" : "156781401",
                "Giá" : 470000,
                "Loại sản phẩm" : 3,
                "Chiếc khấu" : 4,
                "Link hình" : "https://bitly.vn/27in"
            },
            {
                "Tên sản phẩm" : "Gấu Pink bear",
                "Id sản phẩm" : "1747878201",
                "Giá" : 390000,
                "Loại sản phẩm" : 3,
                "Chiếc khấu" : 2,
                "Link hình" : "https://bitly.vn/27in"
            },
            {
                "Tên sản phẩm" : "Gấu Grey Lucky",
                "Id sản phẩm" : "1714235201",
                "Giá" : 780000,
                "Loại sản phẩm" : 2,
                "Chiếc khấu" : 2,
                "Link hình" : "https://bitly.vn/27in"
            },
            {
                "Tên sản phẩm" : "Gấu Mềm Pikachu",
                "Id sản phẩm" : "1814235201",
                "Giá" : 505000,
                "Loại sản phẩm" : 3,
                "Chiếc khấu" : 4,
                "Link hình" : "https://bitly.vn/27in"
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