const runCoco = async () => {
    // BEGIN PART 3
    const net = await cocoSsd.load();
    console.log("Loaded!");
    detect(net);
    // END PART 3
};

const detect = async (net) => {
    const img = document.getElementById("img");
    const imgWidth = img.width;
    const imgHeight = img.height;
    // Set canvas height and width
    const canvas = document.getElementById("mesh");
    // BEGIN PART 4
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    // END PART 4

    // Make predictions
    // BEGIN PART 5
    const obj = await net.detect(img);
    // END PART 5

    // Draw mesh
    // BEGIN PART 6
    const ctx = canvas.getContext("2d");
    // END PART 6
    drawRect(obj, ctx);
    // Generate caption
    getCaption(obj);
    // Make image visible after applying boxes
    img.style.visibility = "visible";
};

const drawRect = (predictions, ctx) => {
    // Loop through each prediction
    predictions.forEach((prediction) => {
        // Extract boxes and classes
        const [x, y, width, height] = prediction["bbox"];
        const text = prediction["class"];

        // Set styling
        const color = Math.floor(Math.random() * 16777215).toString(16);
        ctx.strokeStyle = "#" + color;
        ctx.font = "18px Arial";

        // Draw rectangles and text
        ctx.beginPath();
        ctx.fillStyle = "#" + color;
        ctx.fillText(text, x, y);
        ctx.rect(x, y, width, height);
        ctx.stroke();
    });
};

const getCaption = (predictions) => {
    predictions.forEach(async (prediction) => {
        const caption = document.getElementById("caption");
        const entity = prediction["class"];
        try {
            // Access token provided
            const accessToken = "0987dfec765b00a320fffece858277698101b456";
            // Store the response from GET request
            const response = await axios.get(
            `https://owlbot.info/api/v4/dictionary/${entity}`,
            { headers: { Authorization: `Token ${accessToken}` } }
            );
            // Retrieve the data portion of the response
            const data = response.data;
            // From the data, get the first entry of the definitions
            const entry = data.definitions[0];
            let lineText;
            if (entry.example) {
                lineText = entry.example;
            } else {
                lineText = entry.definition;
            }
            if (entry.emoji) {
                lineText += " " + entry.emoji;
            }
            //hard coded extra options for the API
            if (entity) {
                if (entity === "cat") {
                    lineText += " meow meow"
                } else if (entity === "bird") {
                    lineText += " tweet tweet"
                } else if (entity === "bus") {
                    lineText += " beep beep"
                } else if (entity === "car") {
                    lineText += " vroom vroom"
                } else if (entity === "dog") {
                    lineText += " woof woof"
                } else if (entity === "sheep") {
                    lineText += " baa baa"
                } else if (entity === "cow") {
                    lineText += " moo moo"
                } else if (entity === "person") {
                    lineText += " hi there"
                } else if (entity === "motorcycle") {
                    lineText += " brrrr brrrr"
                } else if (entity === "keyboard") {
                    lineText += " clicky clack!"
                } else if (entity === "boat") {
                    lineText += " splish splash"
                } 
            }
            lineText += " #" + entity;
            const line = document.createElement("p");
            line.innerText = lineText;
            caption.appendChild(line);
        } catch (error) {
            console.log(error);
        }
    })
    // END PART 7
}


// BEGIN PART 8
// "input" is current undefined, since it hasn't been initialized yet.
// Initialize it here to the appropriate element on the HTML document.
input = document.getElementById("img-upload");
input.addEventListener("change", (event) => {
    const caption = document.getElementById("caption");
    caption.replaceChildren();
    const img = document.getElementById("img");
    img.src = URL.createObjectURL(event.target.files[0])
    runCoco()
    // What should you run to drive the execuation of all your functions?
})
// END PART 8
