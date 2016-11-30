/** Concentration drop down list change function */
function changeConcentration(scope) {
    scope.proteins_disable = false; /** Enables the marker protein checkbox group */
}
/** B-gal checkbox change function */
function bGalChangeFn(scope) {
	if ( scope.b_gal == true ) {
		b_gal_flag = true;
	} else {
		b_gal_flag = false;
	}
	markerProteinsCheck(scope, scope.b_gal, total_marker_array[0]); /** Function for marker proteins check */
}
/** Oval checkbox change function */
function ovalChangeFn(scope) {
	if ( scope.oval == true ) {
		oval_flag = true;
	} else {
		oval_flag = false;
	}
	markerProteinsCheck(scope, scope.oval, total_marker_array[1]); /** Function for marker proteins check */
}
/** Acon checkbox change function */
function aconChangeFn(scope) {
	if ( scope.acon == true ) {
		acon_flag = true;
	} else {
		acon_flag = false;
	}
	markerProteinsCheck(scope, scope.acon, total_marker_array[2]); /** Function for marker proteins check */
}
/** Con-a checkbox change function */
function conAChangeFn(scope) {
	if ( scope.con_a == true ) {
		con_a_flag = true;
	} else {
		con_a_flag = false;
	}
	markerProteinsCheck(scope, scope.con_a, total_marker_array[3]); /** Function for marker proteins check */
}
/** Ribo-a checkbox change function */
function riboAChangeFn(scope) {
	if ( scope.ribo_a == true ) {
		ribo_a_flag = true;
	} else {
		ribo_a_flag = false;
	}
	markerProteinsCheck(scope, scope.ribo_a, total_marker_array[4]); /** Function for marker proteins check */
}
/** BPTI checkbox change function */
function bptiChangeFn(scope) {
	if ( scope.bpti == true ) {
		bpti_flag = true;
	} else {
		bpti_flag = false;
	}
	markerProteinsCheck(scope, scope.bpti, total_marker_array[5]); /** Function for marker proteins check */	
}
/** Function for marker proteins check and marker array creation */
function markerProteinsCheck(scope, val, array_item) {
	if ( val ) {
		marker_array.push(array_item); /** The checked items pushed in marker_array */		
	} else {
		marker_array.splice(marker_array.indexOf(array_item),1); /** Remove that item */		
	}
	if ( b_gal_flag == false & oval_flag == false & acon_flag == false & con_a_flag == false & ribo_a_flag == false & bpti_flag == false ) {
		scope.wells_disable = true; /** Disables the all well dropdowns */
		scope.concentration_disable = false; /** Enables the Concentration dropdown */
	} else {
		scope.wells_disable = false; /** Enables the all well dropdowns */
		scope.concentration_disable = true; /** Disables the Concentration dropdown */
	}
}
/** Drop down list of well1 function */
function changeWell1Fn(scope) {
	scope.proteins_disable = true; /** Disables the marker proteins checkbox group */
    scope.voltage_disable = false; /** Enables the voltage slider */
    scene1_container.getChildByName("blue_sample_small1").visible = true;
}
/** Drop down list of well2 function */
function changeWell2Fn(scope) {
	scope.proteins_disable = true; /** Disables the marker proteins checkbox group */
    scope.voltage_disable = false; /** Enables the voltage slider */
    scene1_container.getChildByName("blue_sample_small2").visible = true;
}
/** Drop down list of well3 function */
function changeWell3Fn(scope) {
	scope.proteins_disable = true; /** Disables the marker proteins checkbox group */
    scope.voltage_disable = false; /** Enables the voltage slider */
    scene1_container.getChildByName("blue_sample_small3").visible = true;
}
/** Drop down list of well4 function */
function changeWell4Fn(scope) {
	scope.proteins_disable = true; /** Disables the marker proteins checkbox group */
    scope.voltage_disable = false; /** Enables the voltage slider */
    scene1_container.getChildByName("blue_sample_small4").visible = true;
}
/** Drop down list of well5 function */
function changeWell5Fn(scope) {
	scope.proteins_disable = true; /** Disables the marker proteins checkbox group */
    scope.voltage_disable = false; /** Enables the voltage slider */
    scene1_container.getChildByName("blue_sample_small5").visible = true;
}
/** Voltage slider function */
function changeVoltageFn(scope) {
	if ( scope.voltage > 0 ) {
		scope.start_disable = false; /** Enables the start simulator button */
	} else {
		scope.start_disable = true; /** Disables the start simulator button */
	}
	
	scene1_container.getChildByName("voltage_value").text = scope.voltage; /** Display the voltage in canvas machine screen */
}
/** Start simulator here after click on start simulator button */
function startSimulatorFn(scope) {
	if ( !start_simulation_flag ) { /** If the scene 1 container is displayed */		
		scene1_container.alpha = 0;
		scene2_container.alpha = 1;
		scope.start_btn_txt = reset_simulator_txt; 
		scope.power_on_disable = false; /** Disables other all controls */
		start_simulation_flag = true;
		scope.concentration_disable = true;
		scope.proteins_disable = true;
		scope.wells_disable = true;
		scope.voltage_disable = true;
		if ( scope.well1 != 0 ) { /** If well1 dropdown is selected */
			createArc("blue_sample_big1", blue_sample_arc1, 244); /** Function for creating on well1 arc */	
		}
		if ( scope.well2 != 0 ) { /** If well2 dropdown is selected */
			createArc("blue_sample_big2", blue_sample_arc2, 304); /** Function for creating on well2 arc */
		}
		if ( scope.well3 != 0 ) { /** If well3 dropdown is selected */
			createArc("blue_sample_big3", blue_sample_arc3, 364); /** Function for creating on well3 arc */
		}
		if ( scope.well4 != 0 ) { /** If well4 dropdown is selected */
			createArc("blue_sample_big4", blue_sample_arc4, 423); /** Function for creating on well4 arc */
		}
		if ( scope.well5 != 0 ) { /** If well5 dropdown is selected */
			createArc("blue_sample_big5", blue_sample_arc5, 483); /** Function for creating on well5 arc */
		}
	} else { /** Else the scene 2 container is displayed and the button text is 'Reset Simulator' */
		window.location.reload(); /** Resetting the experiment */
	}	
}
/** Turn power on button click event */
function turnPowerOnFn(scope) {
	if ( !turn_power_on_flag ) { /** If power on */
		turn_power_on_flag = true;
		scope.power_on_btn_txt = turn_power_off_txt;
		sample_opacity_timer = setInterval(function() { 
	        sampleOpacityReduction(scope); /** Opacity reducing of samples */
	    }, 200);
	    clock_timer = setInterval(clock, scope.voltage*4); /** Clock running */
	} else { /** Else power off */
		clearInterval(sample_opacity_timer);
		clearInterval(clock_timer);
		turn_power_on_flag = false;
		scope.power_on_btn_txt = turn_power_on_txt;
	}	
}
/** Incubate staining button click event */
function incubateStainingFn(scope) {
	clearInterval(sample_opacity_timer);
	scope.database_disable = false; /** Enables show protein database checkbox */
	scope.incubate_disable = true;
	scope.power_on_disable = true;
	/** Array shuffling for the calculation */
	sample3_array=storeShuffledItems(sample3_array);
	sample4_array=storeShuffledItems(sample4_array);
	sample5_array=storeShuffledItems(sample5_array);
	if ( scope.well1 != 0 ) { /** If there is any value on well1 dropdown */
		scene2_container.getChildByName("blue_color_shadow1").visible = true;
		scene2_container.removeChild(blue_sample_arc1);
		incubateProteins(scope, scope.well1, scene2_container.getChildByName("blue_color_shadow1").x);
	}
	if ( scope.well2 != 0 ) { /** If there is any value on well2 dropdown */
		scene2_container.getChildByName("blue_color_shadow2").visible = true;
		scene2_container.removeChild(blue_sample_arc2);
		incubateProteins(scope, scope.well2, scene2_container.getChildByName("blue_color_shadow2").x);
	}
	if ( scope.well3 != 0 ) { /** If there is any value on well3 dropdown */
		scene2_container.getChildByName("blue_color_shadow3").visible = true;
		scene2_container.removeChild(blue_sample_arc3);
		incubateProteins(scope, scope.well3, scene2_container.getChildByName("blue_color_shadow3").x);
	}
	if ( scope.well4 != 0 ) { /** If there is any value on well4 dropdown */
		scene2_container.getChildByName("blue_color_shadow4").visible = true;
		scene2_container.removeChild(blue_sample_arc4);
		incubateProteins(scope, scope.well4, scene2_container.getChildByName("blue_color_shadow4").x);
	}
	if ( scope.well5 != 0 ) { /** If there is any value on well5 dropdown */
		scene2_container.getChildByName("blue_color_shadow5").visible = true;
		scene2_container.removeChild(blue_sample_arc5);
		incubateProteins(scope, scope.well5, scene2_container.getChildByName("blue_color_shadow5").x);
	}
	/** The texts displayed in scene 2 container with respect to marker protein checkbox checked values */
	if ( scope.bpti == true ) {
		scene2_container.getChildByName("bpti_txt").visible = true;
	}
	if ( scope.ribo_a == true ) {
		scene2_container.getChildByName("ribo_a_txt").visible = true;	
	}
	if ( scope.con_a == true ) {
		scene2_container.getChildByName("con_a_txt").visible = true;	
	}
	if ( scope.oval == true ) {
		scene2_container.getChildByName("oval_txt").visible = true;	
	}
	if ( scope.acon == true ) {
		scene2_container.getChildByName("acon_txt").visible = true;
	}
	if ( scope.b_gal == true ) {
		scene2_container.getChildByName("b_gal_txt").visible = true;	
	}	
}
/** Show protein database checkbox change function */
function showProteinsDatabaseFn(scope) {
	if ( scope.proteins_database == true ) {
		scene2_container.alpha = 0.5;
		database_container.alpha = 1;
	} else {
		scene2_container.alpha = 1;
		database_container.alpha = 0;
	}	
}
/** Function for creating arcs dynamically */
function createArc(obj, name, x_val) {
	scene2_container.getChildByName(obj).visible = true;	
	scene2_container.addChild(name);
    name.x = x_val;
    name.y = blue_sample_arc_y;
	name.graphics.beginStroke("#2d4294").setStrokeStyle(3).moveTo(10, ARC_STRAIGHT_CONST).bezierCurveTo(10, 30, 50, 30, 50, ARC_STRAIGHT_CONST).command;
	name.alpha = 0.5;
}
/** Samples opacity reducing function */
function sampleOpacityReduction(scope) {
	if ( scope.well1 != 0 ) {
		arcMovement("blue_sample_big1", blue_sample_arc1, scope); /** Well1 arc movement function */
	}
	if ( scope.well2 != 0 ) {
		arcMovement("blue_sample_big2", blue_sample_arc2, scope); /** Well2 arc movement function */
	}
	if ( scope.well3 != 0 ) {
		arcMovement("blue_sample_big3", blue_sample_arc3, scope); /** Well3 arc movement function */
	}
	if ( scope.well4 != 0 ) {
		arcMovement("blue_sample_big4", blue_sample_arc4, scope); /** Well4 arc movement function */
	}
	if ( scope.well5 != 0 ) {
		arcMovement("blue_sample_big5", blue_sample_arc5, scope); /** Well5 arc movement function */
	}
}
/** Arc movement function */
function arcMovement(sample, arc, scope) { 
	arc.alpha = 0.3;
	/** Arc movement stopped when its y value reaches 595 */
	if ( arc.y <= 595 ) { 
		scene2_container.getChildByName(sample).alpha -= 0.045; /** Blue big samples alpha reducing while arc movement */
		scene2_container.getChildByName(sample).y += 3.05; /** Blue big samples y increasing while arc movement */
		scene2_container.getChildByName(sample).scaleY -= 0.05; /** Blue big samples scaleY reducing while arc movement */		
		if ( scene2_container.getChildByName(sample).alpha <= 0.2 ) {
			if ( ARC_STRAIGHT_CONST < 29 ) {
				ARC_STRAIGHT_CONST += 0.2; /** Arc straingting constant value increasing */
				arc.scaleX += 0.005; /** Increasing arc scaleX value */
			}
			arc.y += 2; /** Increasing arc y position value */
			arc.alpha += 0.05; /** Increasing alpha value of y */
			scene2_container.addChild(arc);
			arc.graphics.clear().beginStroke("blue").setStrokeStyle(3).moveTo(10, ARC_STRAIGHT_CONST).bezierCurveTo(10, 30, 50, 30, 50, ARC_STRAIGHT_CONST).command;			
		}
	} else {
		scope.incubate_disable = false; /** Enables the incubate button */
		clearInterval(clock_timer);
		scope.$apply();
	}
}
/** Clock function */
function clock() {
	if ( scene2_container.getChildByName("minute_value").text == 59 ) { /** Time turns 60 seconds */
 		scene2_container.getChildByName("minute_value").text = 1;
 		scene2_container.getChildByName("hour_value").text = Number(scene2_container.getChildByName("hour_value").text+1);	
 	} else {
 		scene2_container.getChildByName("minute_value").text = Number(scene2_container.getChildByName("minute_value").text)+1;
 	}    
    scene2_container.getChildByName("clock_needle").rotation += 360/60;
}

/** Calculations starts here */

/** Function for apply blur effect */
function applyBlurFn(scope, obj_name){
    if ( scope.Concentration == 1 ) {
			var _blur = 10;
	} else if ( scope.Concentration == 2 ) {
		var _blur = 7;
	} else if ( scope.Concentration == 3 ) {
		var _blur = 5;
	} else {
		var _blur = 2;
	}
    var _blur_apply = new createjs.BlurFilter(_blur, _blur, _blur);
    obj_name.filters = [_blur_apply]; 
    obj_name.cache(0, 0, obj_name.image.width, obj_name.image.height);
}

/** Function for shuffle array */
function shuffleArray(array) {
	var i = array.length, j, temp_i, temp_j;
    if ( i === 0 ) return false;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp_i = array[i];
        temp_j = array[j];
        array[i] = temp_j;
        array[j] = temp_i;
    }
}
/** Function for storing random sample mixtures */
function storeShuffledItems(array) {
	shuffleArray(protein_array);
	var _rand_val = (Math.random()*2);
	if ( _rand_val == 0 ) {
		array=[protein_array[0],protein_array[1],protein_array[2],protein_array[3],protein_array[4],protein_array[5]];
	} else {
		array=[protein_array[0],protein_array[1],protein_array[2],protein_array[3],protein_array[4],protein_array[5],protein_array[6]];
	}
	return array;
}
/** Shuffeled array passing for finding the molecular weight */
function incubateProteins(scope, selected_sample,x_pos) {
	shuffleArray(protein_array);
	if ( selected_sample == 1 ) {
		findWeight(scope, marker_array,x_pos); /** Passing the samples arrays for finding the molecular weight */
	} else if ( selected_sample == 2 ) {
		findWeight(scope, sample1_array,x_pos); /** Passing the samples arrays for finding the molecular weight */
	} else if ( selected_sample == 3 ) {
		findWeight(scope, sample2_array,x_pos); /** Passing the samples arrays for finding the molecular weight */
	} else if ( selected_sample == 4 ) {
		findWeight(scope, sample3_array,x_pos); /** Passing the samples arrays for finding the molecular weight */
	} else if ( selected_sample == 5 ) {
		findWeight(scope, sample4_array,x_pos); /** Passing the samples arrays for finding the molecular weight */
	} else if ( selected_sample == 6 ) {
		findWeight(scope, sample5_array,x_pos); /** Passing the samples arrays for finding the molecular weight */
	}
}
/** Function for loading the protein images and finding the y position, size and blur effect of the loading images */
function findWeight(scope, array, x) {	
	for (var i=0; i<=array.length-1; i++) {		
		var _scale_y = (Math.floor(Math.random() * 5) + 1)/10;
		var _y_val=(array[i][1]/1000)*3+200; /** (Molecular weight/1000)+150 */
		loadImagesProteins(queue.getResult("blue_solid_color"), "blue_solid_color"+i, x, _y_val, "", 0, scene2_container, _scale_y, 1);
		applyBlurFn(scope, scene2_container.getChildByName("blue_solid_color"+i)); /** Applying blur effect for these loading images */
	}	
}

/** Calculation ends here */