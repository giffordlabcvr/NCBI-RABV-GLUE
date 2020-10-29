//var infiles = [ "Africa3miss.tsv" , "Africa2miss.tsv", "Arctic_miss.tsv" ];
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
		    //glue.log("INFO", "FIELD: countryEdit:", countryEdit);
		    //glue.log("INFO", "FIELD: countryUpdate:", countryUpdate);	    
		    if (countryUpdate != 'unchanged') {		    	
				glue.log("INFO", "Updating country field:", isolateObj.country_edit);
				//glue.command(["set", "field", "m49_country", isolateObj.country_edit]);				
		    }
		    
        	var placeEdit   = isolateObj.place_edit;
        	var placeUpdate = isolateObj.place_update;
 		    //glue.log("INFO", "FIELD: placeEdit:", placeEdit);
		    //glue.log("INFO", "FIELD: placeUpdate:", placeUpdate);
		    if (placeUpdate != 'unchanged') {		    	
				glue.log("INFO", "Updating place field:", isolateObj.placeEdit);
				//glue.command(["set", "field", "m49_country", isolateObj.placeEdit]);				
		    }
       	
        	var collectionYearEdit   = isolateObj.Collection_year_edit;
        	var collectionYearUpdate = isolateObj.Collection_year_update;
 		    //glue.log("INFO", "FIELD: collectionYearEdit:", collectionYearEdit);
		    //glue.log("INFO", "FIELD: collectionYearUpdate:", collectionYearUpdate);
		    if (collectionYearUpdate != 'unchanged') {		    	
				glue.log("INFO", "Updating collectionYearEdit field:", isolateObj.collectionYearEdit);
				//glue.command(["set", "field", "collection_year", isolateObj.collectionYearEdit]);				
		    }
       	
        	var earliestCollectionYearEdit   = isolateObj.earliest_collection_edit;
        	var earliestCollectionYearUpdate = isolateObj.earliest_collection_update;
 		    //glue.log("INFO", "FIELD: earliestCollectionYearEdit:", earliestCollectionYearEdit);
		    //glue.log("INFO", "FIELD: earliestCollectionYearUpdate:", earliestCollectionYearUpdate);
		    if (earliestCollectionYearUpdate != 'unchanged') {		    	
				glue.log("INFO", "Updating earliest_collection_year field:", isolateObj.earliestCollectionYearEdit);
				//glue.command(["set", "field", "earliest_collection_year", isolateObj.earliestCollectionYearEdit]);				
		    }

        	var latestCollectionYearEdit     = isolateObj.latest_collection_edit;
        	var latestCollectionYearUpdate   = isolateObj.latest_collection_update;
 		    //glue.log("INFO", "FIELD: latestCollectionYearEdit:", latestCollectionYearEdit);
		    //glue.log("INFO", "FIELD: latestCollectionYearUpdate:", latestCollectionYearUpdate);
		    if (latestCollectionYearUpdate != 'unchanged') {		    	
				glue.log("INFO", "Updating latestCollectionYearEdit field:", isolateObj.latestCollectionYearEdit);
				//glue.command(["set", "field", "latest_collection_year", isolateObj.latestCollectionYearEdit]);				
		    }

        	var hostEdit       = isolateObj.host_edit;
        	var hostUpdate     = isolateObj.host_update;
        	var hostCommonEdit = isolateObj.host_common_edit;
 		    //glue.log("INFO", "FIELD: hostEdit:", hostEdit);
		    //glue.log("INFO", "FIELD: hostUpdate:", hostUpdate);
		    glue.log("INFO", "FIELD: hostCommonEdit:", hostCommonEdit);
		    if (hostUpdate != 'unchanged') {		    	
				glue.log("INFO", "Updating host field:", isolateObj.hostEdit);
				glue.log("INFO", "Updating host common name field:", isolateObj.hostCommonEdit);
				//glue.command(["set", "field", "host", isolateObj.hostEdit]);				
		    }

        	var labConstruct   = isolateObj.Lab_construct;
        	var vaccine        = isolateObj.vaccine;
 		    glue.log("INFO", "FIELD: labConstruct:", labConstruct);
		    glue.log("INFO", "FIELD: vaccine:", vaccine);
			//glue.command(["set", "field", "lab_construct", isolateObj.labConstruct]);				
			//glue.command(["set", "field", "vaccine_strain", isolateObj.vaccine]);				

        	var pubmedEdit     = isolateObj.pubmedID_edit;
        	var pubmedUpdate   = isolateObj.pubmed_update;
		    //glue.log("INFO", "FIELD: pubmedEdit:", pubmedEdit);
		    //glue.log("INFO", "FIELD: pubmedUpdate:", pubmedUpdate);
		    if (pubmedUpdate != 'unchanged') {		    	
				glue.log("INFO", "Updating gb_pubmed_id field:", isolateObj.pubmedEdit);
				//glue.command(["set", "field", "host", isolateObj.hostEdit]);				
		    }

		});

	});

}



// Populate a map with sequenceID -> sourceName pairs
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


