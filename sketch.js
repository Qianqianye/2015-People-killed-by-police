
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
      console.log(arrayData);
       var data = new google.visualization.DataTable();

      var allAges = [];
      var allStates = [];
      var allGenders = [];
      var allRaces = [];
      var allArmed = [];
      var allClassification = [];

for (var i = 1; i < arrayData.length; i++) { //loop of all data in the array

  allAges.push(arrayData[i][2]);
  allStates.push(arrayData[i][10]); 
  allGenders.push(arrayData[i][3]);
  allRaces.push(arrayData[i][4]);
  allArmed.push(arrayData[i][13]);
  allClassification.push(arrayData[i][11]);
}

allAges = uniq(allAges);
allStates = uniq(allStates);
allGenders = uniq(allGenders);
allRaces = uniq(allRaces);
allArmed = uniq(allArmed);
allClassification = uniq(allClassification);


// console.log(allAges);
// // console.log(allStates);
// console.log(allGenders);
// console.log(allRaces);
// console.log(allArmed);
// console.log(allClassification);
// console.log(allMonth);


var FinalDataArray = []; // only need one big array to store everything

// -----------1. Age to Race-----------// format WRONG, coz age is number not string.

for (var raceindex = 0; raceindex < allRaces.length; raceindex+=1) {  // choose a gender to look for
    for (var ageindex = 5; ageindex <= 80; ageindex+=5) {  // choose a age to look for        
                var nowCount = 0;  // start counting with no values
                var nowAge = ageindex; // our chosen age for this loop
                var nowRace = allRaces[raceindex]; // out chosen gender for this loop
                // var sortedpoints = new array (nowCount);

                for (var dataIndex = 0; dataIndex < arrayData.length; dataIndex++) { //loop of all data in the array looking for the above race and gender
                        // console.log( arrayData[dataIndex][2]+ ' / ' + nowAge)
                        var inDataAge = arrayData[dataIndex][2];
                        // if(inDataAge >= nowAge  && inDataAge <= nowAge+5){
                        //   console.log("it counts");

                        // }
                        if(inDataAge > nowAge  && inDataAge <= nowAge+5  &&  arrayData[dataIndex][4] == nowRace ){ // if this data object matches our chosen gender and race
                                nowCount++; //add one value to our item count
                              }
                            }

                 // sortedpoints.sort(function(a, b){return a-b});
                var miniArray_local = []; // make a blank array to store this small data object (local only) 
                console.log('in all the data we found this:'); 
                miniArray_local.push((nowAge+1) +'-'+(nowAge+5)); // push one value to our small blank array
                miniArray_local.push(nowRace); //  push one value to our small blank array
                miniArray_local.push(nowCount);// push one value to our small blank array
                console.log(miniArray_local);
                FinalDataArray.push(miniArray_local);// push our mini array (three values long) into our master array list
              }
            }

// -----------2. Race to Gender-----------//

for (var raceindex = 0; raceindex < allRaces.length; raceindex++) {  // choose a gender to look for
        for (var genderindex = 0; genderindex < allGenders.length; genderindex++) {  // choose a race to look for
                var nowCount = 0;  // start counting with no values
                var nowGender = allGenders[genderindex]; // our chosen gender for this loop
                var nowRace = allRaces[raceindex]; // out chosen race for this loop
                for (var dataIndex = 0; dataIndex < arrayData.length; dataIndex++) { //loop of all data in the array looking for the above race and gender
                        if(arrayData[dataIndex][4] == nowRace   &&   arrayData[dataIndex][3] == nowGender){ // if this data object matches our chosen gender and race
                                nowCount++;  //add one value to our item count
                              }
                            }
                var miniArray_local = []; // make a blank array to store this small data object (local only)
                // console.log('in all the data we found this:'); 
                miniArray_local.push(nowRace); //  push one value to our small blank array
                miniArray_local.push(nowGender); // push one value to our small blank array
                miniArray_local.push(nowCount);// push one value to our small blank array
                // console.log(miniArray_local);
                FinalDataArray.push(miniArray_local);// push our mini array (three values long) into our master array list
              }
            }

// //-----------3. Gender to Armed-----------//

for (var genderindex = 0; genderindex < allGenders.length; genderindex++) { // choose a race to look for
        for (var armedindex = 0; armedindex < allArmed.length; armedindex++) {// choose a armed status to look for
                var nowCount = 0;  // start counting with no values
                var nowGender = allGenders[genderindex];// our chosen race for this loop
                var nowArmed = allArmed[armedindex];// our chosen armed status for this loop
                for (var dataIndex = 0; dataIndex < arrayData.length; dataIndex++) { //loop of all data in the array
                        if(arrayData[dataIndex][3] == nowGender  &&  arrayData[dataIndex][13] == nowArmed ){// if this data object matches our chosen race and armed status
                                nowCount++; //add one value to our item count
                              }
                            }
                var miniArray_local = [];// make a blank array to store this small data object (local only)
                // console.log('in all the data we found this:');
                miniArray_local.push(nowGender);// push one value to our small blank array
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
                for (var dataIndex = 0; dataIndex < arrayData.length; dataIndex++) { //loop of all data in the array looking for the above race and gender
                        if(arrayData[dataIndex][13]  == nowArmed  &&  arrayData[dataIndex][11] == nowClassification ){ // if this data object matches our chosen gender and race
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

//-----------5. Classification to State-----------//
for (var stateindex = 0; stateindex < allStates.length; stateindex++) {  // choose a classification to look for
    for (var classificationindex = 0; classificationindex < allClassification.length; classificationindex++) {  // choose an armed to look for
                var nowCount = 0;  // start counting with no values
                var nowClassification = allClassification[classificationindex]; // out chosen race for this loop
                var nowState = allStates[stateindex]; // our chosen gender for this loop
                for (var dataIndex = 0; dataIndex < arrayData.length; dataIndex++) { //loop of all data in the array looking for the above race and gender
                        if(arrayData[dataIndex][11] == nowClassification  &&  arrayData[dataIndex][10] == nowState ){ // if this data object matches our chosen gender and race
                                nowCount++;  //add one value to our item count
                              }
                            }
                var miniArray_local = []; // make a blank array to store this small data object (local only)
                // console.log('in all the data we found this:'); 
                miniArray_local.push(nowClassification); //  push one value to our small blank array
                miniArray_local.push(nowState); // push one value to our small blank array
                miniArray_local.push(nowCount);// push one value to our small blank array
                // console.log(miniArray_local);
                FinalDataArray.push(miniArray_local);// push our mini array (three values long) into our master array list
              }
            }



            // console.log('IN THE END we found this:');
            // console.log(FinalDataArray);

            // data.addColumn('string', 'From');
            // data.addColumn('string', 'To');
            // data.addColumn('number', 'Ammt');
            // data.addRows(FinalDataArray); 

//-----------for experiement----------//

// var SortedArray = new Array (FinalDataArray);
// SortedArray.sort(sortFunction);

// function sortFunction(a, b) {
//     if (a[2] === b[2]) {
//         return 0;
//     }
//     else {
//         return (a[2] < b[2]) ? -1 : 1;
//     }
// }

// FinalDataArray = FinalDataArray.sort(function(a,b) {
//  return a[2] > b[2];
//  })

// FinalDataArray = FinalDataArray.sort(function(a,b) {
//     if (a[2] === b[2]) {
//         return 0;
//     }
//     else {
//         return (a[2] < b[2]) ? -1 : 1;
//     }
// });



            console.log('IN THE END we found this:');

            console.log(FinalDataArray);

            data.addColumn('string', 'From');
            data.addColumn('string', 'To');
            data.addColumn('number', 'Ammt');
            data.addRows(FinalDataArray); 


//-----------for style----------//

// var colors = [ '#f8f4d3', '#c774e8', '#4cdcce','#ad8cff', '#8795e8','#94d0ff'];

// var colors = [ '#f8f4d3', '#c774e8', '#4cdcce','#ad8cff', '#8795e8','#94d0ff'];

// var colors = ['#ccffcc', '#e4ffd4', '#a1ffad', '#c4ffa1', '#d4e5ff', '#aeeeae','#d6f6d6', '#fff68f', '#f2b686','#ffefd4', '#f98a9a'];

var colors = ['#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f','#cab2d6', '#ffff99', '#1f78b4', '#33a02c'];

// var colors = ['#011f4b','#03396c','#005b96','#6497b1','#b3cde0']; //blue

// var colors = ['#adff00','#74d600' ,'#028900' ,'#00d27f' ,'#00ff83'];  //green


var options = {
  sankey: {
    // iterations: 0, //If set iterations to 0, and the diagram should draw according to the input order of the data.
    
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