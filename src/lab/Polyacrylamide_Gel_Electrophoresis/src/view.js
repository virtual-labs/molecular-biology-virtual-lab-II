(function() {
	angular.module('users')
		.directive("experiment", directiveFunction)
})();

var polyacrylamide_stage, exp_canvas, tick; /** Stage, canvas and tick timer for stage updation */

var start_simulation_flag, reset_simulator_txt, sample_opacity_timer, clock_timer, turn_power_on_flag, turn_power_off_txt, turn_power_on_txt;

var scene1_container, scene2_container, ARC_STRAIGHT_CONST, blue_sample_arc_y, database_container, abbreviation_y_pos, voltage;

var b_gal_flag, oval_flag, acon_flag, con_a_flag, ribo_a_flag, bpti_flag;

var concentration_array = protein_array = total_marker_array = marker_array = [];

var sample1_array = sample2_array = sample3_array = sample4_array = sample5_array = help_array = [];

var blue_sample_arc1 = new createjs.Shape();
var blue_sample_arc2 = new createjs.Shape();
var blue_sample_arc3 = new createjs.Shape();
var blue_sample_arc4 = new createjs.Shape();
var blue_sample_arc5 = new createjs.Shape();

function directiveFunction() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			/** Variable that decides if something should be drawn on mouse move */
			var experiment = true;
			if (element[0].width > element[0].height) {
				element[0].width = element[0].height;
				element[0].height = element[0].height;
			} else {
				element[0].width = element[0].width;
				element[0].height = element[0].width;
			}
			if (element[0].offsetWidth > element[0].offsetHeight) {
				element[0].offsetWidth = element[0].offsetHeight;
			} else {
				element[0].offsetWidth = element[0].offsetWidth;
				element[0].offsetHeight = element[0].offsetWidth;
			}
			exp_canvas = document.getElementById("demoCanvas");
			exp_canvas.width = element[0].width;
			exp_canvas.height = element[0].height;
			polyacrylamide_stage = new createjs.Stage("demoCanvas");
			queue = new createjs.LoadQueue(true);
			queue.installPlugin(createjs.Sound);
			loadingProgress(queue, polyacrylamide_stage, exp_canvas.width)
			queue.on("complete", handleComplete, this);
			queue.loadManifest([{
				id: "scene1",
				src: "././images/scene1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "scene2",
				src: "././images/scene2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "blue_sample_small",
				src: "././images/blue_sample_small.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "beaker_cover",
				src: "././images/beaker_cover.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "blue_solid_shadow",
				src: "././images/blue_solid_shadow.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "blue_sample_big",
				src: "././images/blue_sample_big.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "blue_solid_color",
				src: "././images/blue_solid_color.png",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "clock_middle",
				src: "././images/clock_middle.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "clock_needle",
				src: "././images/clock_needle.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "clock_under",
				src: "././images/clock_under.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "database_table",
				src: "././images/database_table.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "close_button",
				src: "././images/close_button.svg",
				type: createjs.LoadQueue.IMAGE
			}]);
			polyacrylamide_stage.enableDOMEvents(true);
			polyacrylamide_stage.enableMouseOver();
			createjs.Touch.enable(polyacrylamide_stage);
			tick = setInterval(updateTimer, 100); /** Stage update function in a timer */

			scene1_container = new createjs.Container(); /** Creating the scene1 container */
			scene1_container.name = "scene1_container";
			polyacrylamide_stage.addChild(scene1_container); /** Append it in the stage */

			scene2_container = new createjs.Container(); /** Creating the scene2 container */
			scene2_container.name = "scene2_container";
			polyacrylamide_stage.addChild(scene2_container); /** Append it in the stage */
			scene2_container.alpha = 0;

			database_container = new createjs.Container(); /** Creating the database table container */
			database_container.name = "database_container";
			polyacrylamide_stage.addChild(database_container); /** Append it in the stage */
			database_container.alpha = 0;

			function handleComplete() {
				/** Loading images, text and containers */
				loadImages(queue.getResult("scene1"), "scene1", 0, 0, "", 0, scene1_container, 1);
				loadImages(queue.getResult("scene2"), "scene2", 0, 0, "", 0, scene2_container, 1);
				loadImages(queue.getResult("blue_sample_small"), "blue_sample_small1", 161, 400, "", 0, scene1_container, 1);
				loadImages(queue.getResult("blue_sample_small"), "blue_sample_small2", 186, 400, "", 0, scene1_container, 1);
				loadImages(queue.getResult("blue_sample_small"), "blue_sample_small3", 211, 400, "", 0, scene1_container, 1);
				loadImages(queue.getResult("blue_sample_small"), "blue_sample_small4", 236, 400, "", 0, scene1_container, 1);
				loadImages(queue.getResult("blue_sample_small"), "blue_sample_small5", 261, 400, "", 0, scene1_container, 1);
				loadImages(queue.getResult("beaker_cover"), "beaker_cover", 0, 0, "", 0, scene1_container, 1);								
				loadImages(queue.getResult("clock_under"), "clock_under", 15, 140, "", 0, scene2_container, 1);				
				loadImages(queue.getResult("clock_needle"), "clock_needle", 87, 212, "", 0, scene2_container, 1);
				loadImages(queue.getResult("clock_middle"), "clock_middle", 80, 205, "", 0, scene2_container, 1);

				loadImages(queue.getResult("blue_sample_big"), "blue_sample_big1", 253, 96, "", 0, scene2_container, 1);
				loadImages(queue.getResult("blue_sample_big"), "blue_sample_big2", 312, 96, "", 0, scene2_container, 1);
				loadImages(queue.getResult("blue_sample_big"), "blue_sample_big3", 371, 96, "", 0, scene2_container, 1);
				loadImages(queue.getResult("blue_sample_big"), "blue_sample_big4", 431, 96, "", 0, scene2_container, 1);
				loadImages(queue.getResult("blue_sample_big"), "blue_sample_big5", 490, 96, "", 0, scene2_container, 1);
				loadImages(queue.getResult("database_table"), "database_table", 0, 0, "", 0, database_container, 1);
				loadImages(queue.getResult("close_button"), "close_button", 650, 10, "", 0, database_container, 0.2);

				loadImagesProteins(queue.getResult("blue_solid_shadow"), "blue_color_shadow1", 244, 90, "", 0, scene2_container, 8, 0.3);
				loadImagesProteins(queue.getResult("blue_solid_shadow"), "blue_color_shadow2", 305, 90, "", 0, scene2_container, 8, 0.3);
				loadImagesProteins(queue.getResult("blue_solid_shadow"), "blue_color_shadow3", 364, 90, "", 0, scene2_container, 8, 0.3);
				loadImagesProteins(queue.getResult("blue_solid_shadow"), "blue_color_shadow4", 424, 90, "", 0, scene2_container, 8, 0.3);
				loadImagesProteins(queue.getResult("blue_solid_shadow"), "blue_color_shadow5", 485, 90, "", 0, scene2_container, 8, 0.3);

				/** Text box loading */
				setText("hour_txt", 50, 90, "HH", "black", 1.3, scene2_container);
				setText("minute_txt", 100, 90, "MM", "black", 1.3, scene2_container);
				setText("hour_value", 55, 120, "00", "black", 1.3, scene2_container);
				setText("minute_value", 105, 120, "00", "black", 1.3, scene2_container);
				setText("voltage_value", 530, 500, "0", "red", 1.8, scene1_container);
				setText("bpti_txt", 195, 200, "BPTI", "black", 1, scene2_container);
				setText("ribo_a_txt", 195, 270, _("Ribo A"), "black", 1, scene2_container);
				setText("con_a_txt", 195, 340, _("Con A"), "black", 1, scene2_container);
				setText("oval_txt", 195, 410, _("oval"), "black", 1, scene2_container);
				setText("acon_txt", 195, 480, _("Acon"), "black", 1, scene2_container);
				setText("b_gal_txt", 195, 550, _("b-gal"), "black", 1, scene2_container);

				initialisationOfVariables(); /** Initializing the variables */

				/** Database table text box loading */
				setText("protein_name_txt", 38, 133, _("Protein Name"), "black", 1.3, database_container);
				setText("aconitase_txt", 38, 158, _("Aconitase"), "black", 1.1, database_container);
				setText("conconavalin_txt", 38, 182.7, _("Conconavalin A"), "black", 1.1, database_container);
				setText("glucose_txt", 38, 207.39, _("Glucose Oxidase"), "black", 1.1, database_container);
				setText("neuraminidase_txt", 38, 232.09, _("Neuraminidase"), "black", 1.1, database_container);
				setText("phosphorylase_txt", 38, 256.8, _("Phosphorylase b"), "black", 1.1, database_container);
				setText("pyruvate_txt", 38, 281.5, _("Pyruvate Kinase"), "black", 1.1, database_container);
				setText("ribonuclease_txt", 38, 306.2, _("Ribonuclease A"), "black", 1.1, database_container);
				setText("chymotrypsinogen_txt", 38, 330.9, _("Chymotrypsinogen"), "black", 1.1, database_container);
				setText("hydroxybenzoate_txt", 38, 355.6, _("p Hydroxybenzoate"), "black", 1.1, database_container);
				setText("ribonuclease_txt", 38, 380.3, _("Ribonuclease H"), "black", 1.1, database_container);
				setText("galactosidase_txt", 38, 405, _("beta Galactosidase"), "black", 1.1, database_container);
				setText("ovalbumin_txt", 38, 429.7, _("Ovalbumin"), "black", 1.1, database_container);
				setText("carbonic_txt", 38, 454.4, _("Carbonic Anhydrase"), "black", 1.1, database_container);
				setText("triose_txt", 38, 479.1, _("Triose Phosphate Isomerase"), "black", 1.1, database_container);
				setText("myoglobin_txt", 38, 503.8, _("Myoglobin"), "black", 1.1, database_container);
				setText("lysozyme_txt", 38, 528.5, _("Lysozyme"), "black", 1.1, database_container);
				setText("trypsin_txt", 38, 553.2, _("Trypsin Inhibitor"), "black", 1.1, database_container);
				setText("abbreviation_txt", 348, 133, "Abbreviation", "black", 1.3, database_container);
				/** All abbreviation names of database table text box loading */
				for ( var i=0; i<protein_array.length; i++ ) {
					setText("abbreviation_gp_txt"+i, 348, abbreviation_y_pos, protein_array[i][0], "black", 1.1, database_container);
					abbreviation_y_pos = abbreviation_y_pos+24.7;
				}
				setText("weight_txt", 505, 133, "Molecular Weight", "black", 1.3, database_container);
                
				initialisationOfImages(); /** Function call for images used in the apparatus visibility */
				translationLabels(); /** Translation of strings using gettext */

				database_container.getChildByName("close_button").on("click", function() { /** Database container close button click event */
					scene2_container.alpha = 1;
					database_container.alpha = 0;
					scope.proteins_database = false;
					scope.$apply();
				});
			}

			/** Add all the strings used for the language translation here. '_' is the short cut for calling the gettext function defined in the gettext-definition.js */
			function translationLabels() {
				/** This help array shows the hints for this experiment */
				help_array = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("help6"), _("help7"), _("help8"), _("help9"), _("help10"), _("Next"), _("Close")];
				scope.heading = _("Polyacrylamide Gel Electrophoresis");
				scope.variables = _("Variables");
				scope.concentration_txt = _("Concentration(%) of Acrylamid");
				scope.concentration = _("Select Concentration");
				scope.marker_proteins_txt = _("Marker Proteins");
				scope.b_gal_txt = _("b-gal");
				scope.oval_txt = _("oval");
				scope.acon_txt = _("Acon");
				scope.con_a_txt = _("Con A");
				scope.ribo_a_txt = _("Ribo A");
				scope.bpti_txt = _("BPTI");
				scope.well1_txt = _("Well 1");
				scope.well2_txt = _("Well 2");
				scope.well3_txt = _("Well 3");
				scope.well4_txt = _("Well 4");
				scope.well5_txt = _("Well 5");
				scope.well = _("Select Sample");
				scope.voltage_txt = _("Adjust Voltage");
				scope.start_btn_txt = _("Start Simulator");
				reset_simulator_txt = _("Reset Simulator");
				turn_power_on_txt = _("Turn Power ON"); 
				scope.power_on_btn_txt = turn_power_on_txt;
				turn_power_off_txt = _("Turn Power OFF");
				scope.incubate_btn_txt = _("Incubate in staining and destaining solution");
				scope.proteins_database_txt = _("Show Protein Database");
				scope.result = _("Result");
				scope.copyright = _("copyright");
				/** The no_of_turns_array contains the values and indexes of the first slider */
				scope.concentration_array = [{
                    concentration: 7.5,
                    type: 1,
                    index: 0
                }, {
                    concentration: 10,
                    type: 2,
                    index: 1
                }, {
                    concentration: 12,
                    type: 3,
                    index: 2
                }, {
                    concentration: 15,
                    type: 4,
                    index: 3
                }];
                scope.well_array = [{
                    well: _("Marker"),
                    type: 1,
                    index: 0
                }, {
                    well: _("Sample 1"),
                    type: 2,
                    index: 1
                }, {
                    well: _("Sample 2"),
                    type: 3,
                    index: 2
                }, {
                    well: _("Sample 3"),
                    type: 4,
                    index: 3
                }, {
                    well: _("Sample 4"),
                    type: 5,
                    index: 4
                }, {
                    well: _("Sample 5"),
                    type: 6,
                    index: 5
                }];
				scope.$apply();
			}
		}
	}
}

/** Createjs stage updation happens in every interval */
function updateTimer() {
	polyacrylamide_stage.update();
}

/** All the texts loading and added to the stage */
function setText(name, textX, textY, value, color, fontSize, container) {
	var _text = new createjs.Text(value, "bold " + fontSize + "em Tahoma, Geneva, sans-serif", color);
	_text.x = textX;
	_text.y = textY;
	_text.textBaseline = "alphabetic";
	_text.name = name;
	_text.text = value;
	_text.color = color;
	container.addChild(_text); /** Adding text to the container */
}

/** All the images loading and added to the natural_convection_stage */
function loadImages(image, name, xPos, yPos, cursor, rot, container, scale) {
    var _bitmap = new createjs.Bitmap(image).set({});
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.scaleX = _bitmap.scaleY = scale;
    _bitmap.name = name;
    _bitmap.alpha = 1;
    _bitmap.rotation = rot;
    _bitmap.cursor = cursor;
    if ( name == "clock_needle" ) {
        _bitmap.regX = _bitmap.image.width / 2;
        _bitmap.regY = _bitmap.image.height / 2; 
    }
    container.addChild(_bitmap); /** Adding bitmap to the container */
}

/** All the images loading and added to the natural_convection_stage */
function loadImagesProteins(image, name, xPos, yPos, cursor, rot, container, scale, alpha) {
    var _bitmap = new createjs.Bitmap(image).set({});
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.scaleY = scale;    
    _bitmap.name = name;
    _bitmap.alpha = alpha;
    _bitmap.rotation = rot;
    _bitmap.cursor = cursor;
    if ( name == "blue_color_shadow1" || name == "blue_color_shadow2" || name == "blue_color_shadow3" || name == "blue_color_shadow4" || name == "blue_color_shadow5" ) {
		_bitmap.scaleX = 0.72;
    } else {
    	_bitmap.scaleX = 0.9;
    }
    container.addChild(_bitmap); /** Adding bitmap to the container */
}

/** All variables initialising in this function */
function initialisationOfVariables() {
	scene1_container.alpha = 1; /** Initially displayed the scene1 container */
	scene2_container.alpha = 0; /** Scene2 container is not displayed initially */	
	ARC_STRAIGHT_CONST = 18; /** Constant for straightening the arc */
	blue_sample_arc_y = 130; /** Initial y position of blue arc */
	abbreviation_y_pos = 158; /** Initial y position of abbreviation elements */
	start_simulation_flag = false; /** Start simulation flag */
	turn_power_on_flag = false; /** Turn power on flag */
	b_gal_flag = false; /** Marker protein checkbox group flags initial settings */
	oval_flag = false;
	acon_flag = false;
	con_a_flag = false;
	ribo_a_flag = false;
	bpti_flag = false;
	protein_array = [[_("Acon"), 82512], [_("Con A"), 25556], [_("GO"), 63058], [_("Neur"), 43505], [_("Phos b"), 94969], [_("Pyr Kin"), 56773], 
				[_("Ribo A"), 13673], [_("Chymo"), 23564], [_("Hydrox"), 43939], [_("Ribo H"), 16638], [_("b-gal"), 116107], [_("oval"), 42734], 
				[_("carb anh"), 29011], [_("TIM"), 26527], [_("Myo"), 17183], [_("Lyso"), 14296], [_("BPTI"), 6500]];
	total_marker_array = [["b-gal", 116107], ["oval", 42734], ["Acon", 82512], ["Con A", 25556], ["Ribo A", 13673], ["BPTI", 6500]];
	sample1_array = [["Acon", 82512], ["Con A", 25556], ["GO", 63058]]; /** Default Sample1 array */
	sample2_array=[protein_array[0], protein_array[1], protein_array[2], protein_array[3]];
}

/** Set the initial status of the bitmap and text depends on its visibility and initial values */
function initialisationOfImages() {
	/** Set initial visibility of 5 blue small samples, 5 big samples and 5 shadows as false */
	for ( var i=1; i<6; i++ ) {
		scene1_container.getChildByName("blue_sample_small"+i).visible = false;
		scene2_container.getChildByName("blue_color_shadow"+i).visible = false;
		scene2_container.getChildByName("blue_sample_big"+i).visible = false;
	}
	/** Set the visibility as false of 6 checkbox labels that displayed in canvas */
	scene2_container.getChildByName("bpti_txt").visible = false;
	scene2_container.getChildByName("ribo_a_txt").visible = false;
	scene2_container.getChildByName("con_a_txt").visible = false;
	scene2_container.getChildByName("oval_txt").visible = false;
	scene2_container.getChildByName("acon_txt").visible = false;
	scene2_container.getChildByName("b_gal_txt").visible = false;	
}