var infiles = [ "Africa3miss.tsv" ];

for(var i = 0; i < infiles.length; i++) {

	var infile = infiles[i];

	// Load EVE data from tab file 
	var loadResult;
	glue.inMode("module/tabularUtilityTab", function() {
		loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/"+infile]));
		glue.log("INFO", "load result was:", loadResult);
	});

	_.each(loadResult, function(isolateObj) {

		glue.inMode("sequence/ncbi-curated/"+isolateObj.sequenceID, function() {
	
			glue.log("INFO", "Entering sequence table data for EVE reference 1:", isolateObj.sequenceID);

			glue.command(["set", "field", "subfamily", isolateObj.virus_subfamily]);
			glue.command(["set", "field", "genus", isolateObj.virus_genus]);
			glue.command(["set", "field", "assign_clade", isolateObj.assign_clade]);
			glue.command(["set", "field", "assign_subclade", isolateObj.assign_subclade]);
			glue.command(["set", "field", "clade_ns", isolateObj.virus_clade_ns]);
			glue.command(["set", "field", "subclade_ns", isolateObj.virus_subclade_ns]);
			glue.command(["set", "field", "clade_vp", isolateObj.virus_clade_vp]);
			glue.command(["set", "field", "subclade_vp", isolateObj.virus_subclade_vp]);

			glue.log("INFO", "Entering remaining sequence table data for EVE reference:", isolateObj.sequenceID);
			glue.command(["set", "field", "name", isolateObj.insertion_name]);
			glue.command(["set", "field", "full_name", isolateObj.insertion_full_name]);

		});

	});

}


