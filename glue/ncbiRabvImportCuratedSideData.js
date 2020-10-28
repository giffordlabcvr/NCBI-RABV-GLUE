var infiles = [ "Africa3miss.tsv" ];

for(var i = 0; i < infiles.length; i++) {

	var infile = infiles[i];

	// Load EVE data from tab file 
	var loadResult;
	glue.inMode("module/tabularUtilityTab", function() {
		loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/"+infile]));
		glue.log("INFO", "load result was:", loadResult);
	});

	_.each(loadResult, function(eveObj) {

		glue.inMode("sequence/curated/"+source_name+"/"+eveObj.sequenceID, function() {
	
			glue.log("INFO", "Entering sequence table data for EVE reference 1:", eveObj.sequenceID);

			glue.command(["set", "field", "subfamily", eveObj.virus_subfamily]);
			glue.command(["set", "field", "genus", eveObj.virus_genus]);
			glue.command(["set", "field", "assign_clade", eveObj.assign_clade]);
			glue.command(["set", "field", "assign_subclade", eveObj.assign_subclade]);
			glue.command(["set", "field", "clade_ns", eveObj.virus_clade_ns]);
			glue.command(["set", "field", "subclade_ns", eveObj.virus_subclade_ns]);
			glue.command(["set", "field", "clade_vp", eveObj.virus_clade_vp]);
			glue.command(["set", "field", "subclade_vp", eveObj.virus_subclade_vp]);

			glue.log("INFO", "Entering remaining sequence table data for EVE reference:", eveObj.sequenceID);
			glue.command(["set", "field", "name", eveObj.insertion_name]);
			glue.command(["set", "field", "full_name", eveObj.insertion_full_name]);

		});

	});

}


