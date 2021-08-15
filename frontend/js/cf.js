//i_love_tanya_romanova
show();
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawpie( submissions, handle) {
    //console.log(submissions);
    var len=submissions.length;
    var ac=0,w=0,tle=0,re=0,pac=0,c=0,mle=0,f=0,ile=0;
    //var s= new Set();

    for(var i=0; i<len;i++)
    {   var ans=submissions[i].site_submission_verdict;
        //s.add(ans);
        if(ans=="OK")ac++;
        if(ans=="WRONG_ANSWER")w++;
        if(ans=="TIME_LIMIT_EXCEEDED")tle++;
        if(ans=="IDLENESS_LIMIT_EXCEEDED")ile++;
        if(ans=="MEMORY_LIMIT_EXCEEDED")mle++;
        if(ans=="COMPILATION_ERROR")c++;
        if(ans=="RUNTIME_ERROR") re++;
        if(ans=="PARTIAL")pac++;
        if(ans=="FAILED") f++;
    }
    //console.log(s);
    var data = google.visualization.arrayToDataTable([
      ['Verdict', 'No. of submissions'],
      ['ACCEPTED',   ac],
      ['PARTIAL_ACCEPTED',   pac],
      ['WRONG',      w],
      ['TLE',  tle],
      ['RUNTIME_ERROR', re],
      ['COMPILATION_ERROR',   c],
      ['MEMORY_LIMIT_EXCEEDED', mle],
      ['FAILED', f],
    ]);

    var options = {
      title: handle+ ' Submission Verdicts',
      pieHole: 0.4,
      colors:['green','lightgreen','red','orange','purple','yellow','lightblue'],
      is3D: true, 
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }

function show() {
        var handle=document.getElementById("handle").value;
        $.ajax({
            type: "POST",
            url: "https://codeforces.com/api/user.status?handle="+handle,
            success: function(response) {
                response=JSON.parse(JSON.stringify(response));
                //console.log(response.result);

                var submissionsArray = [];
                var solved= new Set();
                var psolved= new Set();
                var rem= new Set();
                var sub=response.result;
 
                var len=sub.length;
                console.log(len);
                for(var i=0; i<len;i++)
                {  //console.log(sub[i]);
                   var name = sub[i].problem.name;
                   var language = sub[i].programmingLanguage;
                   var submissionId = sub[i].id;
                   var solvedStatus = sub[i].verdict;
                   var tags = sub[i].problem.tags
                   //console.log(tags);
                   var details=name+"#"+tags;
                   if(solvedStatus=="OK") solved.add(details);
                   else if(solvedStatus=="PARTIAL") psolved.add(details);
                   rem.add(details);
                   var timeTaken = sub[i].timeConsumedMillis;
                   var memoryUsed = sub[i].memoryConsumedBytes;
                   var contestId = sub[i].contestId;
                   if(solvedStatus=="OK") var score = 100;
                   else var score = 0;
                   var t = new Date(1970,0,1,11); // Epoch
                   t.setSeconds(sub[i].creationTimeSeconds);
  
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
                      site_submission_memory_consumed : memoryUsed,
                      site_submission_tags : tags
                    })
                //console.log(submissionsArray[i]);
            }
                drawpie(submissionsArray,handle);
                drawChart(submissionsArray,handle);
                solve(solved);
                psolve(psolved);
                submit(rem);
                
            }, //sucess
            error: function(error) { } //error
        });
} //End of show function

function drawChart(submissions,handle) {
    var len=submissions.length;
    //var s= new Set();
    var cpp=0,c=0,p=0,j=0,o=0;
    for(var i=0; i<len;i++)
    {   var ans=submissions[i].site_submission_language;
        if(ans=="GNU C++17" || ans=="GNU C++14" || ans=="GNU C++11" || ans=="GNU C++" || ans=="GNU C++0x")cpp++;
        else if(ans=="GNU C11")c++;
        else if(ans=="Java 8")j++;
        else if(ans=="Python 3")p++;
        else o++;
        //s.add(ans);
    }
    //console.log(s);
    var data = google.visualization.arrayToDataTable([
      ["Language", "Submissions", { role: "style" } ],
      ["C++",cpp, "#b87333"],
      ["C", c, "silver"],
      ["JAVA", j, "gold"],
      ["PYTHON", p, "color: #e5e4e2"],
      ["OTHERS", o, "color: #e5e4e2"]
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);

    var options = {
      title: "Languages Used By "+ handle,
      width: 500,
      height: 400,
      bar: {groupWidth: "50%"},
      legend: { position: "none" },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    chart.draw(view, options);
}

function solve(subs)
{   var h="";
    for(var x of subs) {h+=`<div class="badge badge-secondary" title=${x.split("#")[1]}>${x.split("#")[0]}</div>`;}
    document.getElementsByClassName("row-1")[0].innerHTML=h;
}

function psolve(subs)
{   var h="";
    for(var x of subs) {h+=`<div class="badge badge-secondary" title=${x.split("#")[1]}>${x.split("#")[0]}</div>`;}
    document.getElementsByClassName("row-1")[1].innerHTML=h;
    
}

function submit(subs)
{  var h="";
    for(var x of subs) {h+=`<div class="badge badge-secondary" title=${x.split("#")[1]}>${x.split("#")[0]}</div>`;}
    document.getElementsByClassName("row-1")[2].innerHTML=h;
}