var infiles = [ "Africa3miss.tsv" , "Africa2miss.tsv", 
"Arctic_miss.tsv", "Asian_miss.tsv", "Asian_SEA1a_miss.tsv", "Asian_SEA1b_miss.tsv", 
"Asian_SEA2a_miss.tsv", "Asian_SEA2b_miss.tsv", "Asian_SEA3_miss.tsv", "Asian_SEA4_miss.tsv", 
"CosmoAF1amiss.tsv", "CosmoAF1bmiss.tsv", "CosmoAf1cmiss.tsv", "CosmoAF4miss.tsv", 
"CosmoAM_miss.tsv", "CosmoE_miss.tsv", "Cosmomiss.tsv", "Ind_miss.tsv" ];


// Get the sequence source mappings (i.e. which in ncbi-refseqs, ncbi-curated, etc)
var epvRefseqResultMap = {};
get_sequence_source_mappings(epvRefseqResultMap);


for(var i = 0; i < infiles.length; i++) {

	var infile = infiles[i];

	// Load data from tab file 
	var loadResult;
	glue.inMode("module/tabularUtilityTab", function() {
		loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/kat/"+infile]));
		glue.log("INFO", "load result was:", loadResult);
	});

	_.each(loadResult, function(isolateObj) {

        var sequenceID = isolateObj.sequenceID;
        var sourceName = epvRefseqResultMap[sequenceID];
		glue.log("INFO", "### Entering sequence table data for isolate:", sequenceID, " from source '", sourceName, "'");
		glue.inMode("sequence/"+sourceName+"/"+sequenceID, function() {

        	var countryUpdate = isolateObj.country_update;
        	var countryEdit   = isolateObj.country_edit;
		    glue.log("INFO", "FIELD: countryEdit:", countryEdit);
		    glue.log("INFO", "FIELD: countryUpdate:", countryUpdate);	    
		    if (countryUpdate != 'unchanged') {		    	
				glue.log("INFO", "Updating country field to:", countryEdit);
				glue.command(["set", "field", "gb_country", countryUpdate]);				
		    }
		    
        	var placeEdit   = isolateObj.place_edit;
        	var placeUpdate = isolateObj.place_update;
 		    glue.log("INFO", "FIELD: placeEdit:", placeEdit);
		    glue.log("INFO", "FIELD: placeUpdate:", placeUpdate);
		    if (placeUpdate != 'unchanged') {		    	
				glue.log("INFO", "Updating place field to:", placeEdit);
				glue.command(["set", "field", "gb_place_sampled", placeEdit]);				
		    }
       	
        	var collectionYearEdit   = isolateObj.collection_year_edit;
        	var collectionYearUpdate = isolateObj.collection_year_update;
 		    glue.log("INFO", "FIELD: collectionYearEdit:", collectionYearEdit);
		    glue.log("INFO", "FIELD: collectionYearUpdate:", collectionYearUpdate);
		    if (collectionYearUpdate != 'unchanged') {		    	
				glue.log("INFO", "Updating collection_year field to:", collectionYearEdit);
				glue.command(["set", "field", "collection_year", collectionYearEdit]);				
		    }
       	
        	var earliestCollectionYearEdit   = isolateObj.earliest_collection_edit;
        	var earliestCollectionYearUpdate = isolateObj.earliest_collection_update;
 		    glue.log("INFO", "FIELD: earliestCollectionYearEdit:", earliestCollectionYearEdit);
		    glue.log("INFO", "FIELD: earliestCollectionYearUpdate:", earliestCollectionYearUpdate);
		    if (earliestCollectionYearUpdate != 'unchanged') {		    	
				glue.log("INFO", "Updating earliest_collection_year field to:", earliestCollectionYearEdit);
				glue.command(["set", "field", "earliest_collection_year", earliestCollectionYearEdit]);				
		    }

        	var latestCollectionYearEdit     = isolateObj.latest_collection_edit;
        	var latestCollectionYearUpdate   = isolateObj.latest_collection_update;
 		    glue.log("INFO", "FIELD: latestCollectionYearEdit:", latestCollectionYearEdit);
		    glue.log("INFO", "FIELD: latestCollectionYearUpdate:", latestCollectionYearUpdate);
		    if (latestCollectionYearUpdate != 'unchanged') {		    	
				glue.log("INFO", "Updating latestCollectionYearEdit field:", latestCollectionYearEdit);
				glue.command(["set", "field", "latest_collection_year", latestCollectionYearEdit]);				
		    }

        	var hostEdit       = isolateObj.host_edit;
        	var hostUpdate     = isolateObj.host_update;
        	var hostCommonEdit = isolateObj.host_common_edit;
 		    glue.log("INFO", "FIELD: hostEdit:", hostEdit);
		    glue.log("INFO", "FIELD: hostUpdate:", hostUpdate);
		    glue.log("INFO", "FIELD: hostCommonEdit:", hostCommonEdit);
		    if (hostUpdate != 'unchanged') {		    	
				glue.log("INFO", "Updating host field:", hostEdit);
				glue.log("INFO", "Updating host common name field:", hostCommonEdit);
				glue.command(["set", "field", "host", hostEdit]);				
		    }

        	var labConstruct   = isolateObj.Lab_construct;
        	var vaccine        = isolateObj.vaccine;
 		    glue.log("INFO", "FIELD: labConstruct:", labConstruct);
		    glue.log("INFO", "FIELD: vaccine:", vaccine);
			//glue.command(["set", "field", "lab_construct", labConstruct]);				
			//glue.command(["set", "field", "vaccine_strain", vaccine]);				

        	var pubmedEdit     = isolateObj.pubmedID_edit;
        	var pubmedUpdate   = isolateObj.pubmed_update;
		    glue.log("INFO", "FIELD: pubmedEdit:", pubmedEdit);
		    glue.log("INFO", "FIELD: pubmedUpdate:", pubmedUpdate);
		    if (pubmedUpdate != 'unchanged') {		    	
				glue.log("INFO", "Updating gb_pubmed_id field:", pubmedEdit);
				glue.command(["set", "field", "host", pubmedEdit]);				
		    }

		});

	});

}



// Populate a map with sequenceID -> sourceName pairs
function get_sequence_source_mappings(epvRefseqResultMap) {

	var resultList = glue.tableToObjects(glue.command(["list","sequence","sequenceID","source.name"]));	
		
	_.each(resultList,function(resultObj){

		//glue.log("INFO", "This result is:", resultObj);
		var sequenceID = resultObj["sequenceID"];
		var sourceName = resultObj["source.name"];
		//var sourceName = ["ncbi-refseqs"];
		epvRefseqResultMap[sequenceID] = sourceName;

	});
	
}


