var data = [
    { code_cat: "code1", descr_fra: "Oui1", descr_eng: "Yes1", descr_deu: "Ja1" },
    { code_cat: "code2", descr_fra: "Oui2", descr_eng: "Yes2", descr_deu: "Ja2" },
    { code_cat: "code3", descr_fra: "Oui3", descr_eng: "Yes3", descr_deu: "Ja3" }
];

var dialog = $("#dialog-form").dialog({
    autoOpen: false,
    width: 200,
    modal: true,
    closeOnEscape: true,
    buttons: {
        Save: function() {
            $("#categoryForm").submit();
        },
        Cancel: function() {
            $(this).dialog("close");
        }
    },
    close: function() {
        dialog.find("form")[0].reset();
    }
});

var submitHandler;

dialog.find("form").submit(function(e) {
    e.preventDefault();
    submitHandler();
});

var showDetailsDialog = function(dialogType, category) {
    submitHandler = function(event) {
        //if($("#categoryForm").valid()) {
        saveClient(category, dialogType === "Add");
        //}
    };
    
    $("#code_cat").val(category.code_cat);
    $("#descr_fra").val(category.descr_fra);
    $("#descr_eng").val(category.descr_eng);
    $("#descr_deu").val(category.descr_deu);

    dialog.dialog("option", "title", dialogType + " category").dialog("open");
};

var saveClient = function(category, isNew) {
    $.extend(category, {
        code_cat: $("#code_cat").val(),
        descr_fra: $("#descr_fra").val(),
        descr_eng: $("#descr_eng").val(),
        descr_deu: $("#descr_deu").val()
    });
    console.dir(category);
    $("#js-grid-products1").jsGrid(isNew ? "insertItem" : "updateItem", category);

    dialog.dialog("close");
};

$("#js-grid-products1").jsGrid({
    height: 300,
    width: "100%",
    editing: true,
    autoload: true,
    paging: true,
    rowClick: function(args) {
        showDetailsDialog("Edit", args.item);
    },
    controller: {
        loadData: function() {
            return data;
        }
    },
    fields: [
        { name: "code_cat", type: "text", width: 150 },
        { name: "descr_fra", type: "text", width: 150 },
        { name: "descr_eng", type: "text", width: 150 },
        { name: "descr_deu", type: "text", width: 150 },
        {
            type: "control",
            modeSwitchButton: false,
            editButton: false,
            headerTemplate: function() {
                return $("<button>").attr("type", "button").text("Add")
                        .on("click", function() {
                            showDetailsDialog("Add", {});
                        });
            }
        }
    ]
});