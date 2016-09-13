google.charts.load("current", {packages:["sankey"]});
  google.charts.setOnLoadCallback(drawChart);

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

   function drawChart() {

   $.get("the-counted-2015.csv", function(csvString) {
      // transform the CSV string into a 2-dimensional array
   var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
   var dataCSV = new google.visualization.arrayToDataTable(arrayData); // this new DataTable object holds all the data
      var data = new google.visualization.DataTable();

var NewDataArray = []; //new array which is blank


var allGenders = [];
var allRaces = [];
var allArmed = [];
for (var i = 0; i < dataCSV.Tf.length; i++) { //loop of all data in the array
  allGenders.push(dataCSV.Tf[i].c[3].v);
  allRaces.push(dataCSV.Tf[i].c[4].v);
  allArmed.push(dataCSV.Tf[i].c[13].v);
}
allGenders = uniq(allGenders);
allRaces = uniq(allRaces);
allArmed = uniq(allArmed);

console.log(allGenders);
console.log(allRaces);
console.log(allArmed);


for (var genderindex = 0; genderindex < allGenders.length; genderindex++) { 

  for (var raceindex = 0; raceindex < allRaces.length; raceindex++) { 

    var nowCount = 0;
    var nowGender = allGenders[genderindex];
    var nowRace = allRaces[raceindex];

    for (var dataIndex = 0; dataIndex < dataCSV.Tf.length; dataIndex++) { //loop of all data in the array
        if(dataCSV.Tf[dataIndex].c[3].v == nowGender  &&  dataCSV.Tf[dataIndex].c[4].v == nowRace ){
          nowCount++;
        }
    }
    console.log('in all the data we found this:');
    console.log(nowGender + ' ' + nowRace + ' ' + nowCount);
  }
}

for (var raceindex = 0; raceindex < allRaces.length; raceindex++) { 

  for (var armedindex = 0; armedindex < allRaces.length; armedindex++) { 

    var nowCount = 0;
    var nowRace = allRaces[raceindex];
    var nowArmed = allArmed[armedindex];

    for (var dataIndex = 0; dataIndex < dataCSV.Tf.length; dataIndex++) { //loop of all data in the array
        if(dataCSV.Tf[dataIndex].c[4].v == nowRace  &&  dataCSV.Tf[dataIndex].c[13].v == nowArmed ){
          nowCount++;
        }
    }
    console.log('in all the data we found this:');
    console.log(nowRace + ' ' + nowArmed + ' ' + nowCount);

  }
}

// for (var dataIndex = 0; dataIndex < dataCSV.Tf.length; dataIndex++) { //loop of all data in the array

//   var miniArray = [];
//    miniArray.push(dataCSV.Tf[dataIndex].c[3].v);
//    miniArray.push(dataCSV.Tf[dataIndex].c[4].v );
//    // miniArray.push(dataCSV.Tf[dataIndex].c[13].v  );
//    NewDataArray.push(miniArray.count);

//   NewDataArray.push(miniArray);

//   // console.log(miniArray );
// };

 // console.log(NewDataArray );
     data.addColumn('string', 'gender');
     data.addColumn('string', 'raceethnicity');
     data.addColumn('number', 'Weight');
     data.addRows('nowGender', 'nowRace', nowCount);


 // data.addColumn('string', 'armed');


     var colors = ['#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f',
                  '#cab2d6', '#ffff99', '#1f78b4', '#33a02c'];

    var options = {
      height: 400,
      sankey: {
        node: {
          colors: colors
        },
        link: {
          colorMode: 'gradient',
          colors: colors
        }
      }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.Sankey(document.getElementById('sankey_multiple'));
    chart.draw(data, options);


});

 }