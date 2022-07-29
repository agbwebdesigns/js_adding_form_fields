let dcCounter= 0;  //this is a check to see if datecode data has been populated already
let y=0;  //this will increment with every new date code field that is added
const enterADateCodeError= "<p id='acerrorpara'>Please enter a date code.</p>";
const allCodesRemovedError= "<p id='acerrorpara'>All Date Codes have been removed.</p>";
const dateCodesAddedNotify= "<p id='acerrorpara'>Date Code Added.</p>";
const dateCodeRemovedNotify= "<p id='dcerrorpara'>Date Code Removed.</p>";

/**************************************************************************************************************************************/
//  show/hide checkbox add and delete functions
//  tiaRunner and the tableInputArray are used by the tableInputRunner and cellDeleteRunner functions
/**************************************************************************************************************************************/

function tiaRunner()  {  //table input array runner, this saves the following array with the current y value and returns it
    let tableInputArray=[
        ['checkallshowhide','<input type="checkbox" id="cka_showhide'+y+'" class="largerCheckbox" name="checkall_showhide" value="green" nope>'],
        ['paish','<input type="checkbox" id="pai_showhide'+y+'" class="largerCheckbox" name="product_arrival_inspection_showhide" value="green" nope>'],
        ['iaish','<input type="checkbox" id="iai_showhide'+y+'" class="largerCheckbox" name="internal_package_inspection_showhide" value="green" nope>'],
        ['dbish','<input type="checkbox" id="dbi_showhide'+y+'" class="largerCheckbox" name="detailed_bench_inspection_showhide" value="green" nope>'],
        ['pcish','<input type="checkbox" id="pci_showhide'+y+'" class="largerCheckbox" name="product_carrier_inspection_showhide" value="green" nope>'],
        ['pdish','<input type="checkbox" id="pdi_showhide'+y+'" class="largerCheckbox" name="product_detailed_inspection_showhide" value="green" nope>'],
        ['dlish','<input type="checkbox" id="dli_showhide'+y+'" class="largerCheckbox" name="detailed_lead_inspection_showhide" value="green" nope>'],
        ['cdsh','<input type="checkbox" id="cdi_showhide'+y+'" class="largerCheckbox" name="component_dimensions_showhide" value="green" nope>'],
        ['atish','<input type="checkbox" id="act_showhide'+y+'" class="largerCheckbox" name="acetone_test_showhide" value="green" nope>'],
        ['mpish','<input type="checkbox" id="mpi_showhide'+y+'" class="largerCheckbox" name="marking_permanency_showhide" value="green" nope>'],
        ['xirsh','<input type="checkbox" id="xir_showhide'+y+'" class="largerCheckbox" name="xrf_showhide" value="green" nope>'],
        ['xrirsh','<input type="checkbox" id="xra_showhide'+y+'" class="largerCheckbox" name="xray_showhide" value="green" nope>'],
        ['strsh','<input type="checkbox" id="str_showhide'+y+'" class="largerCheckbox" name="solder_test_showhide" value="green" nope>'],
        ['dcsh','<input type="checkbox" id="dc1_showhide'+y+'" class="largerCheckbox" name="decapsulation_showhide" value="green" nope>'],
        ['stsh','<input type="checkbox" id="st1_showhide'+y+'" class="largerCheckbox" name="scrape_test_showhide" value="green" nope>'],
        ['hssh','<input type="checkbox" id="hs1_showhide'+y+'" class="largerCheckbox" name="heated_solvent_showhide" value="green" nope>'],
        ['etdsh','<input type="checkbox" id="etd_showhide'+y+'" class="largerCheckbox" name="electrical_test_showhide" value="green" nope>']
    ];
    return tableInputArray;
}

/**************************************************************************************************************************************/
//  this creates a new table header and populates it with a header
//  this cannot be done in tableInputRunner because that function only inserts table data and won't create a table header
/**************************************************************************************************************************************/

function tableHeaderCreator(y)  {  //creates a header for the show/hide checkboxes being added for the a new datecode in the inspection checklist
    let newHeader=document.createElement('TH');
    newHeader.id= 'dcth'+y;
    let headerField=document.getElementById('showhidetitlehead');
    let headerPassed=document.getElementById('header-passed');
    headerField.insertBefore(newHeader,headerPassed);
}

function tableHeaderDeleter(y)  {
    let dcheader=document.getElementById('dcth'+y);
    dcheader.remove();
}

function tableInputRunner(y,w)  {  //this function creates all of the new checkboxes for the newest set of forms and inserts them into the inspection checklist, w increments to run through the array
    let newTIA= tiaRunner(y);  //this runs the table input array runner and saves it to a variable
    console.log('y: '+y);
    console.log('w: '+w);
    const elementToInput=document.getElementById(newTIA[w][0]);
    let cellInsertSave=elementToInput.insertCell(y);
    cellInsertSave.innerHTML=newTIA[w][1];
    w++;
    if (w<newTIA.length)  {
        return tableInputRunner(y,w);
    }
}

function cellDeleteRunner(y,w)  {  //this function deletes all of the checkboxes for the most recently created set of forms
    let newTIA= tiaRunner(y-1);
    console.log('y: '+y);
    console.log('w: '+w);
    const elementToInput=document.getElementById(newTIA[w][0]);
    elementToInput.deleteCell(y);
    if (w<16)  {
        showHideArray[w][2].pop();
    }
    w++;
    if (w<newTIA.length)  {
        return cellDeleteRunner(y,w);
    }
}

/**************************************************************************************************************************************/
//  function to parse the y value out of the id for the checkbox being clicked
//  this function will work up to 100 datecodes, indexes 0-99, it will not be able to parse anything beyond that but, can be edited so it can if needed
/**************************************************************************************************************************************/

function buttonClick(t)  {  //this pulls out the number value from the setupcode id that is passed into this function
    console.log('new button click success!  Y value= '+t);
    let tArray=t.split("");  //splits the array
    let t12=tArray[12];  //pulls out the 9th index of the array which is the number
    let t13=tArray[13];
    let t12parse=parseInt(t12);  //changes the number from a string to an integer
    let t13parse=parseInt(t13);
    if (isNaN(t13parse))  {  //checks to see if the 13th value is an integer or not
        console.log('number less than 10! '+t12parse);
        return t12parse;  //returns the integer
    } else {
        console.log(t12parse);
        console.log('number greater than 10! '+t12parse*10+t13parse);
        return t12parse*10+t13parse;
    }
    console.log(t12parse);
    
}

/**************************************************************************************************************************************/
// function to add the .no-print class
/**************************************************************************************************************************************/


function noPrint(elementshval,z,buttonYValue)  {  //w is the showhide array index being passed through to get the right showHideArray[w][0] value
    if (elementshval.checked===true)  {
        $(showHideArray[z-1][1]+buttonYValue).addClass('no-print');
        console.log('print!');
    }else if (elementshval.checked===false)  {
        $(showHideArray[z-1][1]+buttonYValue).removeClass('no-print');
        console.log('no-print!');
    }
}

/**************************************************************************************************************************************/
// this array stores all of the showhide id's and all of the section id's
// this is also where the listeners for all of the checkboxes are stored after they are created
//this is used by the checkallListenerAdd, showHideListenerAdd, noPrint and the cellDeleteRunner functions
/**************************************************************************************************************************************/

let showHideArray=[
    ['pai_showhide','#pai',[]],
    ['iai_showhide','#iai',[]],
    ['dbi_showhide','#dbi',[]],
    ['pci_showhide','#pci',[]],
    ['pdi_showhide','#pdi',[]],
    ['dli_showhide','#dli',[]],
    ['cdi_showhide','#cd',[]],
    ['act_showhide','#ati',[]],
    ['mpi_showhide','#mpi',[]],
    ['xir_showhide','#xir',[]],
    ['xra_showhide','#xrir',[]],
    ['str_showhide','#str',[]],
    ['dc1_showhide','#dc',[]],
    ['st1_showhide','#st',[]],
    ['hs1_showhide','#hs',[]],
    ['etd_showhide','#etd',[]]
];

/**************************************************************************************************************************************/
// function to add listeners to all checkboxes being added
/**************************************************************************************************************************************/

let checkAllShowHideArray=[];

function checkallListenerAdd(y)  {  //this function adds listeners to all checkall checkboxes that were created
    const cb = document.getElementById('cka_showhide'+y);
    checkAllShowHideArray.push(cb);
    checkAllShowHideArray[y].addEventListener('click',(t) =>  {
        console.log('checkall success!');
        let buttonYValue= buttonClick(t.target.id);
        const cbClick = document.getElementById('cka_showhide'+buttonYValue);
        function cbClickRunner(y,w,cbClick)  {  //this function runs through the showHideArray and changes the checked property of all show/hide checkboxes for the given datecode to true or false, then adds or removes the no-print class
            if (cbClick.checked===true)  {
                $('#'+showHideArray[w][0]+y).prop('checked',true);
                $(showHideArray[w][1]+y).addClass('no-print');
            }else if (cbClick.checked===false)  {
                $('#'+showHideArray[w][0]+y).prop('checked',false);
                $(showHideArray[w][1]+y).removeClass('no-print');
            }
            w++;
            if (w<showHideArray.length)  {
                return cbClickRunner(y,w,cbClick);
            }
        }
        cbClickRunner(y,0,cbClick);
    })
}

function showHideListenerAdd(y,z)  {
    let elementShowHide=document.getElementById(showHideArray[z][0]+y);  //store the show/hide element that is having a listener attached
    showHideArray[z][2].push(elementShowHide);  //push the showhide element into its corresponding index 2 array
    console.log(showHideArray[z][2]);
    showHideArray[z][2][y].addEventListener('click',(t)=>  {  //adding an event listener to the show/hide element that is currently being created, t is the y variable for which datecode is being selected
        let buttonYValue= buttonClick(t.target.id);  //saving the outcome of the buttonClick function after the button is clicked
        let elementshval= document.getElementById(showHideArray[z-1][0]+buttonYValue)  //saving the value of the show/hide checkbox after it has been clicked
        noPrint(elementshval,z,buttonYValue);
    });
    z++;
    if (z<showHideArray.length)  {  //the z value is the index of the showHideArray being targeted at this time, z should not be greater than the length of the array
        return showHideListenerAdd(y,z);  //rerun the function with an incremented z value
    }
}

/**************************************************************************************************************************************/
//  the following is the datecodeElementSaver function it returns an array with the y value being passed in, the array contains all of the forms that are entered in
//  for a new datecode and the id's for where they are being appended to, it is used by the enter datecode button
//  also is the functionality for the enter, remove and print buttons
/**************************************************************************************************************************************/


function dateCodeElementSaver(y)  {  //this is used when adding a new datecode
    let dateCodeElementArray=[
        ['#datecodediv','<div id="dci'+y+'" class="row"><div class="col-5" align="right"><label>Date Code</label></div><div class="col-5"><input id="dcinput'+y+'" type="text" name="date_code" class="form-control" value="" ></div></div>'],
        ['#paibox','<div id="pai'+y+'"><div id="pai'+y+'"><div class="container" style="height:30px"><a name=productarrival></a></div><div class="card border  inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>Product Arrival Inspection</h3><!-- <p class="card-text">...</p> --><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right">Product Arrival Inspection Images</div><div class="col-7"><input type="file" name="product_arrival_inspection_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="product_arrival_inspection_desc" class="form-control" ></textarea></div></div></div></div></div></div></div>'],
        ['#iaibox','<div id="iai'+y+'"><div class="container" style="height:30px"><a name=internalarrival></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>Internal Arrival Inspection</h3><!-- <p class="card-text">...</p> --><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right">Internal Arrival Inspection Images</div><div class="col-7"><input type="file" name="internal_package_inspection_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="internal_package_inspection_desc" class="form-control" ></textarea></div></div></div></div></div></div>'],
        ['#dbibox','<div id="dbi'+y+'"><div class="container" style="height:30px"><a name=detailedbench></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>Detailed Bench Inspection</h3><!-- <p class="card-text">...</p> --><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right">Detailed Bench Inspection Images</div><div class="col-7"><input type="file" name="detailed_bench_inspection_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="detailed_bench_inspection_desc" class="form-control" ></textarea></div></div></div></div></div>'],
        ['#pcibox','<div id="pci'+y+'"><div class="container" style="height:30px"><a name=productcarrier></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>Product Carrier Inspection</h3><!-- <p class="card-text">...</p> --><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right">Product Carrier Inspection Images</div><div class="col-7"><input type="file" name="product_carrier_inspection_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="product_carrier_inspection_desc" class="form-control" ></textarea></div></div></div></div></div></div>'],
        ['#pdibox','<div id="pdi'+y+'"><div class="container" style="height:30px"><a name=productdetailed></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>Product Detailed Inspection</h3><!-- <p class="card-text">...</p> --><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right">Product Detailed Inspection Images</div><div class="col-7"><input type="file" name="product_detailed_inspection_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="product_detailed_inspection_desc" class="form-control" ></textarea></div></div></div></div></div></div>'],
        ['#dlibox','<div id="dli'+y+'"><div class="container" style="height:30px"><a name=detailedlead></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>Detailed Lead Inspection</h3><!-- <p class="card-text">...</p> --><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right">Detailed Lead Inspection Images</div><div class="col-7"><input type="file" name="detailed_lead_inspection_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="detailed_lead_inspection_desc" class="form-control" ></textarea></div></div></div></div></div></div>'],
        ['#cdbox','<div id="cd'+y+'"><div class="container" style="height:30px"><a name=componentdims></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>Component Dimensions</h3><!-- <p class="card-text">...</p> --><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"></div><div class="row mt-3 no-print"><div class="col-5" align="right">Component Dimensions Images</div><div class="col-7"><input type="file" name="component_dimensions_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="component_dimensions_desc" class="form-control" ></textarea></div></div></div><table class="table mb-0"><thead class="thead-light"><tr><th scope="col-12">Measured Part Dimensions (in MM)</th></tr></thead></table><table class="table border"><thead class="thead-light"><tr scope="row"><th scope="col-3" class="text-xs-center">Actual Dim.</th><th scope="col-3" class="text-xs-center">In Spec.</th><th scope="col-6">Measurement</th></tr></thead><tbody><tr scope="row"><td scope="col-3" class="text-xs-center"><!-- component_dimensions_length_actual: --><input type="text" name="component_dimensions_length_actual" class="form-control" value="" ></td><td scope="col-3" class="text-xs-center"><!-- component_dimensions_length_in_spec: --><input type="text" name="component_dimensions_length_in_spec" class="form-control" value="" ></td><td scope="col-6">Length</th></tr><tr scope="row"><td scope="col-3" class="text-xs-center"><!-- component_dimensions_width_actual: --><input type="text" name="component_dimensions_width_actual" class="form-control" value="" ></td><td scope="col-3" class="text-xs-center"><!-- component_dimensions_width_in_spec: --><input type="text" name="component_dimensions_width_in_spec" class="form-control" value="" ></td><td scope="col-6">Width</td></tr><tr scope="row"><td scope="col-3" class="text-xs-center"><!-- component_dimensions_height_actual: --><input type="text" name="component_dimensions_height_actual" class="form-control" value="" ></td><td scope="col-3" class="text-xs-center"><!-- component_dimensions_height_in_spec: --><input type="text" name="component_dimensions_height_in_spec" class="form-control" value="" ></td><td scope="col-6">Height</td></tr></tbody></table><table class="table mb-0"><thead class="thead-light"><tr><th scope="col-12" >NIST/ISO 17025 Traceable Equipment Utilized During Processing</th></tr></thead></table><table class="table border"><thead class="thead-light"><tr><th scope="col-4" class="text-xs-center">Equipment Used</th><th scope="col-2" class="text-xs-center">Serial #</th><th scope="col-2" class="text-xs-center">Cal. Date</th><th scope="col-2" class="text-xs-center">Cal. Due Date</th><th scope="col-2" class="text-xs-center">Tolerance</th></tr></thead><tbody><tr scope="row"><td class="text-xs-center"><!-- component_dimensions_equipment_used: --><input type="text" name="component_dimensions_equipment_used" class="form-control" value="TEST456" ></td><td class="text-xs-center"><!-- component_dimensions_serial_num: --><input type="text" name="component_dimensions_serial_num" class="form-control" value="12345678" ></td><td class="text-xs-center"><!-- component_dimensions_cal_date: --><input type="text" name="component_dimensions_cal_date" class="form-control" value="09/17/19" ></td><td class="text-xs-center"><!-- component_dimensions_due_date: --><input type="text" name="component_dimensions_due_date" class="form-control" value="09/17/20" ></td><td class="text-xs-center"><!-- component_dimensions_tolerance: --><input type="text" name="component_dimensions_tolerance" class="form-control" value="0.001+" ></td></tr></tbody></table></div></div></div>'],
        ['#atibox','<div id="ati'+y+'"><div class="container" style="height:30px"><a name=acetone></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>Acetone Test Images Before &amp; After</h3><!-- <p class="card-text">...</p> --><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right">Acetone Test Images</div><div class="col-7"><input type="file" name="acetone_test_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="acetone_test_desc" class="form-control" ></textarea></div></div></div></div></div></div>'],
        ['#mpibox','<div id="mpi'+y+'"><div class="container" style="height:30px"><a name=markingperm></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>Marking Permanency Images Before &amp; After</h3><!-- <p class="card-text">...</p> --><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right"> Marking Permanency</div><div class="col-7"><input type="file" name="marking_permanency_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="marking_permanency_desc" class="form-control" ></textarea></div></div></div></div></div></div>'],
        ['#xirbox','<div id="xir'+y+'"><div class="container" style="height:30px"><a name=xrf></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>XRF Inspection Results</h3><!-- <p class="card-text">...</p> --><table class="table border mb-0"><thead class="thead-light"><tr><th scope="col" style="text-align:center; vertical-align: middle;">Yes</th><th scope="col" style="text-align:center; vertical-align: middle;">No</th><th scope="col" style="text-align:center; vertical-align: middle;">N/A</th><th scope="col-9" style="text-align:left; vertical-align: middle;">Check For:</th></tr></thead><tbody><tr scope="row"><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_check_for" value="Passed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_check_for" value="Failed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_check_for" value="N/A"></td><td style="text-align:left; vertical-align: middle;">RoHS / Lead Free</td></tr></tbody><thead class="thead-light"><tr><th scope="col" style="text-align:center; vertical-align: middle;">Yes</th><th scope="col" style="text-align:center; vertical-align: middle;">No</th><th scope="col" style="text-align:center; vertical-align: middle;">N/A</th><th scope="col-9" style="text-align:left; vertical-align: middle;">Elements:</th></tr></thead><tbody><tr scope="row"><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_lead" value="Passed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_lead" value="Failed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_lead" value="N/A"></td><td style="text-align:left; vertical-align: middle;">Lead < 1000 ppm</td></tr><tr scope="row"><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_mercury" value="Passed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_mercury" value="Failed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_mercury" value="N/A"></td><td style="text-align:left; vertical-align: middle;">Mercury < 1000 ppm</td></tr><tr scope="row"><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_cadmium" value="Passed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_cadmium" value="Failed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_cadmium" value="N/A"></td><td style="text-align:left; vertical-align: middle;">Cadmium < 1000 ppm</td></tr><tr scope="row"><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_chromium" value="Passed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_chromium" value="Failed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_chromium" value="N/A"></td><td style="text-align:left; vertical-align: middle;">Chromium < 1000 ppm</td></tr><tr scope="row"><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_bromine" value="Passed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_bromine" value="Failed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xrf_bromine" value="N/A"></td><td style="text-align:left; vertical-align: middle;">Bromine < 1000 ppm</td></tr></tbody></table><table class="table"><tbody><tr scope="row"><td scope="col-5" align="right"><label>Other 1 (Description)</label></td><td scope="col-7"><textarea name="xrf_other_1" class="form-control" ></textarea></td></tr><tr scope="row"><td scope="col-5" align="right"><label>Other 2 (Description)</label></td><td scope="col-7"><textarea name="xrf_other_2" class="form-control" ></textarea></td></tr></tbody></table><h3 class="card-title">XRF Inspection Photos</h3><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right">XRF Images</div><div class="col-7"><input type="file" name="xrf_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="xrf_desc" class="form-control" ></textarea></div></div></div></div></div></div></div>'],
        ['#xrirbox','<div id="xrir'+y+'"><div id="xrirbox"><div class="container" style="height:30px"><a name=xray></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>X-Ray Inspection Results</h3><!-- <p class="card-text">...</p> --><table class="table border mb-0"><thead class="thead-light"><tr><th scope="col" style="text-align:center; vertical-align: middle;">Yes</th><th scope="col" style="text-align:center; vertical-align: middle;">No</th><th scope="col" style="text-align:center; vertical-align: middle;">N/A</th><th scope="col-9" style="text-align:left; vertical-align: middle;">Check For:</th></tr></thead><tbody><tr scope="row"><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_extraneous_matter" value="Passed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_extraneous_matter" value="Failed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_extraneous_matter" value="N/A"></td><td style="text-align:left; vertical-align: middle;">Extraneous matter (Die attach, burrs, ball bonds)</td></tr><tr scope="row"><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_die_attached_incorrectly" value="Passed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_die_attached_incorrectly" value="Failed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_die_attached_incorrectly" value="N/A"></td><td style="text-align:left; vertical-align: middle;">Die attached incorrectly (Voids traverse die, misalignment)</td></tr><tr scope="row"><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_cracked" value="Passed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_cracked" value="Failed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_cracked" value="N/A"></td><td style="text-align:left; vertical-align: middle;">Cracked, split or chipped electrical elements</td></tr><tr scope="row"><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_excessive_loop" value="Passed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_excessive_loop" value="Failed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_excessive_loop" value="N/A"></td><td style="text-align:left; vertical-align: middle;">Excessive loop, crossing or sag in bond wires</td></tr><tr scope="row"><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_consistent_lead_frame" value="Passed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_consistent_lead_frame" value="Failed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_consistent_lead_frame" value="N/A"></td><td style="text-align:left; vertical-align: middle;">Consistent lead frame size</td></tr><tr scope="row"><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_consistent_die" value="Passed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_consistent_die" value="Failed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_consistent_die" value="N/A"></td><td style="text-align:left; vertical-align: middle;">Consistent die size and placement throughout lot</td></tr><tr scope="row"><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_consistent_lead_layout" value="Passed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_consistent_lead_layout" value="Failed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_consistent_lead_layout" value="N/A"></td><td style="text-align:left; vertical-align: middle;">Consistent lead frame layout</td></tr><tr scope="row"><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_meets" value="Passed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_meets" value="Failed"></td><td style="text-align:center; vertical-align: middle;"><input type="radio" name="xray_meets" value="N/A"></td><td style="text-align:left; vertical-align: middle;">Meets all MIL-STD 883G requirements</td></tr></tbody></table><table class="table"><tbody><tr scope="row"><td scope="col-5" align="right"><label>Other 1 (Description)</label></td><td scope="col-7"><textarea name="xray_other_1" class="form-control" ></textarea></td></tr><tr scope="row"><td scope="col-5" align="right"><label>Other 2 (Description)</label></td><td scope="col-7"><textarea name="xray_other_2" class="form-control" ></textarea></td></tr></tbody></table><h3 class="card-title">X-Ray Inspection Photos</h3><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right"> X-Ray Images</div><div class="col-7"><input type="file" name="xray_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="xray_desc" class="form-control" ></textarea></div></div></div><table class="table mb-0"><thead class="thead-light"><tr><th scope="col-12" >NIST/ISO 17025 Traceable Equipment Utilized During Processing</th></tr></thead></table><table class="table border"><thead class="thead-light"><tr><th scope="col-4" class="text-xs-center">Equipment Used</th><th scope="col-2" class="text-xs-center">Serial #</th><th scope="col-2" class="text-xs-center">Cal. Date</th><th scope="col-2" class="text-xs-center">Cal. Due Date</th><th scope="col-2" class="text-xs-center">Tolerance </th></tr></thead><tbody><tr scope="row"><td class="text-xs-center"><!-- xray_equipment_used: --><input type="text" name="xray_equipment_used" class="form-control" value="" ></td><td class="text-xs-center"><!-- xray_serial_num: --><input type="text" name="xray_serial_num" class="form-control" value="" ></td><td class="text-xs-center"><!-- xray_cal_date: --><input type="text" name="xray_cal_date" class="form-control" value="" ></td><td class="text-xs-center"><!-- xray_due_time: --><input type="text" name="xray_due_time" class="form-control" value="" ></td><td class="text-xs-center"><!-- xray_due_tolerance: --><input type="text" name="xray_due_tolerance" class="form-control" value="" ></td></tr></tbody></table><table class="table"><tr><td align="right" scope="col-5"><label>xray_spec:</label></td><td scope="col-7"><input type="text" name="xray_spec" class="form-control" value="" ></td></tr></table></div></div></div>'],
        ['#strbox','<div id="str'+y+'"><div class="container" style="height:30px"><a name=soldertest></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>Solder Test Report &amp; Photo</h3><!-- <p class="card-text">...</p> --><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right"> Solder Test Images</div><div class="col-7"><input type="file" name="solder_test_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="solder_test_desc" class="form-control" ></textarea></div></div></div></div></div></div>'],
        ['#decapsulationbox','<div id="dc'+y+'"><div class="container" style="height:30px"><a name=decap></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>Decapsulation</h3><!-- <p class="card-text">...</p> --><table class="table table-bordered"><tbody><tr><td rowspan="2" class="th-custom" style="text-align:center; vertical-align: middle;">ACID&nbsp;%</td><td class="th-custom">HNO<sub>3</sub></td><td class="th-custom">H<sub>2</sub>SO<sub>4</sub></td><td class="th-custom">Temperature</td><td class="th-custom">Time&nbsp;(secs):</td></tr><tr><td><!-- decapsulation_hno3: --><input type="text" name="decapsulation_hno3" class="form-control" value="" ></td><td><!-- decapsulation_h2so4: --><input type="text" name="decapsulation_h2so4" class="form-control" value="" ></td><td><!-- decapsulation_temperature: --><input type="text" name="decapsulation_temperature" class="form-control" value="" ></td><td><!-- decapsulation_time: --><input type="text" name="decapsulation_time" class="form-control" value="" ></td></tr><tr><td rowspan="2" class="th-custom" style="text-align:center; vertical-align: middle;">MODE:</td><td style="text-align:center; vertical-align: middle;"><!-- decapsulation_mode_pulse:--><input type="checkbox" id="decapsulation_mode_pulse" name="decapsulation_mode_pulse"></td><td colspan="2" style="text-align:left; vertical-align: middle;"><strong>Pulse</strong></td><td class="th-custom">Rinse&nbsp;(secs):</td></tr><tr><td style="text-align:center; vertical-align: middle;"><!-- decapsulation_mode_vortex:--><input type="checkbox" id="decapsulation_mode_vortex" name="decapsulation_mode_vortex"></td><td colspan="2" style="text-align:left; vertical-align: middle;"><strong>Vortex</strong></td><td style="text-align:center; vertical-align: middle;"><!-- decapsulation_rinse: --><input type="text" name="decapsulation_rinse" class="form-control" value="" ></td></tr></tbody></table><h3 class="card-title">Markings Found & Notes</h3><table class="table"><tr><td align="right" scope="col-5"><label>Manufacturer &amp; Logo</label></td><td scope="col-7"><input type="text" name="decapsulation_manufacturer_and_logo" class="form-control" value="" ></td></tr><tr><td align="right" scope="col-5"><label>Manuf. Part Number</label></td><td scope="col-7"><input type="text" name="decapsulation_manuf_part_number" class="form-control" value="" ></td></tr><tr><td align="right" scope="col-5"><label>Date or Markings</label></td><td scope="col-7"><input type="text" name="decapsulation_date_or_markings" class="form-control" value="" ></td></tr><tr><td align="right" scope="col-5"><label>Do die markings match manuf. spec?</label></td><td scope="col-7"><input type="text" name="decapsulation_do_die_match_spec" class="form-control" value="" ></td></tr><tr><td align="right" scope="col-5"><label>Does die match a reference part?</label></td><td scope="col-7"><input type="text" name="decapsulation_does_die_match" class="form-control" value="" ></td></tr></table><h3 class="card-title">Die Images</h3><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right"> Images</div><div class="col-7"><input type="file" name="decapsulation_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="decapsulation_desc" class="form-control" ></textarea></div></div></div></div></div></div>'],
        ['#stbox','<div id="st'+y+'"><div class="container" style="height:30px"><a name=scrape></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>Scrape Test</h3><!-- <p class="card-text">...</p> --><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right">Scrape Test Images</div><div class="col-7"><input type="file" name="scrape_test_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="scrape_test_desc" class="form-control" ></textarea></div></div></div></div></div></div>'],
        ['#hsbox','<div id="hs'+y+'"><div class="container" style="height:30px"><a name=heatedsolvent></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>Heated Solvent</h3><!-- <p class="card-text">...</p> --><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right">Heated Solvent Images</div><div class="col-7"><input type="file" name="heated_solvent_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="heated_solvent_desc" class="form-control" ></textarea></div></div></div></div></div></div>'],
        ['#etdbox','<div id="etd'+y+'"><div class="container" style="height:30px"><a name=electrical></a></div><div class="card border inspection-section mt-3  weprintthis"><div class="card-body"><h3 class="card-title"><div><img src="detailed_files/logo.png"></div><div class="dctitleentry'+y+'"></div>Electrical Test Data</h3><!-- <p class="card-text">...</p> --><div class="row"><div class="container"><p>None uploaded... </p></div></div><div class="container"><div class="row mt-3 no-print"><div class="col-5" align="right">Electrical Test Report Images</div><div class="col-7"><input type="file" name="electrical_test_files[]" multiple></div></div><div class="row mt-3 col-10"><div class="col-10 text-left"><label>Description:</label><textarea name="electrical_test_desc" class="form-control" ></textarea></div></div></div></div></div></div>']
    ];
    return dateCodeElementArray;
}

$('#adddatecode').on('click',() =>  {  //this adds all of the forms for the new datecode
    const dateCodeSave= document.querySelector('#dcinput'+y).value;  //the datecode the user types in is saved here
    if (!document.querySelector('#dcinput'+y).value)  {  //if nothing has been typed in
        $('#errorbox').html("");
        $('#errorbox').append(enterADateCodeError);
    }else{
        $('#errorbox').html("");
        let dateCodeElementArraySave=dateCodeElementSaver(y);  //saves the dateCodeElementArray with the passed in y value
        console.log("this is y: "+y);
        console.log("success!");
        tableHeaderCreator(y);  //create the header for the new column of checkboxes being added in the inspection checklist
        tableInputRunner(y,0);  //add all of the new checkboxes to the inspection checklist
        checkallListenerAdd(y);  //add a listener for the checkall box
        showHideListenerAdd(y,0);  //add all of the listeners for the new checkboxes that were just added
        // function to add functionality to show/hide checkboxes should be called here
        function dateCodeFormAdder(dateCodeElementArraySave,w)  {  //this function runs through dateCodeElementArray, saved for the current y value and adds forms for the new datecode from that array
            $(dateCodeElementArraySave[w][0]).append(dateCodeElementArraySave[w][1]);  //the first index is the id for the div where the second index will be entered into the html document
            w++;
            if (w<dateCodeElementArraySave.length)  {  //rerun the function until everything in the array has been entered into the html document
                return dateCodeFormAdder(dateCodeElementArraySave,w);  //rerun the function for the new w value
            }
        }
        dateCodeFormAdder(dateCodeElementArraySave,1);
        console.log("appended report!");
        // const dateCodeSave= document.querySelector('#dcinput'+y).value;  //the datecode is saved here
        console.log('date code input: '+dateCodeSave);
        let dateCodeCBHeader=document.getElementById('dcth'+y);  //this gets the header element for the new column in the inspection checklist
        dateCodeCBHeader.innerHTML=dateCodeSave;  //this saves the datecode into the header element
        $('.dctitleentry'+y).append("Date Code: "+dateCodeSave);  //add the date code to the fields
        $('#errorbox').html("");
        $('#errorbox').append(dateCodesAddedNotify);
        y++;  //this increments y so the next date code can be added to the correct forms
        let dateCodeElementArraySave2=dateCodeElementSaver(y); //runs dateCodeElementSaver again to get the new y value
        $(dateCodeElementArraySave2[0][0]).append(dateCodeElementArraySave2[0][1]);  //enters a new datecode input box with the new y value
    }
})

$('#deletecode').on('click',() =>  {
    if (y===0)  {  //if there are no datecodes to remove
        $('#errorbox').html("");
        $('#errorbox').append(allCodesRemovedError);
    } else {  //if there are datecodes to remove
        $('#dci'+y).remove();  //remove the extra input box
        y--;
        let currentInput= document.getElementById('dcinput'+y);
        console.log("current input! "+currentInput.value);
        currentInput.value="";
        checkAllShowHideArray.pop();  //remove the last entry from the checkAllShowHideArray, removes button functionality for the checkall box being removed
        tableHeaderDeleter(y);  //removes the header of the show/hide checkboxes for the datecode being removed
        cellDeleteRunner(y,0);  //removes all of the show/hide checkboxes for the datecode being removed
    
        function sectionRemover(y,w)  {  //this function runs through the showHideArray and removes all of the inspection forms for the current datecode being removed
            $(showHideArray[w][1]+y).remove();
            w++;
            if (w<showHideArray.length)  {
                return sectionRemover(y,w);
            }
        }
        sectionRemover(y,0);
        $('#errorbox').html("");  //this clears the error box
        $('#errorbox').append(dateCodeRemovedNotify);
    }
})

$('#print').on('click',() =>  {
    window.print();
})