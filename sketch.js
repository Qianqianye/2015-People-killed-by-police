
  google.charts.load("current", {packages:["sankey"]});
  google.charts.setOnLoadCallback(drawChart);


function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

  function drawChart() {

    $.get("the-counted-2015-processed.csv", function(csvString) {
            // transform the CSV string into a 2-dimensional array
      var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
      var dataCSV = new google.visualization.arrayToDataTable(arrayData); // this new DataTable object holds all the data
      var data = new google.visualization.DataTable();

      var allAges = [];
      var allStates = [];
      var allGenders = [];
      var allRaces = [];
      var allArmed = [];
      var allClassification = [];
      console.log(dataCSV);

for (var i = 0; i < dataCSV.Lf.length; i++) { //loop of all data in the array

  allAges.push(dataCSV.Lf[i].c[2].v);
  allStates.push(dataCSV.Lf[i].c[10].v); 
  allGenders.push(dataCSV.Lf[i].c[3].v);
  allRaces.push(dataCSV.Lf[i].c[4].v);
  allArmed.push(dataCSV.Lf[i].c[13].v);
  allClassification.push(dataCSV.Lf[i].c[11].v);

}

allAges = uniq(allAges);
allStates = uniq(allStates);
allGenders = uniq(allGenders);
allRaces = uniq(allRaces);
allArmed = uniq(allArmed);
allClassification = uniq(allClassification);

// console.log(allAges);
// console.log(allStates);
// console.log(allGenders);
// console.log(allRaces);
// console.log(allArmed);
// console.log(allClassification);



var FinalDataArray = []; // only need one big array to store everything

// -----------1. Age to Gender-----------// format WRONG, coz age is number not string.



for (var genderindex = 0; genderindex < allGenders.length; genderindex+=1) {  // choose a gender to look for
    for (var ageindex = 5; ageindex <= 80; ageindex+=5) {  // choose a age to look for        
    var nowCount = 0;  // start counting with no values
                var nowAge = ageindex; // our chosen age for this loop
                var nowGender = allGenders[genderindex]; // out chosen gender for this loop

                for (var dataIndex = 0; dataIndex < dataCSV.Lf.length; dataIndex++) { //loop of all data in the array looking for the above race and gender
                        // console.log( dataCSV.Lf[dataIndex].c[2].v + ' / ' + nowAge)
                        var inDataAge = dataCSV.Lf[dataIndex].c[2].v;
                        // if(inDataAge >= nowAge  && inDataAge <= nowAge+5){
                        //   console.log("it counts");

                        // }
                        if(inDataAge >= nowAge  && inDataAge <= nowAge+5  &&  dataCSV.Lf[dataIndex].c[3].v == nowGender ){ // if this data object matches our chosen gender and race
                                nowCount++; //add one value to our item count
                              }
                            }
                var miniArray_local = []; // make a blank array to store this small data object (local only) 
                console.log('in all the data we found this:'); 
                miniArray_local.push(nowAge+'-'+(nowAge+5)); // push one value to our small blank array
                miniArray_local.push(nowGender); //  push one value to our small blank array
                miniArray_local.push(nowCount);// push one value to our small blank array
                console.log(miniArray_local);
                FinalDataArray.push(miniArray_local);// push our mini array (three values long) into our master array list
              }
            }

// -----------1. State to Gender-----------// 

// for (var stateindex = 0; stateindex < allStates.length; stateindex++) {  // choose a gender to look for
//     for (var genderindex = 0; genderindex < allGenders.length; genderindex++) {  // choose a race to look for
//         var nowCount = 0;  // start counting with no values
//         var nowState = allStates[stateindex]; // our chosen gender for this loop
//         var nowGender = allGenders[genderindex]; // out chosen race for this loop

//         for (var dataIndex = 0; dataIndex < dataCSV.Lf.length; dataIndex++) { //loop of all data in the array looking for the above race and gender
//             if(dataCSV.Lf[dataIndex].c[10].v == nowState  &&  dataCSV.Lf[dataIndex].c[3].v == nowGender ){ // if this data object matches our chosen gender and race
//                 nowCount++;  //add one value to our item count
//             }
//         }
//         var miniArray_local = []; // make a blank array to store this small data object (local only) 
//         console.log('in all the data we found this:'); 
//         miniArray_local.push(nowState); // push one value to our small blank array
//         miniArray_local.push(nowGender); //  push one value to our small blank array
//         miniArray_local.push(nowCount);// push one value to our small blank array
//         console.log(miniArray_local);
//         FinalDataArray.push(miniArray_local);// push our mini array (three values long) into our master array list
//     }
// }

// -----------2. Gender to Race-----------//


for (var genderindex = 0; genderindex < allGenders.length; genderindex++) {  // choose a gender to look for
        for (var raceindex = 0; raceindex < allRaces.length; raceindex++) {  // choose a race to look for
                var nowCount = 0;  // start counting with no values
                var nowGender = allGenders[genderindex]; // our chosen gender for this loop
                var nowRace = allRaces[raceindex]; // out chosen race for this loop
                for (var dataIndex = 0; dataIndex < dataCSV.Lf.length; dataIndex++) { //loop of all data in the array looking for the above race and gender
                        if(dataCSV.Lf[dataIndex].c[3].v == nowGender  &&  dataCSV.Lf[dataIndex].c[4].v == nowRace ){ // if this data object matches our chosen gender and race
                                nowCount++;  //add one value to our item count
                              }
                            }
                var miniArray_local = []; // make a blank array to store this small data object (local only)
                // console.log('in all the data we found this:'); 
                miniArray_local.push(nowGender); // push one value to our small blank array
                miniArray_local.push(nowRace); //  push one value to our small blank array
                miniArray_local.push(nowCount);// push one value to our small blank array
                // console.log(miniArray_local);
                FinalDataArray.push(miniArray_local);// push our mini array (three values long) into our master array list
              }
            }

//-----------3. Race to Armed-----------//

for (var raceindex = 0; raceindex < allRaces.length; raceindex++) { // choose a race to look for
        for (var armedindex = 0; armedindex < allArmed.length; armedindex++) {// choose a armed status to look for
                var nowCount = 0;  // start counting with no values
                var nowRace = allRaces[raceindex];// our chosen race for this loop
                var nowArmed = allArmed[armedindex];// our chosen armed status for this loop
                for (var dataIndex = 0; dataIndex < dataCSV.Lf.length; dataIndex++) { //loop of all data in the array
                        if(dataCSV.Lf[dataIndex].c[4].v == nowRace  &&  dataCSV.Lf[dataIndex].c[13].v == nowArmed ){// if this data object matches our chosen race and armed status
                                nowCount++; //add one value to our item count
                              }
                            }
                var miniArray_local = [];// make a blank array to store this small data object (local only)
                // console.log('in all the data we found this:');
                miniArray_local.push(nowRace);// push one value to our small blank array
                miniArray_local.push(nowArmed);// push one value to our small blank array
                miniArray_local.push(nowCount);// push one value to our small blank array
                // console.log(miniArray_local);
                FinalDataArray.push(miniArray_local);// push our mini array (three values long) into our master array list
              }
            }


//-----------4. Armed to Classification-----------//


for (var armedindex = 0; armedindex < allArmed.length; armedindex++) {  // choose an armed to look for
        for (var classificationindex = 0; classificationindex < allClassification.length; classificationindex++) {  // choose a classification to look for
                var nowCount = 0;  // start counting with no values
                var nowArmed = allArmed[armedindex]; // our chosen gender for this loop
                var nowClassification = allClassification[classificationindex]; // out chosen race for this loop
                for (var dataIndex = 0; dataIndex < dataCSV.Lf.length; dataIndex++) { //loop of all data in the array looking for the above race and gender
                        if(dataCSV.Lf[dataIndex].c[13].v == nowArmed  &&  dataCSV.Lf[dataIndex].c[11].v == nowClassification ){ // if this data object matches our chosen gender and race
                                nowCount++;  //add one value to our item count
                              }
                            }
                var miniArray_local = []; // make a blank array to store this small data object (local only)
                // console.log('in all the data we found this:'); 
                miniArray_local.push(nowArmed); // push one value to our small blank array
                miniArray_local.push(nowClassification); //  push one value to our small blank array
                miniArray_local.push(nowCount);// push one value to our small blank array
                // console.log(miniArray_local);
                FinalDataArray.push(miniArray_local);// push our mini array (three values long) into our master array list
              }
            }


            console.log('IN THE END we found this:');
            console.log(FinalDataArray);
            data.addColumn('string', 'From');
            data.addColumn('string', 'To');
            data.addColumn('number', 'Ammt');
            data.addRows(FinalDataArray); 


//-----------for style----------//


var colors = [ '#f8f4d3', '#c774e8', '#4cdcce','#ad8cff', '#8795e8',
                  '#94d0ff'];


// var colors = ['#ccffcc', '#e4ffd4', '#a1ffad', '#c4ffa1', '#d4e5ff', 
// '#aeeeae','#d6f6d6', 
// '#fff68f', '#f2b686',
// '#ffefd4', '#f98a9a'];

// var colors = ['#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f',
//                   '#cab2d6', '#ffff99', '#1f78b4', '#33a02c'];

var options = {
  sankey: {
    node: {
      colors: colors,
      labelPadding: 15,
      label: {  color: '#dddddd',
                fontSize: 12, }

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