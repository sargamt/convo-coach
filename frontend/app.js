
function handleFileUpload(){
    const input = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');

    if (input.files.length > 0) {
        App.state.uploadStatus = 2;
        const file = input.files[0];
        fileInfo.textContent = `Selected file: ${file.name}`;
       
    } else {
        App.state.uploadStatus = 1;
        fileInfo.textContent = 'No file selected.';
    }

    if(App.state.uploadStatus == 2){
        App.$.xDone.classList.remove("hidden");
        App.$.oDone.classList.add("hidden");
        App.$.xText.classList.remove("hidden");
        App.$.oText.classList.add("hidden");
    }else if(App.state.uploadStatus == 1){
        App.$.xDone.classList.add("hidden");
        App.$.oDone.classList.remove("hidden");
        App.$.xText.classList.add("hidden");
        App.$.oText.classList.remove("hidden");
    }

}

 window.addEventListener('load', () => App.init());

const App = {
    // All of our selected HTML elements
    $: {
        actions: document.querySelector('[data-id="menu"]'),
        modeBtn: document.querySelector('[data-id="menu-button"]'),
        actionsItems: document.querySelector('[data-id="menu-items"]'),
        BehavioralInterviewBtn: document.querySelector('[data-id="behavioral-interview-btn"]'),
        TechnicalInterviewBtn: document.querySelector('[data-id="technical-interview-btn"]'),
        ElevatorPitchBtn: document.querySelector('[data-id="elevator-pitch-btn"]'),
        GenBtn: document.querySelector('[data-id="gen-text"]'),
        modal: document.querySelector('[data-id="modal"]'),
        resetBtn: document.querySelector('[data-id="resetBtn"]'),
        xDone: document.querySelector('[data-id="xDone"]'),
        oDone: document.querySelector('[data-id="oDone"]'),
        xText: document.querySelector('[data-id="xText"]'),
        oText: document.querySelector('[data-id="oText"]'),
        uploadBtn: document.querySelector('[data-id="uploadBtn"]'),
        modeB: document.querySelector('[data-id="modeB"]'),
        modeT: document.querySelector('[data-id="modeT"]'),
        modeE: document.querySelector('[data-id="modeE"]'),
        
    },

    state:{
        // Modes: 
        // 1 = Behavioral
        // 2 = Technical
        // 3 = Elevator
        currentMode: 1,

        // Upload Statuses
        // 1 = No file
        // 2 = File uploaded
        uploadStatus: 1,

    },  

    init() {
        App.registerEventListeners()
    },

    registerEventListeners(){
        App.$.actions.addEventListener('click', event => {
            App.$.actionsItems.classList.toggle('hidden')
            App.$.modeBtn.classList.toggle("border");
        } );

        App.$.BehavioralInterviewBtn.addEventListener('click', event => {
            App.currentMode = 1;
            App.$.modeB.classList.remove("hidden");
            App.$.modeT.classList.add("hidden");
            App.$.modeE.classList.add("hidden");
        });

        App.$.TechnicalInterviewBtn.addEventListener('click', event => {
            console.log('technical mode')
            App.currentMode = 2;
            App.$.modeB.classList.add("hidden");
            App.$.modeT.classList.remove("hidden");
            App.$.modeE.classList.add("hidden");
        });

        App.$.ElevatorPitchBtn.addEventListener('click', event => {
            console.log('elevator mode')
            App.currentMode = 3;
            App.$.modeB.classList.add("hidden");
            App.$.modeT.classList.add("hidden");
            App.$.modeE.classList.remove("hidden");
        });

        App.$.resetBtn.addEventListener('click', event => {
            App.$.modal.classList.add("hidden");
            App.$.xDone.classList.add("hidden");
            App.$.oDone.classList.remove("hidden");
            App.$.xText.classList.add("hidden");
            App.$.oText.classList.remove("hidden");
            App.state.uploadStatus = 1;
            fileInfo.textContent = 'No file selected.';
        });

        App.$.GenBtn.addEventListener('click', event => {
            App.$.modal.classList.remove("hidden");
        });

        App.$.uploadBtn.addEventListener('click', event => {
            App.$.xDone.classList.remove("hidden");
            App.$.oDone.classList.add("hidden");
            App.$.xText.classList.remove("hidden");
            App.$.oText.classList.add("hidden");
        })
    }
};

function showFeedbackInModal(feedbackText){
    const paragraph = document.getElementById('final-output');
    paragraph.textContent = feedbackText;
}

document.getElementById('uploadBtn').addEventListener('click', () => {
    const input = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');

    App.state.uploadStatus = 2;
    if(App.state.uploadStatus == 2){
        App.$.xDone.classList.remove("hidden");
        App.$.oDone.classList.add("hidden");
        App.$.xText.classList.remove("hidden");
        App.$.oText.classList.add("hidden");
    }else if(App.state.uploadStatus == 1){
        App.$.xDone.classList.add("hidden");
        App.$.oDone.classList.remove("hidden");
        App.$.xText.classList.add("hidden");
        App.$.oText.classList.remove("hidden");
    }

    if (input.files.length > 0) {
        const formData = new FormData();
        formData.append('file', input.files[0]);

        fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            fileInfo.textContent = `Uploaded file: ${data.filePath}`;
        })
        .catch(error => {
            console.error("Error uploading the file:", error);
        });
        App.state.uploadStatus = 2;

    } else {
        fileInfo.textContent = 'No file selected.';
        App.state.uploadStatus = 1;
    }

    if(App.state.uploadStatus == 2){
        App.$.xDone.classList.remove("hidden");
        App.$.oDone.classList.add("hidden");
        App.$.xText.classList.remove("hidden");
        App.$.oText.classList.add("hidden");
    }else if(App.state.uploadStatus == 1){
        App.$.xDone.classList.add("hidden");
        App.$.oDone.classList.remove("hidden");
        App.$.xText.classList.add("hidden");
        App.$.oText.classList.remove("hidden");
    }
});

document.getElementById('uploadBtn').addEventListener('click', async () => {
    const input = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');

    if (input.files.length > 0) {
        const formData = new FormData();
        formData.append('file', input.files[0]);

        try {
            const response = await fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                fileInfo.textContent = `File successfully uploaded. ${data.textEvaluation} Rating: ${data.rating}`;

                // Show feedback in the modal
                showFeedbackInModal(`${data.textEvaluation} Rating: ${data.rating}`);
                App.$.modal.classList.remove("hidden"); // Show the modal

            } else {
                fileInfo.textContent = `Error: ${data.message}`;
            }
        } catch (error) {
            console.error("Error uploading the file:", error);
            fileInfo.textContent = 'Error uploading the file';
        }
    } else {
        fileInfo.textContent = 'No file selected.';
    }
});

function showFeedbackInModal(feedbackText) {
    const paragraph = document.getElementById('final-output');
    paragraph.textContent = feedbackText;
}
