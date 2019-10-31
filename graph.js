queue()
    .defer(d3.csv, "impacts2017-2022.csv")
    .await(makeGraphs);

// Loading data to crossfilter

function makeGraphs(error, wineProduction) {
    var ndx = crossfilter(wineProduction);

    production_by_country(ndx);

    vineyard_surface_by_country(ndx);

    production_by_continent(ndx);

    dc.renderAll();
}

// Pie Chart for wine production by country

function production_by_country(ndx) {
    var wine_dim = ndx.dimension(dc.pluck('Asteroid Velocity'));
    var wine_prod = wine_dim.group().reduceSum(dc.pluck('Object Name'));

    dc.pieChart('#nasa-objectname')
        .height(350)
        .radius(500)
        .innerRadius(50)
        .transitionDuration(500)
        .dimension(wine_dim)
        .group(wine_prod);

}

// Pie Chart for vineyard surfaces by each country

function vineyard_surface_by_country(ndx) {
    var vineyard_dim = ndx.dimension(dc.pluck('Asteroid Velocity'));
    var vineyard_area = vineyard_dim.group().reduceSum(dc.pluck('Object Name'));

    dc.pieChart('#nasa-possibleimpacts')
        .height(350)
        .radius(500)
        .innerRadius(50)
        .transitionDuration(500)
        .dimension(vineyard_dim)
        .group(vineyard_area);
}

//Bar chart for wine production per each continent in 2018

function production_by_continent(ndx) {
    var continent_dim = ndx.dimension(dc.pluck('Object Name'));
    var continent_prod = continent_dim.group().reduceSum(function(d) {return d.Wine;});

    dc.barChart('#nasa3')
        .width(550)
        .height(200)
        .useViewBoxResizing(true)
        .margins({top: 10, right: 50, bottom: 40, left: 40})
        .dimension(continent_dim)
        .group(continent_prod)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Object Name")
        .yAxisLabel("Hectoliters(hl)")
        .yAxis().ticks(6);
}

var ndx = crossfilter(transactionsData);
        var name_dim = ndx.dimension(dc.pluck('name'));
        var total_spend_per_person = name_dim.group().reduceSum(dc.pluck('spend'));
        dc.barChart('#chart-here')
            .width(300)
            .height(150)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(name_dim)
            .group(total_spend_per_person)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Person")
            .yAxis().ticks(4);





// Function for refreshing charts

function refreshPage() {
    window.location.reload();
}