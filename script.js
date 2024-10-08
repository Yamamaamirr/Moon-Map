const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));



const canvas = document.getElementById('moonCanvas');
const ctx = canvas.getContext('2d');
const moonImage = new Image();
const backgroundImage= new Image();
var currentDate = new Date().toISOString().split('T')[0];
var latitude = 48.8566;
var longitude = 2.3522;
var currenthour ="00"
var currentminute = "00"  
var sampletext='';
var textfont = "Aptos, Calibri, Arial, sans-serif";
var textfont1="Aptos, Calibri, Arial, sans-serif";
var fontsizeinp=50*2;
var fontsizeinp1=45*2;
var placetext="Paris, France";
var moonPhase;
var timeStr;
var currenttheme = "theme1.jpg"; 
var moonImageLoaded = false;
var backgroundImageLoaded = false;

window.onload = function() {

  moonImage.onload = function() {
    moonImageLoaded = true;
    if (backgroundImageLoaded) {
      drawMoon();
    }
  };
  backgroundImage.onload = function() {
    backgroundImageLoaded = true;
    if (moonImageLoaded) {
      drawMoon();
    }


  };

  moonImage.src = 'test2.png';
  backgroundImage.src = currenttheme; 
};
      


function drawBackground(theme) {
  currenttheme = theme;
  backgroundImageLoaded = false;
  backgroundImage.src = currenttheme;
}
 
function drawMoon(){
  const moonRadius = 600*2; 
  canvas.width = 1548*2;
  canvas.height = 2020*2;
  const yOffset = -280*2;
  timeStr = (currenthour + ":" +currentminute);
  const dateStr = currentDate;
  const dateTime = new Date(dateStr + 'T' + timeStr);
 
  moonPhase = SunCalc.getMoonIllumination(dateTime).phase;

  const moonPosition = SunCalc.getMoonPosition(dateTime, latitude, longitude);
  const parallacticAngle = moonPosition.parallacticAngle;

  

  ctx.clearRect(0, 0, canvas.width, canvas.height);
   
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); 
 
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2 + yOffset);
  ctx.rotate(parallacticAngle);
  if (moonPhase>=0.5){
  ctx.rotate(Math.PI);
  }
  ctx.drawImage(moonImage, -moonRadius, -moonRadius, moonRadius * 2, moonRadius * 2);

  
  ctx.beginPath();
  ctx.arc(0, 0, moonRadius, 0, Math.PI * 2);
  ctx.clip();

  const shadowSize = Math.round(canvas.width / 50);
  const t = Math.abs(moonPhase % 0.5 - 0.25) / 0.25;
  const opacity = 0.88;
  const style = 'grey'; // Default style

  const shadowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, moonRadius);
  shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  shadowGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.6)');
  shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.88)');
  ctx.fillStyle = shadowGradient;
  ctx.filter = `blur(${shadowSize}px)`;
  ctx.globalAlpha = opacity;

  const phaseAngle = Math.PI * (moonPhase / 0.5);
  ctx.beginPath();
  ctx.arc(0, 0, moonRadius + 2 * shadowSize, -Math.PI / 2, Math.PI / 2, true);
  if (moonPhase === 0) {
      ctx.arc(0, 0, moonRadius + 2 * shadowSize, Math.PI / 2, -Math.PI / 2, true);
  }
  for (let e = Math.round(2 * (moonRadius + shadowSize) / 2048 * 100) / 100, f = 2048; f >= 0; f--) {
      let g = Math.round(100 * (f * e - moonRadius - shadowSize)) / 100;
      g = Math.max(Math.min(g, moonRadius + shadowSize), -(moonRadius + shadowSize));
      const h = Math.cos(Math.asin(g / (moonRadius + shadowSize))) * (moonRadius + shadowSize);
      const i = Math.cos(phaseAngle) * h;
      ctx.lineTo(i, g);
  }
  ctx.closePath();
  ctx.fill();

  ctx.restore();

  
  drawText();
}




function drawText() {
  const fontSize = 11 * 4;
  const fontSizeText3 = 14 * 4; // Increased font size for text3
  const fontFamily = "'Calibri Light', Calibri, Arial, sans-serif"; // Use a font stack with fallback fonts
  var textColor = "white"; // Change text color to black
  const textX = canvas.width / 2;
  const textY1 = canvas.height / 2 + 220 * 4*2;
  const textY2 = textY1 - 15 * 4*2;
  const textY3 = textY2 - 85 * 4*2; 
  const textY4 = textY1 + 15 * 4*2; 
  const textY5 = textY1 - 30 * 4*2;

  var textdate = new Date(currentDate);
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  // Format the date as "Month Day, Year"
  var formattedDate = textdate.getDate() + " " + monthNames[textdate.getMonth()] + ", " + textdate.getFullYear();
  // Check the state of the toggle switch
  if (toggleSwitch.checked) {
   
    formattedDate += " " + timeStr;
  }

const currentmoonphase = getMoonPhase(moonPhase);

  // Set the formatted date as the value of the text input
  document.getElementById('textinput-new').value = formattedDate;

  const formattedLocation = `${latitude.toFixed(2)} ${latitude >= 0 ? 'N' : 'S'} / ${longitude.toFixed(2)} ${longitude >= 0 ? 'E' : 'W'}`;

if(currenttheme=="theme7.jpg"){
  textColor="#000000"
}
  // Set text properties
  ctx.font = fontsizeinp1 + "px " + textfont1; 
  ctx.fillStyle = textColor; 
  ctx.textAlign = "center";

  if (Lunar_toggleSwitch.checked) {
  ctx.fillText(currentmoonphase, textX, textY5);  
  }
  // Draw city text
  ctx.fillText(placetext, textX, textY1);
 
  // Draw second text
  ctx.fillText(formattedDate, textX, textY2);

  if (Gps_toggleSwitch.checked) {
    ctx.fillText(formattedLocation, textX, textY4);
  }

 // Sample text 3
 ctx.font = fontsizeinp + "px " + textfont; // Set font size for text3

 // Split the sample text into lines based on textarea input or canvas width
 const sampleTextLines = sampletext.split('\n');
 const maxWidth = canvas.width - 200; // Adjusted for padding

 // Calculate text height for spacing
 const lineHeight = fontsizeinp * 1.2; // Adjust line height as needed

 let y = textY3; // Start position for sample text

 // Iterate over each line of sample text
 sampleTextLines.forEach((line) => {
   let words = line.split(' ');
   let lineText = '';
   let testWidth = 0;

   // Check each word if it fits in the line
   words.forEach((word) => {
     testWidth = ctx.measureText(lineText + word + ' ').width;
     if (testWidth < maxWidth) {
       lineText += (lineText ? ' ' : '') + word;
     } else {
       // Draw the line and reset for next line
       ctx.fillText(lineText, textX, y);
       y += lineHeight;
       lineText = word;
     }
   });

   // Draw the remaining line
   ctx.fillText(lineText, textX, y);
   y += lineHeight; // Move to the next line
 });


   
   
}


        // Redraw the moon when the window regains focus
        window.addEventListener('focus', drawMoon);


// Initialize Mapbox Places API
mapboxgl.accessToken = 'pk.eyJ1IjoieWFtYW1haDExIiwiYSI6ImNsdHp5NjV3dzA1MmoyanByeHJjNmVjdngifQ.zdQIm4yI1snBMkUuBXzeqw';
var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  language: 'en', // Language preference, change as needed
  
  placeholder: 'Search a city'
});
document.getElementById('textinput').appendChild(geocoder.onAdd());

// Handle suggestion click event
function handleSuggestionClick(city, tlatitude, tlongitude) {
  document.getElementById('textinput').value = city;
  document.getElementById('suggestionContainer').innerHTML = '';
latitude=tlatitude;
longitude=tlongitude;
  
  placetext = city;
  document.getElementById('textinput10').value = city;
  drawMoon(); 
  

 
}
document.getElementById('textinput').addEventListener('input', function(event) {
  var query = event.target.value;

  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&types=place&autocomplete=true`)
  .then(response => response.json())
  .then(data => {
    var suggestions = data.features;
    var suggestionContainer = document.getElementById('suggestionContainer');
    suggestionContainer.innerHTML = '';

    suggestions.forEach(feature => {
      var city = feature.place_name;
      var tlatitude = feature.geometry.coordinates[1];
      var tlongitude = feature.geometry.coordinates[0];

      var suggestionItem = document.createElement('div');
      suggestionItem.classList.add('suggestion-item');
      suggestionItem.textContent = city;
      suggestionItem.addEventListener('click', function() {
        handleSuggestionClick(city, tlatitude, tlongitude);
      });
      suggestionContainer.appendChild(suggestionItem);
    });
  })
  .catch(error => {

  });
});






 document.getElementById('searchinput1').addEventListener('change', function() {
    currentDate = this.value;
    drawMoon();
  });
  document.getElementById('hourInput').addEventListener('change', function() {
    currenthour=this.value;
    drawMoon();
  });
  document.getElementById('minuteInput').addEventListener('change', function() {
    currentminute=this.value;
    drawMoon();
  });

  document.getElementById('opt-text').addEventListener('input', function() {
    sampletext = this.value;
    drawMoon();
});



document.getElementById('fontSelect').addEventListener('change', function() {
  var selectedFont = this.value;
  textfont = selectedFont;
  drawMoon();
});



document.getElementById('fontSizeInput').addEventListener('change', function() {
   fontsizeinp = this.value * 4;
  drawMoon();
});



document.getElementById('fontSelect1').addEventListener('change', function() {
  var selectedFont1 = this.value;
  textfont1 = selectedFont1;
  drawMoon();
});



document.getElementById('fontSizeInput1').addEventListener('change', function() {
   fontsizeinp1 = this.value*4;
  drawMoon();
});



document.getElementById('textinput10').addEventListener('input', function() {
  placetext = this.value;
  drawMoon();
});



function getMoonPhase(illumination) {
  if (illumination < 0 || illumination > 1) {
      return "Invalid illumination value. Please provide a value between 0 and 1.";
  } else if (illumination >= 0 && illumination <= 0.015) {
      return "New Moon";
  } else if (illumination > 0.015 && illumination <= 0.175) {
      return "Waxing Crescent";
  } else if (illumination > 0.0175 && illumination <= 0.33) {
      return "First Quarter";
  } else if (illumination > 0.33 && illumination <= 0.48) {
      return "Waxing Gibbous";
  } else if (illumination > 0.48 && illumination <= 0.52) {
      return "Full Moon";
  } else if (illumination > 0.52 && illumination <= 0.67) {
      return "Waning Gibbous";
  } else if (illumination > 0.67 && illumination <= 0.825) {
      return "Last Quarter";
  } else if (illumination > 0.825 && illumination < 0.985) {
      return "Waning Crescent";
  } else {
      return "New Moon"; 
    }
}



const themeBoxes = document.querySelectorAll('.themebox');
themeBoxes.forEach(function(themeBox) {
    themeBox.addEventListener('click', function(event) {
        const theme = this.getAttribute('data-value');
        drawBackground(theme);
    });
});















sidebarClose.addEventListener("click", () => {
  sidebar.classList.add("close", "hoverable");
});
sidebarExpand.addEventListener("click", () => {
  sidebar.classList.remove("close", "hoverable");
});

sidebar.addEventListener("mouseenter", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
});
sidebar.addEventListener("mouseleave", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
});

darkLight.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    document.setI
    darkLight.classList.replace("bx-sun", "bx-moon");
  } else {
    darkLight.classList.replace("bx-moon", "bx-sun");
  }
});

submenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("show_submenu");
    submenuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show_submenu");
      }
    });
  });
});

if (window.innerWidth < 768) {
  sidebar.classList.add("close");
} else {
  sidebar.classList.remove("close");
}
document.addEventListener("DOMContentLoaded", function() {
 
  showPrintedContent();
});

function showPrintedContent() {
  document.querySelector('.digital-file-content').style.display = 'none';
 
  document.querySelector('.printed-poster-content').style.display = 'block';
}

function showDigitalContent() {

  document.querySelector('.printed-poster-content').style.display = 'none';

  document.querySelector('.digital-file-content').style.display = 'block';
}


const toggleSwitch = document.getElementById('toggleSwitch');
const Gps_toggleSwitch = document.getElementById('Gps_toggleSwitch');
const Lunar_toggleSwitch = document.getElementById('Lunar_toggleSwitch');

toggleSwitch.addEventListener('change', () => {

  if (toggleSwitch.checked) {
  
    drawMoon();

  } else {
    
    drawMoon();
   
  }
});


Gps_toggleSwitch.addEventListener('change', () => {

  if (Gps_toggleSwitch.checked) {
    drawMoon();
  } else {
  
    drawMoon();
  }
});

Lunar_toggleSwitch.addEventListener('change', () => {

  if (Lunar_toggleSwitch.checked) {
    drawMoon();
  } else {
    drawMoon();
  }
});


function selectBox(boxNumber) {
  const moonCanvas = document.getElementById('moonCanvas');
  if (boxNumber === 1) {
      moonCanvas.style.width = '390px';
      moonCanvas.style.height = '510px';
  } else if (boxNumber === 2) {
      moonCanvas.style.width = '400px';
      moonCanvas.style.height = '520px';
  }
}
const dpi = 300;
        const dimensions = {
            A4: { width: 2480 , height: 3508  }, // A4 at   
             A3: { width: 3508 , height: 4961  }, // A3 at 
            A2: { width: 4961 , height: 7016  }  // A2 at 
        };

        function downloadCanvasAsImage() {
          const size = document.getElementById('sizeSelect').value;
          const targetSize = dimensions[size];
      
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          
          // Set tempCanvas dimensions based on targetSize
          tempCanvas.width = targetSize.width;
          tempCanvas.height = targetSize.height;
      
          // Maintain aspect ratio of the original canvas
          const originalAspectRatio = canvas.width / canvas.height;
          let drawWidth = targetSize.width;
          let drawHeight = drawWidth / originalAspectRatio;
      
          // Check if the calculated height exceeds the target height
          if (drawHeight > targetSize.height) {
              drawHeight = targetSize.height;
              drawWidth = drawHeight * originalAspectRatio;
          }
      
          // Draw the original canvas onto the tempCanvas with the calculated dimensions
          tempCtx.drawImage(canvas, 0, 0, drawWidth, drawHeight);
      
          const dataURL = tempCanvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `canvas_image_${size}.png`;
          link.href = dataURL;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
      

        async function downloadCanvasAsPDF() {
          const size = document.getElementById('sizeSelect').value;
          const { jsPDF } = window.jspdf;
          const targetSize = dimensions[size];
          const pdfSizes = {
              A4: [210, 297],
              A3: [297, 420],
              A2: [420, 594]
          };
      
          const pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'mm',
              format: pdfSizes[size]
          });
      
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          tempCanvas.width = targetSize.width;
          tempCanvas.height = targetSize.height;
      
          // Maintain aspect ratio
          const aspectRatio = canvas.width / canvas.height;
          let drawWidth = targetSize.width;
          let drawHeight = drawWidth / aspectRatio;
      
          if (drawHeight > targetSize.height) {
              drawHeight = targetSize.height;
              drawWidth = drawHeight * aspectRatio;
          }
      
          tempCtx.drawImage(canvas, 0, 0, drawWidth, drawHeight);
      
          const imgData = tempCanvas.toDataURL('image/png');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
      
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`canvas_${size}.pdf`);
      }
      

        document.getElementById('downloadImageBtn').addEventListener('click', downloadCanvasAsImage);
        document.getElementById('downloadPdfBtn').addEventListener('click', downloadCanvasAsPDF);
   