
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
    let table = document.getElementById('data');

  let totalCases;

  fetch("https://corona.lmao.ninja/all", requestOptions)
  .then(response => response.json())
  .then(result => 
    {
        document.getElementById("h1TotalCases").innerHTML = result.cases;
        document.getElementById("h1TotalDeaths").innerHTML = result.deaths;
        document.getElementById("h1TotalRecovered").innerHTML = result.recovered;
        
    }
    )
  .catch(error => console.log('error', error));

  let resp = [];
  let b = [];
  fetch("https://api.covid19api.com/summary", requestOptions)
    .then(response => response.json())
    .then((res) =>
    {
        resp.push(res);
        b = resp[0]["Countries"];
        b = b.sort((a,c) => c.TotalConfirmed - a.TotalConfirmed);
        for (let i = 0 ; i<224; i++)
        {
            table.innerHTML+= "<tr class=\"row100 body\" id = \"he\"><td class=\"cell100 column1\">" + b[i].Country + "</td><td class=\"cell100 column2\">" + b[i].NewConfirmed + "</td><td class=\"cell100 column3\">" + b[i].TotalConfirmed + "</td><td class=\"cell100 column4\">" +b[i].NewDeaths + "</td><td class=\"cell100 column5\">" +   b[i].TotalDeaths + "</td><td class=\"cell100 column6\">" +  b[i].TotalRecovered + "</td></tr>";
    
        }
    })
    .catch(error => console.log('error', error));

  function search() {
  
    let input, filter, ul, tr, td, i, txtValue, tbody;
    let count = 0;
    tbody = document.getElementsByTagName("tbody");
    input = document.getElementById("myInput");
    if(input.value.length > 0)
    {
    filter = input.value.toUpperCase();
    tr = document.getElementsByClassName("row100");
    
    for (i = 1; i < tr.length; i++) {
        td = tr[i].firstElementChild;
        txtValue = td.innerText;  
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            let tbody = document.getElementById('chartDiv');
            if(tbody !== null)
            tbody.remove();
            let dv = document.createElement("tr");
            dv.setAttribute("id", "chartDiv");
            let tds = document.createElement("td");

            tds.setAttribute("colspan", "6");
            tds.innerHTML = "<div id=\'myDiv\' style = \"\"></div>"
            dv.appendChild(tds);
            
            tr[i].parentElement.appendChild(dv);
            let cases = tr[i].childNodes[2].innerText;
            let deaths = tr[i].childNodes[4].innerText;
            let recovereds = tr[i].childNodes[5].innerText;
            cases = cases - recovereds - deaths;
            var data = [{
              values : [cases, recovereds, deaths],
              labels: ['Active Caseses', 'Recovered', 'Deaths'],
              type: 'pie'
            }];
            
            var layout = {
              height: 400,
              width: 350
            };
            
            Plotly.newPlot('myDiv', data, layout);
            
         
            
        } else {
            tr[i].style.display = "none";
            
        }
   }
  }
}
/*
fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => response.json())
  .then(data => {
    data["Argentina"].forEach(({ date, confirmed, recovered, deaths }) =>
      console.log(`${date} active cases: ${confirmed}`)
    )
  });

  */