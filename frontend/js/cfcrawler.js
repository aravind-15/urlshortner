var axios=require('axios');

show();

function show()
{   var handle= document.getElementById("form1").value;
    
    var URL  = "https://codeforces.com/api/user.status?handle="+ handle;
   //URL_Format: https://codeforces.com/api/user.status?handle=userHandle&from=start&count=options.count
    console.log(URL);
    axios.get(URL)
    .then(function (response) {
  var submissionsArray = [];
  var sub=response.data.result;
  //console.log(sub);
  var len=sub.length;
  for(var i=0; i<len;i++)
   {  //console.log(sub[i]);
      var name = sub[i].problem.name;
      var language = sub[i].programmingLanguage;
      var submissionId = sub[i].id;
      var solvedStatus = sub[i].verdict;
      var timeTaken = sub[i].timeConsumedMillis;
      var memoryUsed = sub[i].memoryConsumedBytes;
      var contestId = sub[i].contestId;
      if(solvedStatus=="OK") var score = 100;
      else var score = 0;
      var t = new Date(1970,0,1,11); // Epoch
      t.setSeconds(sub[i].creationTimeSeconds);
      //console.log(t);
  
                  submissionsArray.push({
                      site_name: "CODEFORCES",
                      site_contestId: contestId,
                      site_submission_id: submissionId,
                      site_submission_date : t,
                      site_problem_slug: name,
                      site_submission_verdict: solvedStatus,
                      site_submission_score : score,
                      site_submission_language: language,
                      site_submission_time_taken : timeTaken,
                      site_submission_memory_consumed : memoryUsed
                    })
    console.log(submissionsArray[i]);
    }
    //cb(null,submissionsArray);
  })
  
}

//module.exports.getUserSubmissions('NIKHIL063',options={codeforces_username:"xxx",start:1,count:2},cb=>{})

