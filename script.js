document.addEventListener('DOMContentLoaded', () => {
    console.log('hello mom');

    const dropArea = document.getElementById('drop-area');
    const fileInput = document.querySelector('input[type="file"]');

    const filePairs = {
        ".html": ["fa-brands fa-html5", "color: rgb(255, 0, 0);"],
        ".css": ["fa-brands fa-css3-alt", "color: blue;"],
        ".py": "",
        ".js": ["fa-brands fa-js", "color: orange;"],
        ".json": ["fa-solid fa-code", "color: #22c55e;"]
    };

    const keys = Object.keys(filePairs);

    // Common file handling
    function handleFile(file) {
        const fileSize = file.size / (1024 * 1024);

        if (fileSize > 10) {
            dropArea.innerHTML = '<span style="color: red;">File size too large!</span>';
            return;
        }

        if (keys.some(ext => file.name.endsWith(ext))) {
            let extension = file.name.split('.')[1];
            if (extension === "py") {
                dropArea.innerHTML = `
                    <img src="PYTHON_symbol.png" class="python-icon">
                    <p style="opacity: 1;">${file.name}</p>
                `;
            } else {
                dropArea.innerHTML = `
                    <i class="${filePairs["." + extension][0]}" style="${filePairs["." + extension][1]}"></i>
                    <p style="opacity: 1;">${file.name}</p>
                `;
            }
        } else {
            dropArea.innerHTML = `
                <i class='fa-solid fa-file'></i>
                <p style="opacity: 1;">${file.name}</p>
            `;
        }
    }

    // File input click logic
    dropArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        handleFile(e.target.files[0]);
    });

    // ---------------- DRAG AND DROP FIX ----------------

    // 1. Prevent default behavior globally (VERY IMPORTANT)
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        window.addEventListener(eventName, e => e.preventDefault());
        window.addEventListener(eventName, e => e.stopPropagation());
    });

    // 2. Highlight drop area on dragover
    dropArea.addEventListener('dragover', () => {
        dropArea.style.backgroundColor = "rgba(152, 205, 255, 0.2)";
        dropArea.style.borderStyle = "dotted";
    });

    // 3. Reset style on dragleave
    dropArea.addEventListener('dragleave', () => {
        dropArea.style.backgroundColor = "transparent";
        dropArea.style.borderStyle = "solid";
    });

    // 4. Handle file drop
    dropArea.addEventListener('drop', (e) => {
        dropArea.style.backgroundColor = "transparent";
        dropArea.style.borderStyle = "solid";

        const files = e.dataTransfer.files;
        console.log(e.dataTransfer) 
        console.log("Dropped files:", files);
        if (files.length) {
            handleFile(files[0]);
        }
    });
});


