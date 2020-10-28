var infiles = [ "Africa3miss.tsv" ];

// Get the sequence source mappings (i.e. which in ncbi-refseqs, ncbi-curated, etc)
var epvRefseqResultMap = {};
get_sequence_source_mappings(epvRefseqResultMap);


for(var i = 0; i < infiles.length; i++) {

	var infile = infiles[i];

	// Load EVE data from tab file 
	var loadResult;
	glue.inMode("module/tabularUtilityTab", function() {
		loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/"+infile]));
		//glue.log("INFO", "load result was:", loadResult);
	});

	_.each(loadResult, function(isolateObj) {

        var sequenceID = isolateObj.sequence_sequenceID;
        var sourceName = epvRefseqResultMap[sequenceID];
		glue.log("INFO", "Entering sequence table data for isolate:", sequenceID, " from source '", sourceName, "'");
		glue.inMode("sequence/"+sourceName+"/"+sequenceID, function() {

        	var countryEdit   = isolateObj.country_edit;
        	var countryUpdate = isolateObj.Country_update;
		    glue.log("INFO", "FIELD: countryEdit:", countryEdit);
		    glue.log("INFO", "FIELD: countryUpdate:", countryUpdate);
		    
        	var placeEdit   = isolateObj.place_edit;
        	var placeUpdate = isolateObj.place_update;
 		    glue.log("INFO", "FIELD: placeEdit:", placeEdit);
		    glue.log("INFO", "FIELD: placeUpdate:", placeUpdate);
       	
        	var collectionYearEdit   = isolateObj.Collection_year_edit;
        	var collectionYearUpdate = isolateObj.Collection_year_update;
 		    glue.log("INFO", "FIELD: collectionYearEdit:", collectionYearEdit);
		    glue.log("INFO", "FIELD: collectionYearUpdate:", collectionYearUpdate);

        	var earliestCollectionYearEdit   = isolateObj.earliest_collection_edit;
        	var earliestCollectionYearUpdate = isolateObj.earliest_collection_update;
 		    glue.log("INFO", "FIELD: earliestCollectionYearEdit:", earliestCollectionYearEdit);
		    glue.log("INFO", "FIELD: earliestCollectionYearUpdate:", earliestCollectionYearUpdate);

        	var latestCollectionYearEdit     = isolateObj.latest_collection_edit;
        	var latestCollectionYearUpdate   = isolateObj.latest_collection_update;
 		    glue.log("INFO", "FIELD: latestCollectionYearEdit:", latestCollectionYearEdit);
		    glue.log("INFO", "FIELD: latestCollectionYearUpdate:", latestCollectionYearUpdate);

        	var hostEdit       = isolateObj.host_edit;
        	var hostUpdate     = isolateObj.host_update;
        	var hostCommonEdit = isolateObj.host_common_edit;
 		    glue.log("INFO", "FIELD: hostEdit:", hostEdit);
		    glue.log("INFO", "FIELD: hostUpdate:", hostUpdate);
		    glue.log("INFO", "FIELD: hostCommonEdit:", hostCommonEdit);

        	var labConstruct   = isolateObj.Lab_construct;
        	var vaccine        = isolateObj.vaccine;
 		    glue.log("INFO", "FIELD: labConstruct:", labConstruct);
		    glue.log("INFO", "FIELD: vaccine:", vaccine);

        	var pubmedEdit     = isolateObj.pubmedID_edit;
        	var pubmedUpdate   = isolateObj.pubmed_update;
		    glue.log("INFO", "FIELD: pubmedEdit:", pubmedEdit);
		    glue.log("INFO", "FIELD: pubmedUpdate:", pubmedUpdate);

			//glue.command(["set", "field", "subfamily", isolateObj.virus_subfamily]);
			//glue.command(["set", "field", "genus", isolateObj.virus_genus]);
			
			//glue.command(["set", "field", "assign_clade", isolateObj.assign_clade]);
			//glue.command(["set", "field", "assign_subclade", isolateObj.assign_subclade]);
			
			//glue.command(["set", "field", "clade_ns", isolateObj.virus_clade_ns]);
			//glue.command(["set", "field", "subclade_ns", isolateObj.virus_subclade_ns]);
			//glue.command(["set", "field", "clade_vp", isolateObj.virus_clade_vp]);
			//glue.command(["set", "field", "subclade_vp", isolateObj.virus_subclade_vp]);

			//glue.log("INFO", "Entering remaining sequence table data for EVE reference:", isolateObj.sequenceID);
			//glue.command(["set", "field", "name", isolateObj.insertion_name]);
			//glue.command(["set", "field", "full_name", isolateObj.insertion_full_name]);


		});

	});

}



// get a list of sequence IDs from a given source in an alignment
function get_sequence_source_mappings(epvRefseqResultMap) {

	var resultList = glue.tableToObjects(glue.command(["list","sequence","sequenceID","source.name"]));	
		
	_.each(resultList,function(resultObj){

		glue.log("INFO", "This result is:", resultObj);
		var sequenceID = resultObj["sequenceID"];
		var sourceName = resultObj["source.name"];
		//var sourceName = ["ncbi-refseqs"];
		epvRefseqResultMap[sequenceID] = sourceName;


	});

}














