var json = {
    "string": "foo",
    "number": 5,
    "array": [1, 2, 3],
    "object": {
        "property": "value",
        "subobj": {
            "arr": ["foo", "ha"],
            "numero": 1
        }
    }
};

function printJSON() {
    // $('#json').val(JSON.stringify(json));
    $('#json').val(JSON.stringify(json, null , "  "));

}

function updateJSON(data) {
    json = data;
    printJSON();
}

function showPath(path) {
    $('#path').text(path);
}

function updateJSONEditor() {
    $('#editor').jsonEditor(json, { change: updateJSON, propertyclick: showPath });
}

function changeJSON() {
    $('#json').change(function() {
        var val = $('#json').val();    

        if (val) {
            try { json = JSON.parse(val); }
            catch (e) { alert('Error in parsing json. ' + e); }
        } else {
            json = {};
        }
        
        updateJSONEditor();

    });
}

function uploadFile() {
    window.addEventListener('DOMContentLoaded', function() {
        var btnupload = document.getElementById("btnupload")
        btnupload.addEventListener('change', function (e) {
            if (window.File) {
                var input = btnupload.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                  $('#json').val(reader.result).change();
                };
                reader.readAsText(input, 'UTF-8');
            }
        }, true);
    });
}

function downloadFile() {
    var btndownload = document.getElementById("btndownload")
    btndownload.addEventListener("click", function (e) {
        var text = document.getElementById("json").value;
        blob = new Blob([text],{type: 'text/plain'});

        var label = document.createTextNode("Download");
        var disp = document.getElementById("disp");
        
        if (window.URL) {
            blobURLref = window.URL.createObjectURL(blob)
        } else if (window.webkitURL) {
            blobURLref = window.webkitURL.createObjectURL(blob)
        }
        
        $('#btndownload').attr('href',blobURLref);
        $('#btndownload').attr('target','_blank');
        $('#btndownload').attr('download',"data.json");
    }, false);
}

function clickRESTfulAPI() {
    $('#rest > button').click(function() {
        var url = $('#rest-url').val();
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonp: $('#rest-callback').val(),
            success: function(data) {
                json = data;
                updateJSONEditor();
                printJSON();
            },
            error: function() {
                alert('Something went wrong, double-check the URL and callback parameter.');
            }
        });
    });
}

function clickExpander() {
    $('#expander').click(function() {
        var editor = $('#editor');
        editor.toggleClass('expanded');
        $(this).text(editor.hasClass('expanded') ? 'Collapse' : 'Expand all');
    });
}

function readyJSON() {
    clickRESTfulAPI();

    changeJSON();
    clickExpander();

    printJSON();
    updateJSONEditor();
}

$(document).ready(function() {
    readyJSON();
    uploadFile();
    downloadFile();
});


