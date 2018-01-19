function syncCurated() {
	glue.log("INFO", "Synchronizing source "+source.name+" with NCBI...");
	var syncResults;
	glue.inMode("module/"+modules.ncbiImporter, function() {
		syncResults = glue.command(["sync", "--detailed"], {convertTableToObjects:true});
		glue.log("FINEST", "NCBI syncronization report", syncResults);
		glue.log("INFO", "Synchronization complete");
	});
	glue.log("INFO", "Deleting surplus sequence files");
	var deleted = 0;
	_.each(syncResults, function(syncResult) {
		if(syncResult.status == "SURPLUS") {
			glue.command(["file-util", "delete-file", "sources/ncbi-curated/"+syncResult.sequenceID+".xml"]);
			deleted++;
		}
	});
	glue.log("INFO", "Deleted "+deleted+" surplus sequence files");
	glue.log("INFO", "Exporting incoming sequences to file system...");
	glue.command(["export", "source", "--whereClause", "ncbi_incoming = null", "--parentDir", source.path, source.name]);
}


function pad(num, size) {
    var s = num+"";
    while (s.length < size) {
    	s = "0" + s;
    }
    return s;
}

