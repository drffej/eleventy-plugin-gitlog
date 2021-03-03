// Return array of git entries for named File
// First creates json array with gitlog data and generates function to lookup
// data file
// Needs gitlog:
// npm install gitlog --savedev 

const gitlog = require("gitlog").default;

function generateGitlog(userOptions = {}){ 

    try {
        // set the options
        const options = {
            repo: __dirname,
            number:  200,
            fields: ["hash", "abbrevHash", "subject", "authorEmail", "authorName", "authorDate","authorDateRel"],
            execOptions: { maxBuffer: 1000 * 1024 },
        };

        options.repo = userOptions.repo || options.repo;
        options.number = userOptions.commits || options.number;
        options.fields = userOptions.fields || options.fields;

        // Synchronous grab of gitlog
        const commits = gitlog(options);


        // generate function to look up file in commits
        lookup = function(filePath){
            result = [];
            shortFilePath = filePath.slice(2);  // get rid of the "./"
            commits.map(function(item, index, array) {
                for (let file of item.files){
                    if (file == shortFilePath ){
                        // add match to history
                        shortDate = new Date(item.authorDate);
                        shortDateS = shortDate.toLocaleDateString("en-GB", { dateStyle: 'medium'});
                        history = {hash: item.hash, abbrevHash: item.abbrevHash, subject: item.subject, authorEmail: item.authorEmail, authorName: item.authorName, authorDate: shortDateS };
                        result.push(history);
                    }
                }

            });
            if (result.length > 0){
                return  {lastModified: result[0].authorDate, lastAuthor: result[0].authorName,  history: result};
              }
              else {
                return {lastModified: 'no date', lastAuthor:'no author', history: result};
            }

        };
    
        return lookup;
    }
    catch(err){
        console.log(`\x1b[31mGitlog plugin: ${err}\x1b[0m`);
        return function(filepath){ return "[]" };
    }
}

// define the plug as filter
module.exports = (eleventyConfig, userOptions) => {
    eleventyConfig.addFilter('getLog', generateGitlog(userOptions));
}