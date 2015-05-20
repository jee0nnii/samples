﻿var grdMain;
var dataProvider;
RealGridJS.setRootContext("../lib");

$(document).ready(function () {
	dataProvider = new RealGridJS.LocalDataProvider();
  setFields(dataProvider);

  grdMain = new RealGridJS.GridView("container");
	grdMain.setDataSource(dataProvider);
	setColumns(grdMain);
	setOptions(grdMain);
  setSkin();
  setStyles(grdMain);

	loadData(dataProvider);
    
  setTests("actions", "SeriesColumn");
});

function setFields(provider) {
    var fields = [{
        fieldName: "Continent",
        dataType: "text"
    }, {
        fieldName: "country",
        dataType: "text"
    }, {
        fieldName: "2000",
        dataType: "number"
    }, {
        fieldName: "2001",
        dataType: "number"
    }, {
        fieldName: "2002",
        dataType: "number"
    }, {
        fieldName: "2003",
        dataType: "number"
    }, {
        fieldName: "2004",
        dataType: "number"
    }, {
        fieldName: "2005",
        dataType: "number"
    }, {
        fieldName: "2006",
        dataType: "number"
    }, {
        fieldName: "2007",
        dataType: "number"
    }, {
        fieldName: "2008",
        dataType: "number"
    }, {
        fieldName: "2009",
        dataType: "number"
    }, {
        fieldName: "2010",
        dataType: "number"
    }];

    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
        fieldName: "continent",
        width: 60,
        styles: { textAlignment: "near" },
        header: { text: "Continent" }
    }, {
        fieldName: "country",
        width: 80,
        styles: { textAlignment: "near" },
        header: { text: "Country" }
    }, {
        name: "colSeries",
        type: "series",
        fieldNames: "2000,2002,2004,2006,2008,2010",
        width: 120,
        header: { text: "Series" },
        styles: {
            background: "#0800ff00",
            textAlignment: "near"
        }
    }, {
        name: "colSpark",
        type: "series",
        fieldNames: "2000..2010",
        width: 150,
        renderer: {
            type: "sparkLine",
            highFill: "#ff008800",
            lowFill: "#ffff0000",
            lastFill: "#ff888888"
        },
        header: { text: "Spark" },
        styles: {
            background: "#08000000",
            figureBackground: "#ff888888",
            paddingLeft:4,
            paddingRight:4 ,
            paddingTop:4,
            paddingBottom:4
        }
    }, {
        fieldName: "2000",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2000" }
    }, {
        fieldName: "2001",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2001" }
    }, {
        fieldName: "2002",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2002" }
    }, {
        fieldName: "2003",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2003" }
    }, {
        fieldName: "2004",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2004" }
    }, {
        fieldName: "2005",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2005" }
    }, {
        fieldName: "2006",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2006" }
    }, {
        fieldName: "2007",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2007" }
    }, {
        fieldName: "2008",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2008" }
    }, {
        fieldName: "2009",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2009" }
    }, {
        fieldName: "2010",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2010" }
    }];

    grid.setColumns(columns);
}

function setOptions(grid) {
    grid.setOptions({
        panel: {
            visible: true
        },
        footer: {
            visible: true
        },
        stateBar: {
            visible: true
        },
        display: {
            rowHeight: 53,
            rowResizable: true
        },
        header: {
        },
        sorting: {
            handleVisibility: "hidden"
        },
        checkBar: {
            //width: 50
        }
    });
}

function setSkin() {
	grdMain.setStyles(skin103.SkinSource);
}

function setStyles() {
    grdMain.setStyles({
        border: "#ffff0000,5",
        body: {
            cellDynamicStyles: [{
                criteria: [
                    "value < 0"
                ],
                styles: [
                    "foreground=#ccff0000;fontBold=true"
                ]
            }]
        }
    });
}

function loadData(provider) {
    grdMain.showToast("Load data...", true);
    $.ajax({
        url: "data/경제성장률.csv?__time__=" + new Date().getTime(),
        dataType: 'text',
        success: function (data) {
            grdMain.hideToast();
            dataProvider.fillCsvData(data, {
                start: 6
            });
            var count = dataProvider.getRowCount();
            $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
        },
        error: function(xhr, status, error) {
            grdMain.hideToast();
            var err = xhr + ', ' + status + ', ' + error;
            console.log("jQuery getJSON() Failed: " + err);
            $("#loadResult").css("color", "red").text("jQuery getJSON() Failed: " + err).show();
            alert("jQuery getJSON() Failed: " + err);
        },
        complete: function (data) {
        }
    });
}

var tests = {
    getVersion: function () {
        alert(RealGridJS.getVersion());
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
